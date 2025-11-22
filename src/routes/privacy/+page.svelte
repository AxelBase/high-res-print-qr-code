<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy | High-Resolution Print QR Generator</title>
  <meta name="description" content="We collect zero data. Your QR content never leaves your device. Full privacy policy for this open-source, client-side QR generator." />
  <meta property="og:title" content="Privacy Policy" />
  <meta property="og:description" content="This tool runs 100% in your browser. No tracking, no servers, no data collection — ever." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a> <span>/</span> <p>Privacy Policy</p>
  </div>

  <article class="prose">
    <h1>Privacy Policy</h1>
    <p class="post-meta">Effective Date: November 23, 2025</p>

    <p>Welcome to the <strong>High-Resolution Print QR Generator</strong>, a fully <strong>client-side</strong>, open-source web tool created by AxelBase. We are deeply committed to your privacy. This policy explains exactly how your information (or lack thereof) is handled when you use our tool.</p>

    <h2>1. Zero Data Collection — By Design</h2>
    <p><strong>We do not collect, store, log, or transmit any data from your use of this tool.</strong> Everything happens directly in your browser. When you:</p>
    <ul>
      <li>Type a URL, vCard, Wi-Fi credentials, or any content</li>
      <li>Upload a logo image</li>
      <li>Customize colors, corners, or error correction</li>
      <li>Download PNG or SVG files</li>
    </ul>
    <p><em>All processing occurs locally on your device.</em> No information ever reaches our servers or any third party.</p>

    <h2>2. What This Means in Practice</h2>
    <p>Because the entire application runs client-side using JavaScript:</p>
    <ul>
      <li>No cookies are set</li>
      <li>No analytics, tracking pixels, or fingerprinting</li>
      <li>No IP addresses are logged</li>
      <li>No usage statistics are recorded</li>
      <li>Your QR content (even sensitive data like Wi-Fi passwords or vCards) never leaves your computer</li>
    </ul>

    <h2>3. Local Storage & Temporary Data</h2>
    <p>The tool may temporarily use your browser’s memory to hold your current input during active use. This data is automatically cleared when you close the tab or refresh the page. We do not use <code>localStorage</code> or <code>IndexedDB</code> to persist any information.</p>

    <h2>4. Third-Party Libraries</h2>
    <p>We use only trusted, open-source libraries (<code>qr-code-styling</code>, Bootstrap via CDN) loaded from reputable sources. These do not track users or send data back to us.</p>

    <h2>5. Downloads & Sharing</h2>
    <p>When you download a PNG or SVG file, it is generated directly in your browser and saved to your device. We have no access to the resulting file or its contents.</p>

    <h2>6. Children’s Privacy</h2>
    <p>This tool is suitable for all ages. Since no personal information is collected, we fully comply with COPPA and similar regulations by default.</p>

    <h2>7. Changes to This Policy</h2>
    <p>We may update this policy if new features are added. Any changes will be clearly dated at the top of this page.</p>

    <h2>8. Contact</h2>
    <p>Questions? Open an issue on our <a href="https://github.com/axelbase/high-res-print-qr-code" target="_blank" rel="noopener">GitHub repository</a>.</p>

    <p class="italic-note"><strong>Your privacy is not a feature — it’s the foundation.</strong> Use this tool with complete confidence, knowing nothing is watched, stored, or shared.</p>
  </article>
</div>

<style>
  .post-layout { max-width: 800px; padding: 2rem 1rem 4rem; margin: 0 auto; }
  .breadcrumbs { display: flex; align-items: center; gap: .5rem; margin-bottom: 1.5rem; font-size: .9rem; color: var(--text-secondary); }
  .breadcrumbs a { color: var(--accent-secondary); }
  .breadcrumbs a:hover { text-decoration: underline; }
  .prose { line-height: 1.8; }
  .prose .post-meta { color: var(--text-secondary); font-size: .9rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; }
  .prose h1, .prose h2 { color: var(--accent-secondary); }
  .prose h1 { font-size: 2.5rem; margin-bottom: .5rem; }
  .prose h2 { margin-top: 2.5rem; border-bottom: 1px solid var(--secondary-bg); padding-bottom: .5rem; }
  .prose ul { list-style-type: 'Checkmark '; padding-left: 1.5rem; }
  .prose ul li::marker { color: var(--accent-primary); }
  .prose .italic-note { font-style: italic; text-align: center; margin-top: 3rem; color: var(--text-secondary); font-size: 1.1rem; }
</style>