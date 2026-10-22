/* ============================================================
   EDIT ME — all the words and photos live here
   ============================================================ */
const CONFIG = {
  name: 'папа',
  from: 'Ромыча',
  candles: 5,
  slides: [
    { img: 'photos/02.jpg', title: 'Целеустремлённый', text: 'Спасибо за то, что всегда даёшь цель, к которой надо и хочется стремиться!' },
    { img: 'photos/04.jpg', pos: '58% 50%', title: 'Довольный', text: 'Твой пример того, как надо получать удовольствие и кайф от жизни всегда со мной.' },
    { img: 'photos/10.jpg', pos: '45% 50%', title: 'Любящий', text: 'Ты показал мне, что такое любить безвозмездно. На это способны единицы в мире в котором мы живём, но благодаря тебе я знаю, что это реально!' },
    { img: 'photos/03.jpg', pos: '28% 50%', title: 'Волшебный', text: 'Большинство моментов моего детства, когда я верил в магию и во что-то волшебное, были благодаря тебе. Думаю, что Дашуля и Олежик согласятся с этим тоже!' },
    { img: 'photos/09.jpg', pos: '32% 50%', title: 'Направляющий', text: 'Ты всегда знаешь, что делать в экстренный момент, и что самое главное, как в него не попасть. Я ценю каждый твой совет!' },
    { img: 'photos/08.jpg', pos: '55% 50%', title: 'Заботливый', text: 'Ты всегда в ответе за тех, кого "приручил." И если ты берёшь на себя ответственность, ты берёшь её раз и навсегда. Это самый главный пример в моей жизни.' },
    { img: 'photos/11.jpg', pos: '48% 50%', title: 'Вдохновлённый', text: 'Сколько бы вершин ты ни постиг, ты всегда думаешь о следующей. В жизни нет ничего невозможного, и ты тому пример!' },
    // not used yet:
    // { img: 'photos/01.jpg', pos: '88% 50%', title: 'Сегодня твой день, папа!', text: 'Характер у тебя хороший — это просто нервы какие-то слабые. Торт не даст соврать 😄' },
    // { img: 'photos/07.jpg', title: 'На вершине мира', text: 'Пусть этот год поднимет тебя ещё выше.' },
    // { img: 'photos/06.jpg', pos: '60% 50%', title: 'Икона стиля', text: 'Арафатка, расписной комбинезон и полная уверенность в себе. Никогда не меняйся.' },
    // { img: 'photos/05.jpg', title: 'Сквозь любые бури', text: 'Мокрые до нитки, смеёмся — и ты всегда крепко нас обнимаешь. Спасибо тебе за это.' },
  ],
};

/* ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const qs = new URLSearchParams(location.search);
const isPhone =
  qs.has('phone') ||
  (!qs.has('desktop') &&
    (/iPhone|iPod|Android.+Mobile|Windows Phone/i.test(navigator.userAgent) ||
      (matchMedia('(pointer: coarse)').matches && Math.min(screen.width, screen.height) < 600)));
document.documentElement.classList.add(isPhone ? 'is-phone' : 'is-desktop');

// iOS Safari ignores user-scalable=no: block double-tap and pinch zoom so fast taps stay taps
(() => {
  let last = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    // buttons are exempt: cancelling their touchend would also cancel the click
    if (now - last < 350 && !e.target.closest('button')) e.preventDefault();
    last = now;
  }, { passive: false });
  ['gesturestart', 'gesturechange', 'dblclick'].forEach((t) => document.addEventListener(t, (e) => e.preventDefault(), { passive: false }));
})();

const INK = '#3b2a1e';
const CRAYONS = ['#c8402e', '#f3c64b', '#7fb069', '#5b8fc9', '#e98aa6', '#f08a3c'];
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (a) => a[(Math.random() * a.length) | 0];
const f1 = (v) => v.toFixed(1);

/* ---------- hand-drawn art ----------
   Crayon textures are SVG filters, which are expensive to redraw every frame.
   So each drawing is rendered once into a static <img>; "boiling" lines come
   from three copies with different wobble seeds that flip in turn. */
const DEFS = (seed) => `<defs>
  <filter id="c" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="4" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  4 0 0 0 -1.15" result="a"/>
    <feComposite in="SourceGraphic" in2="a" operator="in" result="g"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="9" result="w"/>
    <feDisplacementMap in="g" in2="w" scale="5" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="b" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="${seed}" result="t"/>
    <feDisplacementMap in="SourceGraphic" in2="t" scale="4" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</defs>`;
function art(viewBox, body, { boil = false, cls = '', aspect = '' } = {}) {
  const one = (seed) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" ${aspect ? `preserveAspectRatio="${aspect}"` : ''}>${DEFS(seed)}<g ${boil ? 'filter="url(#b)"' : ''}>${body}</g></svg>`;
    return `<img class="${cls}" alt="" draggable="false" src="data:image/svg+xml,${encodeURIComponent(svg)}">`;
  };
  return boil ? `<span class="boil3 ${cls}">${one(1)}${one(7)}${one(13)}</span>` : one(1);
}

