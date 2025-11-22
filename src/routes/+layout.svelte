<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { slide, fly } from 'svelte/transition';
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

  // --- Buy Me A Coffee Logic ---
  const paypalUsername = 'AxelLab427';
  const donationAmounts = [1, 3, 5, 10];
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="coffee-icon">
            <path d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z"/>
          </svg>
          <span class="d-none d-sm-inline">Buy me a coffee</span>
        </button>

        {#if isDropdownOpen}
          <div class="dropdown-menu-custom glass" transition:fly={{ y: 10, duration: 250 }}>
            <div class="d-flex flex-column gap-1">
              {#each donationAmounts as amount}
                <a href="https://paypal.me/{paypalUsername}/{amount}" target="_blank" rel="noopener noreferrer"
                   on:click={closeDropdown} class="donation-link">
                  ${amount}
                </a>
              {/each}
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

      <button class="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center border-0 toggle-btn"
              on:click={toggleTheme} aria-label="Toggle dark mode" style="width: 40px; height: 40px;">
        <i class="bi {isDarkMode ? 'bi-moon-stars-fill' : 'bi-sun-fill'} fs-5 theme-icon"></i>
      </button>

      <button class="navbar-toggler d-lg-none border-0 bg-transparent p-0 ms-1" type="button" 
              data-bs-toggle="collapse" data-bs-target="#mobileNav" aria-label="Toggle navigation menu">
        <i class="bi bi-grid-fill fs-2 text-primary" aria-hidden="true"></i>
      </button>
    </div>
  </nav>
</header>

<slot />

<footer class="relative glass border-top py-3 mt-auto" style="z-index: 1030;">
  <div class="container d-flex flex-column flex-sm-row justify-content-between align-items-center small text-muted">
    <span class="fw-medium">&copy; {new Date().getFullYear()} AxelBase Multi-Purpose High-Resolution Print QR Generator</span>
    <div class="d-flex gap-4 mt-2 mt-sm-0">
      <a href="{base}/privacy" class="footer-link">Privacy Policy</a>
      <a href="{base}/terms" class="footer-link">Terms of Service</a>
    </div>
  </div>
</footer>

<style>
  .navbar-brand-logo { height: 32px; width: auto; transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .logo-group:hover .navbar-brand-logo { transform: rotate(15deg) scale(1.2); }
  
  .brand-text { color: var(--color-text-main); transition: color 0.3s; }
  .logo-group:hover .brand-text { color: var(--signal-blue-hover); }

  .nav-link-custom { position: relative; padding: 0.5rem 1rem; color: var(--color-text-muted); font-weight: 600; transition: color 0.3s; }
  .nav-link-custom::after { content: ''; position: absolute; width: 0; height: 3px; bottom: 5px; left: 50%; background-color: var(--color-accent); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); transform: translateX(-50%); border-radius: 2px; }
  .nav-link-custom:hover { color: var(--color-accent); }
  .nav-link-custom:hover::after { width: 70%; }

  .btn-coffee { background: linear-gradient(135deg, #FFDD00, #FBB034); color: #3d3d3d; font-weight: 700; border: none; padding: 0.5rem 1.2rem; box-shadow: 0 4px 15px rgba(251, 176, 52, 0.4); font-size: 0.9rem; border-radius: 50px; transition: all 0.3s; }
  .btn-coffee:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 8px 20px rgba(251, 176, 52, 0.6); }
  .coffee-icon { width: 18px; height: 18px; animation: steam 3s infinite ease-out; }

  .dropdown-menu-custom { position: absolute; top: 120%; left: 50%; transform: translateX(-50%); min-width: 140px; padding: 0.5rem; border-radius: 20px; z-index: 1050; display: flex; flex-direction: column; box-shadow: 0 15px 35px rgba(0,0,0,0.15); }
  .donation-link { display: block; padding: 10px; text-align: center; border-radius: 12px; font-weight: bold; color: var(--color-accent); background: rgba(255,255,255,0.4); margin-bottom: 4px; transition: all 0.2s ease; }
  .donation-link:hover { background: #fff; color: var(--color-accent-hover); transform: translateX(5px); }

  .footer-link { color: var(--color-text-muted); transition: all 0.2s; font-weight: 500; }
  .footer-link:hover { color: var(--color-accent); transform: translateY(-2px); display: inline-block; }

  .theme-icon { transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
  .toggle-btn:hover .theme-icon { transform: rotate(45deg) scale(1.1); }
  
  @keyframes steam { 0% { opacity: 0; transform: translateY(0); } 50% { opacity: 1; } 100% { opacity: 0; transform: translateY(-10px); } }
</style>