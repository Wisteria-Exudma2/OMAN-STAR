/* ============================================================
   IDCARD.JS — OMAN WEBSITE
   Halaman "ID CARD PLAYER" — form pembuatan karakter, preview
   kartu (sesuai format ID Card kamu persis), simpan & lihat
   daftar via Supabase.

   Bergantung pada (harus sudah dimuat SEBELUM file ini):
   - data.js        (RACE_DATA, CLASS_DATA, FACTION_DATA, RA_MONTHS)
   - calculator.js  (supabaseClient)
   ============================================================ */

'use strict';

// Nama tabel Supabase. Jalankan id_card_schema.sql dulu di project kamu.
const IDCARD_TABLE = 'id_cards';

// Tahun OMAN sekarang (Kalender RA). Dipakai untuk menghitung umur
// otomatis dari tahun lahir yang diisi player (bukan dari input manual).
// Ikut naik tiap tahun mengikuti RA_YEAR_OFFSET dari data.js, dengan
// fallback ke 2500 kalau data.js belum sempat dimuat.
const OMAN_CURRENT_YEAR = (typeof RA_YEAR_OFFSET !== 'undefined')
  ? (new Date().getFullYear() + RA_YEAR_OFFSET)
  : 2500;

// Daftar Roh Elemen untuk ritual "Spin Elemen" (sekali seumur hidup per karakter)
//
// CARA PAKAI GAMBAR SENDIRI:
// Isi "image" dengan path/URL gambar kamu (contoh: "assets/elements/fire.png"
// kalau taruh di folder assets, atau URL dari Supabase Storage bucket "images").
// Kalau "image" dikosongkan (image: '') atau gambarnya gagal dimuat, otomatis
// fallback ke emoji di "icon" — jadi tidak akan pernah tampil rusak/kosong.
const ELEMENT_SPIRITS = [
  { id: 'fire', name: 'Fire', icon: '🔥', image: 'assets/elements/fire.png', color: '#ff6b4a',
    message: "Api dalam dirimu tak pernah padam meski dunia mengering. Fire Spirit melihat keberanian yang membara di balik matamu — biarkan semangat itu membakar jalan bagi mereka yang gentar melangkah." },
  { id: 'water', name: 'Water', icon: '💧', image: 'assets/elements/water.png', color: '#4fc3f7',
    message: "Seperti mata air yang mengalir tenang di tengah gurun tandus, Water Spirit mengakui ketenangan dalam jiwamu. Jadilah oasis bagi yang letih, dan jangan pernah kehilangan kelembutan itu." },
  { id: 'ice', name: 'Ice', icon: '❄️', image: 'assets/elements/ice.png', color: '#80d8ff',
    message: "Dinginnya malam OMAN mengajarkan kejernihan berpikir, dan Ice Spirit mengakui ketenangan yang membeku dalam dirimu. Pikiran sejernih kristal akan membawamu melewati badai apa pun." },
  { id: 'lightning', name: 'Lightning', icon: '⚡', image: 'assets/elements/lightning.png', color: '#ffd740',
    message: "Bintang yang retak melahirkan percikan pertama — dan Lightning Spirit menemukan percikan itu dalam dirimu. Bergeraklah secepat kilat, karena satu keputusanmu bisa mengubah jalannya pertempuran." },
  { id: 'light', name: 'Light', icon: '✨', image: 'assets/elements/light.png', color: '#ffe082',
    message: "Ra masih bersinar sendirian di langit, dan Light Spirit melihat cahaya yang sama di dalam jiwamu. Jadilah penerang bagi mereka yang tersesat dalam gelapnya malam panjang." },
  { id: 'dark', name: 'Dark', icon: '🌑', image: 'assets/elements/dark.png', color: '#9575cd',
    message: "Ada kegelapan yang tak pernah bersinar, namun tak pernah benar-benar tiada. Dark Spirit mengakui kekuatan yang bersembunyi dalam diammu — kadang jawaban terbesar lahir dari bayangan yang paling dalam." },
  { id: 'earth', name: 'Earth', icon: '🌿', image: 'assets/elements/earth.png', color: '#81c784',
    message: "Akar yang kuat menopang pohon tertinggi. Earth Spirit mengakui fondasi kokoh dalam dirimu — tetaplah teguh, dan biarkan orang lain berteduh di bawah kekuatanmu." },
  { id: 'wind', name: 'Wind', icon: '🌪️', image: 'assets/elements/wind.png', color: '#b0bec5',
    message: "Padang pasir OMAN hanya tunduk pada mereka yang bergerak seperti angin — bebas dan tak tertahan. Wind Spirit mengakui jiwa pengembara dalam dirimu, yang selalu menemukan jalan meski peta telah usang." },
];
function getElementSpirit(id) {
  return ELEMENT_SPIRITS.find(e => e.id === id) || null;
}

// Render ikon elemen: pakai gambar custom kalau ada, fallback ke emoji
// otomatis kalau "image" kosong atau gagal dimuat (404, dll).
function elementIconHtml(spirit) {
  if (spirit.image) {
    return `<img src="${escAttr(spirit.image)}" alt="${escAttr(spirit.name)}" onerror="handleElementImgError(this,'${spirit.icon}')" />`;
  }
  return spirit.icon;
}
function handleElementImgError(img, emoji) {
  const span = document.createElement('span');
  span.textContent = emoji;
  img.replaceWith(span);
}

