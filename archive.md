---
layout: page
title: Arsip tulisan
permalink: /archive/
description: "Arsip catatan CodeFlare Notes berdasarkan topik dan tanggal."
---
<link rel="stylesheet" href="{{ '/assets/css/codeflare.css' | relative_url }}">
<p class="cf-archive-intro">Semua tulisan yang pernah dimuat di CodeFlare Notes, diurutkan dari yang terbaru. Pilih topik untuk langsung menuju catatan yang relevan.</p>

{% assign groups = site.categories | sort %}
{% if groups.size > 0 %}
<nav class="cf-archive-topics" aria-label="Pilih topik">
  {% for group in groups %}
    <a href="#{{ group[0] | slugify }}">{{ group[0] | escape }}</a>
  {% endfor %}
</nav>
{% endif %}

<section class="cf-archive-section" aria-labelledby="arsip-semua">
  <h2 id="arsip-semua">Semua catatan</h2>
  {% for post in site.posts %}
    <div class="cf-archive-item">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d %b %Y" }}</time>
      <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
    </div>
  {% else %}
    <p>Belum ada tulisan.</p>
  {% endfor %}
</section>

{% for group in groups %}
<section class="cf-archive-section" id="{{ group[0] | slugify }}" aria-label="Topik {{ group[0] | escape }}">
  <h2>{{ group[0] | escape }}</h2>
  {% for post in group[1] %}
    <div class="cf-archive-item">
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d %b %Y" }}</time>
      <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
    </div>
  {% endfor %}
</section>
{% endfor %}