/* ---------- drawn autumn landscape: blue sky, sun, flowery hill, falling leaves ---------- */
const SKY_TOP = '#9cc9e8'; // keep in sync with --sky-top in style.css: Safari paints the status-bar area with it
const FALL = ['#e0622c', '#f08a2a', '#f3b53b', '#c8402e', '#d9822b', '#b5532a', '#f6cf4a'];
const LEAF_MAPLE = 'M20 2 L24 12 L33 9 L29 18 L38 22 L28 25 L30 34 L21 29 L20 38 L19 29 L10 34 L12 25 L2 22 L11 18 L7 9 L16 12 Z';
const LEAF_OVAL = 'M20 3 C 33 12, 33 28, 20 37 C 7 28, 7 12, 20 3 Z';

function buildScene(el) {
  const W = Number(el.dataset.w) || 400, H = 800, wide = W > 800, f = wide ? 0.7 : 1;
  // the scene runs ~100px under Safari's toolbar, so the hill sits a little higher than the art's 800 units suggest
  const HILL = 615;
  const hy = (x) => { const t = (x + 40) / (W + 80); return HILL - 300 * t * (1 - t) * f; };
  const ctrl = HILL - 150 * f;
  const area = W / 400;
  let grass = '', leaves = '', flowers = '';
  for (let i = 0; i < 110 * area; i++) {
    const x = rand(-20, W + 20), y = hy(x) + rand(6, 230);
    grass += `<path d="M${f1(x)} ${f1(y)} l${f1(rand(-4, 4))} ${f1(-rand(6, 14))}" stroke="${pick(['#6f9e4f', '#8fbf5f', '#5e8a43', '#b5d68a', '#c79a3c'])}"/>`;
  }
  for (let i = 0; i < 22 * area; i++) {
    const x = rand(8, W - 8), y = hy(x) + rand(16, 220), r = rand(4, 8.5);
    flowers += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${pick(['#e0623f', '#f08a3c', '#e98aa6', '#f3c64b', '#d84a5a'])}"/>` +
      `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * 0.35)}" fill="#8a4b2a" opacity=".55"/>`;
  }
  // fallen leaves scattered on the hill
  for (let i = 0; i < 26 * area; i++) {
    const x = rand(8, W - 8), y = hy(x) + rand(12, 220), r = rand(4, 8);
    leaves += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(r)}" ry="${f1(r * 0.55)}" transform="rotate(${f1(rand(-60, 60))} ${f1(x)} ${f1(y)})" fill="${pick(FALL)}"/>`;
  }
  const land = `
    <defs><linearGradient id="sky" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${H}">
      <stop offset="0" stop-color="${SKY_TOP}"/><stop offset=".18" stop-color="${SKY_TOP}"/><stop offset=".48" stop-color="#cfe2ea"/><stop offset=".7" stop-color="#f4ecd8"/>
    </linearGradient></defs>
    <rect x="-10" y="-200" width="${W + 20}" height="${H + 400}" fill="url(#sky)"/>
    <path d="M-40 ${HILL + 5} Q${W / 2} ${ctrl + 5} ${W + 40} ${HILL + 5} L${W + 40} ${H + 200} L-40 ${H + 200} Z" fill="#c4dd9c"/>
    <g filter="url(#c)">
      <path d="M-40 ${HILL} Q${W / 2} ${ctrl} ${W + 40} ${HILL} L${W + 40} ${H + 200} L-40 ${H + 200} Z" fill="#a8cf7a"/>
      <path d="M-40 ${HILL + 50} Q${W / 2} ${ctrl + 70} ${W + 40} ${HILL + 40} L${W + 40} ${H + 200} L-40 ${H + 200} Z" fill="#8fbf5f" opacity=".45"/>
      <g stroke-width="2.4" stroke-linecap="round" fill="none" opacity=".8">${grass}</g>
      ${flowers}${leaves}
    </g>`;
  // the sky gradient has no crayon gaps so its top colour matches the iPhone status-bar area exactly
  const sun = art('-70 -70 140 140', `
    <circle r="68" fill="#fbe6a0" opacity=".55" filter="url(#c)"/>
    <g stroke="#f3a53b" stroke-width="6" stroke-linecap="round" filter="url(#c)">
      ${Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6; return `<line x1="${f1(Math.cos(a) * 44)}" y1="${f1(Math.sin(a) * 44)}" x2="${f1(Math.cos(a) * (i % 2 ? 58 : 66))}" y2="${f1(Math.sin(a) * (i % 2 ? 58 : 66))}"/>`; }).join('')}
    </g>
    <circle r="36" fill="#f6c445" filter="url(#c)"/>
    <circle r="36" fill="none" stroke="${INK}" stroke-width="2.5" opacity=".7"/>`, { boil: true, cls: 'sun-img' });
  const cloudArt = art('-40 -34 130 54', '<g filter="url(#c)" fill="#fffdf6"><ellipse cx="0" cy="0" rx="34" ry="16"/><ellipse cx="26" cy="-10" rx="24" ry="18"/><ellipse cx="54" cy="0" rx="30" ry="15"/></g>', { cls: 'cloud-img' });
  const clouds = (wide
    ? [[30, 12, 12, 70, 60], [52, 24, 10, 90, -50], [66, 8, 9, 80, 70]]
    : [[30, 15, 30, 70, 40], [52, 28, 24, 90, -35]])
    .map(([l, t, w, s, dx]) => `<span class="cloud" style="left:${l}%;top:${t}%;width:${w}%;--t:${s}s;--dx:${dx}px">${cloudArt}</span>`).join('');
  // falling leaves: small static images moved by CSS only (cheap on the GPU)
  const leafImgs = FALL.map((c, i) => art('0 0 40 40', `<path d="${i % 2 ? LEAF_OVAL : LEAF_MAPLE}" fill="${c}" filter="url(#c)"/><path d="${i % 2 ? LEAF_OVAL : LEAF_MAPLE}" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/><path d="M20 8 L20 34" stroke="${INK}" stroke-width="1.3" opacity=".7"/>`));
  const falling = Array.from({ length: wide ? 22 : 13 }, () =>
    `<span class="leaf" style="left:${f1(rand(-5, 100))}%;--fall:${f1(rand(10, 18))}s;--delay:-${f1(rand(0, 18))}s;--sway:${f1(rand(2.5, 4.5))}s;--size:${Math.round(rand(18, 32))}px"><span>${pick(leafImgs)}</span></span>`).join('');
  el.innerHTML = art(`0 0 ${W} ${H}`, land, { cls: 'scene-art', aspect: 'xMidYMax slice' }) +
    `<span class="sun" style="${wide ? 'left:8%;top:7%;width:6%' : 'left:7%;top:6%;width:19%'}">${sun}</span>` + clouds + falling;
}
document.querySelectorAll('.scene').forEach(buildScene);