// ─── SOUND EFFECT RITUAL SPIN (opsional) ─────────────────────
// Isi path/URL file suara kamu di sini (mp3/ogg/wav semua bisa).
// - spin   : suara berputar, akan di-loop selama ritual berjalan (4 detik)
// - reveal : suara singkat saat elemen akhirnya ditemukan
// Kalau salah satu (atau keduanya) dikosongkan (''), atau file gagal
// dimuat, fitur suara otomatis nonaktif tanpa memunculkan error.
const IDC_SOUND = {
  spin: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Spin%20sound/Jackpot%20Sound%20Effect%20_%20High%20Quality%20Casino%20Win%20Audio.mp3',
  reveal: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Spin%20sound/pw23check-winning-218995.mp3',
};

let idcSpinAudio = null;
let idcSoundMuted = (function () {
  try { return localStorage.getItem('idc_sound_muted') === '1'; } catch (e) { return false; }
})();

function idcPlaySpinLoop() {
  if (idcSoundMuted || !IDC_SOUND.spin) return;
  try {
    idcSpinAudio = new Audio(IDC_SOUND.spin);
    idcSpinAudio.loop = true;
    idcSpinAudio.volume = 0.5;
    idcSpinAudio.addEventListener('error', () => { idcSpinAudio = null; });
    idcSpinAudio.play().catch(() => { /* browser blokir autoplay / file tidak ada, diamkan */ });
  } catch (e) { /* diamkan */ }
}
function idcStopSpinLoop() {
  if (idcSpinAudio) {
    try { idcSpinAudio.pause(); idcSpinAudio.currentTime = 0; } catch (e) {}
    idcSpinAudio = null;
  }
}
function idcPlayReveal() {
  if (idcSoundMuted || !IDC_SOUND.reveal) return;
  try {
    const a = new Audio(IDC_SOUND.reveal);
    a.volume = 0.6;
    a.play().catch(() => {});
  } catch (e) { /* diamkan */ }
}
function toggleIdcSound(btnEl) {
  idcSoundMuted = !idcSoundMuted;
  try { localStorage.setItem('idc_sound_muted', idcSoundMuted ? '1' : '0'); } catch (e) {}
  if (idcSoundMuted) idcStopSpinLoop();
  if (btnEl) btnEl.textContent = idcSoundMuted ? '🔇' : '🔊';
}

// ─── STATE ──────────────────────────────────────────────────
let currentIdcTab = 'form';

function defaultIdcState() {
  return {
    id: null,
    playerName: '',
    name: '',
    gender: 'Female',
    day: '',
    month: (typeof RA_MONTHS !== 'undefined' && RA_MONTHS[0]) ? RA_MONTHS[0].name : 'Qamarun',
    year: '',
    class_: (typeof CLASS_DATA !== 'undefined') ? Object.keys(CLASS_DATA)[0] : '',
    race: (typeof RACE_DATA !== 'undefined') ? RACE_DATA[0].id : '',
    element: '',
    faction: (typeof FACTION_DATA !== 'undefined') ? FACTION_DATA[0].id : '',
    alliance: '',
    party: '',
    level: 1,
    job: '',
    title: '',
    zen: 500,
    equipHead: '',
    equipBody: '',
    equipMain: '',
    equipOff: '',
    equipLegs: '',
    equipAcc: '',
    items: [''],
    origin: '',
    visual: '',
  };
}
let idcState = defaultIdcState();

