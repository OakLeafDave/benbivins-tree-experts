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

// Demo quote form
function handleQuote(e) {
  e.preventDefault();
  const note = document.getElementById('formNote');
  if (note) note.hidden = false;
  e.target.querySelector('button[type="submit"]').textContent = 'Request Sent ✔';
  return false;
}
