---
layout: default
title: "Fireside Chat"
---
<section class="library-shell" aria-label="Library archive">
  <header class="library-intro">
    <h2>Current Discussions</h2>
    <p>Browse inquiries by logic — dialectical, distilled, or raw transcript.</p>

    <div class="library-controls">
      <label for="logic-search" class="sr-only">Search by topic</label>
      <input id="logic-search" type="search" placeholder="Search reflections..." />

      <label for="logic-filter" class="sr-only">Filter by inquiry mode</label>
      <select id="logic-filter">
        <option value="all">All modes</option>
        <option value="Dialectical">Dialectical</option>
        <option value="Distilled">Distilled</option>
        <option value="Raw Transcript">Raw Transcript</option>
      </select>
    </div>
  </header>

  <section class="library-grid" id="library-grid">
    {% for post in site.posts %}
      {% assign words = post.content | strip_html | number_of_words %}
      {% assign reading_time = words | divided_by: 180 | plus: 1 %}
      <article class="library-card" data-mode="{{ post.inquiry_mode | default: 'Distilled' }}" data-search="{{ post.title | downcase }} {{ post.subtitle | downcase }} {{ post.content | strip_html | truncate: 260 | downcase }}">
        <p class="card-meta">🔥 {{ post.date | date: "%B %d, %Y" }} · {{ reading_time }} min.</p>
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <p class="card-mode">{{ post.inquiry_mode | default: "Distilled" }}</p>
        <p>{{ post.excerpt | strip_html | truncate: 280 }}</p>
        <p><a class="read-link" href="{{ post.url | relative_url }}">Read post</a></p>
      </article>
    {% endfor %}
  </section>
</section>

<script src="{{ '/assets/js/library-filter.js' | relative_url }}" defer></script>