// ─── HELPERS ────────────────────────────────────────────────
function escAttr(v) {
  return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
function escHtml(v) {
  return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function getRaceName(id) {
  const r = (RACE_DATA || []).find(x => x.id === id);
  return r ? r.name : (id || '-');
}
function getFactionName(id) {
  const f = (FACTION_DATA || []).find(x => x.id === id);
  return f ? f.name : (id || '-');
}
function getClassName(id) {
  return (CLASS_DATA && CLASS_DATA[id]) ? CLASS_DATA[id].name : (id || '-');
}
function pad2(n) { return String(n).padStart(2, '0'); }
function buildBirthday(s) {
  if (!s.day && !s.year) return '';
  const d = s.day ? pad2(parseInt(s.day)) : '??';
  const y = s.year || '????';
  return `${d}-${s.month}-${y}`;
}
// Umur otomatis = Tahun OMAN sekarang - Tahun lahir (RA)
function getAge(s) {
  const y = parseInt(s.year);
  if (!s.year || isNaN(y)) return '';
  const age = OMAN_CURRENT_YEAR - y;
  return age >= 0 ? age : '';
}

// ─── GENERATE ISI ID CARD (persis format kamu) ───────────────
function generateCardLines(s) {
  const L = [];
  const push = (type, text) => L.push({ type, text });
  const birthday = buildBirthday(s) || '-';
  const items = (s.items || []).map(i => (i || '').trim()).filter(Boolean);
  const zenDisplay = Number(s.zen || 0).toLocaleString('id-ID');

  push('title', '┏═══════◥◣◆◢◤═══════┓');
  push('title', '✦✦✦✦ [ ID CARD PLAYER ]✦✦✦✦');
  push('title', '┗═══════◢◤◆◥◣═══════┛');
  push('field', `➵|| Name    : ${s.name || '-'}`);
  push('field', `➵|| Age        : ${getAge(s) || '-'}`);
  push('field', `➵|| Gender  : ${s.gender || '-'}`);
  push('field', `➵|| Birthday: ${birthday}`);
  push('field', `➵|| Class     : ${getClassName(s.class_)}`);
  push('field', `➵|| Race      : ${getRaceName(s.race)}`);
  push('field', `➵|| Element: ${getElementSpirit(s.element) ? getElementSpirit(s.element).name : (s.element || '-')}`);
  push('div', '---━─━────༺༻────━─━---');
  push('field', `命 Faction  : ${getFactionName(s.faction)}`);
  push('field', `命 Alliance : ${s.alliance || '-'}`);
  push('field', `命 Party      : ${s.party || '-'}`);
  push('div', '---━─━────༺༻────━─━---');
  push('field', `𖤓 Level      : ${s.level || 1}`);
  push('field', `𖤓 Job         : ${s.job || '-'}`);
  push('field', `𖤓 Title        : ${s.title || '-'}`);
  push('plain', '╰--➤');
  push('plain', '╰--➤');
  push('section', '⫘⫘⫘ OMAN Bank ⫘⫘⫘');
  push('field', `✧ Total Zen's: ${zenDisplay}`);
  push('div', '⫘⫘⫘⫘⫘✧⫘⫘⫘⫘⫘');
  push('section', '✧ Player Equipment:');
  push('field', `╰--➤ Head: ${s.equipHead || '-'}`);
  push('field', `╰--➤ Body: ${s.equipBody || '-'}`);
  push('field', `╰--➤ Main-Hand: ${s.equipMain || '-'}`);
  push('field', `╰--➤ Off-Hand: ${s.equipOff || '-'}`);
  push('field', `╰--➤ Legs: ${s.equipLegs || '-'}`);
  push('field', `╰--➤ Accessory: ${s.equipAcc || '-'}`);
  push('section', '✧ Player Items:');
  if (items.length) {
    items.forEach(it => push('field', `╰--➤ ${it}`));
  } else {
    push('field', '╰--➤ -');
  }
  push('div', '---━─━────༺༻────━─━---');
  push('field', `𖤓 Origin : ${s.origin || '-'}`);
  push('field', `𖤓 Visual : ${s.visual || '-'}`);
  push('title', '===========❖❖❖===========');
  push('plain', '© Oman Roleplay Community');
  return L;
}
function generateCardText(s) {
  return generateCardLines(s).map(l => l.text).join('\n');
}
function generateCardHTML(s) {
  return generateCardLines(s).map(l => `<span class="idc-l idc-l-${l.type}">${escHtml(l.text)}</span>`).join('\n');
}

// ─── PAGE RENDER (dipanggil dari main.js) ────────────────────
function renderIdCardPage() {
  document.querySelectorAll('#idc-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#idc-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentIdcTab = btn.dataset.idc;
      renderIdCardDisplay(currentIdcTab);
    });
  });
  renderIdCardDisplay(currentIdcTab);
}
function renderIdCardDisplay(type) {
  if (type === 'list') renderIdCardList();
  else if (type === 'update') renderUpdateCharacterTab();
  else renderIdCardForm();
}

// ─── PREVIEW KARTU ────────────────────────────────────────────
function renderIdcPreview(s) {
  return `
    <div class="idc-card-frame">
      <pre class="idc-card-pre">${generateCardHTML(s)}</pre>
    </div>
    <div style="display:flex; gap:10px; margin-top:14px; flex-wrap:wrap;">
      <button class="btn-secondary" style="flex:1;min-width:160px;" onclick="copyIdCardText()">📋 Salin Teks ID Card</button>
      <button class="btn-primary" style="flex:1;min-width:160px;" onclick="saveIdCard()">💾 Simpan ID Card</button>
    </div>
    <div id="idc-msg" style="margin-top:10px;font-size:0.78rem;font-family:var(--font-ui);"></div>
  `;
}
function updateIdcPreview() {
  const el = document.getElementById('idc-preview-area');
  if (el) el.innerHTML = renderIdcPreview(idcState);
  const hint = document.getElementById('idc-age-hint');
  if (hint) {
    const age = getAge(idcState);
    hint.textContent = age !== '' ? `≈ Usia sekarang: ${age} tahun` : '';
  }
}

// ─── EDITOR ITEM (dinamis, bisa tambah/hapus baris) — dipakai di tab Update Character ──
function itemsEditorHtmlU(items) {
  return items.map((val, idx) => `
    <div style="display:flex;gap:8px;margin-bottom:8px;">
      <input class="form-input" type="text" placeholder="Contoh: Ramuan Kecil" value="${escAttr(val)}"
        oninput="idcUpdateState.items[${idx}]=this.value; updateIdcuPreview();" style="flex:1;" />
      ${items.length > 1 ? `<button class="btn-secondary" style="padding:0 14px;color:#ef9a9a;border-color:#ef9a9a;" onclick="removeIdcuItem(${idx})">✕</button>` : ''}
    </div>
  `).join('');
}
function addIdcuItem() {
  if (idcUpdateState.items.length >= 8) return;
  idcUpdateState.items.push('');
  renderUpdateCharacterEditor();
}
function removeIdcuItem(idx) {
  idcUpdateState.items.splice(idx, 1);
  if (idcUpdateState.items.length === 0) idcUpdateState.items = [''];
  renderUpdateCharacterEditor();
}

