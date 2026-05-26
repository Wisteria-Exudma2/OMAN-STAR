/* ============================================================
   LORE.JS — OMAN Kitab Langit yang Kehilangan Bintang
   BGM Player (Supabase) + Bonfire + Fireflies + Starfield
   ============================================================ */
'use strict';

(function () {

  /* ══════════════════════════════════════════════════════════
     CONFIG — ganti URL_SUPABASE setelah upload ke Supabase
  ══════════════════════════════════════════════════════════ */
  const LORE_BGM_URL = 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Audio/Akustik%20OGG.ogg'; // ← isi URL Supabase di sini

  /* ══════════════════════════════════════════════════════════
     STATE
  ══════════════════════════════════════════════════════════ */
  let loreCanvas, loreCtx;
  let loreW, loreH;
  let loreRAF        = null;
  let loreActive     = false;
  let loreInitDone   = false;

  let stars     = [];
  let fireflies = [];
  let embers    = [];
  let flames    = [];
  let smoke     = [];

  /* ══════════════════════════════════════════════════════════
     BGM STATE
  ══════════════════════════════════════════════════════════ */
  let bgmAudio    = null;   // HTMLAudioElement (bgm-lore)
  let bgmReady    = false;
  let bgmPlaying  = false;
  let bgmVolume   = 0.6;
  let bgmFadeTimer = null;

  /* ══════════════════════════════════════════════════════════
     PUBLIC API
  ══════════════════════════════════════════════════════════ */

  /** Dipanggil saat navigateTo('lore') */
  window.initLore = function () {
    if (loreActive) return;
    loreActive = true;

    /* — Canvas — */
    loreCanvas = document.getElementById('lore-canvas');
    if (loreCanvas) {
      loreCanvas.style.display = 'block';
      loreCtx = loreCanvas.getContext('2d');
      resizeLore();
      buildAll();
      window.addEventListener('resize', resizeLore);
      loreRAF = requestAnimationFrame(loreTick);
    }

    /* — BGM — */
    bgmSetup();

    /* — Scroll reveal — */
    if (!loreInitDone) {
      setupScrollReveal();
      loreInitDone = true;
    }

    /* — Show BGM bar — */
    const bar = document.getElementById('lore-bgm-bar');
    if (bar) bar.classList.remove('lore-bgm-hidden');
  };

  /** Dipanggil saat pindah ke tab lain */
  window.destroyLore = function () {
    if (!loreActive) return;
    loreActive = false;

    if (loreRAF) { cancelAnimationFrame(loreRAF); loreRAF = null; }
    window.removeEventListener('resize', resizeLore);

    if (loreCanvas) loreCanvas.style.display = 'none';
    stars = []; fireflies = []; embers = []; flames = []; smoke = [];

    loreBgmStop();

    const bar = document.getElementById('lore-bgm-bar');
    if (bar) bar.classList.add('lore-bgm-hidden');
  };

  /** Stop BGM saja (tanpa destroy canvas) */
  window.loreBgmStop = function () {
    bgmFadeOut(() => {
      if (bgmAudio) {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
      }
      bgmPlaying = false;
      bgmSetStatus('idle');
      bgmSetIcons(false);
    });
  };

  /* ══════════════════════════════════════════════════════════
     BGM SETUP
  ══════════════════════════════════════════════════════════ */
  function bgmSetup() {
    bgmAudio = document.getElementById('bgm-lore');

    /* Kalau elemen audio sudah ada di HTML, gunakan itu.
       Kalau tidak ada, buat baru dari URL config.          */
    if (!bgmAudio) {
      bgmAudio = new Audio();
      bgmAudio.id   = 'bgm-lore';
      bgmAudio.loop = true;
      bgmAudio.preload = 'auto';
      document.body.appendChild(bgmAudio);
    }

    /* Set source dari config jika placeholder belum diganti */
    if (LORE_BGM_URL && LORE_BGM_URL !== 'GANTI_DENGAN_URL_SUPABASE_KAMU') {
      if (bgmAudio.src !== LORE_BGM_URL) {
        bgmAudio.src = LORE_BGM_URL;
        bgmAudio.load();
      }
    }

    bgmAudio.volume = 0;      // mulai dari 0, fade-in setelah play
    bgmAudio.loop   = true;

    /* Event listeners */
    bgmAudio.addEventListener('canplaythrough', onBgmReady, { once: true });
    bgmAudio.addEventListener('error',          onBgmError);
    bgmAudio.addEventListener('timeupdate',     onBgmTime);
    bgmAudio.addEventListener('ended',          onBgmEnded);

    /* UI controls */
    const playBtn = document.getElementById('lore-bgm-play');
    const volSlider = document.getElementById('lore-bgm-vol');

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (bgmPlaying) {
          bgmPause();
        } else {
          bgmPlay();
        }
      });
    }

    if (volSlider) {
      volSlider.value = bgmVolume * 100;
      volSlider.addEventListener('input', () => {
        bgmVolume = volSlider.value / 100;
        if (bgmAudio) bgmAudio.volume = bgmVolume;
      });
    }

    /* Set status loading & coba autoplay */
    bgmSetStatus('loading');
    bgmPlay();
  }

  function onBgmReady() {
    bgmReady = true;
    bgmSetStatus(bgmPlaying ? 'playing' : 'idle');
  }

  function onBgmError() {
    bgmReady = false;
    bgmSetStatus('error');
    console.warn('[LoreBGM] Gagal memuat audio. Pastikan URL Supabase sudah diisi di lore.js');
  }

  function onBgmTime() {
    if (!bgmAudio || !bgmAudio.duration) return;
    const pct = (bgmAudio.currentTime / bgmAudio.duration) * 100;
    const fill = document.getElementById('lore-bgm-fill');
    if (fill) fill.style.width = pct + '%';
  }

  function onBgmEnded() {
    /* loop sudah di-set true, tapi fallback: */
    if (bgmAudio && bgmPlaying) {
      bgmAudio.currentTime = 0;
      bgmAudio.play().catch(() => {});
    }
  }

  /* ══════════════════════════════════════════════════════════
     BGM PLAY / PAUSE / FADE
  ══════════════════════════════════════════════════════════ */
  function bgmPlay() {
    if (!bgmAudio) return;

    /* Browser policy: perlu user gesture. Coba langsung,
       jika gagal pasang listener sekali klik di halaman.  */
    const tryPlay = () => {
      bgmAudio.volume = 0;
      bgmAudio.play().then(() => {
        bgmPlaying = true;
        bgmSetStatus('playing');
        bgmSetIcons(true);
        bgmFadeIn();
      }).catch(() => {
        /* Autoplay diblokir — pasang listener gesture */
        bgmSetStatus('idle');
        const page = document.getElementById('page-lore');
        if (page) page.addEventListener('click', tryPlay, { once: true });
      });
    };

    tryPlay();
  }

  function bgmPause() {
    if (!bgmAudio) return;
    bgmFadeOut(() => {
      bgmAudio.pause();
      bgmPlaying = false;
      bgmSetStatus('idle');
      bgmSetIcons(false);
    });
  }

  function bgmFadeIn() {
    clearInterval(bgmFadeTimer);
    let v = bgmAudio.volume;
    bgmFadeTimer = setInterval(() => {
      v = Math.min(bgmVolume, v + 0.03);
      if (bgmAudio) bgmAudio.volume = v;
      if (v >= bgmVolume) clearInterval(bgmFadeTimer);
    }, 60);
  }

  function bgmFadeOut(cb) {
    clearInterval(bgmFadeTimer);
    if (!bgmAudio || bgmAudio.paused) { if (cb) cb(); return; }
    let v = bgmAudio.volume;
    bgmFadeTimer = setInterval(() => {
      v = Math.max(0, v - 0.04);
      if (bgmAudio) bgmAudio.volume = v;
      if (v <= 0) {
        clearInterval(bgmFadeTimer);
        if (cb) cb();
      }
    }, 60);
  }

  /* ── UI helpers ──────────────────────────────────────── */
  function bgmSetIcons(playing) {
    const iconPlay  = document.getElementById('lore-bgm-icon-play');
    const iconPause = document.getElementById('lore-bgm-icon-pause');
    if (iconPlay)  iconPlay.style.display  = playing ? 'none'  : 'block';
    if (iconPause) iconPause.style.display = playing ? 'block' : 'none';
  }

  function bgmSetStatus(state) {
    /* state: 'idle' | 'playing' | 'loading' | 'error' */
    const dot = document.querySelector('.lore-bgm-status');
    if (!dot) return;
    dot.className = 'lore-bgm-status ' + (state !== 'idle' ? state : '');

    const sub = document.querySelector('.lore-bgm-sub');
    if (sub) {
      const labels = {
        loading : 'Memuat audio...',
        playing : 'Sedang diputar ♪',
        error   : 'Audio tidak tersedia',
        idle    : 'Kitab Langit yang Kehilangan Bintang',
      };
      sub.textContent = labels[state] || labels.idle;
    }
  }

  /* ══════════════════════════════════════════════════════════
     CANVAS — RESIZE & BUILD
  ══════════════════════════════════════════════════════════ */
  function resizeLore() {
    loreW = loreCanvas.width  = window.innerWidth;
    loreH = loreCanvas.height = window.innerHeight;
    buildAll();
  }

  function buildAll() {
    buildStars();
    buildFireflies();
    buildFlames();
  }

  /* ══════════════════════════════════════════════════════════
     STARFIELD
  ══════════════════════════════════════════════════════════ */
  function buildStars() {
    stars = [];
    const N = Math.floor((loreW * loreH) / 3000);
    for (let i = 0; i < N; i++) {
      stars.push({
        x: Math.random() * loreW,
        y: Math.random() * loreH * 0.74,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.008 + 0.003,
        phase: Math.random() * Math.PI * 2,
        color: starColor(),
      });
    }
    // Ra — bintang merah terakhir
    stars.push({
      x: loreW * 0.78, y: loreH * 0.1,
      r: 3.5, alpha: 1, speed: 0.004, phase: 0,
      color: '#ff4422', isRa: true,
    });
  }

  function starColor() {
    return ['#ffffff','#ffe8d0','#d0e8ff','#ffd97a','#e8d0ff'][Math.floor(Math.random()*5)];
  }

  function drawStars(t) {
    stars.forEach(s => {
      const a = s.alpha + Math.sin(t * s.speed * 60 + s.phase) * 0.28;
      loreCtx.save();
      if (s.isRa) {
        const grd = loreCtx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 20);
        grd.addColorStop(0, 'rgba(255,100,50,0.9)');
        grd.addColorStop(0.3, 'rgba(255,60,20,0.35)');
        grd.addColorStop(1, 'rgba(255,30,10,0)');
        loreCtx.fillStyle = grd;
        loreCtx.beginPath(); loreCtx.arc(s.x, s.y, 20, 0, Math.PI*2); loreCtx.fill();
      }
      loreCtx.globalAlpha = Math.max(0, Math.min(1, a));
      loreCtx.fillStyle   = s.color;
      loreCtx.shadowColor = s.color;
      loreCtx.shadowBlur  = s.isRa ? 14 : 4;
      loreCtx.beginPath(); loreCtx.arc(s.x, s.y, s.r, 0, Math.PI*2); loreCtx.fill();
      loreCtx.restore();
    });
  }

  /* ══════════════════════════════════════════════════════════
     FIREFLIES
  ══════════════════════════════════════════════════════════ */
  function buildFireflies() {
    fireflies = [];
    const N = Math.floor(loreW / 20);
    for (let i = 0; i < N; i++) fireflies.push(newFirefly(false));
  }

  function newFirefly(fromBottom) {
    return {
      x:     Math.random() * loreW,
      y:     fromBottom ? loreH + 10 : Math.random() * loreH,
      vx:    (Math.random() - 0.5) * 0.45,
      vy:    -(Math.random() * 0.35 + 0.1),
      r:     Math.random() * 1.8 + 0.8,
      maxA:  Math.random() * 0.7 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.006,
      wx:    (Math.random() - 0.5) * 0.008,
      color: ['#aaff66','#88ff44','#ccff88','#ffffaa','#ffee66','#aaffee'][Math.floor(Math.random()*6)],
    };
  }

  function updateFireflies(t) {
    fireflies.forEach((f, i) => {
      f.x += f.vx + Math.sin(t * f.speed + f.phase) * 0.4;
      f.y += f.vy;
      f.vx += f.wx;
      if (f.y < -20 || f.x < -20 || f.x > loreW + 20) fireflies[i] = newFirefly(true);
    });
  }

  function drawFireflies(t) {
    fireflies.forEach(f => {
      const a = f.maxA * (0.5 + 0.5 * Math.sin(t * f.speed * 3 + f.phase));
      loreCtx.save();
      loreCtx.globalAlpha = a;
      const grd = loreCtx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 4);
      grd.addColorStop(0, f.color);
      grd.addColorStop(0.4, f.color + '88');
      grd.addColorStop(1, f.color + '00');
      loreCtx.fillStyle = grd;
      loreCtx.beginPath(); loreCtx.arc(f.x, f.y, f.r * 4, 0, Math.PI*2); loreCtx.fill();
      loreCtx.globalAlpha = a;
      loreCtx.fillStyle = '#ffffff';
      loreCtx.shadowColor = f.color;
      loreCtx.shadowBlur = 8;
      loreCtx.beginPath(); loreCtx.arc(f.x, f.y, f.r * 0.6, 0, Math.PI*2); loreCtx.fill();
      loreCtx.restore();
    });
  }

  /* ══════════════════════════════════════════════════════════
     BONFIRE
  ══════════════════════════════════════════════════════════ */
  const FX = () => loreW * 0.5;
  const FY = () => loreH * 0.88;

  function buildFlames() {
    flames = []; embers = []; smoke = [];
    for (let i = 0; i < 44; i++) flames.push(newFlame(true));
    for (let i = 0; i < 28; i++) embers.push(newEmber(true));
    for (let i = 0; i < 12; i++) smoke.push(newSmoke(true));
  }

  /* — Flames — */
  function newFlame(init) {
    const life = Math.random() * 0.5 + 0.5;
    return {
      x: FX() + (Math.random()-0.5)*42, y: FY(),
      vx: (Math.random()-0.5)*0.8, vy: -(Math.random()*2.5+1.5),
      size: Math.random()*22+14,
      life: init ? Math.random() : life, maxLife: life,
      wx: (Math.random()-0.5)*0.06,
    };
  }

  function updateFlames(t) {
    flames.forEach((f, i) => {
      f.life -= 0.018 + Math.random()*0.007;
      f.x += f.vx + Math.sin(t*1.3 + i*0.4)*0.35;
      f.y += f.vy;
      f.vx += f.wx;
      f.size *= 0.986;
      if (f.life <= 0) {
        const nf = newFlame(false);
        nf.x = FX() + (Math.random()-0.5)*38;
        nf.y = FY();
        flames[i] = nf;
      }
    });
  }

  function drawFlames() {
    drawLogs();
    flames.forEach(f => {
      const p  = f.life / f.maxLife;
      const sz = f.size * p;
      let r, g, b;
      if (p > 0.7)      { r=255; g=220+((p-0.7)/0.3)*35; b=80+((p-0.7)/0.3)*80; }
      else if (p > 0.4) { const t=(p-0.4)/0.3; r=255; g=100+t*120; b=10+t*70; }
      else              { const t=p/0.4; r=200+t*55; g=40+t*60; b=0; }
      loreCtx.save();
      const grd = loreCtx.createRadialGradient(f.x, f.y, 0, f.x, f.y, sz);
      grd.addColorStop(0,    `rgba(${r},${g},${b},${p*0.88})`);
      grd.addColorStop(0.45, `rgba(${r},${Math.max(0,g-60)},0,${p*0.5})`);
      grd.addColorStop(1,    `rgba(${r},0,0,0)`);
      loreCtx.fillStyle = grd;
      loreCtx.beginPath(); loreCtx.arc(f.x, f.y, sz, 0, Math.PI*2); loreCtx.fill();
      loreCtx.restore();
    });
  }

  function drawLogs() {
    const fx = FX(), fy = FY() + 14;
    loreCtx.save();
    loreCtx.shadowColor = '#ff6600'; loreCtx.shadowBlur = 32;

    loreCtx.fillStyle = '#3d1a08';
    loreCtx.beginPath(); loreCtx.ellipse(fx-22, fy+4, 38, 9, -0.45, 0, Math.PI*2); loreCtx.fill();
    loreCtx.fillStyle = '#5a2a10';
    loreCtx.beginPath(); loreCtx.ellipse(fx-22, fy+2, 38, 7, -0.45, 0, Math.PI*2); loreCtx.fill();

    loreCtx.fillStyle = '#3d1a08';
    loreCtx.beginPath(); loreCtx.ellipse(fx+22, fy+4, 38, 9, 0.45, 0, Math.PI*2); loreCtx.fill();
    loreCtx.fillStyle = '#5a2a10';
    loreCtx.beginPath(); loreCtx.ellipse(fx+22, fy+2, 38, 7, 0.45, 0, Math.PI*2); loreCtx.fill();

    const grd = loreCtx.createRadialGradient(fx, fy+16, 0, fx, fy+16, 100);
    grd.addColorStop(0, 'rgba(255,100,20,0.22)');
    grd.addColorStop(0.5, 'rgba(255,60,10,0.09)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    loreCtx.fillStyle = grd;
    loreCtx.beginPath(); loreCtx.ellipse(fx, fy+16, 100, 24, 0, 0, Math.PI*2); loreCtx.fill();
    loreCtx.restore();
  }

  /* — Embers — */
  function newEmber(init) {
    const life = Math.random()*120+60;
    return {
      x: FX()+(Math.random()-0.5)*32, y: FY()-Math.random()*18,
      vx: (Math.random()-0.5)*1.8, vy: -(Math.random()*2.5+1.2),
      life: init ? Math.random()*life : life, maxLife: life,
      r: Math.random()*2.2+0.8, wx: (Math.random()-0.5)*0.04,
    };
  }

  function updateEmbers() {
    embers.forEach((e, i) => {
      e.life -= 1; e.x += e.vx; e.y += e.vy; e.vx += e.wx; e.vy += 0.03;
      if (e.life <= 0) embers[i] = newEmber(false);
    });
  }

  function drawEmbers() {
    embers.forEach(e => {
      const p = e.life / e.maxLife;
      loreCtx.save();
      loreCtx.globalAlpha = p * 0.9;
      const col = p > 0.5 ? '#ffcc44' : '#ff6600';
      loreCtx.shadowColor = col; loreCtx.shadowBlur = 6; loreCtx.fillStyle = col;
      loreCtx.beginPath(); loreCtx.arc(e.x, e.y, e.r*p, 0, Math.PI*2); loreCtx.fill();
      loreCtx.restore();
    });
  }

  /* — Smoke — */
  function newSmoke(init) {
    const life = Math.random()*160+80;
    return {
      x: FX()+(Math.random()-0.5)*22, y: FY()-20,
      vx: (Math.random()-0.5)*0.5, vy: -(Math.random()*0.8+0.4),
      life: init ? Math.random()*life : life, maxLife: life,
      r: Math.random()*18+10, wx: (Math.random()-0.5)*0.007,
    };
  }

  function updateSmoke() {
    smoke.forEach((s, i) => {
      s.life -= 0.8; s.x += s.vx; s.y += s.vy; s.vx += s.wx; s.r += 0.14;
      if (s.life <= 0) smoke[i] = newSmoke(false);
    });
  }

  function drawSmoke() {
    smoke.forEach(s => {
      loreCtx.save();
      loreCtx.globalAlpha = (s.life/s.maxLife) * 0.09;
      loreCtx.fillStyle = '#ccbbaa';
      loreCtx.beginPath(); loreCtx.arc(s.x, s.y, s.r, 0, Math.PI*2); loreCtx.fill();
      loreCtx.restore();
    });
  }

  /* ══════════════════════════════════════════════════════════
     BACKGROUND
  ══════════════════════════════════════════════════════════ */
  function drawBackground() {
    const fy = FY();
    const sky = loreCtx.createLinearGradient(0, 0, 0, loreH);
    sky.addColorStop(0,    '#020008');
    sky.addColorStop(0.45, '#06010e');
    sky.addColorStop(0.72, '#0a0515');
    sky.addColorStop(0.88, '#1a0608');
    sky.addColorStop(1,    '#2a0a04');
    loreCtx.fillStyle = sky;
    loreCtx.fillRect(0, 0, loreW, loreH);

    const grdAmb = loreCtx.createRadialGradient(FX(), fy, 0, FX(), fy, loreW*0.48);
    grdAmb.addColorStop(0,   'rgba(255,80,20,0.14)');
    grdAmb.addColorStop(0.4, 'rgba(180,40,10,0.06)');
    grdAmb.addColorStop(1,   'rgba(0,0,0,0)');
    loreCtx.fillStyle = grdAmb;
    loreCtx.fillRect(0, 0, loreW, loreH);

    drawTrees(fy);
  }

  function drawTrees(fy) {
    const base = fy + 20;
    loreCtx.save();
    loreCtx.fillStyle = '#050308';

    function pine(x, bY, w, h) {
      loreCtx.beginPath();
      loreCtx.moveTo(x, bY); loreCtx.lineTo(x-w/2, bY); loreCtx.lineTo(x, bY-h); loreCtx.lineTo(x+w/2, bY);
      loreCtx.closePath(); loreCtx.fill();
      loreCtx.beginPath();
      loreCtx.moveTo(x, bY-h*0.38); loreCtx.lineTo(x-w*0.58, bY-h*0.38); loreCtx.lineTo(x, bY-h*1.28); loreCtx.lineTo(x+w*0.58, bY-h*0.38);
      loreCtx.closePath(); loreCtx.fill();
      loreCtx.fillRect(x-4, bY, 8, 16);
    }

    loreCtx.fillRect(0, base, loreW, loreH - base);

    pine(loreW*0.04,  base, 55, 110);
    pine(loreW*0.11,  base, 70, 142);
    pine(loreW*0.19,  base, 50, 102);
    pine(loreW*0.265, base, 42, 90);

    pine(loreW*0.96,  base, 55, 118);
    pine(loreW*0.89,  base, 68, 138);
    pine(loreW*0.81,  base, 52, 108);
    pine(loreW*0.73,  base, 44, 88);

    loreCtx.restore();
  }

  /* ══════════════════════════════════════════════════════════
     MAIN LOOP
  ══════════════════════════════════════════════════════════ */
  let loreT = 0;
  function loreTick(ts) {
    if (!loreActive) return;
    loreT = ts / 1000;

    loreCtx.clearRect(0, 0, loreW, loreH);
    drawBackground();
    drawStars(loreT);
    updateFireflies(loreT); drawFireflies(loreT);
    updateSmoke();          drawSmoke();
    updateFlames(loreT);    drawFlames();
    updateEmbers();         drawEmbers();

    loreRAF = requestAnimationFrame(loreTick);
  }

  /* ══════════════════════════════════════════════════════════
     SCROLL REVEAL
  ══════════════════════════════════════════════════════════ */
  function setupScrollReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('lore-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.07 });
    document.querySelectorAll('.lore-chapter').forEach(c => io.observe(c));
  }

  /* ══════════════════════════════════════════════════════════
     TOC SCROLL HELPER
  ══════════════════════════════════════════════════════════ */
  window.loreScroll = function(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

})();
