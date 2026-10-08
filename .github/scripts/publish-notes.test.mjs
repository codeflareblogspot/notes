import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { canonicalUrl, prepare, publish } from "./publish-notes.mjs";

const source = "https://www.codeflare.net/2021/08/10-template-blogspot-premium-seo.html";
const body = [
  "Tema Blogger yang terlihat rapi pada halaman depan belum tentu nyaman dibaca di ponsel.",
  "Sebelum mengganti template, ada baiknya membuka sebuah artikel panjang dan melihat bagaimana navigasi serta ukuran teks bekerja.",
  "Sidebar, iklan dan widget juga bisa memengaruhi fokus pembaca jika posisinya terlalu dekat dengan isi tulisan.",
  "Periksa pula apakah tema masih dirawat pengembangnya, sebab fitur yang berjalan beberapa tahun lalu belum tentu sesuai dengan versi Blogger sekarang.",
  "Desain yang sederhana tetapi jelas sering kali lebih berguna daripada efek visual yang ramai.",
  "Pilihan terbaik tetap bergantung pada jenis konten dan kebutuhan pengunjung situs."
].join(" ");
const input = { approved: true, source_status: "live", source_url: source, title: "Memilih desain Blogger", category: "Blogger", body };
const time = new Date("2026-10-09T00:00:00Z");

test("canonicalizes UTM parameters", () => {
  assert.equal(canonicalUrl(source + "?utm_source=social#top"), source);
});
test("rejects unapproved or draft source", () => {
  assert.throws(() => prepare({ ...input, approved: false }), /Approved live/);
  assert.throws(() => prepare({ ...input, source_status: "draft" }), /Approved live/);
});
test("rejects public chat/process leakage", () => {
  assert.throws(() => prepare({ ...input, body: body + " Strategi distribusi ChatGPT." }), /Internal/);
  assert.throws(() => prepare({ ...input, body: body + " {{ site.posts }}" }), /Unsafe/);
});
test("generates canonical public metadata without source IDs", () => {
  const result = prepare(input, time);
  assert.match(result.path, /^_posts\/2026-10-09-/);
  assert.match(result.markdown, /source_url: "https:\/\/www.codeflare.net/);
  assert.doesNotMatch(result.markdown, /source_post_id|chatgpt|backlink/i);
});
test("skips duplicate source even when title and UTM change", () => {
  const root = mkdtempSync(join(tmpdir(), "codeflare-notes-"));
  try {
    const a = publish(input, root, time);
    const b = publish({ ...input, title: "Judul lain", source_url: source + "?utm_medium=share" }, root, time);
    assert.equal(a.changed, true);
    assert.equal(b.changed, false);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