// ─── ELEMENT: RITUAL SPIN (sekali seumur hidup per karakter) ─
function renderElementFieldHtml(s) {
  const spirit = getElementSpirit(s.element);
  if (spirit) {
    return `
      <div class="idc-element-locked" style="border-color:${spirit.color}66;">
        <span class="idc-element-locked-icon">${elementIconHtml(spirit)}</span>
        <div>
          <div class="idc-element-locked-name" style="color:${spirit.color};">${spirit.name} Spirit</div>
          <div class="idc-element-locked-note">Elemen sudah ditentukan lewat ritual — tidak bisa diubah lagi.</div>
        </div>
      </div>`;
  }
  return `<button type="button" class="btn-primary" style="width:100%;" onclick="openElementSpinModal()">🎲 Tentukan Elemen (Sekali Seumur Hidup)</button>`;
}

function openElementSpinModal() {
  if (idcState.element) return; // sudah pernah spin, tidak bisa diulang
  const overlay = document.createElement('div');
  overlay.className = 'idc-spin-overlay';
  overlay.id = 'idc-spin-overlay';
  overlay.innerHTML = `
    <div class="idc-spin-modal">
      <button type="button" class="idc-spin-mute" id="idc-spin-mute-btn" onclick="toggleIdcSound(this)" title="Nyalakan/matikan suara">${idcSoundMuted ? '🔇' : '🔊'}</button>
      <div class="idc-spin-title">✦ RITUAL PENGAKUAN ELEMEN ✦</div>
      <div class="idc-spin-sub" id="idc-spin-sub">Roh-roh sedang memilihmu...</div>
      <div class="idc-spin-tile" id="idc-spin-display">
        <div class="idc-spin-tile-icon">✨</div>
        <div class="idc-spin-tile-name">???</div>
      </div>
      <div class="idc-spin-result" id="idc-spin-result"></div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => overlay.classList.add('show'));
  setTimeout(runElementSpin, 500); // jeda sebentar biar tidak langsung meloncat
}

function renderSpinTile(spirit) {
  const tile = document.getElementById('idc-spin-display');
  if (!tile) return;
  tile.style.setProperty('--spin-color', spirit.color);
  tile.innerHTML = `
    <div class="idc-spin-tile-icon">${elementIconHtml(spirit)}</div>
    <div class="idc-spin-tile-name">${spirit.name}</div>
  `;
}

function runElementSpin() {
  const total = 4000; // total durasi spin: 4 detik
  const start = performance.now();
  const finalIndex = Math.floor(Math.random() * ELEMENT_SPIRITS.length);
  let idx = 0;

  idcPlaySpinLoop();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / total, 1);

    if (progress >= 1) {
      idcStopSpinLoop();
      renderSpinTile(ELEMENT_SPIRITS[finalIndex]);
      const tile = document.getElementById('idc-spin-display');
      if (tile) tile.classList.add('idc-spin-tile-landed');
      finishElementSpin(ELEMENT_SPIRITS[finalIndex]);
      return;
    }

    idx = (idx + 1) % ELEMENT_SPIRITS.length;
    renderSpinTile(ELEMENT_SPIRITS[idx]);

    // Cepat di awal (60ms), melambat drastis mendekati akhir (~480ms)
    const delay = 60 + Math.pow(progress, 3) * 420;
    setTimeout(() => tick(performance.now()), delay);
  }
  tick(performance.now());
}

function finishElementSpin(spirit) {
  idcState.element = spirit.id;
  updateIdcPreview(); // preview kartu di belakang modal langsung ikut ter-update
  idcPlayReveal();

  const sub = document.getElementById('idc-spin-sub');
  const tile = document.getElementById('idc-spin-display');
  const result = document.getElementById('idc-spin-result');
  if (sub) sub.textContent = 'Ritual selesai.';

  setTimeout(() => {
    if (tile) tile.style.display = 'none';
    if (sub) sub.style.display = 'none';
    if (result) {
      result.innerHTML = `
        <div class="idc-spin-result-icon" style="color:${spirit.color};">${elementIconHtml(spirit)}</div>
        <div class="idc-spin-result-title" style="color:${spirit.color};">Selamat, kamu diakui oleh ${spirit.name} Spirit!</div>
        <div class="idc-spin-result-msg">${spirit.message}</div>
        <button class="btn-primary" style="width:100%;margin-top:18px;" onclick="closeElementSpinModal()">Tutup</button>
      `;
      requestAnimationFrame(() => result.classList.add('show'));
    }
  }, 650);
}

function closeElementSpinModal() {
  idcStopSpinLoop();
  const overlay = document.getElementById('idc-spin-overlay');
  if (overlay) overlay.remove();
  document.body.style.overflow = '';
  renderIdCardForm(); // re-render supaya field Element berubah jadi badge terkunci
}

// ─── FORM UTAMA ───────────────────────────────────────────────
function renderIdCardForm() {
  const area = document.getElementById('idc-display-area');
  if (!area) return;
  const s = idcState;

  area.innerHTML = `
    <div class="tab-content active idc-grid">
      <div>

        <div class="card mb-16">
          <div class="idc-section-label">IDENTITAS PLAYER</div>
          <div class="form-group">
            <label class="form-label" for="idc-player-name">NAMA PLAYER (Username WhatsApp)</label>
            <input class="form-input" id="idc-player-name" type="text" placeholder="Untuk kunci simpan/cari data kamu" value="${escAttr(s.playerName)}" oninput="idcState.playerName=this.value;" />
          </div>
          <div class="form-group">
            <label class="form-label" for="idc-name">NAMA KARAKTER</label>
            <input class="form-input" id="idc-name" type="text" placeholder="Nama karakter RP kamu" value="${escAttr(s.name)}" oninput="idcState.name=this.value; updateIdcPreview();" />
          </div>
          <div class="form-group">
            <label class="form-label" for="idc-gender">GENDER</label>
            <select class="form-select" id="idc-gender" onchange="idcState.gender=this.value; updateIdcPreview();">
              ${['Female', 'Male'].map(g => `<option value="${g}" ${s.gender === g ? 'selected' : ''}>${g}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">BIRTHDAY (Kalender RA)</label>
            <div style="display:grid;grid-template-columns:0.7fr 1.3fr 0.9fr;gap:8px;">
              <input class="form-input" type="number" min="1" max="30" placeholder="Tgl" value="${escAttr(s.day)}" oninput="idcState.day=this.value; updateIdcPreview();" />
              <select class="form-select" onchange="idcState.month=this.value; updateIdcPreview();">
                ${(RA_MONTHS || []).map(m => `<option value="${m.name}" ${s.month === m.name ? 'selected' : ''}>${m.name}</option>`).join('')}
              </select>
              <input class="form-input" type="number" min="2000" max="${OMAN_CURRENT_YEAR}" placeholder="2000" value="${escAttr(s.year)}" oninput="idcState.year=this.value; updateIdcPreview();" />
            </div>
            <div id="idc-age-hint" style="font-size:0.7rem;color:var(--gold);margin-top:6px;">${getAge(s) !== '' ? `≈ Usia sekarang: ${getAge(s)} tahun` : ''}</div>
            <div style="font-size:0.68rem;color:var(--text-dim);margin-top:2px;">Umur otomatis dihitung dari tahun lahir (Tahun OMAN sekarang: ${OMAN_CURRENT_YEAR} RA)</div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group">
              <label class="form-label" for="idc-class">CLASS</label>
              <select class="form-select" id="idc-class" onchange="idcState.class_=this.value; updateIdcPreview();">
                ${Object.keys(CLASS_DATA || {}).map(c => `<option value="${c}" ${s.class_ === c ? 'selected' : ''}>${CLASS_DATA[c].name}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="idc-race">RACE</label>
              <select class="form-select" id="idc-race" onchange="idcState.race=this.value; updateIdcPreview();">
                ${(RACE_DATA || []).map(r => `<option value="${r.id}" ${s.race === r.id ? 'selected' : ''}>${r.name}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">ELEMENT</label>
            ${renderElementFieldHtml(s)}
          </div>
        </div>

        <div class="card mb-16">
          <div class="idc-section-label">FAKSI</div>
          <div class="form-group">
            <label class="form-label" for="idc-faction">FACTION</label>
            <select class="form-select" id="idc-faction" onchange="idcState.faction=this.value; updateIdcPreview();">
              ${(FACTION_DATA || []).map(f => `<option value="${f.id}" ${s.faction === f.id ? 'selected' : ''}>${f.name}</option>`).join('')}
            </select>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group">
              <label class="form-label" for="idc-alliance">ALLIANCE (opsional)</label>
              <input class="form-input" id="idc-alliance" type="text" value="${escAttr(s.alliance)}" oninput="idcState.alliance=this.value; updateIdcPreview();" />
            </div>
            <div class="form-group">
              <label class="form-label" for="idc-party">PARTY (opsional)</label>
              <input class="form-input" id="idc-party" type="text" value="${escAttr(s.party)}" oninput="idcState.party=this.value; updateIdcPreview();" />
            </div>
          </div>
        </div>

        <div class="card mb-16">
          <div class="idc-section-label">OMAN BANK</div>
          <div class="form-group">
            <label class="form-label">TOTAL ZEN'S (Default Awal)</label>
            <div class="idc-static-value">500</div>
            <div style="font-size:0.68rem;color:var(--text-dim);margin-top:6px;">Setiap karakter baru mulai dengan 500 Zen — tidak bisa diubah di sini.</div>
          </div>
        </div>

        <div class="card">
          <div class="idc-section-label">LORE TAMBAHAN</div>
          <div class="form-group">
            <label class="form-label" for="idc-origin">ORIGIN</label>
            <input class="form-input" id="idc-origin" type="text" placeholder="Contoh: The Forgotten Field" value="${escAttr(s.origin)}" oninput="idcState.origin=this.value; updateIdcPreview();" />
          </div>
          <div class="form-group">
            <label class="form-label" for="idc-visual">VISUAL</label>
            <input class="form-input" id="idc-visual" type="text" placeholder="Referensi visual karakter" value="${escAttr(s.visual)}" oninput="idcState.visual=this.value; updateIdcPreview();" />
          </div>
        </div>

      </div>

      <div>
        <div id="idc-preview-area" style="position:sticky; top:16px;">
          ${renderIdcPreview(s)}
        </div>
      </div>
    </div>
  `;
}

// ─── SIMPAN / SALIN ────────────────────────────────────────────
// Payload dibangun dari state manapun (idcState utk buat baru,
// idcUpdateState utk update karakter) — supaya keduanya konsisten
// dan sama-sama melakukan upsert (timpa data lama berdasarkan player_name).
function buildIdCardPayload(s) {
  return {
    player_name: s.playerName,
    name: s.name,
    age: getAge(s) !== '' ? getAge(s) : null,
    gender: s.gender,
    birthday: buildBirthday(s) || null,
    class: s.class_,
    race: s.race,
    element: s.element || null,
    faction: s.faction,
    alliance: s.alliance || null,
    party: s.party || null,
    level: parseInt(s.level) || 1,
    job: s.job || null,
    title: s.title || null,
    zen: parseInt(s.zen) || 0,
    equip_head: s.equipHead || null,
    equip_body: s.equipBody || null,
    equip_main_hand: s.equipMain || null,
    equip_off_hand: s.equipOff || null,
    equip_legs: s.equipLegs || null,
    equip_accessory: s.equipAcc || null,
    items: (s.items || []).map(i => (i || '').trim()).filter(Boolean),
    origin: s.origin || null,
    visual: s.visual || null,
  };
}

// Ubah 1 baris data dari Supabase jadi bentuk state yang dipakai form/preview
function mapRowToState(data) {
  const s = {
    id: data.id,
    playerName: data.player_name,
    name: data.name,
    gender: data.gender || 'Female',
    day: '', month: defaultIdcState().month, year: '',
    class_: data.class,
    race: data.race,
    element: data.element || '',
    faction: data.faction,
    alliance: data.alliance || '',
    party: data.party || '',
    level: data.level || 1,
    job: data.job || '',
    title: data.title || '',
    zen: data.zen || 0,
    equipHead: data.equip_head || '',
    equipBody: data.equip_body || '',
    equipMain: data.equip_main_hand || '',
    equipOff: data.equip_off_hand || '',
    equipLegs: data.equip_legs || '',
    equipAcc: data.equip_accessory || '',
    items: (data.items && data.items.length) ? data.items : [''],
    origin: data.origin || '',
    visual: data.visual || '',
  };
  // Parse ulang birthday "DD-Month-YYYY" jika ada
  if (data.birthday) {
    const parts = String(data.birthday).split('-');
    if (parts.length === 3) { s.day = parts[0]; s.month = parts[1]; s.year = parts[2]; }
  }
  return s;
}

async function saveIdCard() {
  const msg = document.getElementById('idc-msg');
  if (!supabaseClient) {
    if (msg) msg.innerHTML = '<span style="color:#ef9a9a;">⚠ Supabase belum dikonfigurasi. Isi URL & key di calculator.js</span>';
    return;
  }
  if (!idcState.playerName || !idcState.name) {
    if (msg) msg.innerHTML = '<span style="color:#ef9a9a;">⚠ Isi Nama Player dan Nama Karakter dulu!</span>';
    return;
  }
  const payload = buildIdCardPayload(idcState);
  const { error } = await supabaseClient.from(IDCARD_TABLE).upsert(payload, { onConflict: 'player_name' });
  if (msg) {
    if (error) msg.innerHTML = `<span style="color:#ef9a9a;">❌ Error: ${error.message}</span>`;
    else msg.innerHTML = '<span style="color:#81c784;">✅ ID Card berhasil disimpan!</span>';
  }
}

function copyIdCardText() {
  const text = generateCardText(idcState);
  const done = () => {
    const msg = document.getElementById('idc-msg');
    if (msg) msg.innerHTML = '<span style="color:#81c784;">✅ Teks ID Card disalin! Tempel di WhatsApp/Discord.</span>';
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopyIdc(text, done));
  } else {
    fallbackCopyIdc(text, done);
  }
}
function fallbackCopyIdc(text, done) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); done(); } catch (e) { /* diamkan */ }
  document.body.removeChild(ta);
}

