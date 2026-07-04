// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// Current year in footer
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();

// Click-to-load video embeds (keeps the page fast until played)
document.querySelectorAll('.video-embed[data-src]').forEach((el) => {
  const load = () => {
    const src = el.getAttribute('data-src');
    if (!src || el.classList.contains('is-playing')) return;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', src);
    iframe.setAttribute('title', 'Video');
    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; encrypted-media');
    iframe.setAttribute('allowfullscreen', '');
    el.appendChild(iframe);
    el.classList.add('is-playing');
  };
  el.addEventListener('click', load);
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); load(); }
  });
});
