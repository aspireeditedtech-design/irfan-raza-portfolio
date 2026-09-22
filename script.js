(() => {
  'use strict';
  const config = window.PORTFOLIO_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);
  const dialog = $('#video-dialog');
  const player = $('#player');
  const dialogTitle = $('#dialog-title');
  const closeButton = $('#close-dialog');
  const emailLink = $('#email-link');
  const youtubeLink = $('#youtube-link');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let previouslyFocused = null;
  let playbackTimeout = 0;

  if (config.email) {
    emailLink.href = 'mailto:' + config.email + '?subject=' + encodeURIComponent('Video editing project inquiry');
    $('#email-text').textContent = config.email;
  }
  if (config.youtube) youtubeLink.href = config.youtube;
  $('#year').textContent = new Date().getFullYear();

  function openVideo(card) {
    const video = config.videos?.[Number(card.dataset.video)];
    if (!video || dialog.open) return;
    previouslyFocused = card;
    dialogTitle.textContent = video.title;
    player.poster = video.poster;
    player.src = video.src;
    player.setAttribute('aria-label', video.title + ', ' + video.subtitle);
    dialog.showModal();
    document.body.classList.add('modal-open');
    const rect = card.getBoundingClientRect();
    const stage = $('.video-stage').getBoundingClientRect();
    const scale = Math.max(.20, Math.min(.78, rect.width / stage.width));
    dialog.style.setProperty('--enter-x', `${rect.left + rect.width / 2 - (stage.left + stage.width / 2)}px`);
    dialog.style.setProperty('--enter-y', `${rect.top + rect.height / 2 - (stage.top + stage.height / 2)}px`);
    dialog.style.setProperty('--enter-scale', scale);
    dialog.classList.remove('is-visible');
    requestAnimationFrame(() => dialog.classList.add('is-visible'));
    // The click is the user's playback gesture; the video is never muted.
    const playPromise = player.play();
    if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {/* The native player retains its play button. */});
    closeButton.focus({ preventScroll: true });
  }

  function closeVideo() {
    if (!dialog.open) return;
    player.pause();
    clearTimeout(playbackTimeout);
    dialog.close();
    dialog.classList.remove('is-visible');
    document.body.classList.remove('modal-open');
    player.removeAttribute('src');
    player.load(); // Free video memory when the dialog is closed.
    if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
  }

  document.querySelectorAll('[data-video]').forEach((card) => {
    card.addEventListener('click', () => openVideo(card));
  });
  closeButton.addEventListener('click', closeVideo);
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeVideo(); });
  dialog.addEventListener('click', (event) => { if (event.target === dialog) closeVideo(); });
  player.addEventListener('error', () => { if (dialog.open) dialogTitle.textContent = 'Video couldn\'t load — check the video file'; });

  const menuButton = $('.mobile-menu-button');
  const mobileNav = $('#mobile-nav');
  function setMenu(open) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileNav.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  }
  menuButton.addEventListener('click', () => setMenu(mobileNav.hidden));
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  const navLinks = [...document.querySelectorAll('.desktop-nav a')];
  if ('IntersectionObserver' in window) {
    const sections = [...document.querySelectorAll('main section[id]')];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      navLinks.forEach(a => a.classList.toggle('current', a.hash === `#${visible[0].target.id}`));
    }, { rootMargin: '-15% 0px -60% 0px', threshold: [0, .2, .5, .8] });
    sections.forEach(s => observer.observe(s));
  }

  // Subtle cursor lighting on desktop; completely disabled on touch / reduced-motion devices.
  const glow = $('.cursor-glow');
  if (window.matchMedia('(pointer:fine)').matches && !reducedMotion.matches) {
    window.addEventListener('pointermove', (e) => {
      glow.style.setProperty('--pointer-x', e.clientX + 'px');
      glow.style.setProperty('--pointer-y', e.clientY + 'px');
    }, { passive: true });
  } else glow.hidden = true;
})();