// ─── UPDATE CHARACTER (level, job, title, equipment, items) ────
// Menimpa (overwrite/upsert) data karakter yang SUDAH ADA berdasarkan
// player_name. Identitas (nama, class, race, faction, dll) tidak
// diedit di sini — hanya progress & perlengkapan yang berubah seiring
// karakter dimainkan.
let idcUpdateState = null;
let idcUpdateSearch = '';

function renderUpdateCharacterTab() {
  const area = document.getElementById('idc-display-area');
  if (!area) return;
  if (!idcUpdateState) {
    area.innerHTML = `
      <div class="tab-content active">
        <div class="card" style="max-width:480px;margin:0 auto;">
          <div class="idc-section-label">CARI KARAKTER</div>
          <div class="form-group">
            <label class="form-label" for="idcu-search-input">NAMA PLAYER (Username WhatsApp)</label>
            <input class="form-input" id="idcu-search-input" type="text" placeholder="Masukkan nama player yang sudah terdaftar" value="${escAttr(idcUpdateSearch)}"
              oninput="idcUpdateSearch=this.value;" onkeydown="if(event.key==='Enter'){ searchUpdateCharacter(); }" />
          </div>
          <button class="btn-primary" style="width:100%;" onclick="searchUpdateCharacter()">🔍 Muat Karakter</button>
          <div id="idcu-msg" style="margin-top:10px;font-size:0.78rem;font-family:var(--font-ui);"></div>
        </div>
      </div>`;
    return;
  }
  renderUpdateCharacterEditor();
}

