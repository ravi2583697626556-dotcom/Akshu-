/* ══════════════════════════════════════
   AKSHU BIRTHDAY PAGE — script.js
   ══════════════════════════════════════ */

// ── DATA ──────────────────────────────
const WORDS = [
  { word: 'Radiant',       emoji: '✨', color: '#ff6b9d' },
  { word: 'Iconic',        emoji: '👑', color: '#f7c948' },
  { word: 'Dreamy',        emoji: '🌙', color: '#c9a6e8' },
  { word: 'Fire',          emoji: '🔥', color: '#ff4757' },
  { word: 'Ethereal',      emoji: '🌸', color: '#ffb3cb' },
  { word: 'Magical',       emoji: '🪄', color: '#a29bfe' },
  { word: 'Vibe',          emoji: '💫', color: '#ffeaa7' },
  { word: 'Flawless',      emoji: '💎', color: '#74b9ff' },
  { word: 'Glowing',       emoji: '🌟', color: '#f7c948' },
  { word: 'Slay',          emoji: '💅', color: '#fd79a8' },
  { word: 'Soft',          emoji: '🌷', color: '#fab1d3' },
  { word: 'Bold',          emoji: '⚡', color: '#fdcb6e' },
  { word: 'Pure',          emoji: '🤍', color: '#dfe6e9' },
  { word: 'Chaos',         emoji: '🌪️', color: '#e17055' },
  { word: 'Alive',         emoji: '🌿', color: '#55efc4' },
  { word: 'Real',          emoji: '💯', color: '#ff6b9d' },
  { word: 'Sunshine',      emoji: '☀️', color: '#fdcb6e' },
  { word: 'Wild',          emoji: '🦋', color: '#a29bfe' },
  { word: 'Stunning',      emoji: '🌺', color: '#e84393' },
  { word: 'Limitless',     emoji: '🚀', color: '#74b9ff' },
  { word: 'Unforgettable', emoji: '💖', color: '#ff6b9d' },
];

// Direct relative paths — img folder must be next to index.html
const IMGS = Array.from({ length: 21 }, (_, i) => `img/img (${i + 1}).jpg`);

// ── CUSTOM CURSOR ─────────────────────
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.querySelectorAll('button, a, .card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('big'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});

// ── STARS ─────────────────────────────
const starsEl = document.getElementById('stars');
for (let i = 0; i < 150; i++) {
  const s  = document.createElement('div');
  s.className = 'star';
  const sz = Math.random() * 2 + 0.5;
  s.style.cssText = `
    left: ${Math.random() * 100}%;
    top:  ${Math.random() * 100}%;
    width: ${sz}px; height: ${sz}px;
    --d:  ${2 + Math.random() * 5}s;
    --op: ${0.3 + Math.random() * 0.7};
    animation-delay: ${Math.random() * 6}s;
  `;
  starsEl.appendChild(s);
}

// ── FLOATING EMOJIS ───────────────────
const FLOAT_EMOJIS = ['🎂','🎉','✨','🌸','💖','🎈','🥳','💝','🌺','⭐','🦋','🪄'];
const floatersEl   = document.getElementById('floaters');
FLOAT_EMOJIS.forEach((emoji, i) => {
  const el = document.createElement('div');
  el.className = 'floater';
  el.textContent = emoji;
  el.style.cssText = `
    --x: ${Math.random() * 95}%;
    --d: ${10 + Math.random() * 8}s;
    animation-delay: ${i * 1.5}s;
  `;
  floatersEl.appendChild(el);
});

// ── CANVAS PARTICLES ──────────────────
const cvs = document.getElementById('pcanvas');
const ctx = cvs.getContext('2d');

function resizeCanvas() {
  cvs.width  = innerWidth;
  cvs.height = innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const COLORS = ['#ff6b9d', '#f7c948', '#c9a6e8', '#74b9ff'];
const particles = Array.from({ length: 50 }, () => ({
  x:  Math.random() * innerWidth,
  y:  Math.random() * innerHeight,
  vx: (Math.random() - 0.5) * 0.25,
  vy: (Math.random() - 0.5) * 0.25,
  r:  Math.random() * 1.5 + 0.5,
  c:  COLORS[Math.floor(Math.random() * COLORS.length)],
}));

(function animateParticles() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > cvs.width)  p.vx *= -1;
    if (p.y < 0 || p.y > cvs.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle   = p.c;
    ctx.globalAlpha = 0.35;
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateParticles);
})();

// ── BUILD GALLERY ─────────────────────
const gallery = document.getElementById('gallery');

IMGS.forEach((src, i) => {
  const w = WORDS[i];

  const card = document.createElement('div');
  card.className = 'card';

  const img = document.createElement('img');
  img.src = src; img.alt = 'Akshu'; img.loading = 'lazy';

  const num = document.createElement('div');
  num.className   = 'card-num';
  num.textContent = String(i + 1).padStart(2, '0');

  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';
  overlay.innerHTML = `
    <div class="word-label">
      <span class="word-emoji">${w.emoji}</span>
      <span class="word-text" style="color:${w.color}">${w.word}</span>
    </div>`;

  card.append(img, num, overlay);
  card.addEventListener('click', () => openLightbox(i));
  gallery.appendChild(card);
});

// ── LIGHTBOX ──────────────────────────
let currentIdx = 0;

const lb       = document.getElementById('lb');
const lbImg    = document.getElementById('lb-img');
const lbEmoji  = document.getElementById('lb-emoji');
const lbWord   = document.getElementById('lb-word');
const lbCounter= document.getElementById('lb-counter');

function openLightbox(i) {
  currentIdx = i;
  updateLightbox();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

function navigateLightbox(dir) {
  currentIdx = (currentIdx + dir + IMGS.length) % IMGS.length;
  updateLightbox();
}

function updateLightbox() {
  const w = WORDS[currentIdx];
  lbImg.src          = IMGS[currentIdx];
  lbEmoji.textContent = w.emoji;
  lbWord.textContent  = w.word;
  lbWord.style.color  = w.color;
  lbCounter.textContent = `${currentIdx + 1} / ${IMGS.length}`;
}

document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', () => navigateLightbox(-1));
document.getElementById('lb-next').addEventListener('click', () => navigateLightbox(1));
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowRight')  navigateLightbox(1);
  if (e.key === 'ArrowLeft')   navigateLightbox(-1);
});

// ── SCROLL REVEAL ─────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
