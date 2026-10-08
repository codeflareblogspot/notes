# CodeFlare Notes

Website: https://git.codeflare.net/

CodeFlare Notes is a Jekyll site about Blogger, web design, and digital tools, hosted on GitHub Pages.

## Project structure

- `_config.yml` — Jekyll site settings
- `index.html` — homepage
- `_posts/` — Markdown posts
- `archive.md` — topic and date archives
- `about.md` — site information
- `assets/css/codeflare.css` — site styling
- `.github/workflows/jekyll-pages.yml` — GitHub Pages deployment

## Deployment

GitHub Pages is configured to deploy from GitHub Actions. The custom domain is `git.codeflare.net`, stored in the `CNAME` file and configured in the repository's Pages settings.

Website content is built from Markdown and Liquid templates by Jekyll.
