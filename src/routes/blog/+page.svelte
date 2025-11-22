<!-- src/routes/blog/+page.svelte -->
<script lang="ts">
  import { base } from '$app/paths';

  const posts = [
    {
      href: '/blog/posts/post1',
      title: 'Why High-Resolution QR Codes Matter for Print',
      description: 'Discover why standard online QR generators fail for professional printing — and how this tool delivers true 4K & 300 DPI output.'
    },
    {
      href: '/blog/posts/post2',
      title: 'From Business Cards to Billboards: When to Use 4K QR Codes',
      description: 'Learn the real-world use cases where pixel-perfect, print-ready QR codes make the difference between success and scan failure.'
    },
    {
      href: '/blog/posts/post3',
      title: 'How to Add a Logo to Your QR Code Without Breaking Scannability',
      description: 'Step-by-step guide to embedding logos safely using error correction and proper masking — with live examples.'
    },
    {
      href: '/blog/posts/post4',
      title: 'SVG vs PNG: Which Format Should You Use for Print QR Codes?',
      description: 'Deep dive into vector vs raster: when to use infinitely scalable SVG and when high-DPI PNG is the better choice.'
    },
    {
      href: '/blog/posts/post5',
      title: 'The Hidden Cost of Free QR Generators',
      description: 'Watermarks, low resolution, tracking — why "free" tools cost you professionalism and scan reliability.'
    },
    {
      href: '/blog/posts/post6',
      title: 'Advanced Styling: Colored QR Codes That Actually Scan',
      description: 'Pro tips on color contrast, corner styles, and quiet zones to create beautiful, scannable branded QR codes.'
    },
    {
      href: '/blog/posts/post7',
      title: 'Beyond URLs: 7 Powerful Use Cases for Print QR Codes',
      description: 'vCards, Wi-Fi login, geo locations, events — this multi-purpose generator supports them all with print perfection.'
    }
  ];
</script>

<svelte:head>
  <title>Blog | High-Resolution Print QR Generator</title>
  <meta name="description" content="Learn how to create professional, scannable, print-ready QR codes. Tutorials, best practices, and advanced techniques for designers and marketers." />
</svelte:head>

<div class="container fade-in blog-index py-5">
  <header class="blog-header text-center mb-5">
    <h1 class="display-4 fw-bold">
      Blog: Print-Ready QR Insights
    </h1>
    <p class="subtitle lead text-muted col-lg-8 mx-auto">
      This isn’t just another QR generator — it’s a <strong>multi-purpose, professional print tool</strong> used by designers, marketers, event organizers, and businesses worldwide to create flawless, high-resolution QR codes that <em>always scan</em> — from business cards to 4×6 ft banners.
    </p>
    <p class="mt-3">
      <a href="https://github.com/axelbase/high-res-print-qr-code" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary">
        View on GitHub
      </a>
    </p>
  </header>

  <div class="posts-grid">
    {#each posts as post}
      <a href="{base}{post.href}" class="card post-card h-100 text-decoration-none shadow-sm hover-shadow">
        <div class="card-body d-flex flex-column">
          <h2 class="post-title h5 fw-bold text-dark mb-3">{post.title}</h2>
          <p class="post-description text-muted flex-grow-1 small">{post.description}</p>
          <span class="read-more text-primary fw-semibold mt-3">
            Read Article →
          </span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .blog-index {
    min-height: 100vh;
  }

  .blog-header {
    padding: 4rem 0;
    background: linear-gradient(to bottom, transparent 0%, var(--bs-light) 100%);
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .post-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border: none;
    border-radius: 12px;
    overflow: hidden;
    background: white;
  }

  .post-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
  }

  .post-card:hover .read-more {
    transform: translateX(8px);
  }

  .read-more {
    transition: transform 0.2s ease;
  }

  .hover-shadow {
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  }

  @media (max-width: 576px) {
    .posts-grid {
      grid-template-columns: 1fr;
    }
    .blog-header {
      padding: 3rem 0;
    }
  }
</style>