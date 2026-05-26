/* ============================================================
   MAIN.JS — OMAN WEBSITE
   SPA Navigation + Space Canvas + RA World Clock + All Pages
   ============================================================ */

'use strict';

// ════════════════════════════════════════════════════════════
// SPA NAVIGATION
// ════════════════════════════════════════════════════════════
const PAGES = ['home','class','ras','leveling','ekonomi','faksi','quest','equipment','peta','skill','battle','kalkulator','bintang','kalender','lore'];

function navigateTo(pageId) {
  PAGES.forEach(p => {
    const page = document.getElementById(`page-${p}`);
    const btn  = document.getElementById(`nav-${p}`);
    if (!page || !btn) return;
    const isActive = p === pageId;
    page.classList.toggle('active', isActive);
    btn.classList.toggle('active', isActive);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
    // ▼ TAMBAHKAN INI ▼
  const bgm = document.getElementById('bgm-bintang');
  if (bgm) {
    if (pageId === 'bintang') {
      // Music akan start saat user klik layar (karena aturan browser)
      setupBintangClick(bgm);
      // Stop lore bgm jika aktif
      if (typeof loreBgmStop === 'function') loreBgmStop();
      if (typeof destroyLore === 'function') destroyLore();
    } else if (pageId === 'lore') {
      // Stop bintang bgm
      bgm.pause();
      bgm.currentTime = 0;
      removeBintangClick();
      // Lore diinisialisasi via renderPage → initLore
    } else {
      // Pause dan reset saat pindah tab lain
      bgm.pause();
      bgm.currentTime = 0;
      removeBintangClick();
      // Stop & destroy lore
      if (typeof loreBgmStop === 'function') loreBgmStop();
      if (typeof destroyLore === 'function') destroyLore();
    }
  }
  // ▲ SAMPAI SINI ▲
  renderPage(pageId);
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => navigateTo(btn.dataset.page));
});

function renderPage(pageId) {
  switch(pageId) {
    case 'class':     renderClassPage(); break;
    case 'ras':       renderRasPage(); break;
    case 'leveling':  renderLevelingPage(); break;
    case 'ekonomi':   renderEkonomiPage(); break;
    case 'faksi':     renderFaksiPage(); break;
    case 'quest':     renderQuestPage(); break;
    case 'equipment': renderEquipmentPage(); break;
    case 'skill':     renderSkillPage(); break;
    case 'battle':    renderBattlePage(); break;
    case 'kalkulator':renderKalkulatorPage(); break;
    case 'peta':      if (typeof initMapSystem   === 'function') initMapSystem(); break;
    case 'bintang':   if (typeof initStargazer  === 'function') initStargazer(); break;
    case 'kalender':  renderKalenderPage(); break;
    case 'lore':      if (typeof initLore === 'function') initLore(); break;
  }
}

