import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync, mkdirSync, appendFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

function check(ok, msg) { if (!ok) throw new Error(msg); }
export function canonicalUrl(value) {
  check(typeof value === "string" && value.length < 2000, "Invalid source URL");
  const u = new URL(value);
  check(u.protocol === "https:" && !u.username && !u.password && !["localhost", "127.0.0.1"].includes(u.hostname), "Source must use public HTTPS");
  u.hash = "";
  for (const k of [...u.searchParams.keys()]) if (/^utm_/i.test(k) || /^(fbclid|gclid)$/i.test(k)) u.searchParams.delete(k);
  return u.toString();
}
function cleanText(v, key, limit, multiline = false) {
  check(typeof v === "string" && v.trim() && v.length <= limit, "Invalid " + key);
  check(!/[\u0000-\u0008\u000b\u000c\u000e-\u001f<>]/.test(v) && !/\{\{|\{%/.test(v), "Unsafe " + key);
  check(multiline || !/[\r\n\t]/.test(v), "Invalid line break");
  return v.trim();
}
export function prepare(payload, now = new Date()) {
  check(payload && payload.approved === true && payload.source_status === "live", "Approved live source is required");
  const source = canonicalUrl(payload.source_url);
  const title = cleanText(payload.title, "title", 180);
  const body = cleanText(payload.body, "body", 5000, true);
  check(body.split(/\s+/).filter(Boolean).length >= 65, "Pitch is too short");
  check(!/(?:\bchatgpt\b|instruksi\s+(?:chat|internal)|strategi\s+(?:distribusi|backlink)|(?:demi|untuk)\s+(?:membangun|mendapatkan)\s+backlink|pitch\s+otomatis)/i.test(body), "Internal conversation or strategy not allowed in public text");
  const description = cleanText(payload.description || body.replace(/[*_#\[\]()]/g, "").slice(0, 150), "description", 200);
  const category = cleanText(payload.category || "Teknologi", "category", 30);
  check(/^[\p{L}\p{N}\s&-]+$/u.test(category), "Invalid category");
  let image = null;
  if (payload.cover_url) image = canonicalUrl(payload.cover_url);
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Makassar", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
  }).formatToParts(now).map(item => [item.type, item.value]));
  const day = [p.year, p.month, p.day].join("-");
  const datetime = day + " " + [p.hour, p.minute, p.second].join(":") + " +0800";
  const hash = createHash("sha256").update(source).digest("hex").slice(0, 10);
  const slug = title.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 64).replace(/-+$/g, "") || "catatan";
  const matter = [
    "---", "layout: post", "title: " + JSON.stringify(title), "date: " + datetime,
    "categories: [" + JSON.stringify(category) + "]",
    "description: " + JSON.stringify(description),
    ...(image ? ["image: " + JSON.stringify(image)] : []),
    "source_url: " + JSON.stringify(source), "---"
  ].join("\n");
  const cover = image ? "\n\n![" + title.replace(/[\[\]]/g, "") + "](" + image + ")" : "";
  const attribution = body.includes(source) ? "" : "\n\nTulisan terkait: [baca pembahasan sumber](" + source + ").";
  return { source, path: join("_posts", day + "-" + slug + "-" + hash + ".md"), markdown: matter + cover + "\n\n" + body + attribution + "\n" };
}
export function findExisting(dir, source) {
  let files;
  try { files = readdirSync(dir).filter(x => /\.md$|\.markdown$/.test(x)); }
  catch(e) { if (e.code === "ENOENT") return null; throw e; }
  for (const file of files) {
    const match = readFileSync(join(dir, file), "utf8").match(/^source_url:\s*(.+)$/m);
    if (!match) continue;
    let url = match[1].trim();
    try { url = JSON.parse(url); } catch { url = url.replace(/^['"]|['"]$/g, ""); }
    try { if (canonicalUrl(url) === source) return join(dir, file); } catch {}
  }
  return null;
}
export function publish(payload, root = process.cwd(), now = new Date()) {
  const item = prepare(payload, now);
  const dir = join(root, "_posts");
  const existing = findExisting(dir, item.source);
  if (existing) return { changed: false, path: existing };
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(root, item.path), item.markdown, { flag: "wx" });
  return { changed: true, path: item.path };
}
async function main() {
  const result = publish(JSON.parse(process.env.CODEFLARE_PAYLOAD_JSON || "{}"));
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, "changed=" + result.changed + "\n");
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, result.changed ? "New note created.\n" : "Existing source: duplicate skipped.\n");
  process.stdout.write(result.changed ? "Created note.\n" : "Duplicate skipped.\n");
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  main().catch(e => { console.error("Article receiver: " + e.message); process.exitCode = 1; });