async function searchUpdateCharacter() {
  const msg = document.getElementById('idcu-msg');
  const name = (idcUpdateSearch || '').trim();
  if (!name) { if (msg) msg.innerHTML = '<span style="color:#ef9a9a;">⚠ Isi nama player dulu.</span>'; return; }
  if (!supabaseClient) { if (msg) msg.innerHTML = '<span style="color:#ef9a9a;">⚠ Supabase belum dikonfigurasi.</span>'; return; }
  if (msg) msg.innerHTML = '<span style="color:var(--text-dim);">Mencari...</span>';
  const { data, error } = await supabaseClient.from(IDCARD_TABLE).select('*').eq('player_name', name).single();
  if (error || !data) {
    if (msg) msg.innerHTML = '<span style="color:#ef9a9a;">❌ Karakter tidak ditemukan. Cek lagi nama player-nya.</span>';
    return;
  }
  idcUpdateState = mapRowToState(data);
  renderIdCardDisplay('update');
}

function backToUpdateSearch() {
  idcUpdateState = null;
  renderIdCardDisplay('update');
}

function renderUpdateCharacterEditor() {
  const area = document.getElementById('idc-display-area');
  if (!area) return;
  const s = idcUpdateState;

  area.innerHTML = `
    <div class="tab-content active idc-grid">
      <div>

        <div class="card mb-16">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:12px;">
            <div>
              <div style="font-family:var(--font-ui);font-size:0.9rem;color:var(--text-bright);">${escHtml(s.name)}</div>
              <div style="font-size:0.72rem;color:var(--text-dim);">${escHtml(s.playerName)}</div>
            </div>
            <button class="btn-secondary" style="font-size:0.62rem;padding:6px 12px;white-space:nowrap;" onclick="backToUpdateSearch()">🔁 Ganti Karakter</button>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <span style="font-size:0.65rem;font-family:var(--font-ui);background:rgba(255,255,255,0.05);border:1px solid var(--dark-border);color:var(--text-dim);padding:2px 8px;border-radius:10px;">${getClassName(s.class_)}</span>
            <span style="font-size:0.65rem;font-family:var(--font-ui);background:rgba(255,255,255,0.05);border:1px solid var(--dark-border);color:var(--text-dim);padding:2px 8px;border-radius:10px;">${getRaceName(s.race)}</span>
            <span style="font-size:0.65rem;font-family:var(--font-ui);background:rgba(255,255,255,0.05);border:1px solid var(--dark-border);color:var(--text-dim);padding:2px 8px;border-radius:10px;">${getFactionName(s.faction)}</span>
          </div>
        </div>

        <div class="card mb-16">
          <div class="idc-section-label">PROGRESS</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group">
              <label class="form-label" for="idcu-level">LEVEL</label>
              <input class="form-input" id="idcu-level" type="number" min="1" max="100" value="${escAttr(s.level)}" oninput="idcUpdateState.level=this.value; updateIdcuPreview();" />
            </div>
            <div class="form-group">
              <label class="form-label" for="idcu-job">JOB (opsional)</label>
              <input class="form-input" id="idcu-job" type="text" value="${escAttr(s.job)}" oninput="idcUpdateState.job=this.value; updateIdcuPreview();" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="idcu-title">TITLE (opsional)</label>
            <input class="form-input" id="idcu-title" type="text" value="${escAttr(s.title)}" oninput="idcUpdateState.title=this.value; updateIdcuPreview();" />
          </div>
        </div>

        <div class="card mb-16">
          <div class="idc-section-label">PLAYER EQUIPMENT</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group"><label class="form-label">HEAD</label><input class="form-input" type="text" value="${escAttr(s.equipHead)}" oninput="idcUpdateState.equipHead=this.value; updateIdcuPreview();" /></div>
            <div class="form-group"><label class="form-label">BODY</label><input class="form-input" type="text" value="${escAttr(s.equipBody)}" oninput="idcUpdateState.equipBody=this.value; updateIdcuPreview();" /></div>
            <div class="form-group"><label class="form-label">MAIN-HAND</label><input class="form-input" type="text" value="${escAttr(s.equipMain)}" oninput="idcUpdateState.equipMain=this.value; updateIdcuPreview();" /></div>
            <div class="form-group"><label class="form-label">OFF-HAND</label><input class="form-input" type="text" value="${escAttr(s.equipOff)}" oninput="idcUpdateState.equipOff=this.value; updateIdcuPreview();" /></div>
            <div class="form-group"><label class="form-label">LEGS</label><input class="form-input" type="text" value="${escAttr(s.equipLegs)}" oninput="idcUpdateState.equipLegs=this.value; updateIdcuPreview();" /></div>
            <div class="form-group"><label class="form-label">ACCESSORY</label><input class="form-input" type="text" value="${escAttr(s.equipAcc)}" oninput="idcUpdateState.equipAcc=this.value; updateIdcuPreview();" /></div>
          </div>
        </div>

        <div class="card">
          <div class="idc-section-label">PLAYER ITEMS</div>
          <div id="idcu-items-editor">${itemsEditorHtmlU(s.items)}</div>
          ${s.items.length < 8 ? `<button class="btn-secondary" style="width:100%;margin-top:4px;" onclick="addIdcuItem()">+ Tambah Item</button>` : ''}
        </div>

      </div>

      <div>
        <div id="idcu-preview-area" style="position:sticky; top:16px;">
          ${renderIdcuPreview(s)}
        </div>
      </div>
    </div>
  `;
}

