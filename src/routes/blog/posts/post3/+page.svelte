<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>How to Add a Logo to Your QR Code Without Breaking Scannability</title>
  <meta name="description" content="Yes, you can have a beautiful branded QR code with your logo in the center — if you follow these proven rules." />
  <meta property="og:title" content="How to Add a Logo to Your QR Code Without Breaking Scannability" />
  <meta property="og:description" content="Learn the exact settings to embed your logo safely using error correction, masking, and quiet zones." />
  <meta property="og:url" content="{base}/blog/posts/post3" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>How to Add a Logo Safely</p>
  </div>

  <article class="prose">
    <h1>How to Add a Logo to Your QR Code Without Breaking Scannability</h1>
    <p class="post-meta">Published: November 23, 2025</p>

    <p>Branded QR codes are powerful. A logo in the center increases trust, recall, and engagement. But done wrong, it destroys scannability.</p>

    <h2>The Golden Rules</h2>
    <ul>
      <li><strong>Use High Error Correction (Q or H)</strong> — Gives redundancy so damaged areas (like the center) can still be read</li>
      <li><strong>Keep Logo Under 20% of QR Area</strong> — 15% is ideal</li>
      <li><strong>Add a White Border Around Logo</strong> — Prevents dark logo edges from merging with data modules</li>
      <li><strong>Use Dot or Rounded Style</strong> — Less visual clash with logo</li>
      <li><strong>Test on Multiple Devices</strong> — iOS, Android, different lighting</li>
    </ul>

    <h2>Best Practices from This Tool</h2>
    <p>Our generator automatically applies safe masking and contrast rules. When you upload a logo:</p>
    <ul>
      <li>It’s scaled and centered perfectly</li>
      <li>Transparent background is preserved</li>
      <li>Contrast is checked against foreground color</li>
      <li>Error correction is recommended based on data size</li>
    </ul>

    <h2>FAQ</h2>
    <details>
      <summary>Will any logo work?</summary>
      <p>Simple, high-contrast logos work best. Avoid fine text or complex gradients.</p>
    </details>
    <details>
      <summary>Should I use a colored logo?</summary>
      <p>Only if it contrasts strongly with the QR foreground color.</p>
    </details>
    <details>
      <summary>Can I remove the logo later?</summary>
      <p>Yes — just clear the logo field and regenerate.</p>
    </details>

    <p class="italic-note">A branded QR code should say “this is official” — not “this might not scan”.</p>
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