/* ---------- wobbly hand-drawn rectangle (in a 0..100 box) ---------- */
function roughRect(jx, jy, step = 7, inward = false) {
  const j = (a) => (inward ? rand(0, a) : rand(-a, a));
  const pts = [];
  for (let x = 0; x < 100; x += step) pts.push([x, j(jy)]);
  for (let y = 0; y < 100; y += step) pts.push([100 - j(jx), y]);
  for (let x = 100; x > 0; x -= step) pts.push([x, 100 - j(jy)]);
  for (let y = 100; y > 0; y -= step) pts.push([j(jx), y]);
  return 'M' + pts.map((p) => `${f1(p[0])} ${f1(p[1])}`).join(' L') + ' Z';
}

/* ---------- gift box ---------- */
function giftHTML() {
  const S = `stroke="${INK}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" fill="none"`;
  const bow = 'M100 64 C 78 26, 48 34, 62 58 C 70 68, 90 66, 100 64 Z M100 64 C 122 26, 152 34, 138 58 C 130 68, 110 66, 100 64 Z';
  const box = `
    <path d="M34 94 L168 92 L165 186 L37 188 Z" fill="#d8553f" filter="url(#c)"/>
    <path d="M91 93 L111 93 L112 187 L90 187 Z" fill="#f3c64b" filter="url(#c)"/>
    <circle cx="60" cy="130" r="6" fill="#f3c64b" opacity=".8"/><circle cx="140" cy="155" r="5" fill="#f3c64b" opacity=".8"/>
    <circle cx="62" cy="168" r="4" fill="#fff6e0"/><circle cx="142" cy="120" r="4" fill="#fff6e0"/>
    <path d="M34 94 L168 92 L165 186 L37 188 Z M91 93 L90 187 M111 93 L112 187" ${S}/>`;
  const lid = `
    <path d="M22 66 L178 63 L176 96 L25 98 Z" fill="#e9785f" filter="url(#c)"/>
    <path d="M89 65 L113 64 L113 97 L89 97 Z" fill="#f3c64b" filter="url(#c)"/>
    <path d="${bow}" fill="#f3c64b" filter="url(#c)"/>
    <path d="M22 66 L178 63 L176 96 L25 98 Z M89 65 L89 97 M113 64 L113 97" ${S}/>
    <path d="${bow}" ${S}/>
    <circle cx="100" cy="63" r="8" fill="#f08a3c" stroke="${INK}" stroke-width="3"/>`;
  return art('0 0 200 200', box, { boil: true, cls: 'g-box' }) + art('0 0 200 200', lid, { boil: true, cls: 'g-lid' });
}

