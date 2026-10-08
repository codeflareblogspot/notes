# CodeFlare Notes

Mini blog Jekyll untuk rangkuman editorial teknologi, Blogger, SEO, dan panduan digital pilihan dari CodeFlare.

- Website (setelah GitHub Pages aktif): https://codeflareblogspot.github.io/notes/
- Source: https://github.com/codeflareblogspot/notes

## Mengaktifkan GitHub Pages

Di repository GitHub buka **Settings → Pages**, pilih **Deploy from a branch**, branch **main**, folder **/(root)**, lalu **Save**. GitHub Pages akan membangun Jekyll secara otomatis.

## Menulis artikel

Tambahkan file bernama `_posts/YYYY-MM-DD-judul.md` dengan front matter seperti:

```yaml
---
layout: post
title: "Judul ringkasan"
date: 2026-10-08 22:00:00 +0800
categories: [Blogger, SEO]
description: "Deskripsi singkat."
---
```

Berikan ringkasan editorial yang bermanfaat dan tautan sumber kontekstual. Jangan menyalin artikel utuh atau membuat publikasi massal hanya untuk memperoleh backlink.

## Struktur

- `_config.yml`: konfigurasi Jekyll dan URL GitHub Pages
- `index.html`: beranda dinamis
- `_posts/`: tulisan Markdown
- `assets/css/codeflare.css`: gaya tampilan
- `about.md`: halaman tentang

Publikasi otomatis dari CodeFlare Composer belum diaktifkan; memerlukan integrasi terpisah.
