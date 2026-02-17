---
layout: default
title: "Fireside Chat"
---
<section class="front-page">
  <h2>Latest Edition</h2>
  {% assign latest = site.posts | first %}
  {% if latest %}
    <article class="lead-story">
      <p class="lead-date">{{ latest.date | date: "%B %d, %Y" }}</p>
      <h3><a href="{{ latest.url | relative_url }}">{{ latest.title }}</a></h3>
      {% if latest.subtitle %}<p>{{ latest.subtitle }}</p>{% endif %}
      <p>{{ latest.excerpt | strip_html | truncate: 300 }}</p>
      <p><a href="{{ latest.url | relative_url }}">Continue reading →</a></p>
    </article>
  {% endif %}

  <h2>Archive</h2>
  <ul class="archive-list">
    {% for post in site.posts %}
      <li>
        <span>{{ post.date | date: "%Y-%m-%d" }}</span>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      </li>
    {% endfor %}
  </ul>
</section>
