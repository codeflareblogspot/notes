# CodeFlare Notes

Mini blog Jekyll untuk rangkuman editorial teknologi, Blogger, SEO, dan panduan digital pilihan dari CodeFlare.

- Website (setelah GitHub Pages aktif): https://git.codeflare.net/
- Source: https://github.com/codeflareblogspot/notes

## Mengaktifkan GitHub Pages

Situs menggunakan workflow GitHub Actions di `.github/workflows/jekyll-pages.yml`. Untuk pengaturan domain, buka **Settings → Pages** dan gunakan sumber **GitHub Actions**. Custom domain saat ini: `git.codeflare.net`.

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

## Pedoman editorial untuk pitch

Pitch adalah catatan singkat yang tetap bermanfaat jika pembaca tidak mengklik sumber. Buat judul alami dan sudut pandang sendiri yang relevan dengan isi artikel; jangan menyalin artikel penuh, memutar sinonim, atau menyisipkan keyword berulang. Tunjukkan detail yang benar-benar ditemukan di sumber tanpa mengarang pengalaman pribadi, hasil uji, atau janji yang tidak terverifikasi.

Cantumkan satu tautan sumber yang wajar di tempat yang membantu pembaca menelusuri informasi lanjutan. Tidak perlu mengulang CTA, memaksa anchor text, atau memberi label SEO/backlink di badan artikel. Untuk tulisan lama, sebutkan keterbatasan waktu, kompatibilitas, atau ketersediaan jika relevan. Periksa agar URL sumber belum pernah mendapat pitch di repository ini sebelum membuat post baru.

Jangan menjadwalkan publikasi massal hanya untuk membangun backlink. Nilai pembaca lebih penting daripada jumlah post. Publikasi otomatis dari Composer memerlukan pemeriksaan editorial dan kontrol duplikasi tersendiri.

## Struktur

- `_config.yml`: konfigurasi Jekyll dan URL GitHub Pages
- `index.html`: beranda dinamis
- `_posts/`: tulisan Markdown
- `assets/css/codeflare.css`: gaya tampilan
- `about.md`: halaman tentang

Publikasi otomatis dari CodeFlare Composer belum diaktifkan; memerlukan integrasi terpisah.