function renderIdcuPreview(s) {
  return `
    <div class="idc-card-frame">
      <pre class="idc-card-pre">${generateCardHTML(s)}</pre>
    </div>
    <div style="display:flex; gap:10px; margin-top:14px; flex-wrap:wrap;">
      <button class="btn-secondary" style="flex:1;min-width:160px;" onclick="copyIdcuText()">📋 Salin Teks ID Card</button>
      <button class="btn-primary" style="flex:1;min-width:160px;" onclick="saveUpdateCharacter()">💾 Simpan Perubahan</button>
    </div>
    <div id="idcu-save-msg" style="margin-top:10px;font-size:0.78rem;font-family:var(--font-ui);"></div>
  `;
}
function updateIdcuPreview() {
  const el = document.getElementById('idcu-preview-area');
  if (el) el.innerHTML = renderIdcuPreview(idcUpdateState);
}

async function saveUpdateCharacter() {
  const msg = document.getElementById('idcu-save-msg');
  if (!supabaseClient) { if (msg) msg.innerHTML = '<span style="color:#ef9a9a;">⚠ Supabase belum dikonfigurasi.</span>'; return; }
  const payload = buildIdCardPayload(idcUpdateState);
  const { error } = await supabaseClient.from(IDCARD_TABLE).upsert(payload, { onConflict: 'player_name' });
  if (msg) {
    if (error) msg.innerHTML = `<span style="color:#ef9a9a;">❌ Error: ${error.message}</span>`;
    else msg.innerHTML = '<span style="color:#81c784;">✅ Perubahan berhasil disimpan (data lama ditimpa)!</span>';
  }
}

