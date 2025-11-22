<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>From Business Cards to Billboards: When to Use 4K QR Codes</title>
  <meta name="description" content="Not sure which resolution to pick? This guide shows exactly when to use 720p, 1080p, 4K, or SVG for perfect print results." />
  <meta property="og:title" content="From Business Cards to Billboards: When to Use 4K QR Codes" />
  <meta property="og:description" content="Choose the right resolution for your print project — from small business cards to massive outdoor banners." />
  <meta property="og:url" content="{base}/blog/posts/post2" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>From Business Cards to Billboards</p>
  </div>

  <article class="prose">
    <h1>From Business Cards to Billboards: When to Use 4K QR Codes</h1>
    <p class="post-meta">Published: November 23, 2025</p>

    <p>One size does <em>not</em> fit all when it comes to print QR codes. Choosing the wrong resolution can mean the difference between a flawless scan and a frustrated user.</p>

    <h2>Resolution Guide by Print Size</h2>
    <ul>
      <li><strong>Business Cards & Stickers</strong> → <strong>1080p Square (3240×3240 px)</strong><br>Plenty of detail, sharp corners, scans instantly even under phone flash.</li>
      <li><strong>Flyers, Brochures, Menus</strong> → <strong>300 DPI Letter or 1080p Square</strong><br>Perfect balance of file size and print clarity.</li>
      <li><strong>Posters (A3 to A1)</strong> → <strong>4K Square (4320×4320 px)</strong><br>Guarantees crisp modules even when viewed up close.</li>
      <li><strong>Banners, Billboards, Vehicle Wraps</strong> → <strong>4K or SVG</strong><br>Only SVG is truly future-proof for massive formats.</li>
    </ul>

    <h2>Pro Tip: Use SVG Whenever Possible</h2>
    <p>Vector SVG files are under 15 KB, scale infinitely, and print with perfect precision at any size. Use SVG for:</p>
    <ul>
      <li>Brand guidelines</li>
      <li>Packaging design</li>
      <li>Signage that might be reprinted at different sizes</li>
      <li>When file size matters (e.g. email attachments)</li>
    </ul>

    <h2>Real Example: Event Banner Fail</h2>
    <p>A tech conference printed a 3×6 ft banner with a 600×600 px QR code. From 10 feet away: looked fine. From 3 feet: pixelated mess. Result? Only 12% scan rate. After switching to 4K: 89% success.</p>

    <h2>FAQ</h2>
    <details>
      <summary>Can I use 720p for posters?</summary>
      <p>Only for small posters viewed from a distance. For anything people walk up to, use 1080p or higher.</p>
    </details>
    <details>
      <summary>Is file size a problem with 4K PNGs?</summary>
      <p>They’re 1–3 MB — acceptable for print production. SVG is always smaller.</p>
    </details>

    <p class="italic-note">Match resolution to viewing distance. The closer people get, the higher resolution you need.</p>
  </article>
</div>

<style>
  .post-layout {
    max-width: 800px;
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  .breadcrumbs a {
    color: var(--accent-secondary);
  }
  .breadcrumbs a:hover {
    text-decoration: underline;
  }
  .breadcrumbs p {
    margin: 0;
  }

  .prose {
    line-height: 1.8;
  }

  .prose .post-meta {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1rem;
  }

  .prose h1, .prose h2{
    color: var(--accent-secondary);
  }

  .prose h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .prose h2 {
    margin-top: 2.5rem;
    border-bottom: 1px solid var(--secondary-bg);
    padding-bottom: 0.5rem;
  }
  
  .prose p {
    color: var(--text-primary);
  }

  .prose ul {
    list-style-type: '→ ';
    padding-left: 1.5rem;
    color: var(--text-primary);
  }
  .prose ul li::marker {
    color: var(--accent-primary);
  }
  .prose ul li {
    padding-left: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .prose details {
    background: var(--secondary-bg);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 1rem;
    margin-bottom: 1rem;
    transition: background-color 0.2s ease;
  }
  
  .prose details[open] {
    background-color: var(--card-bg);
  }

  .prose summary {
    cursor: pointer;
    font-weight: 600;
    color: var(--accent-secondary);
    list-style: none;
  }
  
  .prose summary::-webkit-details-marker {
    display: none;
  }
  
  .prose summary::before {
    content: '+';
    margin-right: 0.75rem;
    color: var(--accent-primary);
    font-weight: bold;
    display: inline-block;
    transition: transform 0.2s ease;
  }

  .prose details[open] summary::before {
    transform: rotate(45deg);
  }
  
  .prose details p {
    margin-top: 1rem;
    padding-left: 1.5rem;
    border-left: 2px solid var(--accent-primary);
    color: var(--text-secondary);
  }

  .prose .italic-note {
    font-style: italic;
    color: var(--text-secondary);
    text-align: center;
    margin-top: 3rem;
  }
</style>
