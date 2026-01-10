<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';

  // --- Theme Toggle Logic ---
  let isDarkMode = false;

  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDarkMode = savedTheme === 'dark';
    } else {
      isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    updateTheme();
  });

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    updateTheme();
  }

  function updateTheme() {
    const theme = isDarkMode ? 'dark' : 'light';
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // --- Buy Me A Coffee + Bitcoin Dropdown ---
  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  const currentYear = new Date().getFullYear();
</script>

<header class="fixed-top p-3 w-100" style="pointer-events: none; z-index: 1040;">
  <nav class="container glass rounded-pill px-4 py-2 d-flex justify-content-between align-items-center"
       style="pointer-events: auto; max-width: 1200px; transition: all 0.3s ease;">

    <div class="d-flex align-items-center gap-3">
      <a href="{base}/" class="d-flex align-items-center gap-2 logo-group text-decoration-none">
        <div class="logo-wrapper">
          <img src="{base}/AxelLab-Logo.ico" alt="AxelBase Logo" class="navbar-brand-logo" />
        </div>
        <span class="fw-bold fs-5 tracking-tight brand-text">AxelBase</span>
      </a>

      <div class="position-relative ms-2 ms-md-3" use:clickOutside on:click_outside={closeDropdown}>
        <button
          class="btn btn-coffee d-flex align-items-center gap-2"
          on:click={toggleDropdown}
          aria-label="Support this project"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 13V10H4V13C4 14.38 4.5 15.63 5.31 16.58L11.64 19H12.36L18.69 16.58C19.5 15.63 20 14.38 20 13M2 21V19H20V21H2M20 8V5H4V8H20M16 2H8V4H16V2Z"/>
          </svg>
          <span class="d-none d-sm-inline">Support</span>
        </button>

        {#if isDropdownOpen}
          <div
            class="dropdown-menu-custom glass"
            transition:fly={{ y: 10, duration: 250 }}
            style="min-width: 220px;"
          >
            <div class="d-flex flex-column gap-1 p-1">
              <a
                href="https://buymeacoffee.com/axelbase"
                target="_blank"
                rel="noopener noreferrer"
                on:click={closeDropdown}
                class="donation-link"
              >
                <span class="amount">$3</span> One Coffee
              </a>

              <a
                href="https://buymeacoffee.com/axelbase"
                target="_blank"
                rel="noopener noreferrer"
                on:click={closeDropdown}
                class="donation-link"
              >
                <span class="amount">$5</span> Two Coffees
              </a>

              <a
                href="https://buymeacoffee.com/axelbase"
                target="_blank"
                rel="noopener noreferrer"
                on:click={closeDropdown}
                class="donation-link"
              >
                <span class="amount">$10</span> Three Coffees
              </a>

              <a
                href="https://buymeacoffee.com/axelbase"
                target="_blank"
                rel="noopener noreferrer"
                on:click={closeDropdown}
                class="donation-link custom-amount"
              >
                Custom Amount
              </a>

              <a
                href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
                target="_blank"
                rel="noopener noreferrer"
                on:click={closeDropdown}
                class="donation-link custom-amount bitcoin"
              >
                Buy via Bitcoin
              </a>
            </div>
          </div>
        {/if}
      </div>
    </div>

    <div class="d-flex align-items-center gap-3">
      <ul class="nav d-none d-lg-flex align-items-center gap-1 m-0">
        <li class="nav-item"><a class="nav-link-custom" href="{base}/">Home</a></li>
        <li class="nav-item"><a class="nav-link-custom" href="{base}/#about">About</a></li>
        <li class="nav-item"><a class="nav-link-custom" href="{base}/#howto">How to use</a></li>
        <li class="nav-item"><a class="nav-link-custom" href="{base}/#faq">FAQ</a></li>
        <li class="nav-item ms-2">
          <a class="btn btn-primary rounded-pill px-4 fw-semibold" href="{base}/blog">Blog</a>
        </li>
      </ul>
    </div>
  </nav>
</header>

<slot />

<footer class="relative glass border-top py-3 mt-auto" style="z-index: 1030;">
  <div class="container d-flex flex-column flex-sm-row justify-content-between align-items-center small text-muted">
    <span class="fw-medium">© {currentYear} AxelBase Multi-Purpose High-Resolution Print QR Generator</span>
    <div class="d-flex gap-4 mt-2 mt-sm-0">
      <a href="{base}/privacy" class="footer-link">Privacy Policy</a>
      <a href="{base}/terms" class="footer-link">Terms of Service</a>
    </div>
  </div>
</footer>

<style>
  /* ── Existing styles from File 2 ── */
  .navbar-brand-logo { height: 32px; width: auto; transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .logo-group:hover .navbar-brand-logo { transform: rotate(15deg) scale(1.2); }

  .brand-text { color: var(--color-text-main); transition: color 0.3s; }
  .logo-group:hover .brand-text { color: var(--signal-blue-hover); }

  .nav-link-custom { position: relative; padding: 0.5rem 1rem; color: var(--color-text-muted); font-weight: 600; transition: color 0.3s; }
  .nav-link-custom::after { content: ''; position: absolute; width: 0; height: 3px; bottom: 5px; left: 50%; background-color: var(--color-accent); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); transform: translateX(-50%); border-radius: 2px; }
  .nav-link-custom:hover { color: var(--color-accent); }
  .nav-link-custom:hover::after { width: 70%; }

  .btn-coffee {
    background: linear-gradient(135deg, #FFDD00, #FBB034);
    color: #3d3d3d;
    font-weight: 700;
    border: none;
    padding: 0.5rem 1.2rem;
    box-shadow: 0 4px 15px rgba(251, 176, 52, 0.4);
    font-size: 0.9rem;
    border-radius: 50px;
    transition: all 0.3s;
  }

  .btn-coffee:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 20px rgba(251, 176, 52, 0.6);
  }
  .dropdown-menu-custom {
    position: absolute;
    top: 120%;
    left: 50%;
    transform: translateX(-50%);
    min-width: 220px;
    padding: 0.5rem;
    border-radius: 20px;
    z-index: 1050;
    box-shadow: var(--glass-shadow);
  }

  .donation-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 14px;
    border-radius: 12px;
    font-weight: 600;
    color: var(--color-accent);
    background: rgba(255,255,255,0.25);
    transition: all 0.25s ease;
    text-decoration: none;
    font-size: 0.95rem;
  }

  .donation-link:hover {
    background: rgba(255,255,255,0.45);
    transform: translateX(4px);
    color: var(--color-accent-hover);
  }

  .donation-link .amount {
    font-weight: 800;
    color: currentColor;
    min-width: 38px;
  }

  .donation-link.custom-amount {
    justify-content: center;
    border-top: 1px solid rgba(255,255,255,0.12);
    margin-top: 6px;
    padding: 12px;
    font-size: 0.97rem;
  }

  .donation-link.bitcoin {
    color: #f7931a;
  }

  .donation-link.bitcoin:hover {
    color: #f5c36a;
  }

  .footer-link { color: var(--color-text-muted); transition: all 0.2s; font-weight: 500; }
  .footer-link:hover { color: var(--color-accent); transform: translateY(-2px); display: inline-block; }

  @keyframes steam { 0% { opacity: 0; transform: translateY(0); } 50% { opacity: 1; } 100% { opacity: 0; transform: translateY(-10px); } }
</style>