function copyIdcuText() {
  const text = generateCardText(idcUpdateState);
  const done = () => {
    const msg = document.getElementById('idcu-save-msg');
    if (msg) msg.innerHTML = '<span style="color:#81c784;">✅ Teks ID Card disalin! Tempel di WhatsApp/Discord.</span>';
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopyIdc(text, done));
  } else {
    fallbackCopyIdc(text, done);
  }
}

// Dipanggil dari tombol "🔄 Update" di tab Daftar ID Card
function goToUpdateCharacter(playerName) {
  document.querySelectorAll('#idc-tabs .tab-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('tab-idc-update');
  if (btn) btn.classList.add('active');
  currentIdcTab = 'update';
  idcUpdateSearch = playerName;
  searchUpdateCharacter();
}

// ─── DAFTAR ID CARD ────────────────────────────────────────────
async function renderIdCardList() {
  const area = document.getElementById('idc-display-area');
  if (!area) return;
  if (!supabaseClient) {
    area.innerHTML = `
      <div class="tab-content active">
        <div class="card text-center" style="padding:48px;">
          <div style="font-size:2.5rem;margin-bottom:16px;">🪪</div>
          <div style="font-family:var(--font-ui);font-size:0.9rem;color:var(--text-bright);margin-bottom:8px;">DAFTAR ID CARD</div>
          <div style="font-size:0.82rem;color:var(--text-dim);">Konfigurasi Supabase URL & Anon Key di <code style="color:var(--gold)">calculator.js</code> untuk mengaktifkan fitur ini.</div>
        </div>
      </div>`;
    return;
  }
  area.innerHTML = '<div class="tab-content active"><div class="card text-center"><div class="pulse" style="color:var(--text-dim);">Loading...</div></div></div>';
  const { data, error } = await supabaseClient.from(IDCARD_TABLE).select('*').order('name');
  if (error) {
    area.innerHTML = `<div class="tab-content active"><div class="card"><span style="color:#ef9a9a;">Error: ${error.message}</span></div></div>`;
    return;
  }
  window.__idcListCache = data || [];
  area.innerHTML = `
    <div class="tab-content active">
      <div style="margin-bottom:16px;">
        <input class="form-input" id="idc-search" type="text" placeholder="🔍 Cari nama player atau karakter..." oninput="filterIdcList(this.value)" />
      </div>
      <div id="idc-list-grid" class="grid-3">
        ${(data || []).map(c => renderIdcListCard(c)).join('')}
      </div>
    </div>`;
}

function renderIdcListCard(c) {
  return `
    <div class="card">
      <div style="font-family:var(--font-ui);font-size:0.8rem;font-weight:700;color:var(--text-bright);">${escHtml(c.name)}</div>
      <div style="font-size:0.7rem;color:var(--text-dim);margin-bottom:12px;">${escHtml(c.player_name)}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">
        <span style="font-size:0.65rem;font-family:var(--font-ui);background:rgba(212,168,67,0.1);border:1px solid rgba(212,168,67,0.2);color:var(--gold);padding:2px 8px;border-radius:10px;">Lv.${c.level || 1}</span>
        <span style="font-size:0.65rem;font-family:var(--font-ui);background:rgba(255,255,255,0.05);border:1px solid var(--dark-border);color:var(--text-dim);padding:2px 8px;border-radius:10px;">${getClassName(c.class)}</span>
        <span style="font-size:0.65rem;font-family:var(--font-ui);background:rgba(255,255,255,0.05);border:1px solid var(--dark-border);color:var(--text-dim);padding:2px 8px;border-radius:10px;">${getFactionName(c.faction)}</span>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn-secondary" style="flex:1;padding:8px;font-size:0.65rem;" onclick="goToUpdateCharacter('${String(c.player_name).replace(/'/g, "\\'")}')">🔄 Update</button>
        <button class="btn-secondary" style="padding:8px;font-size:0.65rem;border-color:#ef9a9a;color:#ef9a9a;" onclick="deleteIdCard('${c.id}')">🗑️</button>
      </div>
    </div>`;
}

function filterIdcList(query) {
  const data = window.__idcListCache || [];
  const q = query.toLowerCase().trim();
  const filtered = data.filter(c =>
    String(c.player_name).toLowerCase().includes(q) ||
    String(c.name).toLowerCase().includes(q)
  );
  const grid = document.getElementById('idc-list-grid');
  if (grid) grid.innerHTML = filtered.map(c => renderIdcListCard(c)).join('');
}

async function deleteIdCard(id) {
  if (!confirm('Hapus ID Card ini?')) return;
  await supabaseClient.from(IDCARD_TABLE).delete().eq('id', id);
  renderIdCardList();
}
