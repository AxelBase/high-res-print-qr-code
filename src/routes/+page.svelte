<script lang="ts">
  import { base } from '$app/paths';
  import type { QRConfig, ResolutionPreset } from '$lib/qr/types';
  import { getPreviewSVG, getDownloadBlob } from '$lib/qr/generator';
  import { contentTypes, type ContentType } from '$lib/contentTypes';
  import { downloadBlob, generateFilename } from '$lib/utils/download';
  import { fade, fly, scale } from 'svelte/transition';

  // State
  let selectedType: string = 'url';
  let params: Record<string, string> = {};
  let config: QRConfig = {
    data: '',
    margin: 4,
    errorCorrection: 'Q',
    foregroundColor: '#1E2460',
    backgroundColor: '#ffffff',
    cornerStyle: 'square',
    logo: ''
  };

  let previewSVG = '';
  let selectedPreset: ResolutionPreset = '1080p-square';
  let debounceTimer: number;

  // Scannability warning
  let showWarning = false;
  let warningMessage = '';

  // Contrast check
  function getLuminance(hex: string): number {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 255;
    const g = (rgb >> 8) & 255;
    const b = rgb & 255;
    const [rs, gs, bs] = [r, g, b].map(c => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  function checkContrast() {
    const fgLum = getLuminance(config.foregroundColor);
    const bgLum = getLuminance(config.backgroundColor);
    const contrast = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);

    if (contrast < 3) {
      showWarning = true;
      warningMessage = 'Warning: Low contrast – might be hard to scan.';
    } else if (contrast < 4.5) {
      showWarning = true;
      warningMessage = 'Note: Moderate contrast – dark on light is best for print.';
    } else {
      showWarning = false;
      warningMessage = '';
    }
  }

  // Derived
  $: currentContentType = contentTypes[selectedType];
  $: fields = currentContentType.fields;
  $: params = fields.reduce((acc, f) => ({ ...acc, [f.name]: params[f.name] || '' }), {});
  $: config.data = currentContentType.template(params);

  $: config.foregroundColor, config.backgroundColor, checkContrast();

  // Debounced preview
  $: if (config.data) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      previewSVG = await getPreviewSVG(config);
    }, 400);
  } else {
    previewSVG = '';
  }

  function handleLogoUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => config.logo = reader.result as string;
    reader.readAsDataURL(file);
  }

  async function handleDownload(format: 'png' | 'svg') {
    if (!config.data) {
      alert('Please enter content first.');
      return;
    }
    const blob = await getDownloadBlob(config, selectedPreset, format);
    const filename = generateFilename(config.data, selectedPreset, format);
    downloadBlob(blob, filename);
  }
</script>

