<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms & Conditions | High-Resolution Print QR Generator</title>
  <meta name="description" content="Terms of use for this free, open-source, client-side QR code generator. Unlimited commercial use allowed." />
  <meta property="og:title" content="Terms & Conditions" />
  <meta property="og:description" content="Free for personal and commercial use. No attribution required. MIT licensed." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a> <span>/</span> <p>Terms & Conditions</p>
  </div>

  <article class="prose">
    <h1>Terms & Conditions</h1>
    <p class="post-meta">Last Updated: November 23, 2025</p>

    <p>By using the <strong>High-Resolution Print QR Generator</strong> (“the tool”), you agree to these Terms & Conditions. This is a free, open-source project released under the <strong>MIT License</strong>.</p>

    <h2>1. Use of the Tool</h2>
    <p>You may use this tool for <strong>any purpose</strong> — personal, educational, or commercial — including:</p>
    <ul>
      <li>Generating QR codes for business cards, posters, packaging, signage, and digital media</li>
      <li>Creating branded QR codes with logos and custom colors</li>
      <li>Distributing generated QR codes in print or digital form</li>
      <li>Using the tool in client projects or commercial products</li>
    </ul>
    <p><strong>No attribution is required</strong>, though always appreciated.</p>

    <h2>2. License</h2>
    <p>The source code is licensed under the <strong>MIT License</strong>. You are free to:</p>
    <ul>
      <li>Use, copy, modify, and distribute the tool and generated QR codes</li>
      <li>Use commercially without payment or permission</li>
      <li>Fork and host your own version</li>
    </ul>

    <h2>3. No Warranty</h2>
    <p>This tool is provided <strong>“as is”</strong> without warranty of any kind. While we strive for accuracy and reliability:</p>
    <ul>
      <li>We do not guarantee 100% scannability in all lighting conditions or with all devices</li>
      <li>You are responsible for testing generated QR codes before mass printing</li>
      <li>We are not liable for any damages resulting from use or inability to use the tool</li>
    </ul>

    <h2>4. Responsibility for Content</h2>
    <p>You are solely responsible for the content encoded in your QR codes (URLs, contact info, Wi-Fi credentials, etc.). Do not use this tool to create malicious, illegal, or harmful QR codes.</p>

    <h2>5. Limitation of Liability</h2>
    <p>In no event shall the developers or contributors be liable for any direct, indirect, incidental, or consequential damages arising from the use of this tool.</p>

    <h2>6. Changes to Terms</h2>
    <p>We may update these terms at any time. Continued use after changes constitutes acceptance of the new terms.</p>

    <h2>7. Governing Law</h2>
    <p>These terms are governed by the laws of open-source goodwill and common sense.</p>

    <p class="italic-note"><strong>Freedom, transparency, and quality — without compromise.</strong> Use this tool confidently for any project, forever.</p>
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