/* ---------- cake ---------- */
function frosting(x1, x2, yTop, yWave, amp, seg, closed = true) {
  const w = (x2 - x1) / seg;
  let d = closed ? `M${x1} ${yTop} L${x2} ${yTop} L${x2} ${yWave}` : `M${x2} ${yWave}`;
  for (let i = seg; i > 0; i--) {
    const xa = x1 + i * w, xb = xa - w;
    d += ` Q${f1((xa + xb) / 2)} ${f1(yWave + amp * (i % 2 ? 1.5 : 0.9))} ${f1(xb)} ${yWave}`;
  }
  return closed ? d + ' Z' : d;
}
function cakeHTML(n) {
  const ink = (w = 3) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`, S = ink();
  const t1 = 'M16 164 Q16 157 24 157 L236 158 Q245 158 244 166 L243 244 Q243 251 233 251 L27 252 Q17 252 17 244 Z';
  const t2 = 'M52 106 Q52 99 60 99 L200 100 Q209 100 208 107 L207 158 L53 158 Z';
  let deco = '';
  for (let i = 0; i < 7; i++) {
    const x = 36 + i * 31.5, y = 214 + (i % 2) * 14;
    deco += `<circle cx="${x}" cy="${y}" r="7" fill="${pick(['#f3c64b', '#fff6e0', '#5b8fc9'])}"/><circle cx="${x}" cy="${y}" r="2.5" fill="#c8402e"/>`;
  }
  for (let i = 0; i < 9; i++) deco += `<circle cx="${f1(66 + i * 16 + rand(-3, 3))}" cy="${f1(rand(130, 150))}" r="2.6" fill="${pick(['#fff6e0', '#c8402e', '#f3c64b'])}"/>`;
  const body = `
    <ellipse cx="130" cy="252" rx="124" ry="13" fill="#fffaf0" ${S}/>
    <g filter="url(#c)">
      <path d="${t1}" fill="#e98aa6"/>
      <path d="${frosting(16, 244, 158, 174, 9, 10)}" fill="#fff6e0"/>
      <path d="${t2}" fill="#8fb3e3"/>
      <path d="${frosting(52, 208, 100, 114, 8, 7)}" fill="#fff6e0"/>
      ${deco}
    </g>
    <path d="${t1}" fill="none" ${S}/>
    <path d="${t2}" fill="none" ${S}/>
    <path d="${frosting(16, 244, 158, 174, 9, 10, false)}" fill="none" ${ink(2)}/>
    <path d="${frosting(52, 208, 100, 114, 8, 7, false)}" fill="none" ${ink(2)}/>`;
  const xs = Array.from({ length: n }, (_, i) => (n === 1 ? 130 : 80 + (i * 100) / (n - 1)));
  const candles = xs.map((x, i) => {
    const col = ['#c8402e', '#5b8fc9', '#7fb069', '#f08a3c', '#e98aa6'][i % 5];
    return `<g class="candle" transform="translate(${f1(x)} 0)">
      <rect x="-15" y="16" width="30" height="88" fill="transparent"/>
      <circle class="flame-glow" cx="0" cy="44" r="19" fill="#ffd56b" opacity=".35"/>
      <path d="M-5.5 60 L5.5 59.5 L6 101 L-6 101.5 Z" fill="${col}" ${ink(2.5)}/>
      <path d="M-5 71 L5 65 M-5 82 L5 76 M-5 93 L5 87" stroke="#fff6e0" stroke-width="2.4" stroke-linecap="round" opacity=".9"/>
      <path d="M0 59.5 q 1.5 -4 0 -7" fill="none" stroke="${INK}" stroke-width="2"/>
      <g class="flame">
        <path d="M0 26 C -8 37, -9 49, 0 53 C 9 49, 8 37, 0 26 Z" fill="#f3a53b" stroke="${INK}" stroke-width="2"/>
        <path d="M0 37 C -4 43, -4 49, 0 50.5 C 4 49, 4 43, 0 37 Z" fill="#fff2a8"/>
      </g>
    </g>`;
  }).join('');
  return `<div class="cake">${art('0 0 260 268', body, { boil: true })}<svg class="candles-svg" viewBox="0 0 260 268">${candles}</svg></div>`;
}

/* ---------- canvas FX: crayon confetti, doodles, fireworks ---------- */
const FX = (() => {
  const c = $('#fx'), ctx = c.getContext('2d');
  let W = 0, H = 0, parts = [], running = false;
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    c.width = W * dpr; c.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  addEventListener('resize', resize); resize();

  // physics runs at a fixed 60 steps/s so 120 Hz iPhone screens don't play everything at double speed
  const STEP = 1000 / 60;
  let last = 0, acc = 0, stepping = false, born = [];
  function loop(now) {
    acc += Math.min(now - last, 100); last = now;
    while (acc >= STEP) {
      // particles spawned during a step (a rocket's explosion) wait in `born` so the filter doesn't drop them
      stepping = true; parts = parts.filter((p) => p.step()); stepping = false;
      if (born.length) { parts.push(...born); born = []; }
      acc -= STEP;
    }
    ctx.clearRect(0, 0, W, H);
    for (const p of parts) p.draw();
    if (parts.length) requestAnimationFrame(loop); else running = false;
  }
  function add(p) {
    (stepping ? born : parts).push(p);
    if (!running) { running = true; acc = STEP; requestAnimationFrame((t) => { last = t - STEP; loop(t); }); }
  }

  // paper scraps: irregular little quads
  function confetti(x, y, n = 80, { angle = -90, spread = 70, power = 14 } = {}) {
    for (let i = 0; i < n; i++) {
      const a = (angle + rand(-spread, spread)) * Math.PI / 180, v = rand(power * 0.45, power);
      const s = rand(5, 9), q = [[-s, -s * rand(.5, 1)], [s * rand(.6, 1), -s], [s, s * rand(.5, 1)], [-s * rand(.6, 1), s]];
      add({
        x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: rand(0, 6.28), vr: rand(-0.3, 0.3), q,
        col: pick(CRAYONS), life: rand(110, 170), t: 0,
        step() { this.vy += 0.32; this.vx *= 0.975; this.vy *= 0.975; this.x += this.vx + Math.sin(this.t / 9) * 0.6; this.y += this.vy; this.r += this.vr; this.t++; return this.t < this.life && this.y < H + 40; },
        draw() {
          ctx.save(); ctx.globalAlpha = Math.min(1, (this.life - this.t) / 30); ctx.translate(this.x, this.y); ctx.rotate(this.r);
          ctx.scale(1, Math.cos(this.t / 6)); ctx.fillStyle = this.col;
          ctx.beginPath(); this.q.forEach(([px, py], k) => (k ? ctx.lineTo(px, py) : ctx.moveTo(px, py))); ctx.closePath(); ctx.fill();
          ctx.restore();
        },
      });
    }
  }

  // ink-outlined doodles that jitter like hand-drawn animation
  function doodlePath(type, s) {
    ctx.beginPath();
    if (type === 'star') {
      for (let i = 0; i < 10; i++) { const r = i % 2 ? s * 0.45 : s, a = -Math.PI / 2 + (i * Math.PI) / 5; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
      ctx.closePath();
    } else {
      for (let k = 0; k < 5; k++) { const a = (k * Math.PI * 2) / 5, cx = Math.cos(a) * s * 0.5, cy = Math.sin(a) * s * 0.5; ctx.moveTo(cx + s * 0.4, cy); ctx.arc(cx, cy, s * 0.4, 0, 7); }
    }
  }
  function doodles(x, y, n = 10, dir = 0) {
    for (let i = 0; i < n; i++) {
      const a = dir ? (dir > 0 ? rand(-60, 20) : rand(160, 240)) * Math.PI / 180 : rand(0, 6.28);
      const v = rand(4, 11);
      add({
        x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 3, s: rand(9, 15), type: pick(['star', 'star', 'flower']),
        col: pick(CRAYONS), t: 0, life: rand(60, 95), r: rand(-0.4, 0.4),
        step() { this.vy += 0.25; this.vx *= 0.97; this.x += this.vx; this.y += this.vy; this.t++; return this.t < this.life; },
        draw() {
          const jx = (this.t >> 3) % 2 ? 0.7 : -0.7;
          ctx.save(); ctx.globalAlpha = Math.min(1, (this.life - this.t) / 25); ctx.translate(this.x + jx, this.y); ctx.rotate(this.r);
          ctx.lineWidth = 2.2; ctx.strokeStyle = INK; ctx.fillStyle = this.col; ctx.lineJoin = 'round';
          doodlePath(this.type, this.s); ctx.fill(); ctx.stroke();
          if (this.type === 'flower') { ctx.beginPath(); ctx.arc(0, 0, this.s * 0.3, 0, 7); ctx.fillStyle = '#f3c64b'; ctx.fill(); ctx.stroke(); }
          ctx.restore();
        },
      });
    }
  }

  // fireworks: vivid sparks with tapering trails, rings and willows, glitter that twinkles on the way down
  const FW = ['#ff2e63', '#ff7a00', '#ffc800', '#22c55e', '#00a8ff', '#7c4dff', '#ff3dc8', '#00c2a8'];
  function twinkle(x, y, col) {
    const s = rand(3, 6);
    add({
      x, y, t: 0, life: rand(24, 40), col,
      step() { this.y += 0.35; this.t++; return this.t < this.life; },
      draw() {
        if ((this.t >> 2) % 2) return; // blink
        ctx.globalAlpha = 1 - this.t / this.life; ctx.fillStyle = this.col;
        ctx.beginPath(); ctx.moveTo(this.x, this.y - s); ctx.lineTo(this.x + s * 0.3, this.y - s * 0.3); ctx.lineTo(this.x + s, this.y);
        ctx.lineTo(this.x + s * 0.3, this.y + s * 0.3); ctx.lineTo(this.x, this.y + s); ctx.lineTo(this.x - s * 0.3, this.y + s * 0.3);
        ctx.lineTo(this.x - s, this.y); ctx.lineTo(this.x - s * 0.3, this.y - s * 0.3); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
      },
    });
  }
  function spark(x, y, vx, vy, col, o = {}) {
    add({
      x, y, vx, vy, col, t: 0, trail: [],
      life: o.life || rand(55, 80), drag: o.drag || 0.962, g: o.g ?? 0.055, w: o.w || 3.4, tl: o.tl || 7, glitter: o.glitter, flicker: o.flicker,
      step() {
        this.trail.push(this.x, this.y);
        if (this.trail.length > this.tl * 2) this.trail.splice(0, 2);
        this.vx *= this.drag; this.vy = this.vy * this.drag + this.g; this.x += this.vx; this.y += this.vy; this.t++;
        if (this.t >= this.life) {
          if (this.glitter) for (let k = 0; k < 2; k++) twinkle(this.x + rand(-8, 8), this.y + rand(-8, 8), pick(['#ffc800', '#ffffff', this.col]));
          return false;
        }
        return true;
      },
      draw() {
        const k = 1 - this.t / this.life, tr = this.trail, n = tr.length;
        ctx.lineCap = 'round'; ctx.strokeStyle = this.col;
        for (let j = 2; j < n; j += 2) {
          const f = j / n;
          ctx.globalAlpha = k * f; ctx.lineWidth = this.w * f;
          ctx.beginPath(); ctx.moveTo(tr[j - 2], tr[j - 1]); ctx.lineTo(tr[j], tr[j + 1]); ctx.stroke();
        }
        if (n) { ctx.globalAlpha = k; ctx.lineWidth = this.w; ctx.beginPath(); ctx.moveTo(tr[n - 2], tr[n - 1]); ctx.lineTo(this.x, this.y); ctx.stroke(); }
        if (!this.flicker || Math.random() > 0.35) { ctx.fillStyle = this.col; ctx.beginPath(); ctx.arc(this.x, this.y, this.w * 0.75, 0, 7); ctx.fill(); }
        ctx.globalAlpha = 1;
      },
    });
  }
  function halo(x, y, col) {
    add({
      t: 0, step() { return ++this.t < 26; },
      draw() {
        const k = this.t / 26; ctx.globalAlpha = 0.35 * (1 - k); ctx.strokeStyle = col; ctx.lineWidth = 10 * (1 - k) + 1;
        ctx.beginPath(); ctx.arc(x, y, 12 + 80 * k, 0, 7); ctx.stroke(); ctx.globalAlpha = 1;
      },
    });
  }
  function burst(x, y, type = pick(['peony', 'peony', 'ring', 'willow', 'glitter'])) {
    const cols = [pick(FW), pick(FW), pick(FW)];
    halo(x, y, cols[0]);
    if (type === 'ring') {
      for (let i = 0; i < 56; i++) { const a = (i / 56) * Math.PI * 2; spark(x, y, Math.cos(a) * 6.4, Math.sin(a) * 6.4, cols[0], { g: 0.03 }); }
      for (let i = 0; i < 32; i++) { const a = (i / 32) * Math.PI * 2 + 0.1; spark(x, y, Math.cos(a) * 3.4, Math.sin(a) * 3.4, cols[1], { g: 0.03, w: 3 }); }
    } else if (type === 'willow') {
      for (let i = 0; i < 64; i++) {
        const a = rand(0, Math.PI * 2), v = rand(2.5, 5.5);
        spark(x, y, Math.cos(a) * v, Math.sin(a) * v - 1, pick(['#ffb703', '#ffc800', '#ff9500']), { g: 0.075, drag: 0.975, life: rand(95, 125), tl: 13, w: 2.6, glitter: true });
      }
    } else {
      const glitter = type === 'glitter';
      for (let i = 0; i < 84; i++) {
        const a = (i / 84) * Math.PI * 2 + rand(-0.06, 0.06), v = 8 * (0.55 + 0.45 * Math.random());
        spark(x, y, Math.cos(a) * v, Math.sin(a) * v, cols[i % 3], { glitter, flicker: glitter });
      }
    }
  }

  function rocket(tx, ty, type) {
    const x = tx + rand(-40, 40), y = H + 10, frames = 44, col = pick(FW);
    add({
      x, y, t: 0,
      step() {
        this.t++; const k = this.t / frames, e = 1 - Math.pow(1 - k, 2);
        const px = this.x, py = this.y;
        this.x = x + (tx - x) * e; this.y = y + (ty - y) * e;
        if (this.t % 2 === 0) spark(px, py, rand(-0.6, 0.6), rand(0.5, 1.5), pick([col, '#ffc800']), { life: rand(14, 22), g: 0.04, w: 2, tl: 2 });
        if (this.t >= frames) { burst(tx, ty, type); return false; }
        return true;
      },
      draw() { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(this.x, this.y, 3.6, 0, 7); ctx.fill(); },
    });
  }

  function clear() { parts = []; born = []; ctx.clearRect(0, 0, W, H); }

  return { confetti, doodles, burst, rocket, clear };
})();

/* ---------- big title: every letter a random crayon colour (never the same as its neighbour) ---------- */
const TITLE_COLORS = ['#c8402e', '#f08a2a', '#e0a21b', '#5f9e3f', '#3f7fc4', '#e0648f', '#8a5cc4'];
function splitChars(el, text) {
  el.innerHTML = '';
  let i = 0, prev = '';
  text.split(' ').forEach((word, wi, arr) => {
    const w = document.createElement('span'); w.style.whiteSpace = 'nowrap'; w.style.display = 'inline-block';
    for (const ch of word) {
      const s = document.createElement('span'); s.className = 'ch'; s.textContent = ch;
      s.style.setProperty('--i', i++); s.style.setProperty('--r', `${f1(rand(-7, 7))}deg`);
      prev = pick(TITLE_COLORS.filter((c) => c !== prev));
      s.style.color = prev;
      w.appendChild(s);
    }
    el.appendChild(w);
    if (wi < arr.length - 1) el.appendChild(document.createTextNode(' '));
  });
}

/* ============================================================
   DESKTOP
   ============================================================ */
if (!isPhone) {
  const deskTitle = $('#desktop .hand-title');
  splitChars(deskTitle, deskTitle.textContent);
  deskTitle.classList.add('go');
  $('#desktop .cake-slot').innerHTML = cakeHTML(CONFIG.candles);
  const url = location.href.split('?')[0].split('#')[0];
  const link = $('#qr-link'); link.href = url; link.textContent = url.replace(/^https?:\/\//, '');
  const drawQR = () => {
    if (typeof qrcode === 'undefined') return;
    const qr = qrcode(0, 'M'); qr.addData(url); qr.make();
    $('#qr').innerHTML = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
  };
  if (document.readyState === 'complete') drawQR(); else addEventListener('load', drawQR);
  setTimeout(() => {
    FX.confetti(innerWidth / 2, innerHeight * 0.3, 120, { spread: 80, power: 16 });
    FX.doodles(innerWidth / 2, innerHeight * 0.3, 14);
  }, 600);
}

/* ============================================================
   PHONE
   ============================================================ */
if (isPhone) {
  CONFIG.slides.forEach((s) => { const i = new Image(); i.src = s.img; });

  const intro = $('#intro'), deck = $('#deck'), finale = $('#finale');
  const show = (el) => { document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('show', s === el)); };


  /* ----- intro ----- */
  splitChars($('#helloTitle'), `С днём рождения, ${CONFIG.name}!`);
  const gift = $('#gift');
  gift.innerHTML = giftHTML();
  gift.addEventListener('click', () => {
    if (intro.classList.contains('opened')) return;
    intro.classList.add('opened'); gift.classList.add('open');
    const r = gift.getBoundingClientRect();
    setTimeout(() => {
      FX.confetti(r.left + r.width / 2, r.top + r.height * 0.4, 150, { spread: 55, power: 19 });
      FX.doodles(r.left + r.width / 2, r.top + r.height * 0.4, 14);
    }, 250);
    setTimeout(() => { intro.classList.add('hello'); $('#helloTitle').classList.add('go'); }, 900);
  });
  $('#startBtn').addEventListener('click', startDeck);

  /* ----- deck ----- */
  const stack = $('#stack'), bars = $('#bars'), hint = $('#swipeHint');
  const slides = CONFIG.slides, n = slides.length;
  let cur = 0, hinted = false, busy = false;
  // the tap that opens a screen must not also land on what appears under the finger
  let lockUntil = 0;
  const lock = (ms = 700) => { lockUntil = performance.now() + ms; };
  const locked = () => performance.now() < lockUntil;

  bars.innerHTML = slides.map(() => '<i></i>').join('');
  const maskURL = (d) => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path d='${d}'/></svg>`)}")`;
  const cards = slides.map((s, idx) => {
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.tilt = f1(rand(-2.6, 2.6));
    el.style.cssText = `--kx:${f1(rand(-4, 4))}%;--ky:${f1(rand(-4, 2))}%;${s.pos ? `--pos:${s.pos};` : ''}`;
    const words = s.title.split(' ').map((w, i) => `<span class="w" style="--i:${i};--r:${f1(rand(-3, 3))}deg">${w}</span>`).join(' ');
    const frame = [0, 1, 2].map(() => `<path d="${roughRect(0.8, 0.5, 6)}" vector-effect="non-scaling-stroke"/>`).join('');
    el.innerHTML = `
      <div class="ph-wrap">
        <div class="ph"><img src="${s.img}" alt="" draggable="false" decoding="async"><div class="print"></div></div>
        <svg class="frame" viewBox="0 0 100 100" preserveAspectRatio="none">${frame}</svg>
        <span class="tape t1"></span><span class="tape t2"></span>
      </div>
      <div class="meta">
        <span class="chip">№ ${idx + 1} из ${n}</span>
        <h2>${words}</h2>
        <p style="--pd:${0.45 + s.title.split(' ').length * 0.08}s">${s.text}</p>
      </div>
      <div class="stamp l">ЕЩЁ!</div><div class="stamp r">УРА!</div>
      <div class="dim"></div>`;
    const ph = el.querySelector('.ph'), m = maskURL(roughRect(2, 1.2, 6, true));
    ph.style.webkitMaskImage = m; ph.style.maskImage = m;
    stack.appendChild(el);
    return el;
  });

  const EASE = 'transform .6s cubic-bezier(.2,.8,.2,1), opacity .45s';
  function layout(animate = true) {
    cards.forEach((el, i) => {
      const d = i - cur, tilt = Number(el.dataset.tilt);
      el.style.transition = animate ? EASE : 'none';
      el.style.zIndex = 100 - i;
      const dim = el.querySelector('.dim');
      if (d < 0) {
        const o = Number(el.dataset.out || -1);
        el.style.transform = `translate(${o * 150}%, -4%) rotate(${o * 28}deg)`;
        el.style.opacity = 0;
      } else {
        const k = Math.min(d, 3);
        el.style.transform = `translateY(${-k * 10}px) scale(${1 - k * 0.045}) rotate(${d === 0 ? tilt * 0.4 : tilt}deg)`;
        el.style.opacity = d > 2 ? 0 : 1;
        dim.style.opacity = Math.min(d * 0.35, 0.75);
      }
      el.classList.toggle('active', d === 0);
      el.querySelectorAll('.stamp').forEach((s) => (s.style.opacity = 0));
    });
    [...bars.children].forEach((b, i) => b.classList.toggle('on', i <= cur));
  }

  function startDeck() {
    lock();
    show(deck); layout(false);
    requestAnimationFrame(() => layout(true));
    setTimeout(() => { if (!hinted) hint.classList.add('show'); }, 2600);
  }

  function next(dir = -1) {
    if (busy) return;
    const el = cards[cur]; if (!el) return;
    hinted = true; hint.classList.remove('show');
    el.dataset.out = dir;
    const r = stack.getBoundingClientRect();
    FX.doodles(dir < 0 ? r.left + 10 : r.right - 10, r.top + r.height * 0.45, 6, dir);
    if (cur === n - 1) {
      cur++; layout(true); busy = true;
      setTimeout(() => { busy = false; startFinale(); }, 500);
      return;
    }
    cur++; layout(true);
  }
  function prev() {
    if (cur === 0) {
      const el = cards[0]; el.style.transition = 'transform .15s'; el.style.transform = 'translateX(14px) rotate(1.5deg)';
      setTimeout(() => layout(true), 150); return;
    }
    cur--; layout(true);
  }

  let drag = null;
  stack.addEventListener('pointerdown', (e) => {
    const el = cards[cur]; if (!el || busy || locked()) return;
    drag = { x: e.clientX, y: e.clientY, t: performance.now(), dx: 0, dy: 0, el };
    el.style.transition = 'none';
    stack.setPointerCapture(e.pointerId);
  });
  stack.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = (drag.dx = e.clientX - drag.x), dy = (drag.dy = e.clientY - drag.y);
    drag.el.style.transform = `translate(${dx}px, ${dy * 0.3}px) rotate(${dx * 0.05}deg)`;
    const p = Math.min(Math.abs(dx) / 160, 1);
    const [l, r] = drag.el.querySelectorAll('.stamp');
    r.style.opacity = dx > 0 ? p : 0; l.style.opacity = dx < 0 ? p : 0;
    const nx = cards[cur + 1];
    if (nx) {
      nx.style.transition = 'none';
      nx.style.transform = `translateY(${-10 * (1 - p)}px) scale(${0.955 + 0.045 * p}) rotate(${Number(nx.dataset.tilt) * (1 - p * 0.6)}deg)`;
      nx.querySelector('.dim').style.transition = 'none';
      nx.querySelector('.dim').style.opacity = 0.35 * (1 - p);
    }
  });
  const end = (e) => {
    if (!drag) return;
    const { dx, dy, t } = drag, dt = performance.now() - t, dist = Math.hypot(dx, dy);
    drag = null;
    const nx = cards[cur + 1]; if (nx) nx.querySelector('.dim').style.transition = '';
    if (e.type === 'pointercancel') return layout(true);
    if (dist < 10 && dt < 400) {
      const r = stack.getBoundingClientRect();
      return e.clientX - r.left < r.width * 0.28 ? prev() : next(-1);
    }
    if (Math.abs(dx) > innerWidth * 0.22 || Math.abs(dx) / dt > 0.55) next(Math.sign(dx));
    else layout(true);
  };
  stack.addEventListener('pointerup', end);
  stack.addEventListener('pointercancel', end);

  /* ----- finale ----- */
  const cakeSlot = $('#finaleCake');
  let lit = 0, celebrated = false, fwTimer = null, timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  function stopShow() { clearInterval(fwTimer); timers.forEach(clearTimeout); timers = []; FX.clear(); }

  function startFinale() {
    lock();
    show(finale);
    finale.classList.remove('done');
    cakeSlot.style.transform = '';
    cakeSlot.innerHTML = cakeHTML(CONFIG.candles);
    lit = cakeSlot.querySelectorAll('.candle').length; celebrated = false;
    splitChars($('.finale-title'), 'Загадай желание…');
    splitChars($('#finalTitle'), `С днём рождения, ${CONFIG.name}!`);
    $('#finalTitle').classList.remove('go');
    $('#finalSign').textContent = `С любовью от ${CONFIG.from}`;
    // pointerdown, not click: quick taps on neighbouring candles would otherwise read as a double-tap
    cakeSlot.querySelectorAll('.candle').forEach((c) => c.addEventListener('pointerdown', () => blow(c)));
  }

  function blow(c) {
    if (!c || c.classList.contains('out') || locked()) return;
    c.classList.add('out'); lit--;
    for (let i = 0; i < 2; i++) {
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      s.setAttribute('class', 'smoke');
      s.setAttribute('d', 'M0 50 q -5 -6 0 -12 q 5 -6 0 -12 q -5 -6 0 -12');
      s.style.setProperty('--sx', `${f1(rand(-10, 10))}px`); s.style.animationDelay = `${i * 0.25}s`;
      c.appendChild(s); setTimeout(() => s.remove(), 2400);
    }
    if (lit === 0) later(celebrate, 700);
  }

  // after the candles: scale the cake down just enough to clear the message and replay button
  function fitCake() {
    if (!finale.classList.contains('done')) return;
    const top = $('#againBtn').getBoundingClientRect().bottom + 14;
    const bottom = cakeSlot.offsetTop + cakeSlot.offsetHeight, h = cakeSlot.offsetHeight;
    const k = Math.max(0.4, Math.min(0.88, (bottom - top) / h));
    cakeSlot.style.transform = `translateX(-50%) scale(${k.toFixed(3)})`;
  }
  addEventListener('resize', fitCake);

  function celebrate() {
    if (celebrated) return; celebrated = true;
    finale.classList.add('done');
    $('#finalTitle').classList.add('go');
    fitCake();
    const W = innerWidth, H = innerHeight;
    FX.confetti(0, H * 0.7, 120, { angle: -60, spread: 25, power: 24 });
    FX.confetti(W, H * 0.7, 120, { angle: -120, spread: 25, power: 24 });
    let k = 0;
    clearInterval(fwTimer);
    fwTimer = setInterval(() => {
      FX.rocket(rand(W * 0.15, W * 0.85), rand(H * 0.1, H * 0.45));
      if (k % 3 === 2) FX.rocket(rand(W * 0.15, W * 0.85), rand(H * 0.1, H * 0.4));
      if (++k > 18) {
        clearInterval(fwTimer);
        // grand finale: three at once
        later(() => [0.22, 0.5, 0.78].forEach((f, i) => FX.rocket(W * f, H * (i === 1 ? 0.16 : 0.26), i === 1 ? 'ring' : 'glitter')), 500);
      }
    }, 450);
    later(() => FX.doodles(W / 2, H * 0.6, 18), 400);
  }

  $('#againBtn').addEventListener('click', () => {
    stopShow();
    cards.forEach((c) => delete c.dataset.out);
    cur = 0; startDeck();
  });

  // dev shortcut: ?phone&finale jumps to the end
  if (qs.has('finale')) { show(finale); startFinale(); }
}