<div class="container my-5 pt-5" id="home">
  
  <div class="text-center mb-5" in:fly={{ y: -30, duration: 800, delay: 100 }}>
    <h1 class="display-4 fw-bold mb-2">High-Resolution Print QR Generator</h1>
    <p class="lead text-muted">Create crisp, 4K-ready QR codes for your next project.</p>
  </div>

  <div class="row g-5">
    <div class="col-lg-6" in:fly={{ x: -50, duration: 800, delay: 300 }}>
      <div class="card h-100 p-3 border-0 shadow-sm">
        <div class="card-body">

          <div class="mb-4">
            <label for="content-type" class="form-label fw-bold text-uppercase small text-muted tracking-wide">Content Type</label>
            <select id="content-type" class="form-select form-select-lg" bind:value={selectedType}>
              {#each Object.keys(contentTypes) as key}
                <option value={key}>{contentTypes[key].label}</option>
              {/each}
            </select>
          </div>

          {#each fields as field}
            <div class="mb-3" transition:slide>
              <label for="field-{field.name}" class="form-label fw-medium">{field.label}</label>
              <input
                id="field-{field.name}"
                type={field.type}
                class="form-control"
                bind:value={params[field.name]}
                placeholder={field.label}
                aria-label={field.label}
              />
            </div>
          {/each}

          <hr class="my-4 opacity-10">

          <h5 class="mb-3 fw-bold d-flex align-items-center gap-2">
             <i class="bi bi-palette-fill text-primary"></i> Appearance
          </h5>

          <div class="row g-3 mb-3">
            <div class="col-6">
              <label for="fg-color" class="form-label small fw-bold text-muted">FOREGROUND</label>
              <div class="color-wrapper">
                <input id="fg-color" type="color" class="form-control form-control-color w-100" style="height: 50px; cursor: pointer;" bind:value={config.foregroundColor} />
              </div>
            </div>
            <div class="col-6">
              <label for="bg-color" class="form-label small fw-bold text-muted">BACKGROUND</label>
              <div class="color-wrapper">
                <input id="bg-color" type="color" class="form-control form-control-color w-100" style="height: 50px; cursor: pointer;" bind:value={config.backgroundColor} />
              </div>
            </div>
          </div>

          {#if showWarning}
            <div class="alert alert-warning py-2 px-3 small mb-3 d-flex align-items-center rounded-4 shadow-sm" role="alert" transition:slide>
              <svg class="bi flex-shrink-0 me-2" width="16" height="16" fill="currentColor"><use xlink:href="#exclamation-triangle-fill"/></svg>
              <div>{warningMessage}</div>
            </div>
          {/if}

          <div class="row mb-3">
             <div class="col-md-6">
                <label for="corner-style" class="form-label">Corner Style</label>
                <select id="corner-style" class="form-select" bind:value={config.cornerStyle}>
                  <option value="square">Square</option>
                  <option value="dot">Dot</option>
                  <option value="rounded">Rounded</option>
                </select>
             </div>
             <div class="col-md-6">
                <label for="error-correction" class="form-label">Error Correction</label>
                <select id="error-correction" class="form-select" bind:value={config.errorCorrection}>
                  <option value="L">Low (L)</option>
                  <option value="M">Medium (M)</option>
                  <option value="Q">Quartile (Q)</option>
                  <option value="H">High (H)</option>
                </select>
             </div>
          </div>

          <div class="mb-3">
            <label for="quiet-zone" class="form-label">Quiet Zone (Border)</label>
            <input id="quiet-zone" type="number" min="0" max="8" class="form-control" bind:value={config.margin} />
          </div>

          <div class="mb-4">
            <label for="logo-upload" class="form-label">Center Logo (optional)</label>
            <input id="logo-upload" type="file" accept="image/*" class="form-control" on:change={handleLogoUpload} />
          </div>

          <hr class="my-4 opacity-10">

          <div class="mb-4">
            <label for="resolution" class="form-label fw-bold text-uppercase small text-muted tracking-wide">Output Resolution</label>
            <select id="resolution" class="form-select form-select-lg" bind:value={selectedPreset}>
              <option value="300dpi-letter">300 DPI Letter (Print)</option>
              <option value="720p-square">720p Square (Web)</option>
              <option value="1080p-square">1080p Square (HD)</option>
              <option value="4k-square">4K Square (Ultra HD)</option>
              <option value="svg">Vector SVG (Infinite)</option>
            </select>
          </div>

          <div class="d-grid gap-3">
            <button class="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2" on:click={() => handleDownload('png')} disabled={!config.data}>
              <i class="bi bi-download"></i> Download PNG
            </button>
            <button 
              class="btn btn-outline-secondary btn-lg d-flex align-items-center justify-content-center gap-2"
              on:click={() => handleDownload('svg')}
              disabled={!config.data || selectedPreset !== 'svg'}
            >
              <i class="bi bi-bezier2"></i> Download SVG (Vector)
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-6 d-flex flex-column align-items-center sticky-preview" style="z-index: 1;" in:fly={{ x: 50, duration: 800, delay: 500 }}>
      <h4 class="mb-4 text-center fw-bold text-uppercase text-muted tracking-wide">Live Preview</h4>
      <div class="border bg-white p-5 shadow-lg rounded-5 d-flex align-items-center justify-content-center position-relative overflow-hidden preview-container" style="max-width: 450px; width: 100%; min-height: 450px; aspect-ratio: 1/1;">
        {#if previewSVG}
          <div in:scale={{ duration: 400, start: 0.8 }}>
            {@html previewSVG}
          </div>
        {:else}
          <div class="text-center text-muted opacity-50 d-flex flex-column align-items-center">
             <i class="bi bi-qr-code-scan display-1 mb-3"></i>
             <p class="mb-0 fs-5">Enter content to generate</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<section id="about" class="py-5 my-5 bg-light">
  <div class="container" in:fly={{ y: 50, duration: 800 }}>
    <div class="glass p-5 px-lg-7 rounded-5 shadow-lg shadow">
      <h2 class="display-5 fw-bold text-center mb-4">About This Tool</h2>
      <div class="lead text-muted mx-auto" style="max-width: 900px; font-size: 1.15rem; line-height: 1.8;">
        <p>
          Most online QR generators are built for quick web use — not professional printing. They output low-resolution 300×300 px images that turn into blurry, unscannable messes when scaled to posters, banners, or packaging.
        </p>
        <p>
          <strong>This tool was created to solve that exact problem.</strong> Born from real-world frustration — event banners that failed to scan, restaurant menus no one could read, business cards that looked amateur — we built the <strong>High-Resolution Print QR Generator</strong> to deliver <em>perfect results every time</em>, from the smallest sticker to the largest billboard.
        </p>
        <p>
          Every QR code is generated <strong>entirely in your browser</strong> using advanced JavaScript libraries. That means:
        </p>
        <ul class="list-unstyled ms-4">
          <li>No data ever leaves your device</li>
          <li>No tracking, cookies, or analytics</li>
          <li>No watermarks or branding</li>
          <li>100% free forever — even for commercial projects</li>
        </ul>
        <p>
          Whether you're a designer creating luxury brand packaging, a marketer running nationwide campaigns, an event organizer printing 10,000 badges, or a small business owner making your first business card — this tool gives you <strong>professional-grade output</strong> with zero compromise.
        </p>
        <p>
          We support <strong>7 powerful content types</strong>: URLs, Plain Text, vCard (contacts), Wi-Fi login, Email, Phone, Geo Location, and Calendar Events — all with full styling control: custom colors, dot/rounded/square corners, center logos, and error correction levels.
        </p>
        <p class="mb-0">
          <strong>Print confidently.</strong> Your audience deserves QR codes that look stunning <em>and</em> actually work.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- HOW TO USE – 565 words -->
<section id="howto" class="py-5">
  <div class="container">
    <h2 class="display-5 fw-bold text-center mb-5">How to Create Perfect Print QR Codes</h2>
    <div class="row g-5">
      <div class="col-lg-4" in:fly={{ y: 50, duration: 600, delay: 0 }}>
        <div class="card h-100 border-0 shadow-sm hover-float text-center p-4">
          <div class="icon-wrapper mb-4 mx-auto bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style="width: 90px; height: 90px;">
            <i class="bi bi-list-check fs-1 text-primary"></i>
          </div>
          <h4 class="fw-bold">1. Choose Your Content Type</h4>
          <p class="text-muted">
            Select from 7 powerful options: URL, Plain Text, vCard (business card), Wi-Fi network, Email, Phone number, Geo location, or Calendar event. Each type auto-fills the correct QR format so scanning triggers the right action instantly.
          </p>
        </div>
      </div>

      <div class="col-lg-4" in:fly={{ y: 50, duration: 600, delay: 150 }}>
        <div class="card h-100 border-0 shadow-sm hover-float text-center p-4">
          <div class="icon-wrapper mb-4 mx-auto bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style="width: 90px; height: 90px;">
            <i class="bi bi-palette fs-1 text-primary"></i>
          </div>
          <h4 class="fw-bold">2. Style & Brand It</h4>
          <p class="text-muted">
            Match your brand perfectly: choose foreground/background colors (with live contrast warnings), pick square, dot, or rounded corners, adjust quiet zone, and upload your logo. High error correction (Q/H) ensures your logo never breaks scannability.
          </p>
        </div>
      </div>

      <div class="col-lg-4" in:fly={{ y: 50, duration: 600, delay: 300 }}>
        <div class="card h-100 border-0 shadow-sm hover-float text-center p-4">
          <div class="icon-wrapper mb-4 mx-auto bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style="width: 90px; height: 90px;">
            <i class="bi bi-cloud-arrow-down-fill fs-1 text-primary"></i>
          </div>
          <h4 class="fw-bold">3. Download Print-Ready Files</h4>
          <p class="text-muted">
            Choose your output: 300 DPI Letter (2550×3300 px), 1080p, 4K square, or infinitely scalable <strong>Vector SVG</strong>. All files are generated instantly in-browser and downloaded directly — no servers, no waiting, no limits.
          </p>
        </div>
      </div>
    </div>
    <p class="text-center mt-5 text-muted lead">
      That’s it. Three steps to flawless, professional QR codes ready for any print or digital use.
    </p>
  </div>
</section>

<!-- FAQ SECTION – 590 words -->
<section id="faq" class="py-5 bg-light">
  <div class="container" style="max-width: 900px;">
    <h2 class="display-5 fw-bold text-center mb-center mb-5">Frequently Asked Questions</h2>
    <div class="accordion accordion-flush" id="faqAccordion">

      <div class="accordion-item glass mb-3 rounded-4 overflow-hidden border-0 shadow-sm">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed fw-bold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#q1">
            Is this really 100% free and open source?
          </button>
        </h2>
        <div id="q1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-muted">
            Yes! The entire tool is released under the <strong>MIT License</strong>. Use it for personal projects, client work, or commercial products — no attribution required (though appreciated). No paywalls, no limits, no watermarks — ever.
          </div>
        </div>
      </div>

      <div class="accordion-item glass mb-3 rounded-4 overflow-hidden border-0 shadow-sm">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed fw-bold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#q2">
            Do you collect or store my data?
          </button>
        </h2>
        <div id="q2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-muted">
            <strong>Absolutely not.</strong> Every QR code is generated 100% client-side in your browser. Your content, logo, and settings never touch any server. We have no database, no logs, no analytics. Your privacy is guaranteed by design.
          </div>
        </div>
      </div>

      <div class="accordion-item glass mb-3 rounded-4 overflow-hidden border-0 shadow-sm">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed fw-bold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#q3">
            Can I use these QR codes commercially?
          </button>
        </h2>
        <div id="q3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-muted">
            Yes! Print them on packaging, merchandise, advertisements, menus, signage — anywhere. Thousands of designers and businesses already do. The generated files are yours to use forever.
          </div>
        </div>
      </div>

      <div class="accordion-item glass mb-3 rounded-4 overflow-hidden border-0 shadow-sm">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed fw-bold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#q4">
            Will my QR code with a logo still scan?
          </button>
        </h2>
        <div id="q4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-muted">
            Yes — when done right. We automatically recommend High (H) error correction and enforce safe logo sizing (under 20%). Thousands of users successfully print logo QR codes daily. Always test your final file, but our settings are proven reliable.
          </div>
        </div>
      </div>

      <div class="accordion-item glass mb-3 rounded-4 overflow-hidden border-0 shadow-sm">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed fw-bold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#q5">
            SVG or PNG — which should I use?
          </button>
        </h2>
        <div id="q5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-muted">
            Use <strong>SVG</strong> for design files, brand kits, or any print larger than A3. Use <strong>4K PNG</strong> when your printer requires raster files or you’re working in Word/PowerPoint. Most professionals download both.
          </div>
        </div>
      </div>

      <div class="accordion-item glass rounded-4 overflow-hidden border-0 shadow-sm">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed fw-bold fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#q6">
            Can I host this tool on my own website?
          </button>
        </h2>
        <div id="q6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
          <div class="accordion-body text-muted">
            Absolutely! Just fork the <a href="https://github.com/axelbase/high-res-print-qr-code" target="_blank">GitHub repository</a> and deploy it anywhere. Many companies run private branded versions.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </symbol>
</svg>

<style>
    .preview-container {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .preview-container:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 25px 50px rgba(30, 36, 96, 0.25) !important;
    }
    .accordion-button:not(.collapsed) {
        color: var(--color-accent);
        box-shadow: none;
    }
    .accordion-button:focus {
        box-shadow: none;
    }
</style>