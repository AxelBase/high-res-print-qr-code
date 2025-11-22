<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Advanced Styling: Colored QR Codes That Actually Scan</title>
  <meta name="description" content="Create beautiful branded QR codes with colors, rounded corners, and logos—without sacrificing scannability." />
  <meta property="og:title" content="Advanced Styling: Colored QR Codes That Actually Scan" />
  <meta property="og:description" content="Pro tips for color contrast, corner styles, quiet zones, and error correction to make stunning QR codes that work every time." />
  <meta property="og:url" content="{base}/blog/posts/post6" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/blog">Blog</a> <span>/</span> <p>Advanced Styling</p>
  </div>

  <article class="prose">
    <h1>Advanced Styling: Colored QR Codes That Actually Scan</h1>
    <p class="post-meta">Published: November 23, 2025</p>

    <p>Gone are the days of boring black-and-white QR codes. Modern branding demands color, personality, and style—while still guaranteeing 100% scannability.</p>

    <h2>The Science of Scannable Colors</h2>
    <p>QR readers need strong contrast between foreground (data modules) and background. Follow these rules:</p>
    <ul>
      <li>Dark foreground on light background (or vice versa)</li>
      <li>Minimum contrast ratio: 4.5:1 (our built-in warning alerts you if lower)</li>
      <li>Avoid similar hues (e.g., blue on purple)</li>
      <li>Test in both color and grayscale—some phones use B&W cameras</li>
    </ul>

    <h2>Style Options Explained</h2>
    <ul>
      <li><strong>Square</strong> — Classic, works everywhere</li>
      <li><strong>Dot</strong> — Modern, friendly, great with logos</li>
      <li><strong>Rounded</strong> — Soft, elegant, perfect for luxury brands</li>
      <li><strong>Quiet Zone</strong> — Always keep at least 4 modules (our default)</li>
    </ul>

    <h2>Step-by-Step Branding Recipe</h2>
    <p>1. Choose brand colors<br>2. Set darker color as foreground<br>3. Use High (H) error correction<br>4. Pick Dot or Rounded corners<br>5. Add logo (15% max size)<br>6. Test on iPhone and Android in bright/low light</p>

    <h2>FAQ</h2>
    <details>
      <summary>Can I use light foreground on dark background?</summary>
      <p>Yes! Just ensure strong contrast (e.g., white on navy works perfectly).</p>
    </details>
    <details>
      <summary>Do rounded corners reduce scannability?</summary>
      <p>No—modern scanners handle them perfectly.</p>
    </details>
    <details>
      <summary>Should I add a white border in my design?</summary>
      <p>Yes! Extra white space around the QR code dramatically improves scan speed.</p>
    </details>

    <p class="italic-note">Beautiful QR codes get noticed. Scannable QR codes get results. You can have both.</p>
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