// ════════════════════════════════════════════════════════════
// SPACE CANVAS ANIMATION
// ════════════════════════════════════════════════════════════
(function initSpaceCanvas() {
  const canvas = document.getElementById('space-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, stars = [], constellations = [], shootingStars = [];
  let animFrame, lastShoot = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildStars();
    buildConstellations();
  }

  function buildStars() {
    stars = [];
    const N = Math.floor((W * H) / 2800);
    for (let i = 0; i < N; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.6 + 0.2,
        base: Math.random(),
        speed: Math.random() * 0.008 + 0.002,
        phase: Math.random() * Math.PI * 2,
        color: pickStarColor(),
      });
    }
  }
  function pickStarColor() {
    const p = Math.random();
    if (p < 0.6) return '#e8dcc8';
    if (p < 0.75) return '#aad4ff';
    if (p < 0.87) return '#ffd9aa';
    return '#d4a843';
  }

  function buildConstellations() {
    constellations = [];
    const patterns = [
      // Orion-like
      [[0.12,0.15],[0.14,0.20],[0.10,0.25],[0.16,0.25],[0.13,0.30],[0.11,0.35],[0.15,0.35]],
      // Cassiopeia-like
      [[0.75,0.08],[0.79,0.12],[0.83,0.08],[0.87,0.13],[0.91,0.09]],
      // Big Dipper
      [[0.30,0.55],[0.34,0.52],[0.38,0.52],[0.42,0.55],[0.42,0.60],[0.46,0.61],[0.50,0.60]],
      // Southern Cross
      [[0.60,0.70],[0.64,0.74],[0.60,0.78],[0.56,0.74],[0.60,0.74]],
      // Pleiades cluster
      [[0.20,0.68],[0.23,0.65],[0.26,0.67],[0.22,0.70],[0.25,0.72],[0.28,0.69]],
      // Scorpius tail
      [[0.70,0.35],[0.73,0.38],[0.76,0.36],[0.79,0.40],[0.77,0.44],[0.73,0.46]],
    ];
    patterns.forEach(pts => {
      constellations.push(pts.map(([xr,yr]) => ({
        x: xr * W + (Math.random()-0.5)*20,
        y: yr * H + (Math.random()-0.5)*20,
        r: Math.random()*0.9+0.5,
        phase: Math.random()*Math.PI*2,
      })));
    });
  }

  function spawnShootingStar() {
    const ang = (40 + Math.random()*10) * Math.PI/180; // 40–50°
    const sx  = Math.random() * W * 0.6;
    const sy  = Math.random() * H * 0.25;
    const len = 120 + Math.random() * 140;
    const spd = 6 + Math.random() * 5;
    shootingStars.push({ x:sx, y:sy, vx:spd*Math.cos(ang), vy:spd*Math.sin(ang), len, life:1 });
  }

  function drawMilkyWay() {
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0,    'rgba(70,30,120,0)');
    grad.addColorStop(0.20, 'rgba(80,40,130,0.06)');
    grad.addColorStop(0.40, 'rgba(50,80,160,0.10)');
    grad.addColorStop(0.55, 'rgba(60,90,170,0.12)');
    grad.addColorStop(0.70, 'rgba(80,50,140,0.08)');
    grad.addColorStop(1,    'rgba(50,20,100,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  function drawNebulae() {
    const nebulae = [
      { x:0.15*W, y:0.20*H, rx:200, ry:140, r:'rgba(130,50,200,0.04)' },
      { x:0.75*W, y:0.15*H, rx:160, ry:120, r:'rgba(50,100,220,0.05)' },
      { x:0.50*W, y:0.50*H, rx:300, ry:180, r:'rgba(0,150,180,0.04)' },
      { x:0.85*W, y:0.65*H, rx:180, ry:140, r:'rgba(200,80,100,0.04)' },
      { x:0.25*W, y:0.80*H, rx:200, ry:150, r:'rgba(50,180,130,0.04)' },
    ];
    nebulae.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, Math.max(n.rx,n.ry));
      g.addColorStop(0, n.r);
      g.addColorStop(1, 'transparent');
      ctx.save();
      ctx.scale(n.rx/Math.max(n.rx,n.ry), n.ry/Math.max(n.rx,n.ry));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x * Math.max(n.rx,n.ry)/n.rx, n.y * Math.max(n.rx,n.ry)/n.ry, Math.max(n.rx,n.ry), 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    });
  }

  function drawAurora(t) {
    const waves = [
      { color:'rgba(0,255,150,0.05)',  amp:30, freq:0.003, phase:0,    yBase:0.05 },
      { color:'rgba(0,180,220,0.06)',  amp:25, freq:0.004, phase:1.2,  yBase:0.07 },
      { color:'rgba(120,0,200,0.04)', amp:20, freq:0.0025,phase:2.4,  yBase:0.09 },
      { color:'rgba(0,120,255,0.05)', amp:18, freq:0.0035,phase:3.6,  yBase:0.11 },
    ];
    waves.forEach(w => {
      ctx.beginPath();
      ctx.moveTo(0, w.yBase*H);
      for (let x=0; x<=W; x+=4) {
        const y = w.yBase*H + Math.sin(x*w.freq + t*0.0008 + w.phase)*w.amp;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, 0); ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = w.color;
      ctx.fill();
    });
  }

  function drawStars(t) {
    stars.forEach(s => {
      const flicker = s.base + Math.sin(t*s.speed + s.phase)*0.4;
      ctx.globalAlpha = Math.max(0.05, Math.min(1, flicker));
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function drawConstellations(t) {
    constellations.forEach(pts => {
      ctx.strokeStyle = 'rgba(212,168,67,0.12)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      pts.forEach((p, i) => {
        if (i===0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      pts.forEach(p => {
        const alpha = 0.4 + Math.sin(t*0.002 + p.phase)*0.3;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#d4a843';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    });
  }

  function drawShootingStars() {
    shootingStars = shootingStars.filter(s => s.life > 0);
    shootingStars.forEach(s => {
      const tailX = s.x - s.vx * (s.len/Math.hypot(s.vx,s.vy));
      const tailY = s.y - s.vy * (s.len/Math.hypot(s.vx,s.vy));
      const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(1, `rgba(255,255,255,${s.life*0.9})`);
      ctx.globalAlpha = s.life;
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();
      ctx.globalAlpha = 1;
      s.x += s.vx; s.y += s.vy;
      s.life -= 0.018;
    });
  }

  function frame(t) {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#020408';
    ctx.fillRect(0, 0, W, H);
    drawMilkyWay();
    drawNebulae();
    drawAurora(t);
    drawStars(t);
    drawConstellations(t);

    if (t - lastShoot > (3000 + Math.random()*4000)) {
      spawnShootingStar();
      lastShoot = t;
    }
    drawShootingStars();
    animFrame = requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener('resize', resize);
  animFrame = requestAnimationFrame(frame);
})();

// ════════════════════════════════════════════════════════════
// RA WORLD CLOCK + CALENDAR
// ════════════════════════════════════════════════════════════
const RA_TIME_OFFSET_H = 9;   // OMAN time = real WIB + 9 jam
const RA_YEAR_OFF      = 474; // 2026 → 2500 RA

function getRATime() {
  const now = new Date();
  // Local time + 9 hours offset
  const omt = new Date(now.getTime() + RA_TIME_OFFSET_H * 3600 * 1000);
  return omt;
}

function getRADate(date) {
  return {
    year:    date.getUTCFullYear() + RA_YEAR_OFF,
    month:   date.getUTCMonth(),       // 0-indexed
    day:     date.getUTCDate(),
    weekday: date.getUTCDay(),          // 0=Sun
    hours:   date.getUTCHours(),
    minutes: date.getUTCMinutes(),
    seconds: date.getUTCSeconds(),
  };
}

function pad2(n) { return String(n).padStart(2,'0'); }

function updateRAClock() {
  const omt = getRATime();
  const ra  = getRADate(omt);

  const month   = RA_MONTHS[ra.month];
  const weekday = RA_DAYS[ra.weekday];

  // Update HOME clock digits
  const hEl = document.getElementById('ra-hours');
  const mEl = document.getElementById('ra-minutes');
  const sEl = document.getElementById('ra-seconds');
  if (hEl) {
    hEl.textContent = pad2(ra.hours);
    mEl.textContent = pad2(ra.minutes);
    sEl.textContent = pad2(ra.seconds);
    document.getElementById('ra-date-display').textContent =
      `${weekday.name}, ${ra.day} ${month.name}`;
    document.getElementById('ra-date-year').textContent =
      `Tahun ${ra.year} RA ✦ Era Bintang`;
    document.getElementById('ra-month-meaning').textContent =
      `${month.symbol} ${month.name} — ${month.meaning}`;
  }

  // Update KALENDER page clock digits
  const khEl = document.getElementById('kal-hours');
  if (khEl) {
    khEl.textContent = pad2(ra.hours);
    document.getElementById('kal-minutes').textContent = pad2(ra.minutes);
    document.getElementById('kal-seconds').textContent = pad2(ra.seconds);
    document.getElementById('kal-date-display').textContent =
      `${weekday.name}, ${ra.day} ${month.name}`;
    document.getElementById('kal-date-year').textContent =
      `Tahun ${ra.year} RA ✦ Era Bintang`;
    document.getElementById('kal-month-meaning').textContent =
      `${month.symbol} ${month.name} — ${month.meaning}`;
  }

  // Update faction timezone clocks
  updateFactionClocks(omt);
}

function updateFactionClocks(omtBase) {
  FACTION_TIMEZONES.forEach(f => {
    const el = document.getElementById(`ftz-time-${f.id}`);
    if (!el) return;
    const fdt = new Date(omtBase.getTime() + f.offset * 3600000);
    const ra  = getRADate(fdt);
    el.textContent = `${pad2(ra.hours)}:${pad2(ra.minutes)}`;
  });
}

function renderFactionTimezoneGrid() {
  const grid = document.getElementById('faction-tz-grid');
  if (!grid) return;
  grid.innerHTML = FACTION_TIMEZONES.map(f => `
    <div class="faction-tz-card" id="ftz-card-${f.id}"
         style="border-color: ${f.color}22;"
         onmouseover="this.style.borderColor='${f.color}66'"
         onmouseout="this.style.borderColor='${f.color}22'">
      <style>#ftz-card-${f.id}::before { background: ${f.color}; }</style>
      <div class="faction-tz-icon">${f.emoji}</div>
      <div class="faction-tz-name" style="color:${f.color};">${f.name}</div>
      <div class="faction-tz-time" id="ftz-time-${f.id}" style="color:${f.accentColor};">00:00</div>
      <div class="faction-tz-offset" style="color:${f.color}88;">${f.desc}</div>
    </div>
  `).join('');
}

function renderRACalendar() {
  const grid = document.getElementById('ra-cal-grid');
  if (!grid) return;

  const omt = getRATime();
  const ra  = getRADate(omt);
  const month = RA_MONTHS[ra.month];

  // Update header
  document.getElementById('ra-cal-month-name').textContent = month.name;
  document.getElementById('ra-cal-year-label').textContent = `Tahun ${ra.year} RA`;
  document.getElementById('ra-cal-symbol').textContent = month.symbol;

  // Day headers
  const dayHeaders = RA_DAYS.map(d =>
    `<div class="ra-cal-day-header" title="${d.name}">${d.short}</div>`
  ).join('');

  // Days in month (real calendar)
  const year  = omt.getUTCFullYear();
  const month0= omt.getUTCMonth();
  const daysInMonth = new Date(year, month0 + 1, 0).getDate();
  // First day of month (0=Sun)
  const firstDay = new Date(Date.UTC(year, month0, 1)).getUTCDay();
  // Previous month days
  const prevDays = new Date(year, month0, 0).getDate();

  let cells = '';

  // Fill prev month placeholders
  for (let i = firstDay - 1; i >= 0; i--) {
    cells += `<div class="ra-cal-cell other-month">${prevDays - i}</div>`;
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === ra.day;
    cells += `<div class="ra-cal-cell${isToday?' today':''}">${d}</div>`;
  }
  // Next month fill
  const total = firstDay + daysInMonth;
  const rem   = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let d = 1; d <= rem; d++) {
    cells += `<div class="ra-cal-cell other-month">${d}</div>`;
  }

  grid.innerHTML = dayHeaders + cells;
}

function initRAClock() {
  renderFactionTimezoneGrid();
  renderRACalendar();
  updateRAClock();
  setInterval(() => {
    updateRAClock();
    // Rebuild calendar at midnight
    const omt = getRATime();
    const ra  = getRADate(omt);
    if (ra.hours === 0 && ra.minutes === 0 && ra.seconds === 0) {
      renderRACalendar();
    }
  }, 1000);
}

// ════════════════════════════════════════════════════════════
// KALENDER PAGE
// ════════════════════════════════════════════════════════════

// Data Musim Dunia OMAN
// Pembagian: 3 bulan per musim, siklus bintang RA
const RA_SEASONS = [
  {
    name: "MUSIM SEMI",
    nameEn: "Spring",
    icon: "🌸",
    months: [1, 2, 3], // Qamarun, Thurayya, Jawzaa (Januari–Maret)
    color: "#a8e6cf",
    accentColor: "#26a65b",
    desc: "Angin hangat berhembus dari selatan, bunga-bunga langka bermekaran di padang Oman. Masa kebangkitan alam dan dimulainya perjalanan baru para petualang.",
    effect: "Buff: Tanaman & ramuan langka mudah ditemukan"
  },
  {
    name: "MUSIM PANAS",
    nameEn: "Summer",
    icon: "☀️",
    months: [4, 5, 6], // Suhailun, Mizanun, Aqrabun (April–Juni)
    color: "#ffd89b",
    accentColor: "#e67e22",
    desc: "Matahari membakar langit Oman dengan terik tak terkira. Gurun memerluas diri, air menjadi berharga, dan monster gurun lebih agresif.",
    effect: "Debuff: Semua Player yang melakukan Battle di medan terbuka dengan ronde lebih dari 15, -2HP/Ronde | Buff: +2 Dmg untuk semua Magic dengan Type Fire"
  },
  {
    name: "MUSIM GUGUR",
    nameEn: "Autumn",
    icon: "🍂",
    months: [7, 8, 9], // Nasmun, Shaulaa, Denabun (Juli–September)
    color: "#ffab76",
    accentColor: "#c0392b",
    desc: "Daun-daun berubah emas dan merah, angin malam membawa aroma misteri. Masa terbaik untuk berburu harta karun dan mencari artefak kuno.",
    effect: "Buff: Event dengan kemungkinan drop Equipment meningkat | Malam lebih panjang, +2 Dmg untuk monster apapun pada malam hari"
  },
  {
    name: "MUSIM DINGIN",
    nameEn: "Winter",
    icon: "❄️",
    months: [10, 11, 12], // Rijlun, Dabaranun, Siryusun (Oktober–Desember)
    color: "#b3d9ff",
    accentColor: "#2980b9",
    desc: "Salju turun di pegunungan utara Oman, danau membeku, dan jalur pegunungan tertutup. Para pejuang sejati membuktikan diri di tengah badai beku.",
    effect: "Debuff: -1 Move untuk semua Player | Buff: +2 Dmg untuk Magic dengan Type Ice | Event: Festival Bintang Sirius"
  },
];

function getCurrentSeason(monthIndex /* 0-based */) {
  // monthIndex 0–2 = Spring, 3–5 = Summer, 6–8 = Autumn, 9–11 = Winter
  return Math.floor(monthIndex / 3);
}

function renderKalenderMiniCalendar() {
  const grid = document.getElementById('kal-mini-cal-grid');
  if (!grid) return;

  const omt   = getRATime();
  const ra    = getRADate(omt);
  const month = RA_MONTHS[ra.month];

  // Update header
  const symEl = document.getElementById('kal-mini-symbol');
  const monEl = document.getElementById('kal-mini-month-name');
  const yrEl  = document.getElementById('kal-mini-year-label');
  if (symEl) symEl.textContent = month.symbol;
  if (monEl) monEl.textContent = month.name;
  if (yrEl)  yrEl.textContent  = `Tahun ${ra.year} RA`;

  // Day headers — tampilkan singkatan + tooltip nama lengkap & arti
  const dayHeaders = RA_DAYS.map(d =>
    `<div class="kal-mini-day-hdr" title="${d.name} — ${d.meaning}">${d.short}</div>`
  ).join('');

  // Calendar cells
  const year  = omt.getUTCFullYear();
  const month0= omt.getUTCMonth();
  const daysInMonth = new Date(year, month0 + 1, 0).getDate();
  const firstDay    = new Date(Date.UTC(year, month0, 1)).getUTCDay();
  const prevDays    = new Date(year, month0, 0).getDate();

  let cells = '';
  for (let i = firstDay - 1; i >= 0; i--) {
    cells += `<div class="kal-mini-cell other">${prevDays - i}</div>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells += `<div class="kal-mini-cell${d === ra.day ? ' today' : ''}">${d}</div>`;
  }
  const total = firstDay + daysInMonth;
  const rem   = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let d = 1; d <= rem; d++) {
    cells += `<div class="kal-mini-cell other">${d}</div>`;
  }

  grid.innerHTML = dayHeaders + cells;
}

function initKalenderDetailModal() {
  const overlay  = document.getElementById('kal-modal-overlay');
  const closeBtn = document.getElementById('kal-modal-close');
  const openBtn  = document.getElementById('kal-detail-btn');
  if (!overlay || overlay.dataset.modalInited) return;
  overlay.dataset.modalInited = '1';

  const dayIcons = ['🌕','🔴','☿','🪐','✨','🪐','☀️'];
  const dayColors = ['#b0bec5','#ef9a9a','#80cbc4','#ffe082','#f48fb1','#ce93d8','#ffcc02'];
  const monthColors = [
    '#90caf9','#ce93d8','#80cbc4','#fff176','#ffcc02','#ef9a9a',
    '#b39ddb','#80deea','#a5d6a7','#ffab91','#f48fb1','#ffe082',
  ];

  // Render isi hari
  const daysGrid = document.getElementById('kal-modal-days-grid');
  if (daysGrid) {
    daysGrid.innerHTML = RA_DAYS.map((d, i) => `
      <div class="kal-modal-day-row">
        <div class="kal-modal-day-num">${String(i+1).padStart(2,'0')}</div>
        <div class="kal-modal-day-short" style="color:${dayColors[i]};border-color:${dayColors[i]}55;background:${dayColors[i]}11;">${d.short}</div>
        <div class="kal-modal-day-info">
          <div class="kal-modal-day-name">${d.name}</div>
          <div class="kal-modal-day-meaning">${d.meaning}</div>
        </div>
        <div class="kal-modal-day-icon">${dayIcons[i]}</div>
      </div>
    `).join('');
  }

  // Render isi bulan
  const omt = getRATime();
  const ra  = getRADate(omt);
  const monthsGrid = document.getElementById('kal-modal-months-grid');
  if (monthsGrid) {
    monthsGrid.innerHTML = RA_MONTHS.map((m, i) => {
      const isNow = i === ra.month;
      return `
      <div class="kal-modal-month-card${isNow?' active-month':''}"
           style="border-color:${monthColors[i]}${isNow?'88':'22'};background:${monthColors[i]}0d;">
        ${isNow ? `<div class="kal-modal-now-badge">✦ SEKARANG</div>` : ''}
        <div class="kal-modal-month-top">
          <div class="kal-modal-month-num" style="color:${monthColors[i]};">Bulan ke-${m.id}</div>
          <div class="kal-modal-month-symbol">${m.symbol}</div>
        </div>
        <div class="kal-modal-month-name" style="color:${monthColors[i]};">${m.name}</div>
        <div class="kal-modal-month-meaning">${m.meaning}</div>
        <div class="kal-modal-month-real">≈ ${m.real}</div>
      </div>`;
    }).join('');
  }

  // Tab switching
  document.querySelectorAll('.kal-modal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.kal-modal-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.getElementById('kal-tab-days').style.display   = target === 'days'   ? 'block' : 'none';
      document.getElementById('kal-tab-months').style.display = target === 'months' ? 'block' : 'none';
    });
  });

  // Open / close
  openBtn.addEventListener('click', () => overlay.classList.add('open'));
  closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') overlay.classList.remove('open'); });
}

// ── URL gambar kalender — hanya bisa diubah oleh dev di sini ──
const KAL_DEV_IMAGE_URL = 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Kalender/Kalender.jpg'; // Isi URL gambar di sini, kosongkan untuk tampilkan placeholder

function initKalenderCustomImage() {
  const box         = document.getElementById('kal-custom-box');
  const placeholder = document.getElementById('kal-image-placeholder');
  const imgEl       = document.getElementById('kal-custom-img');

  if (!box || box.dataset.imgInited) return;
  box.dataset.imgInited = '1';

  // Semua interaksi upload oleh user dinonaktifkan.
  // Gambar hanya ditampilkan jika dev mengisi KAL_DEV_IMAGE_URL di atas.
  if (KAL_DEV_IMAGE_URL) {
    imgEl.src = KAL_DEV_IMAGE_URL;
    imgEl.style.display = 'block';
    placeholder.style.display = 'none';
  } else {
    placeholder.style.cursor = 'default';
    placeholder.style.display = 'flex';
  }
}

function renderKalenderPage() {
  // ── Musim ──────────────────────────────────────────────────
  const seasonsGrid = document.getElementById('ra-seasons-grid');
  if (seasonsGrid && !seasonsGrid.dataset.rendered) {
    seasonsGrid.dataset.rendered = '1';
    const omt = getRATime();
    const ra  = getRADate(omt);
    const currentSeasonIdx = getCurrentSeason(ra.month);

    seasonsGrid.innerHTML = RA_SEASONS.map((s, i) => {
      const isNow = i === currentSeasonIdx;
      return `
      <div class="ra-season-card${isNow ? ' current-season' : ''}" style="border-color:${s.color}55; background:${s.color}0d;">
        ${isNow ? `<div class="ra-season-now-badge" style="background:${s.accentColor};">✦ SEKARANG</div>` : ''}
        <div class="ra-season-icon">${s.icon}</div>
        <div class="ra-season-name" style="color:${s.accentColor};">${s.name}</div>
        <div class="ra-season-name-en" style="color:${s.color};">${s.nameEn}</div>
        <div class="ra-season-months" style="color:${s.accentColor}88;">
          ${s.months.map(m => RA_MONTHS[m - 1].name).join(' · ')}
        </div>
        <div class="ra-season-desc">${s.desc}</div>
        <div class="ra-season-effect" style="border-color:${s.color}44; color:${s.color};">
          ${s.effect}
        </div>
      </div>`;
    }).join('');
  }

  // ── Mini Calendar + Custom Image ───────────────────────────
  renderKalenderMiniCalendar();
  initKalenderCustomImage();
  initKalenderDetailModal();

  // ── Nama Hari ─────────────────────────────────────────────
  const daysGrid = document.getElementById('ra-days-grid');
  if (daysGrid && !daysGrid.innerHTML.trim()) {
    const dayColors = [
      '#b0bec5', // QMR - Bulan
      '#ef9a9a', // MRK - Mars
      '#80cbc4', // UTR - Merkurius
      '#ffe082', // MST - Jupiter
      '#f48fb1', // ZHR - Venus
      '#ce93d8', // ZHL - Saturnus
      '#ffcc02', // SHM - Matahari
    ];
    const dayIcons = ['🌕','🔴','☿','🪐','✨','🪐','☀️'];
    daysGrid.innerHTML = RA_DAYS.map((d, i) => `
      <div class="ra-info-card" style="border-color:${dayColors[i]}44; background:${dayColors[i]}0d;">
        <div class="ra-info-card-num" style="color:${dayColors[i]};">${String(i + 1).padStart(2,'0')}</div>
        <div class="ra-info-card-icon">${dayIcons[i]}</div>
        <div class="ra-info-card-name" style="color:${dayColors[i]};">${d.name}</div>
        <div class="ra-info-card-short">${d.short}</div>
        <div class="ra-info-card-meaning">${d.meaning}</div>
      </div>
    `).join('');
  }

  // ── Nama Bulan ─────────────────────────────────────────────
  const monthsGrid = document.getElementById('ra-months-grid');
  if (monthsGrid && !monthsGrid.innerHTML.trim()) {
    const monthColors = [
      '#90caf9','#ce93d8','#80cbc4','#fff176','#ffcc02','#ef9a9a',
      '#b39ddb','#80deea','#a5d6a7','#ffab91','#f48fb1','#ffe082',
    ];
    monthsGrid.innerHTML = RA_MONTHS.map((m, i) => `
      <div class="ra-month-card" style="border-color:${monthColors[i]}55; background:${monthColors[i]}0d;">
        <div class="ra-month-card-top">
          <div class="ra-month-card-num" style="color:${monthColors[i]};">Bulan ke-${m.id}</div>
          <div class="ra-month-card-symbol" style="color:${monthColors[i]};">${m.symbol}</div>
        </div>
        <div class="ra-month-card-name" style="color:${monthColors[i]};">${m.name}</div>
        <div class="ra-month-card-meaning">${m.meaning}</div>
        <div class="ra-month-card-real">
          <span class="ra-month-card-real-label">≈ Dunia Nyata:</span>
          ${m.real}
        </div>
      </div>
    `).join('');
  }

  // ── Refresh jam ────────────────────────────────────────────
  updateRAClock();
}

// ════════════════════════════════════════════════════════════
// HOME PAGE: STAT COUNTERS
// ════════════════════════════════════════════════════════════
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(id);
    }, 25);
  });
}

// ════════════════════════════════════════════════════════════
// CLASS PAGE
// ════════════════════════════════════════════════════════════
let currentClass = 'warrior';

function renderClassPage() {
  renderClassDisplay(currentClass);
  document.querySelectorAll('#class-tabs .class-tab-btn').forEach(btn => {
    if (btn.classList.contains('disabled')) return;
    btn.addEventListener('click', () => {
      document.querySelectorAll('#class-tabs .class-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentClass = btn.dataset.class;
      renderClassDisplay(currentClass);
    });
  });
}

function renderClassDisplay(classKey) {
  const c = CLASS_DATA[classKey];
  const area = document.getElementById('class-display-area');

  // Icon per class
  const classIcons = {
    warrior: '⚔',
    mage: '✨',
    archer: '🏹',
    priest: '✝',
    guardian: '🛡'
  };
  const icon = classIcons[classKey] || '⚔';

  area.innerHTML = `
    <div class="cv2-layout">
      <!-- Left: Character Portrait -->
      <div class="cv2-portrait" style="border-color:${c.color}33;">
        <img src="${c.image}" alt="${c.name}"
             onerror="this.style.display='none'; this.parentElement.querySelector('.cv2-portrait-fallback').style.display='flex'" />
        <div class="cv2-portrait-fallback" style="display:none; color:${c.color};">
          <span style="font-size:6rem;">${icon}</span>
        </div>
        <div class="cv2-portrait-glow" style="background: radial-gradient(ellipse at bottom, ${c.color}30 0%, transparent 70%);"></div>
      </div>

      <!-- Right: Class Info -->
      <div class="cv2-info">
        <!-- Class Name Header -->
        <div class="cv2-name-row">
          <span class="cv2-icon">${icon}</span>
          <span class="cv2-name" style="color:${c.color};">${c.name}</span>
        </div>

        <!-- Role Badge -->
        <div class="cv2-role-badge" style="border-color:${c.color}; color:${c.color}; background:${c.color}18;">
          ${c.roleBadge}
        </div>

        <!-- Lore Description -->
        <div class="cv2-lore">
          ${c.lore}
        </div>

        <!-- Info Cards Grid (3 columns) -->
        <div class="cv2-cards-grid">
          <div class="cv2-card" style="border-color:${c.color}44; background:${c.color}0a;">
            <div class="cv2-card-label" style="color:${c.color};">⚡ FOKUS PERAN</div>
            <div class="cv2-card-value">${c.focus}</div>
          </div>
          <div class="cv2-card" style="border-color:${c.color}44; background:${c.color}0a;">
            <div class="cv2-card-label" style="color:${c.color};">⚔ SENJATA KHAS</div>
            <div class="cv2-card-value">${c.weapon}</div>
          </div>
          <div class="cv2-card" style="border-color:${c.color}44; background:${c.color}0a;">
            <div class="cv2-card-label" style="color:${c.color};">✦ KEKHASAN</div>
            <div class="cv2-card-value">${c.kekhasan}</div>
          </div>
        </div>

        <!-- Playstyle Card (full width) -->
        <div class="cv2-card cv2-card-wide" style="border-color:${c.color}44; background:${c.color}0a;">
          <div class="cv2-card-label" style="color:${c.color};">✦ PLAYSTYLE</div>
          <div class="cv2-card-value">${c.playstyle}</div>
        </div>
      </div>
    </div>`;
}


// ════════════════════════════════════════════════════════════
// RAS PAGE
// ════════════════════════════════════════════════════════════
function renderRasPage() {
  const grid = document.getElementById('race-grid');
  if (!grid) return;

  grid.innerHTML = RACE_DATA.map(r => `
    <div class="race-card" onclick="renderRaceDetail('${r.id}')" id="race-card-${r.id}"
         style="border-color:${r.color}44;"
         onmouseover="this.style.borderColor='${r.color}99'; this.style.transform='translateY(-4px)'"
         onmouseout="this.style.borderColor='${r.color}44'; this.style.transform='translateY(0)'">

      <!-- Portrait Image -->
      <div class="race-card-portrait">
        <img src="${r.image}" alt="${r.name}"
             style="width:100%;height:100%;object-fit:cover;object-position:top;"
             onerror="this.parentElement.innerHTML='<div style=display:flex;align-items:center;justify-content:center;height:100%;font-size:4rem;background:${r.color}15>${r.emoji || "👤"}</div>'" />
        <div class="race-card-portrait-overlay" style="background:linear-gradient(to bottom, transparent 40%, ${r.color}22 75%, rgba(10,10,20,0.95) 100%);"></div>
      </div>

      <!-- Card Body -->
      <div class="race-card-body">
        <!-- Name + Icon -->
        <div class="race-card-header">
          <span class="race-card-icon">${r.emoji || "✦"}</span>
          <span class="race-card-name" style="color:${r.color};">${r.name}</span>
        </div>

        <!-- Trait Badge -->
        <div class="race-card-badge" style="background:${r.color}22;border-color:${r.color}55;color:${r.color};">
          ${r.trait}
        </div>

        <!-- Lore Description -->
        <div class="race-card-lore">${r.lore}</div>

        <!-- Special Trait Box -->
        <div class="race-card-trait-box" style="border-color:${r.color}44;background:${r.color}0d;">
          <div class="race-card-trait-label" style="color:${r.color};">
            <span>${r.emoji || "✦"}</span> SPECIAL TRAIT
          </div>
          <div class="race-card-trait-name" style="color:var(--text-bright);">${r.trait}:</div>
          <div class="race-card-trait-desc">${r.traitDesc}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderRaceDetail(raceId) {
  const r = RACE_DATA.find(r => r.id === raceId);
  if (!r) return;

  // Remove existing popup if any
  const existing = document.getElementById('race-popup-overlay');
  if (existing) existing.remove();

  // Build modal overlay
  const overlay = document.createElement('div');
  overlay.id = 'race-popup-overlay';
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:9999;
    background:rgba(2,4,8,0.82);
    backdrop-filter:blur(6px);
    display:flex; align-items:center; justify-content:center;
    padding:20px; box-sizing:border-box;
    animation:fadeInPage 0.2s ease;
  `;

  overlay.innerHTML = `
    <div id="race-popup-box" style="
      position:relative;
      background:var(--dark-card, #0d1117);
      border:1.5px solid ${r.color}66;
      border-radius:16px;
      box-shadow:0 0 40px ${r.color}33, 0 8px 40px rgba(0,0,0,0.7);
      max-width:780px; width:100%;
      max-height:90vh;
      overflow-y:auto;
      animation:fadeInPage 0.25s ease;
    ">
      <!-- Close Button -->
      <button onclick="document.getElementById('race-popup-overlay').remove()" style="
        position:sticky; top:12px; float:right; margin:12px 12px 0 0;
        background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.15);
        color:#fff; width:34px; height:34px; border-radius:50%;
        font-size:1.1rem; cursor:pointer; display:flex;
        align-items:center; justify-content:center; z-index:10;
        transition:background 0.2s;
      " onmouseover="this.style.background='rgba(255,255,255,0.15)'"
         onmouseout="this.style.background='rgba(255,255,255,0.07)'">✕</button>

      <!-- Top: Image Banner -->
      <div style="
        width:100%; height:500px; overflow:hidden;
        border-radius:10px 10px 0 0; position:relative; flex-shrink:0;
      ">
        <img src="${r.image}" alt="${r.name}" style="
          width:100%; height:100%; object-fit:cover; object-position:top center;
          display:block;
        " onerror="this.parentElement.style.background='${r.color}22';this.style.display='none'" />
        <div style="
          position:absolute; inset:0;
          background:linear-gradient(to bottom, transparent 40%, rgba(10,10,20,0.97) 100%);
        "></div>
        <!-- Name overlay on image -->
        <div style="position:absolute; bottom:20px; left:24px;">
          <div style="font-family:var(--font-ui,'monospace'); font-size:1.6rem; font-weight:700;
                      color:${r.color}; text-shadow:0 2px 12px ${r.color}88; letter-spacing:0.08em;">
            ${r.emoji || '✦'} ${r.name}
          </div>
          <div style="
            display:inline-block; margin-top:8px;
            padding:4px 14px; border-radius:20px;
            background:${r.color}22; border:1px solid ${r.color}55;
            color:${r.color}; font-size:0.72rem; font-family:var(--font-ui,'monospace');
            letter-spacing:0.1em;
          ">${r.trait}</div>
        </div>
      </div>

      <!-- Body Content -->
      <div style="padding:24px 28px 28px;">

        <!-- Lore -->
        <p style="font-size:0.88rem; color:var(--text-dim,#9aa3b0); line-height:1.7; margin:0 0 20px;">
          ${r.lore}
        </p>

        <!-- Info Grid -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">

          <!-- Special Trait -->
          <div style="
            border:1px solid ${r.color}44; background:${r.color}0d;
            border-radius:10px; padding:16px;
          ">
            <div style="font-family:var(--font-ui,'monospace'); font-size:0.68rem;
                        color:${r.color}; letter-spacing:0.1em; margin-bottom:8px;">
              ✦ SPECIAL TRAIT
            </div>
            <div style="font-size:0.82rem; font-weight:700;
                        color:var(--text-bright,#f0f0f0); margin-bottom:6px;">
              ${r.trait}:
            </div>
            <div style="font-size:0.78rem; color:var(--text-dim,#9aa3b0); line-height:1.6;">
              ${r.traitDesc}
            </div>
          </div>

          <!-- Stat Dasar -->
          <div style="
            border:1px solid rgba(212,168,67,0.4); background:rgba(212,168,67,0.06);
            border-radius:10px; padding:16px;
          ">
            <div style="font-family:var(--font-ui,'monospace'); font-size:0.68rem;
                        color:var(--gold,#d4a843); letter-spacing:0.1em; margin-bottom:12px;">
              ✦ STAT DASAR
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px 0;">
              <div style="font-size:0.78rem; color:var(--text-dim,#9aa3b0);">
                HP Base: <strong style="color:#ef9a9a;">${r.hp}</strong>
              </div>
              <div style="font-size:0.78rem; color:var(--text-dim,#9aa3b0);">
                MP Base: <strong style="color:#64b5f6;">${r.mp}</strong>
              </div>
              <div style="font-size:0.78rem; color:var(--text-dim,#9aa3b0);">
                ATK Base: <strong style="color:#81c784;">${r.atk}</strong>
              </div>
              <div style="font-size:0.78rem; color:var(--text-dim,#9aa3b0);">
                DEF Base: <strong style="color:#90caf9;">${r.def}</strong>
              </div>
              <div style="font-size:0.78rem; color:var(--text-dim,#9aa3b0);">
                MOVE Base: <strong style="color:#ce93d8;">${r.move}</strong>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  // Close on overlay background click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  // Close on Escape key
  const escHandler = (e) => {
    if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', escHandler); }
  };
  document.addEventListener('keydown', escHandler);

  document.body.appendChild(overlay);
}

// ════════════════════════════════════════════════════════════
// LEVELING PAGE
// ════════════════════════════════════════════════════════════
function renderLevelingPage() {
  const tbody = document.getElementById('level-table-body');
  if (!tbody || tbody.children.length > 0) return;
  tbody.innerHTML = LEVEL_TABLE.map(l => `
  <tr>
    <td><strong style="color:var(--gold);font-family:var(--font-ui);">${l.ras}</strong></td>
    <td>${l.hpPerLevel}</td>
    <td>${l.mpPerLevel}</td>
  </tr>
  `).join('');
}

// ════════════════════════════════════════════════════════════
// EKONOMI PAGE
// ════════════════════════════════════════════════════════════
function renderEkonomiPage() {
  const area = document.getElementById('ekonomi-content');
  if (area.innerHTML.trim()) return;

  area.innerHTML = `
    <!-- Tier Cards -->
    <div class="grid-4 mb-32">
      ${ECONOMY_DATA.tiers.map(t => `
        <div class="card text-center" style="border-color:${t.color}33;">
          <div style="font-size:2rem;margin-bottom:8px;">💰</div>
          <div style="font-family:var(--font-ui);font-size:0.8rem;font-weight:700;color:${t.color};margin-bottom:6px;">${t.name}</div>
          <div style="font-size:0.72rem;color:var(--text-dim);margin-bottom:8px;">${t.range}</div>
          <div style="font-size:0.7rem;background:${t.color}15;border:1px solid ${t.color}30;border-radius:8px;padding:6px 10px;color:var(--text);">${t.perks}</div>
        </div>
      `).join('')}
    </div>

    <div class="grid-2">
      <!-- Cara Dapat -->
      <div class="card">
        <div style="font-family:var(--font-ui);font-size:0.7rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:16px;">💎 CARA MENDAPAT ZEN</div>
        ${ECONOMY_DATA.earn.map(e => `
          <div style="display:flex;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
            <span style="color:var(--gold);">✦</span>
            <span style="font-size:0.82rem;">${e}</span>
          </div>
        `).join('')}
      </div>
      <!-- Cara Pakai -->
      <div class="card">
        <div style="font-family:var(--font-ui);font-size:0.7rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:16px;">💸 CARA MENGGUNAKAN ZEN</div>
        ${ECONOMY_DATA.spend.map(s => `
          <div style="display:flex;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
            <span style="color:#64b5f6;">◆</span>
            <span style="font-size:0.82rem;">${s}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Rules -->
    <div class="card mt-24" style="border-color:rgba(255,152,0,0.2);">
      <div style="font-family:var(--font-ui);font-size:0.7rem;letter-spacing:0.15em;color:#ffb74d;margin-bottom:16px;">⚠️ ATURAN EKONOMI</div>
      ${ECONOMY_DATA.rules.map((r,i) => `
        <div style="display:flex;gap:12px;align-items:flex-start;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
          <span style="font-family:var(--font-ui);font-size:0.65rem;color:#ffb74d;min-width:24px;">${String(i+1).padStart(2,'0')}</span>
          <span style="font-size:0.82rem;">${r}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// ════════════════════════════════════════════════════════════
// FAKSI PAGE
// ════════════════════════════════════════════════════════════
let currentFaction = 'aurelian';

function renderFaksiPage() {
  const tabs = document.getElementById('faction-tabs');
  if (!tabs.innerHTML.trim()) {
    tabs.innerHTML = FACTION_DATA.map(f => `
      <button class="tab-btn${f.id===currentFaction?' active':''}" data-faction="${f.id}" id="tab-faction-${f.id}">
        ${f.icon} ${f.name.split(' ')[0].toUpperCase()}
      </button>
    `).join('');
    tabs.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFaction = btn.dataset.faction;
        renderFactionDisplay(currentFaction);
      });
    });
  }
  renderFactionDisplay(currentFaction);
}

function renderFactionDisplay(factionId) {
  const f = FACTION_DATA.find(f => f.id === factionId);
  const area = document.getElementById('faction-display-area');
  area.innerHTML = `
    <div class="faction-header" style="animation:fadeInPage 0.3s ease;">
      <div class="faction-logo" style="border-color:${f.color};color:${f.color};">
        <img src="${f.image}" alt="${f.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;"
             onerror="this.parentElement.innerHTML='<span style=font-size:3rem>${f.icon}</span>'" />
      </div>
      <div class="faction-name" style="color:${f.color};">${f.name}</div>
      <div class="faction-region">📍 ${f.region}</div>
    </div>
    <div class="grid-2">
      <div class="card" style="border-color:${f.color}33;">
        <div style="font-family:var(--font-ui);font-size:0.65rem;text-align:justify;letter-spacing:0.15em;color:${f.color};margin-bottom:12px;">DESKRIPSI</div>
        <p style="font-size:0.85rem;text-align:justify;line-height:1.7;">${f.desc}</p>
        <div style="margin-top:16px;padding:12px;background:${f.color}10;border:1px solid ${f.color}30;border-radius:10px;">
          <div style="font-size:0.65rem;font-family:var(--font-ui);color:${f.color};margin-bottom:6px;">FACTION BUFF</div>
          <div style="font-size:0.82rem;">⚡ ${f.buff}</div>
        </div>
      </div>
      <div>
        <div class="card mb-16" style="border-color:rgba(76,175,80,0.2);">
          <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:#81c784;margin-bottom:10px;">✅ KEUNTUNGAN</div>
          ${f.pros.map(p => `<div style="font-size:0.82rem;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);">✦ ${p}</div>`).join('')}
        </div>
        <div class="card mb-16" style="border-color:rgba(244,67,54,0.2);">
          <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:#ef9a9a;margin-bottom:10px;">❌ KEKURANGAN</div>
          ${f.cons.map(c => `<div style="font-size:0.82rem;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);">✦ ${c}</div>`).join('')}
        </div>
        <div class="card" style="border-color:var(--dark-border);">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div>
              <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:#81c784;margin-bottom:8px;">🤝 SEKUTU</div>
              ${f.allies.map(a=>`<div style="font-size:0.78rem;color:var(--text-dim);">${a}</div>`).join('')}
            </div>
            <div>
              <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:#ef9a9a;margin-bottom:8px;">⚔️ MUSUH</div>
              ${f.enemies.map(e=>`<div style="font-size:0.78rem;color:var(--text-dim);">${e}</div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

// ════════════════════════════════════════════════════════════
// QUEST PAGE
// ════════════════════════════════════════════════════════════
let currentQuestTab = 'daily';

function renderQuestPage() {
  document.querySelectorAll('#quest-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#quest-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentQuestTab = btn.dataset.quest;
      renderQuestDisplay(currentQuestTab);
    });
  });
  renderQuestDisplay(currentQuestTab);
}

function renderQuestDisplay(type) {
  const quests = QUEST_DATA[type];
  const area   = document.getElementById('quest-display-area');
  area.innerHTML = quests.map(q => `
    <div class="quest-card">
      <div class="quest-diff ${q.difficulty.replace(' ','.')}">${q.difficulty}</div>
      <div class="quest-info">
        <div class="quest-name">${q.name}</div>
        <div class="quest-desc">${q.desc}</div>
        <div class="quest-rewards">
          <span class="quest-reward-badge">⭐ ${q.exp.toLocaleString()} EXP</span>
          <span class="quest-reward-badge">💰 ${q.zen.toLocaleString()} Zen</span>
          ${q.item ? `<span class="quest-reward-badge">📦 ${q.item}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// ════════════════════════════════════════════════════════════
// EQUIPMENT PAGE
// ════════════════════════════════════════════════════════════
function renderEquipmentPage() {
  const area = document.getElementById('equipment-content');
  if (area.innerHTML.trim()) return;

  area.innerHTML = `
    <!-- Tier strips -->
    <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--text-dim);margin-bottom:12px;">ITEM RARITY TIER</div>
    <div class="tier-strip mb-32">
      ${EQUIPMENT_TIERS.map(t => `
        <div class="tier-badge" style="color:${t.color};border-color:${t.color}55;background:${t.color}10;">
          ${t.tier}
        </div>
      `).join('')}
    </div>
    <div class="grid-3 mb-32">
      ${EQUIPMENT_TIERS.map(t => `
        <div class="card" style="border-color:${t.color}33;">
          <div style="font-family:var(--font-ui);font-size:0.78rem;font-weight:700;color:${t.color};margin-bottom:8px;">${t.tier}</div>
          <div style="font-size:0.75rem;margin-bottom:4px;"><span style="color:var(--text-dim);">Level min:</span> ${t.level}</div>
          <div style="font-size:0.75rem;"><span style="color:var(--text-dim);">Efek maks:</span> ${t.efek}</div>
        </div>
      `).join('')}
    </div>

    <!-- Equipment Slots -->
    <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--text-dim);margin-bottom:12px;">EQUIPMENT SLOT (6 SLOT)</div>
    <div class="grid-3">
      ${EQUIPMENT_SLOTS.map(s => `
        <div class="card text-center">
          <div style="font-size:2.2rem;margin-bottom:10px;">${s.icon}</div>
          <div style="font-family:var(--font-ui);font-size:0.78rem;font-weight:700;color:var(--text-bright);margin-bottom:6px;">${s.slot}</div>
          <div style="font-size:0.75rem;color:var(--text-dim);">${s.desc}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// ════════════════════════════════════════════════════════════
// SKILL PAGE
// ════════════════════════════════════════════════════════════
let currentSkillTab = 'system';

function renderSkillPage() {
  document.querySelectorAll('#skill-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#skill-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSkillTab = btn.dataset.skill;
      renderSkillDisplay(currentSkillTab);
    });
  });
  renderSkillDisplay(currentSkillTab);
}

function renderSkillDisplay(type) {
  const area = document.getElementById('skill-display-area');
  if (type === 'system') {
    area.innerHTML = `
      <!-- Slot Overview Cards -->
      <div style="font-family:var(--font-ui);font-size:0.62rem;letter-spacing:0.18em;color:var(--text-dim);margin-bottom:14px;">⚡ DISTRIBUSI 8 SKILL SLOT</div>
      <div class="skill-slot-grid" style="margin-bottom:40px;">
        ${SKILL_SYSTEM.slots.map(s => `
          <div class="skill-slot-card">
            <div class="skill-slot-icon">${s.icon}</div>
            <div class="skill-slot-type">${s.type}</div>
            <div class="skill-slot-count">${s.slots} Slot</div>
            <div class="skill-slot-detail"><strong>AP:</strong> ${s.ap} &nbsp; <strong>MP:</strong> ${s.mana}</div>
            <div class="skill-slot-detail" style="margin-top:8px;">${s.desc}</div>
          </div>
        `).join('')}
      </div>

      <!-- Unlock Per Level Table (styled like screenshot) -->
      <div class="skill-unlock-section">
        <div class="skill-unlock-title">
          <span class="skill-unlock-title-icon">🎯</span>
          <span>Unlock Per Level</span>
        </div>
        <div class="skill-unlock-table">
          ${SKILL_SYSTEM.unlockTable.map((row, idx) => `
            <div class="skill-unlock-row${idx % 2 === 1 ? ' alt' : ''}" id="skill-row-lv${row.level}">
              <div class="skill-unlock-lv" style="color:${row.color};">Lv.${row.level}</div>
              <div class="skill-unlock-icon-wrap" style="background:${row.color}18; border-color:${row.color}40;">
                <span class="skill-unlock-type-icon">${row.icon}</span>
              </div>
              <div class="skill-unlock-desc">${row.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Damage Formula -->
      <div class="grid-2 mt-24">
        <div class="card">
          <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:14px;">📐 FORMULA DAMAGE</div>
          <div style="font-size:0.78rem;line-height:2.2;">
            <div>⚔️ ATK = <span style="color:var(--gold);">${SKILL_SYSTEM.damageFormula.ATK}</span></div>
            <div>🔻 MIN DMG = <span style="color:var(--gold);">${SKILL_SYSTEM.damageFormula.MinDmg}</span></div>
            <div>🔺 MAX DMG = <span style="color:var(--gold);">${SKILL_SYSTEM.damageFormula.MaxDmg}</span></div>
            <div>💥 CRIT DMG = <span style="color:var(--gold);">${SKILL_SYSTEM.damageFormula.CritDmg}</span></div>
          </div>
        </div>
        <div class="card">
          <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:14px;">🏷️ LEGENDA TIPE AKSI</div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${[
              { icon:'🛡️', label:'Nova (Aksi Normal)',        color:'#4fc3f7', ap:'2 AP / No Mana' },
              { icon:'🎯', label:'Wild (Aksi Khusus)',         color:'#ff7043', ap:'1 AP / No Mana' },
              { icon:'💥', label:'Supernova (Aksi Kuat)',      color:'#ff5252', ap:'3 AP / Mid Mana' },
              { icon:'⚡', label:'HyperNova (Ultimate)',        color:'#ffd740', ap:'4–5 AP / High Mana' },
              { icon:'💎', label:'Mastery Bonus',              color:'#e040fb', ap:'Passive' },
              { icon:'🗡️', label:'Signature Move',             color:'#d4a843', ap:'Lv.100 Unlock' },
            ].map(t => `
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="font-size:1rem;width:22px;text-align:center;">${t.icon}</span>
                <div style="flex:1;">
                  <div style="font-family:var(--font-ui);font-size:0.62rem;font-weight:700;color:${t.color};">${t.label}</div>
                  <div style="font-size:0.65rem;color:var(--text-dim);">${t.ap}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>`;
  } else {
    // ── PANDUAN PEMBUATAN SKILL ──────────────────────────────
    area.innerHTML = `
      <div class="sgd-intro">
        Magic atau Skill di OMAN dibuat berdasarkan <span style="color:var(--gold);">imajinasi & kreativitas</span> player,
        namun wajib mengikuti aturan tipe, AP cost, dan formula yang berlaku.
      </div>

      <div class="sgd-grid">
        ${SKILL_GUIDE_DATA.map(s => `
          <div class="sgd-card" style="border-left-color:${s.color};">
            <!-- Header -->
            <div class="sgd-header">
              <div class="sgd-icon-wrap" style="background:${s.colorDim};border-color:${s.color}44;">
                <span class="sgd-icon">${s.icon}</span>
              </div>
              <div class="sgd-header-info">
                <div class="sgd-title" style="color:${s.color};">${s.title.replace(/\n/g,'<br>')}</div>
                <div class="sgd-cost">${s.ap} · ${s.mana}</div>
              </div>
            </div>

            <!-- Tagline -->
            <div class="sgd-tagline" style="border-left-color:${s.color};color:${s.color};">
              ${s.tagline.replace(/\n/g,'<br>')}
            </div>

            <!-- Karakteristik -->
            <div class="sgd-section-label">KARAKTERISTIK</div>
            <ul class="sgd-list">
              ${s.karakteristik.map(k => `<li class="sgd-list-item">· ${k}</li>`).join('')}
            </ul>

            <!-- Contoh Skill -->
            <div class="sgd-section-label" style="margin-top:14px;">CONTOH SKILL</div>
            <div class="sgd-examples">
              ${s.contohSkill.map(ex => `
                <div class="sgd-example">
                  <span class="sgd-class-tag" style="border-color:${s.color}55;color:${s.color};">[${ex.kelas}]</span>
                  <span class="sgd-skill-name">${ex.name}</span>
                  <span class="sgd-skill-sep">—</span>
                  <span class="sgd-skill-desc">${ex.desc}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Format box -->
      <div class="sgd-format-box">
        <div class="sgd-format-title">📋 FORMAT PENULISAN SKILL</div>
        <div class="sgd-format-body">
          <div class="sgd-format-row"><span class="sgd-format-key">Nama Skill</span><span class="sgd-format-val">— nama unik skill kamu</span></div>
          <div class="sgd-format-row"><span class="sgd-format-key">Tipe Aksi</span><span class="sgd-format-val">— Nova / Supernova / HyperNova / Wild / Signature</span></div>
          <div class="sgd-format-row"><span class="sgd-format-key">AP Cost</span><span class="sgd-format-val">— sesuai tipe aksi</span></div>
          <div class="sgd-format-row"><span class="sgd-format-key">Deskripsi RP</span><span class="sgd-format-val">— apa yang dilakukan skill dalam narasi</span></div>
          <div class="sgd-format-row"><span class="sgd-format-key">Efek Game</span><span class="sgd-format-val">— damage / buff / debuff / efek status</span></div>
          <div class="sgd-format-row"><span class="sgd-format-key">Cooldown</span><span class="sgd-format-val">— berapa ronde istirahat (sesuai tipe)</span></div>
        </div>
      </div>
    `;
  }
}

// ════════════════════════════════════════════════════════════
// KALKULATOR PAGE
// ════════════════════════════════════════════════════════════
let currentCalcTab = 'stat';

function renderKalkulatorPage() {
  document.querySelectorAll('#calc-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#calc-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCalcTab = btn.dataset.calc;
      renderCalcDisplay(currentCalcTab);
    });
  });
  renderCalcDisplay(currentCalcTab);
}

function renderCalcDisplay(type) {
  if (type === 'stat') renderStatCalc();
  else if (type === 'battle') renderBattleSimulator();
  else if (type === 'list') renderCharacterList();
}

// ════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Animate counters when they're in view
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounters(); counterObs.disconnect(); } });
  }, { threshold: 0.3 });
  const statsBand = document.querySelector('.stats-band');
  if (statsBand) counterObs.observe(statsBand);

  // Init RA Clock (always visible on home page)
  initRAClock();

  // Render initial home page already rendered via HTML
  // Other pages rendered on navigation
});

// ════════════════════════════════════════════════════════════
// BACKSOUND TAB BINTANG
// ════════════════════════════════════════════════════════════
let bintangClickHandler = null;

function setupBintangClick(bgm) {
  // Hapus handler lama kalau ada
  removeBintangClick();

  bintangClickHandler = function() {
    // Hanya play kalau belum jalan
    if (bgm.paused) {
      bgm.play().catch(() => {});
    }
  };

  // Klik di mana saja di dalam halaman bintang akan start music
  const page = document.getElementById('page-bintang');
  if (page) page.addEventListener('click', bintangClickHandler);

  // Saat music selesai → otomatis pause (tidak loop)
  bgm.onended = function() {
    bgm.currentTime = 0;
    bgm.play().catch(() => {});
  };
}

function removeBintangClick() {
  if (bintangClickHandler) {
    const page = document.getElementById('page-bintang');
    if (page) page.removeEventListener('click', bintangClickHandler);
    bintangClickHandler = null;
  }
}

// ════════════════════════════════════════════════════════════
// SOUND SYSTEM
// ════════════════════════════════════════════════════════════
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new AudioCtx();
  return audioCtx;
}

function playClick() {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.15);
}

// Sound effect untuk semua tombol nav
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => playClick());
});

// Sound effect untuk overview cards di home
document.querySelectorAll('.overview-card').forEach(card => {
  card.addEventListener('click', () => playClick());
});
// ════════════════════════════════════════════════════════════
// BATTLE PAGE
// ════════════════════════════════════════════════════════════
const BATTLE_DATA = {
  apCosts: [
    { aksi: "Move 1 Hex",                       ap: "1", mp: "—",    cooldown: "—"       },
    { aksi: "Basic Attack / Heal Kecil / Guard", ap: "2", mp: "Tidak",cooldown: "—"       },
    { aksi: "Skill Spesial / Heal Signifikan",   ap: "3", mp: "Ya",   cooldown: "Pendek"  },
    { aksi: "Ultimate",                          ap: "4", mp: "Ya",   cooldown: "4–5 turn"},
  ],
  terrain: [
    { terrain: "Forest", efek: "+1 Evade"        },
    { terrain: "River",  efek: "Move −1 hex"     },
    { terrain: "Hill",   efek: "Range +1"        },
    { terrain: "Ruins",  efek: "Cover"           },
    { terrain: "Swamp",  efek: "STA drain 1/turn"},
  ],
  statusEffects: [
    { status: "Bleed",   efek: "1 damage/turn",          durasi: "2 turn" },
    { status: "Burn",    efek: "1 STA/turn",             durasi: "2 turn" },
    { status: "Poison",  efek: "Healing diterima −2",    durasi: "2 turn" },
    { status: "Blind",   efek: "Tak bisa target di luar hex", durasi: "1 turn" },
    { status: "Freeze",  efek: "Tak bisa move",          durasi: "1 turn" },
    { status: "Stun",    efek: "Kehilangan semua AP",    durasi: "1 turn" },
    { status: "Slow",    efek: "AP −1",                  durasi: "1 turn" },
    { status: "Silence", efek: "Tak bisa spell",         durasi: "1 turn" },
  ],
  elementalReactions: [
    { mark: "Fire",      pemicu: "Ice",       reaksi: "Steam",   efek: "Blind 1 turn"           },
    { mark: "Fire",      pemicu: "Lightning", reaksi: "Blast",   efek: "+1 damage + area 1 hex" },
    { mark: "Ice",       pemicu: "Fire",      reaksi: "Melt",    efek: "Target −1 AP"           },
    { mark: "Ice",       pemicu: "Lightning", reaksi: "Shatter", efek: "Move −1"                },
    { mark: "Lightning", pemicu: "Fire",      reaksi: "Blast",   efek: "+1 damage + area 1 hex" },
    { mark: "Lightning", pemicu: "Ice",       reaksi: "Shatter", efek: "Move −1"                },
  ],
  echoSenjata: [
    { faksi: "Aurelian Empire",    echo: "Holy",   bonus: "Undead & Demon"                    },
    { faksi: "Shadow Covenant",    echo: "Shadow", bonus: "Target yang tidak melihat penyerang"},
    { faksi: "Arcane Consortium",  echo: "Arcane", bonus: "Golem & Makhluk Sihir"             },
    { faksi: "Wildlands Pact",     echo: "Wild",   bonus: "Beast & Monster"                   },
    { faksi: "Ironforge Guild",    echo: "Siege",  bonus: "Armor Berat & Struktur"            },
    { faksi: "Crimson Crusade",    echo: "Crimson",bonus: "Pengkhianat & Pembelot"            },
    { faksi: "Void Council",       echo: "Void",   bonus: "Holy Knight & Cleric"              },
    { faksi: "Forgotten Legion",   echo: "Grave",  bonus: "Semua ras hidup"                   },
  ],
  slotSpell: [
    { tier: "Basic",    slot: "3", cooldownMin: "1 turn", maksDamage: "3"    },
    { tier: "Advanced", slot: "2", cooldownMin: "2 turn", maksDamage: "5"    },
    { tier: "Ultimate", slot: "1", cooldownMin: "5 turn", maksDamage: "8–10" },
    { tier: "Utility",  slot: "2", cooldownMin: "1 turn", maksDamage: "0"    },
  ],
  cederaPermanen: [
    { cedera: "Deep Scar",      efek: "−1 Max HP"                },
    { cedera: "Limp",           efek: "MOVE −1"                  },
    { cedera: "Trembling Hand", efek: "−1 ATK"                   },
    { cedera: "Phantom Pain",   efek: "Maks simpan AP hanya 1"   },
    { cedera: "Faded Senses",   efek: "Tak bisa Evade 1x/battle" },
  ],
};

// Element color map for elemental reactions
const ELEMENT_COLORS = {
  Fire:      '#ff6b35',
  Ice:       '#64b5f6',
  Lightning: '#ffd54f',
  Steam:     '#b0bec5',
  Blast:     '#ff8a65',
  Melt:      '#ef9a9a',
  Shatter:   '#80deea',
};

// Status effect icon/color map
const STATUS_COLORS = {
  Bleed:   '#ef5350',
  Burn:    '#ff7043',
  Poison:  '#66bb6a',
  Blind:   '#9e9e9e',
  Freeze:  '#4fc3f7',
  Stun:    '#ffd54f',
  Slow:    '#b0bec5',
  Silence: '#ce93d8',
};

function renderBattlePage() {
  const area = document.getElementById('battle-content');
  if (!area || area.innerHTML.trim()) return;

  const sectionTitle = (icon, title, sub = '') => `
    <div style="margin:48px 0 24px; display:flex; align-items:center; gap:14px;">
      <div style="font-size:1.6rem;">${icon}</div>
      <div>
        <div style="font-family:var(--font-ui); font-size:0.7rem; letter-spacing:0.18em; color:var(--gold); font-weight:700; margin-bottom:2px;">✦ ${title.toUpperCase()}</div>
        ${sub ? `<div style="font-size:0.8rem; color:var(--text-dim);">${sub}</div>` : ''}
      </div>
      <div style="flex:1; height:1px; background:linear-gradient(90deg,var(--gold)44,transparent); margin-left:8px;"></div>
    </div>`;

  const tableWrap = (inner) => `
    <div class="card" style="padding:0; overflow:hidden; margin-bottom:8px;">
      <div style="overflow-x:auto;">${inner}</div>
    </div>`;

  const th = (label) =>
    `<th style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.12em;color:var(--gold);padding:13px 18px;text-align:left;background:#0d0d1a;border-bottom:1px solid var(--dark-border);white-space:nowrap;">${label}</th>`;

  const td = (content, extra = '') =>
    `<td style="padding:12px 18px;font-size:0.82rem;color:var(--text);border-bottom:1px solid rgba(255,255,255,0.04);${extra}">${content}</td>`;

  const trStyle = (i) => i % 2 === 0 ? 'background:rgba(255,255,255,0.015)' : '';

  // ── 1. BATTLEFIELD IMAGE ──────────────────────────────────
  const BATTLE_IMG_URL = "https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Grid%20battlefield/Waterfall%201.png";

  const battlefieldSection = `
    <div class="card" style="padding:0;overflow:hidden;margin-bottom:8px;">
      <!-- Battlefield image — full width, no zoom -->
      <div style="position:relative;" id="battlefield-thumb-wrap">
        <img src="${BATTLE_IMG_URL}"
             id="battlefield-thumb"
             alt="Battlefield Grid OMAN"
             style="width:100%;display:block;max-height:950px;object-fit:cover;object-position:center;"
             onerror="this.parentElement.style.background='#0d0d1a';this.style.display='none'" />
        <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(5,5,15,0.95) 0%,transparent 100%);padding:28px 28px 24px;pointer-events:none;">
          <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.18em;color:var(--gold);margin-bottom:6px;">✦ BATTLEFIELD — SQUARE GRID SYSTEM</div>
          <div style="font-size:0.85rem;color:var(--text);line-height:1.7;max-width:680px;">
            Pertempuran di OMAN berlangsung di atas <strong style="color:var(--gold)">peta grid square</strong>. Setiap unit menempati satu <strong style="color:var(--gold)">HEX (Pertemuan antara baris dan kolom)</strong> dan bergerak secara bergantian. Posisi, terrain, dan jarak menentukan efektivitas seranganmu — gunakan lingkungan untuk keunggulan taktis.
          </div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:0;border-top:1px solid var(--dark-border);">
        ${[
          ['🎯','Berbasis Giliran','Setiap pemain bertindak bergantian per ronde'],
          ['📐','Grid Square','Unit bergerak & menyerang antar hex'],
          ['⚡','Action Point','Tiap giliran memiliki pool AP terbatas'],
          ['🌿','Terrain Aktif','Posisi hex mempengaruhi stat & kemampuan'],
        ].map(([icon, title, desc]) => `
          <div style="padding:16px 18px;border-right:1px solid var(--dark-border);">
            <div style="font-size:1.3rem;margin-bottom:6px;">${icon}</div>
            <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.1em;color:var(--gold);margin-bottom:4px;">${title.toUpperCase()}</div>
            <div style="font-size:0.75rem;color:var(--text-dim);line-height:1.5;">${desc}</div>
          </div>`).join('')}
      </div>
    </div>`;

  // Inject popup styles once
  if (!document.getElementById('battlefield-popup-styles')) {
    const s = document.createElement('style');
    s.id = 'battlefield-popup-styles';
    s.textContent = `
      @keyframes bfFadeIn  { from{opacity:0} to{opacity:1} }
      @keyframes bfSlideUp { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
      #bf-popup-overlay {
        position:fixed;inset:0;z-index:10000;
        background:rgba(3,3,10,0.92);
        backdrop-filter:blur(8px);
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        animation:bfFadeIn 0.2s ease;
        padding:16px;box-sizing:border-box;
      }
      #bf-popup-inner {
        position:relative;
        display:flex;flex-direction:column;align-items:center;
        animation:bfSlideUp 0.28s cubic-bezier(0.34,1.4,0.64,1);
        max-width:100%;max-height:100%;
      }
      #bf-popup-img-wrap {
        border-radius:10px;
        border:1px solid rgba(212,168,67,0.35);
        box-shadow:0 0 80px rgba(212,168,67,0.12),0 20px 60px rgba(0,0,0,0.8);
        overflow:hidden;
        position:relative;
        user-select:none;
        /* width & height set dynamically by JS */
      }
      #bf-popup-img-wrap:active { cursor:grabbing; }
      #bf-canvas {
        position:absolute;
        top:0; left:0;
        transform-origin:0 0;
        will-change:transform;
      }
      #bf-popup-img {
        display:block;
        image-rendering:auto;
      }
      #bf-zoom-bar {
        display:flex;align-items:center;gap:12px;
        margin-top:14px;
        background:rgba(10,10,20,0.85);
        border:1px solid rgba(255,255,255,0.1);
        backdrop-filter:blur(8px);
        border-radius:50px;
        padding:8px 18px;
      }
      .bf-zbtn {
        background:none;border:none;cursor:pointer;
        color:#d4a843;font-size:1.1rem;line-height:1;
        width:30px;height:30px;border-radius:50%;
        display:flex;align-items:center;justify-content:center;
        transition:background 0.15s;
      }
      .bf-zbtn:hover { background:rgba(212,168,67,0.18); }
      .bf-zbtn:disabled { color:#444;cursor:not-allowed; }
      #bf-zoom-label {
        font-family:var(--font-ui,monospace);
        font-size:0.7rem;letter-spacing:0.1em;
        color:#d4a843;min-width:42px;text-align:center;
      }
      #bf-zoom-track {
        width:120px;height:4px;
        background:rgba(255,255,255,0.1);border-radius:2px;
        position:relative;cursor:pointer;
      }
      #bf-zoom-fill {
        height:100%;border-radius:2px;
        background:linear-gradient(90deg,#d4a843,#f0c060);
        pointer-events:none;transition:width 0.1s;
      }
      #bf-zoom-thumb {
        position:absolute;top:50%;transform:translate(-50%,-50%);
        width:14px;height:14px;border-radius:50%;
        background:#d4a843;border:2px solid #0a0a16;
        box-shadow:0 0 8px rgba(212,168,67,0.6);
        pointer-events:none;transition:left 0.1s;
      }
      #bf-close-btn {
        position:fixed;top:16px;right:16px;
        background:rgba(255,255,255,0.07);
        border:1px solid rgba(255,255,255,0.15);
        color:#ccc;border-radius:50%;
        width:40px;height:40px;
        cursor:pointer;font-size:1rem;
        display:flex;align-items:center;justify-content:center;
        transition:all 0.2s;z-index:1;
      }
      #bf-close-btn:hover{background:rgba(255,80,80,0.25);color:#fff;}
      #bf-hint-tip {
        position:absolute;top:10px;left:50%;transform:translateX(-50%);
        background:rgba(10,10,20,0.8);border:1px solid rgba(255,255,255,0.1);
        border-radius:20px;padding:5px 14px;
        font-family:var(--font-ui,monospace);font-size:0.6rem;
        letter-spacing:0.1em;color:#888;white-space:nowrap;
        pointer-events:none;opacity:1;transition:opacity 1s;
      }
    `;
    document.head.appendChild(s);
  }

  // ── 2. BIAYA ACTION POINT ────────────────────────────────
  const apRows = BATTLE_DATA.apCosts.map((r, i) => `
    <tr style="${trStyle(i)}">
      ${td(`<span style="font-weight:600;color:var(--text-bright);">${r.aksi}</span>`)}
      ${td(`<span style="font-family:var(--font-ui);font-size:0.9rem;font-weight:800;color:var(--gold);">${r.ap}</span>`, 'text-align:center;')}
      ${td(r.mp === 'Ya' ? `<span style="color:#64b5f6;font-weight:700;">Ya</span>` : r.mp === 'Tidak' ? `<span style="color:#888;">Tidak</span>` : `<span style="color:#555;">—</span>`,'text-align:center;')}
      ${td(r.cooldown === '—' ? `<span style="color:#555;">—</span>` : `<span style="color:#ffd54f;font-weight:600;">${r.cooldown}</span>`)}
    </tr>`).join('');

  const apTable = tableWrap(`
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr>${['AKSI','AP','MP','COOLDOWN'].map(th).join('')}</tr></thead>
      <tbody>${apRows}</tbody>
    </table>`);

  // ── 3. TERRAIN ───────────────────────────────────────────
  const terrainIcons = { Forest:'🌲', River:'🌊', Hill:'⛰️', Ruins:'🏚️', Swamp:'🌿' };
  const terrainRows = BATTLE_DATA.terrain.map((r, i) => `
    <tr style="${trStyle(i)}">
      ${td(`<span style="margin-right:8px;">${terrainIcons[r.terrain] || '🗺️'}</span><span style="font-weight:600;color:var(--text-bright);">${r.terrain}</span>`)}
      ${td(`<span style="color:#81c784;">${r.efek}</span>`)}
    </tr>`).join('');

  const terrainTable = tableWrap(`
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr>${['TERRAIN','EFEK'].map(th).join('')}</tr></thead>
      <tbody>${terrainRows}</tbody>
    </table>`);

  // ── 4. STATUS EFFECT ────────────────────────────────────
  const statusRows = BATTLE_DATA.statusEffects.map((r, i) => `
    <tr style="${trStyle(i)}">
      ${td(`<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${STATUS_COLORS[r.status]||'#aaa'};margin-right:10px;vertical-align:middle;box-shadow:0 0 6px ${STATUS_COLORS[r.status]||'#aaa'}77;"></span><span style="font-weight:700;color:${STATUS_COLORS[r.status]||'var(--text-bright)'};">${r.status}</span>`)}
      ${td(r.efek)}
      ${td(`<span style="font-family:var(--font-ui);font-size:0.75rem;color:#ce93d8;">${r.durasi}</span>`)}
    </tr>`).join('');

  const statusTable = tableWrap(`
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr>${['STATUS','EFEK','DURASI MAKS'].map(th).join('')}</tr></thead>
      <tbody>${statusRows}</tbody>
    </table>`);

  // ── 5. ELEMENTAL REACTION ────────────────────────────────
  const elemBadge = (el) =>
    `<span style="display:inline-block;padding:3px 10px;border-radius:12px;font-size:0.7rem;font-family:var(--font-ui);font-weight:700;letter-spacing:0.06em;background:${ELEMENT_COLORS[el]||'#555'}22;border:1px solid ${ELEMENT_COLORS[el]||'#555'}55;color:${ELEMENT_COLORS[el]||'#aaa'};">${el}</span>`;

  const elemRows = BATTLE_DATA.elementalReactions.map((r, i) => `
    <tr style="${trStyle(i)}">
      ${td(elemBadge(r.mark))}
      ${td(elemBadge(r.pemicu))}
      ${td(`<strong style="color:${ELEMENT_COLORS[r.reaksi]||'#ffd54f'};font-family:var(--font-ui);font-size:0.75rem;letter-spacing:0.08em;">${r.reaksi.toUpperCase()}</strong>`)}
      ${td(r.efek)}
    </tr>`).join('');

  const elemTable = tableWrap(`
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr>${['MARK','PEMICU','REAKSI','EFEK'].map(th).join('')}</tr></thead>
      <tbody>${elemRows}</tbody>
    </table>`);

  // ── 6. KEMATIAN & CEDERA ─────────────────────────────────
  const cederaRows = BATTLE_DATA.cederaPermanen.map((r, i) => `
    <tr style="${trStyle(i)}">
      ${td(`<span style="font-weight:600;color:var(--text-bright);">${r.cedera}</span>`)}
      ${td(`<span style="color:#ef9a9a;">${r.efek}</span>`)}
    </tr>`).join('');

  const cederaTable = tableWrap(`
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr>${['CEDERA','EFEK'].map(th).join('')}</tr></thead>
      <tbody>${cederaRows}</tbody>
    </table>`);

  const deathSection = `
    <div class="card" style="padding:24px 28px;margin-bottom:8px;">

      <!-- Death's Door -->
      <div style="margin-bottom:28px;">
        <div style="font-family:var(--font-ui);font-size:0.72rem;letter-spacing:0.15em;color:var(--gold);font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:10px;">
          <span style="font-size:1.1rem;">💀</span> DEATH'S DOOR
        </div>
        <ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:9px;">
          <li style="font-size:0.83rem;color:var(--text);line-height:1.6;">HP 0 → jatuh, AP 0, tak bisa bertindak.</li>
          <li style="font-size:0.83rem;color:var(--text);line-height:1.6;">Diserang saat sekarat → <span style="color:#ef5350;font-weight:700;">mati permanen</span>.</li>
          <li style="font-size:0.83rem;color:var(--text);line-height:1.6;">Ally di hex bersebelahan bisa melakukan aksi bernama <strong style="color:var(--gold)">Stabilize (2 AP)</strong> dengan tenggat 2 ronde, lebih dari itu Player akan mati permanen.</li>
          <li style="font-size:0.83rem;color:var(--text);line-height:1.6;">Selamat → dapat <strong style="color:#ef9a9a;">1 Cedera Permanen, HP dan MP pulih 10% dengan pembulatan ke atas</strong>.</li>
        </ul>
      </div>

      <div style="height:1px;background:var(--dark-border);margin-bottom:24px;"></div>

      <!-- Cedera Permanen table -->
      <div style="font-family:var(--font-ui);font-size:0.72rem;letter-spacing:0.15em;color:var(--gold);font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:10px;">
        <span style="font-size:1.1rem;">🩹</span> CEDERA PERMANEN
      </div>
      ${cederaTable}
      <ul style="margin:16px 0 0;padding-left:20px;display:flex;flex-direction:column;gap:9px;">
        <li style="font-size:0.83rem;color:var(--text);line-height:1.6;">Maks <strong style="color:var(--gold)">2 cedera</strong>. Cedera ketiga → pensiun atau mati.</li>
        <li style="font-size:0.83rem;color:var(--text);line-height:1.6;">Hanya bisa disembuhkan dengan item <strong style="color:#ffd54f;">Legendary</strong> atau quest epik.</li>
      </ul>

      <div style="height:1px;background:var(--dark-border);margin:24px 0;"></div>

      <!-- Last Stand -->
      <div>
        <div style="font-family:var(--font-ui);font-size:0.72rem;letter-spacing:0.15em;color:var(--gold);font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:10px;">
          <span style="font-size:1.1rem;">🔥</span> LAST STAND
        </div>
        <ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:9px;">
          <li style="font-size:0.83rem;color:var(--text);line-height:1.6;">HP di bawah <strong style="color:var(--gold)">25%</strong>.</li>
          <li style="font-size:0.83rem;color:var(--text);line-height:1.6;">Deklarasi: HP pulih penuh, <strong style="color:#ffd54f;">AP 7</strong>, semua CD reset.</li>
          <li style="font-size:0.83rem;color:var(--text);line-height:1.6;">Setelah 2 turn, <strong style="color:#ef5350;">otomatis mati</strong>. Tidak bisa diselamatkan.</li>
        </ul>
      </div>

    </div>`;

  // ── 8. ECHO SENJATA ──────────────────────────────────────
  const echoRows = BATTLE_DATA.echoSenjata.map((r, i) => `
    <tr style="${trStyle(i)}">
      ${td(`<span style="font-weight:600;color:var(--text-bright);">${r.faksi}</span>`)}
      ${td(`<span style="font-family:var(--font-ui);font-size:0.75rem;font-weight:700;padding:3px 10px;border-radius:12px;background:var(--gold)22;border:1px solid var(--gold)44;color:var(--gold);">${r.echo}</span>`)}
      ${td(`<span style="color:#81c784;">+2 Damage ke ${r.bonus}</span>`)}
    </tr>`).join('');

  const echoTable = tableWrap(`
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr>${['FAKSI','ECHO','+ 2 DAMAGE KE'].map(th).join('')}</tr></thead>
      <tbody>${echoRows}</tbody>
    </table>`);

  // ── 9. SLOT SPELL & COOLDOWN ─────────────────────────────
  const tierColors = { Basic:'#64b5f6', Advanced:'#81c784', Ultimate:'#ff8a65', Utility:'#ce93d8' };
  const spellRows = BATTLE_DATA.slotSpell.map((r, i) => `
    <tr style="${trStyle(i)}">
      ${td(`<span style="font-family:var(--font-ui);font-size:0.75rem;font-weight:700;padding:3px 12px;border-radius:12px;background:${tierColors[r.tier]||'#aaa'}22;border:1px solid ${tierColors[r.tier]||'#aaa'}44;color:${tierColors[r.tier]||'#aaa'};">${r.tier.toUpperCase()}</span>`)}
      ${td(`<span style="font-family:var(--font-ui);font-size:1rem;font-weight:800;color:var(--gold);">${r.slot}</span>`, 'text-align:center;')}
      ${td(`<span style="color:#ffd54f;">${r.cooldownMin}</span>`)}
      ${td(`<span style="color:#ef9a9a;font-weight:700;">${r.maksDamage}</span>`)}
    </tr>`).join('');

  const spellTable = tableWrap(`
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr>${['TIER','SLOT','COOLDOWN MIN','MAKS DAMAGE'].map(th).join('')}</tr></thead>
      <tbody>${spellRows}</tbody>
    </table>`);

  // ── ASSEMBLE ─────────────────────────────────────────────
  area.innerHTML = `
    ${battlefieldSection}

    ${sectionTitle('⚡', 'Biaya Action Point (AP)', 'Setiap aksi dalam pertempuran menghabiskan AP dari pool giliran')}
    ${apTable}

    ${sectionTitle('🌿', 'Terrain', 'Posisi hex di berbagai jenis terrain memberikan efek pasif')}
    ${terrainTable}

    ${sectionTitle('💀', 'Status Effect', 'Efek negatif yang dapat dikenakan selama pertempuran')}
    ${statusTable}

    ${sectionTitle('🔥', 'Reaksi Elemental', 'Kombinasikan elemen untuk memicu reaksi dahsyat')}
    ${elemTable}

    ${sectionTitle('💀', 'Kematian & Cedera', 'Death\'s Door, cedera permanen, dan Last Stand')}
    ${deathSection}

    ${sectionTitle('⚔️', 'Echo Senjata', 'Setiap faksi memiliki tipe echo senjata dengan bonus +2 damage ke target tertentu')}
    ${echoTable}

    ${sectionTitle('📖', 'Slot Spell & Cooldown', 'Batasan slot spell dan cooldown minimum per tier')}
    ${spellTable}

    <div style="height:40px;"></div>
  `;
}

// ════════════════════════════════════════════════════════════
// BATTLEFIELD POPUP WITH ZOOM & PAN
// ════════════════════════════════════════════════════════════
function openBattlefieldPopup() {
  const IMG_URL   = "https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Grid%20battlefield/Waterfall%201.png";
  const MAX_SCALE = 4.0;
  const STEP      = 0.4;

  // Remove existing
  const old = document.getElementById('bf-popup-overlay');
  if (old) old.remove();

  // State — scale=1 always means "fit-to-screen" (full image visible, nothing cropped)
  let scale      = 1.0;
  let panX       = 0;
  let panY       = 0;
  let baseW      = 0; // fitted display width  at scale=1
  let baseH      = 0; // fitted display height at scale=1
  let isDragging = false;
  let lastX = 0, lastY = 0;
  let lastTouchDist = 0;

  // Build DOM
  const overlay = document.createElement('div');
  overlay.id = 'bf-popup-overlay';
  overlay.innerHTML = `
    <button id="bf-close-btn" title="Tutup (Esc)">✕</button>
    <div id="bf-popup-inner">
      <div style="font-family:var(--font-ui,monospace);font-size:0.6rem;letter-spacing:0.15em;color:rgba(212,168,67,0.55);margin-bottom:10px;text-align:center;">
        ✦ BATTLEFIELD — HEX GRID SYSTEM
      </div>
      <!-- Viewport window — fixed size, clips the scaled image -->
      <div id="bf-popup-img-wrap">
        <!-- Canvas layer — actual image scaled inside here -->
        <div id="bf-canvas">
          <img id="bf-popup-img" src="${IMG_URL}" alt="Battlefield Grid OMAN" draggable="false"
               style="display:block;image-rendering:crisp-edges;" />
        </div>
      </div>
      <div id="bf-hint-tip">🖱 Scroll = zoom · Drag = geser · Zoom out 100% = ukuran penuh asli</div>
      <!-- Zoom bar -->
      <div id="bf-zoom-bar">
        <button class="bf-zbtn" id="bf-btn-out" title="Perkecil">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14" stroke-linecap="round"/>
            <line x1="5" y1="7" x2="9" y2="7" stroke-linecap="round"/>
          </svg>
        </button>
        <div id="bf-zoom-track">
          <div id="bf-zoom-fill" style="width:0%"></div>
          <div id="bf-zoom-thumb" style="left:0%"></div>
        </div>
        <button class="bf-zbtn" id="bf-btn-in" title="Perbesar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14" stroke-linecap="round"/>
            <line x1="7" y1="5" x2="7" y2="9" stroke-linecap="round"/><line x1="5" y1="7" x2="9" y2="7" stroke-linecap="round"/>
          </svg>
        </button>
        <div id="bf-zoom-label">100%</div>
        <button class="bf-zbtn" id="bf-btn-reset"
          style="margin-left:4px;font-size:0.7rem;letter-spacing:0.05em;width:auto;padding:0 12px;border-radius:20px;border:1px solid rgba(212,168,67,0.3);">
          RESET
        </button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const wrap     = document.getElementById('bf-popup-img-wrap');
  const canvas   = document.getElementById('bf-canvas');
  const img      = document.getElementById('bf-popup-img');
  const label    = document.getElementById('bf-zoom-label');
  const fill     = document.getElementById('bf-zoom-fill');
  const thumb    = document.getElementById('bf-zoom-thumb');
  const btnIn    = document.getElementById('bf-btn-in');
  const btnOut   = document.getElementById('bf-btn-out');
  const btnReset = document.getElementById('bf-btn-reset');
  const hint     = document.getElementById('bf-hint-tip');
  const track    = document.getElementById('bf-zoom-track');

  // Style the wrap as a clipping viewport
  wrap.style.cssText += `overflow:hidden;position:relative;`;
  // Canvas is the layer we translate+scale
  canvas.style.cssText = `position:absolute;top:0;left:0;transform-origin:0 0;`;

  setTimeout(() => { hint.style.opacity = '0'; }, 3500);

  /* ── core helpers ─────────────────────────────────────── */

  // Clamp pan so scaled image never shows a gap inside the wrap
  function clampPan() {
    const scaledW = baseW * scale;
    const scaledH = baseH * scale;
    // maximum pan in each direction (scaled image might be smaller → center it)
    const maxX = Math.max(0, scaledW - baseW);
    const maxY = Math.max(0, scaledH - baseH);
    // when image smaller than wrap (scale=1), centre it (pan=0)
    panX = scaledW <= baseW ? 0 : Math.max(-maxX, Math.min(0, panX));
    panY = scaledH <= baseH ? 0 : Math.max(-maxY, Math.min(0, panY));
  }

  function applyTransform() {
    clampPan();
    canvas.style.transform = `translate(${panX}px,${panY}px) scale(${scale})`;

    const MIN_SCALE = 1.0;
    const pct = ((scale - MIN_SCALE) / (MAX_SCALE - MIN_SCALE)) * 100;
    fill.style.width  = pct + '%';
    thumb.style.left  = pct + '%';
    label.textContent = Math.round(scale * 100) + '%';

    btnOut.disabled = scale <= MIN_SCALE + 0.001;
    btnIn.disabled  = scale >= MAX_SCALE - 0.001;
    wrap.style.cursor = scale > MIN_SCALE ? 'grab' : 'default';
  }

  function setScale(newScale, pivotX, pivotY) {
    // pivotX/Y = position inside the wrap (px from top-left)
    const MIN_SCALE = 1.0;
    const prev  = scale;
    const next  = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
    if (next === prev) return;
    // Adjust pan so the pixel under cursor stays fixed
    const px = pivotX !== undefined ? pivotX : baseW / 2;
    const py = pivotY !== undefined ? pivotY : baseH / 2;
    panX = px - (px - panX) * (next / prev);
    panY = py - (py - panY) * (next / prev);
    scale = next;
    applyTransform();
  }

  function resetView() {
    scale = 1.0; panX = 0; panY = 0;
    applyTransform();
  }

  /* ── image load: fit full image to viewport ────────────── */
  img.onload = () => {
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;

    // Available space inside popup (leave room for title + zoom bar + padding)
    const maxW = window.innerWidth  - 48;
    const maxH = window.innerHeight - 160;

    // Scale down to fit, but never scale up (keep crisp)
    const fitRatio = Math.min(maxW / nw, maxH / nh, 1);
    baseW = Math.round(nw * fitRatio);
    baseH = Math.round(nh * fitRatio);

    // Wrap = clipping window = fitted size
    wrap.style.width  = baseW + 'px';
    wrap.style.height = baseH + 'px';

    // Image inside canvas = same fitted size (scale=1 → full image visible)
    img.style.width  = baseW + 'px';
    img.style.height = baseH + 'px';

    applyTransform();
  };

  /* ── scroll to zoom ─────────────────────────────────────── */
  wrap.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect  = wrap.getBoundingClientRect();
    const px    = e.clientX - rect.left;
    const py    = e.clientY - rect.top;
    const delta = e.deltaY < 0 ? STEP : -STEP;
    setScale(scale + delta, px, py);
  }, { passive: false });

  /* ── drag to pan ──────────────────────────────────────── */
  wrap.addEventListener('mousedown', (e) => {
    if (scale <= 1.001) return;
    isDragging = true;
    lastX = e.clientX; lastY = e.clientY;
    wrap.style.cursor = 'grabbing';
    e.preventDefault();
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    panX += e.clientX - lastX;
    panY += e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    applyTransform();
  });
  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    wrap.style.cursor = scale > 1.001 ? 'grab' : 'default';
  });

  /* ── touch: drag + pinch ─────────────────────────────── */
  wrap.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1 && scale > 1.001) {
      isDragging = true;
      lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      isDragging = false;
      lastTouchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY);
    }
    e.preventDefault();
  }, { passive: false });
  wrap.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && isDragging) {
      panX += e.touches[0].clientX - lastX;
      panY += e.touches[0].clientY - lastY;
      lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
      applyTransform();
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY);
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - wrap.getBoundingClientRect().left;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - wrap.getBoundingClientRect().top;
      setScale(scale * (dist / lastTouchDist), midX, midY);
      lastTouchDist = dist;
    }
    e.preventDefault();
  }, { passive: false });
  wrap.addEventListener('touchend', () => { isDragging = false; });

  /* ── zoom track click ────────────────────────────────── */
  track.addEventListener('click', (e) => {
    const rect = track.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setScale(1.0 + pct * (MAX_SCALE - 1.0));
  });

  /* ── buttons ─────────────────────────────────────────── */
  btnIn.addEventListener('click',    () => setScale(scale + STEP));
  btnOut.addEventListener('click',   () => setScale(scale - STEP));
  btnReset.addEventListener('click', resetView);

  /* ── close ───────────────────────────────────────────── */
  function closePopup() {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.15s';
    setTimeout(() => overlay.remove(), 150);
    document.removeEventListener('keydown', escKey);
    window.removeEventListener('mousemove', arguments.callee);
    window.removeEventListener('mouseup',   arguments.callee);
  }
  const escKey = (e) => { if (e.key === 'Escape') closePopup(); };
  document.addEventListener('keydown', escKey);
  document.getElementById('bf-close-btn').addEventListener('click', closePopup);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });
}
