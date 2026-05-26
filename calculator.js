/* ============================================================
   CALCULATOR.JS — OMAN WEBSITE
   Supabase config + Stat formulas + Battle Simulator
   ============================================================ */

// ─── SUPABASE CONFIG ─────────────────────────────────────────
const SUPABASE_URL = 'https://hyutzatopojxwpyvdclp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_sLXI1m6SwDEkTJO-qlqPTw_kCnmZZ4m';

let supabaseClient = null;
try {
  if (window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch(e) { console.warn('Supabase not initialized:', e); }

// ─── BASE STATS PER RAS ───────────────────────────────────────
// hp & mp = base awal, hpPerLv & mpPerLv = tambahan per level (sesuai tabel)
// atkPerMilestone & defPerMilestone = kenaikan ATK/DEF tiap kelipatan 5 level
const RACE_BASE_STATS = {
  human:   { hp: 20, mp: 20, atk: 2, def: 2, hpPerLv: 2, mpPerLv: 3, atkPerMilestone: 3, defPerMilestone: 3 },
  elf:     { hp: 10, mp: 30, atk: 2, def: 1, hpPerLv: 1, mpPerLv: 4, atkPerMilestone: 2, defPerMilestone: 2 },
  darkelf: { hp: 10, mp: 30, atk: 2, def: 1, hpPerLv: 1, mpPerLv: 4, atkPerMilestone: 3, defPerMilestone: 2 },
  wolfkin: { hp: 30, mp: 10, atk: 3, def: 1, hpPerLv: 2, mpPerLv: 2, atkPerMilestone: 4, defPerMilestone: 2 },
  dwarf:   { hp: 40, mp:  5, atk: 2, def: 3, hpPerLv: 3, mpPerLv: 1, atkPerMilestone: 2, defPerMilestone: 4 },
  faeborn: { hp:  8, mp: 35, atk: 2, def: 0, hpPerLv: 1, mpPerLv: 5, atkPerMilestone: 2, defPerMilestone: 1 },
  undead:  { hp: 25, mp: 15, atk: 2, def: 2, hpPerLv: 2, mpPerLv: 2, atkPerMilestone: 3, defPerMilestone: 3 },
};

// ─── STAT CALCULATION FORMULAS ────────────────────────────────
function calculateDerivedStats(params) {
  const { race, level } = params;

  const base = RACE_BASE_STATS[race] || RACE_BASE_STATS['human'];
  const lvl = parseInt(level) || 1;

  // HP = base HP ras + (hpPerLv × level)
  const maxHp = base.hp + (base.hpPerLv * lvl);
  // MP = base MP ras + (mpPerLv × level)
  const maxMp = base.mp + (base.mpPerLv * lvl);

  // ATK & DEF naik tiap kelipatan 5 level
  // misal Lv5 = +1x milestone, Lv10 = +2x milestone, dst.
  const milestones = Math.floor(lvl / 5);
  const totalAtk = base.atk + (milestones * base.atkPerMilestone);
  const totalDef = base.def + (milestones * base.defPerMilestone);

  // AP (Action Points): base 5 untuk semua ras
  // +1 pada level 35, +1 lagi pada level 75 → maks 7
  const maxAp = 5 + (lvl >= 35 ? 1 : 0) + (lvl >= 75 ? 1 : 0);

  return { maxHp, maxMp, maxAp, totalAtk, totalDef };
}

// ─── DAMAGE CALCULATION ───────────────────────────────────────
// Di sistem OMAN, tidak ada split Phys/Mag ATK & DEF
// DMG = ATK penyerang - DEF target, minimal 1
function calcDmg(atkStats, defStats, isCrit = false) {
  const base = Math.max(1, atkStats.totalAtk - defStats.totalDef);
  if (isCrit) return Math.floor(base * 1.5);
  return base;
}
function capDamage(dmg, targetMaxHp) {
  return Math.min(dmg, Math.floor(targetMaxHp * 0.4));
}

// ─── CALC RENDERER ────────────────────────────────────────────
let calcState = {
  playerName: '',
  charName: '',
  race: 'human',
  class_: 'warrior',
  level: 1,
};

function renderStatCalc() {
  const area = document.getElementById('calc-display-area');
  const lvl = parseInt(calcState.level) || 1;
  const base = RACE_BASE_STATS[calcState.race] || RACE_BASE_STATS['human'];
  const derived = calculateDerivedStats({ race: calcState.race, level: lvl });

  // Next milestone info
  const nextMilestone = (Math.floor(lvl / 5) + 1) * 5;
  const milestonesReached = Math.floor(lvl / 5);

  // Build race stat display rows
  const raceStatRows = [
    { label: 'BASE HP',  val: base.hp,        color: '#ef9a9a' },
    { label: 'BASE MP',  val: base.mp,        color: '#64b5f6' },
    { label: 'BASE ATK', val: base.atk,       color: '#ffb74d' },
    { label: 'BASE DEF', val: base.def,       color: '#80cbc4' },
    { label: 'HP/Level', val: '+' + base.hpPerLv,  color: '#ef9a9a' },
    { label: 'MP/Level', val: '+' + base.mpPerLv,  color: '#64b5f6' },
    { label: 'ATK/×5 Lv', val: '+' + base.atkPerMilestone, color: '#ffb74d' },
    { label: 'DEF/×5 Lv', val: '+' + base.defPerMilestone, color: '#80cbc4' },
  ];

  area.innerHTML = `
    <div class="tab-content active">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
        <!-- Left: Character Info -->
        <div>
          <div class="card mb-16">
            <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:16px;">INFORMASI KARAKTER</div>
            <div class="form-group">
              <label class="form-label" for="calc-player-name">NAMA PLAYER</label>
              <input class="form-input" id="calc-player-name" type="text" placeholder="Username WhatsApp" value="${calcState.playerName}" oninput="calcState.playerName=this.value" />
            </div>
            <div class="form-group">
              <label class="form-label" for="calc-char-name">NAMA KARAKTER</label>
              <input class="form-input" id="calc-char-name" type="text" placeholder="Nama karakter RP" value="${calcState.charName}" oninput="calcState.charName=this.value" />
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div class="form-group">
                <label class="form-label" for="calc-race">RAS</label>
                <select class="form-select" id="calc-race" onchange="calcState.race=this.value; renderStatCalc()">
                  ${Object.keys(RACE_BASE_STATS).map(r => {
                    const raceNames = {human:'Human',elf:'Elf',darkelf:'Dark Elf',wolfkin:'Wolfkin',dwarf:'Dwarf',faeborn:'Faeborn',undead:'Undead'};
                    return `<option value="${r}" ${calcState.race===r?'selected':''}>${raceNames[r]||r}</option>`;
                  }).join('')}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="calc-class">CLASS</label>
                <select class="form-select" id="calc-class" onchange="calcState.class_=this.value">
                  ${Object.keys(CLASS_DATA).map(c => `<option value="${c}" ${calcState.class_===c?'selected':''}>${CLASS_DATA[c].name}</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="calc-level">LEVEL (1–100)</label>
              <div style="display:flex;gap:8px;">
                <input class="form-input" id="calc-level" type="number" min="1" max="100" value="${calcState.level}"
                  onkeydown="if(event.key==='Enter'){calcState.level=Math.min(100,Math.max(1,+this.value||1));renderStatCalc();}"
                  style="flex:1;" />
                <button class="btn-primary" style="padding:0 16px;white-space:nowrap;font-size:0.7rem;"
                  onclick="calcState.level=Math.min(100,Math.max(1,+document.getElementById('calc-level').value||1));renderStatCalc();">
                  Hitung
                </button>
              </div>
            </div>
          </div>

          <!-- Base Stat Ras -->
          <div class="card">
            <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:16px;">STAT DASAR RAS</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              ${raceStatRows.map(r => `
                <div style="background:rgba(255,255,255,0.04);border:1px solid var(--dark-border);border-radius:8px;padding:10px 12px;display:flex;justify-content:space-between;align-items:center;">
                  <span style="font-family:var(--font-ui);font-size:0.6rem;letter-spacing:0.1em;color:var(--text-dim);">${r.label}</span>
                  <span style="font-family:var(--font-ui);font-size:0.9rem;font-weight:700;color:${r.color};">${r.val}</span>
                </div>`).join('')}
            </div>
            <div style="margin-top:12px;padding:10px 12px;background:rgba(212,168,67,0.07);border:1px solid rgba(212,168,67,0.2);border-radius:8px;">
              <div style="font-size:0.65rem;color:var(--text-dim);font-family:var(--font-ui);">
                ATK/DEF milestone berikutnya: <strong style="color:var(--gold);">Level ${nextMilestone}</strong>
                ${milestonesReached > 0 ? `&nbsp;·&nbsp; Milestone dicapai: <strong style="color:var(--gold);">${milestonesReached}×</strong>` : ''}
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Results -->
        <div>
          <!-- Hasil Kalkulasi -->
          <div class="card mb-16">
            ${(() => {
              const raceNames = {human:'Human',elf:'Elf',darkelf:'Dark Elf',wolfkin:'Wolfkin',dwarf:'Dwarf',faeborn:'Faeborn',undead:'Undead'};
              const raceName = raceNames[calcState.race] || calcState.race;
              const apNote = lvl >= 75 ? 'AP MAX (7) tercapai' : lvl >= 35 ? `AP +1 lagi di Level 75` : `AP +1 di Level 35 & 75`;
              return `
            <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:4px;">HASIL KALKULASI</div>
            <div style="font-family:var(--font-ui);font-size:0.75rem;font-weight:700;color:var(--text-bright);margin-bottom:16px;">${raceName} — Level ${lvl}</div>
            <div class="result-grid" style="grid-template-columns:repeat(2,1fr);">
              <div class="result-card">
                <div class="result-card-val" style="color:#ef9a9a;">${derived.maxHp}</div>
                <div class="result-card-label">MAX HP</div>
              </div>
              <div class="result-card">
                <div class="result-card-val" style="color:#64b5f6;">${derived.maxMp}</div>
                <div class="result-card-label">MAX MP</div>
              </div>
              <div class="result-card">
                <div class="result-card-val" style="color:#ffb74d;">${derived.totalAtk}</div>
                <div class="result-card-label">ATK</div>
              </div>
              <div class="result-card">
                <div class="result-card-val" style="color:#80cbc4;">${derived.totalDef}</div>
                <div class="result-card-label">DEF</div>
              </div>
            </div>
            <div style="margin-top:10px;display:flex;align-items:center;gap:10px;padding:12px 14px;background:rgba(255,241,118,0.07);border:1px solid rgba(255,241,118,0.2);border-radius:8px;">
              <div style="font-family:var(--font-ui);font-size:1.4rem;font-weight:700;color:#fff176;">${derived.maxAp}</div>
              <div>
                <div style="font-family:var(--font-ui);font-size:0.6rem;letter-spacing:0.12em;color:var(--text-dim);">MAX AP</div>
                <div style="font-size:0.65rem;color:#fff176;margin-top:2px;">${apNote}</div>
              </div>
              <div style="margin-left:auto;display:flex;gap:6px;">
                ${[5,6,7].map(n => `<div style="width:14px;height:14px;border-radius:50%;background:${derived.maxAp>=n?'#fff176':'rgba(255,241,118,0.15)'};border:1px solid rgba(255,241,118,0.3);"></div>`).join('')}
              </div>
            </div>`;
            })()}

            <!-- Formula -->
            <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--dark-border);">
              <div style="font-size:0.68rem;color:var(--text-dim);font-family:var(--font-ui);margin-bottom:8px;">FORMULA RUMUS:</div>
              <div style="font-size:0.65rem;color:var(--text-dim);line-height:2;">
                HP = HP_Ras + (HP/Lv × Level)<br>
                MP = MP_Ras + (MP/Lv × Level)<br>
                ATK = ATK_Ras + (ATK/×5Lv × ⌊Level÷5⌋)<br>
                DEF = DEF_Ras + (DEF/×5Lv × ⌊Level÷5⌋)<br>
                AP = 5 &nbsp;·&nbsp; +1 di Lv 35 &nbsp;·&nbsp; +1 di Lv 75 (maks 7, bisa disimpan)<br>
                DMG = MAX(1, ATK_penyerang − DEF_target) &nbsp;·&nbsp; DMG maks = 40% HP target
              </div>
            </div>
          </div>

          <!-- Contoh Estimasi Damage -->
          <div class="card mb-16">
            <div style="font-family:var(--font-ui);font-size:0.65rem;letter-spacing:0.15em;color:var(--gold);margin-bottom:12px;">ESTIMASI DAMAGE (vs. DEF rata-rata)</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              ${[0, 2, 5, 10].map(enemyDef => {
                const raw = Math.max(1, derived.totalAtk - enemyDef);
                const cappedRaw = Math.min(raw, Math.floor(derived.maxHp * 0.4));
                return `
                <div style="background:rgba(255,255,255,0.04);border:1px solid var(--dark-border);border-radius:8px;padding:10px 12px;">
                  <div style="font-size:0.6rem;color:var(--text-dim);font-family:var(--font-ui);margin-bottom:6px;">vs DEF ${enemyDef}</div>
                  <div style="font-size:0.75rem;color:#ffb74d;font-weight:700;">${cappedRaw} DMG</div>
                </div>`;
              }).join('')}
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <button class="btn-primary" onclick="saveCharacter()" id="btn-save-char" style="flex:1;">💾 Simpan ke DB</button>
            <button class="btn-secondary" onclick="loadCharacter()" id="btn-load-char" style="flex:1;">📂 Load dari DB</button>
            <button class="btn-secondary" onclick="resetCalc()" id="btn-reset-calc">🔄 Reset</button>
          </div>
          <div id="calc-msg" style="margin-top:12px;font-size:0.78rem;font-family:var(--font-ui);"></div>
        </div>
      </div>
    </div>
  `;
}

function resetCalc() {
  calcState.playerName = '';
  calcState.charName   = '';
  calcState.race       = 'human';
  calcState.class_     = 'warrior';
  calcState.level      = 1;
  renderStatCalc();
}

async function saveCharacter() {
  const msg = document.getElementById('calc-msg');
  if (!supabaseClient) {
    msg.innerHTML = '<span style="color:#ef9a9a;">⚠ Supabase belum dikonfigurasi. Isi URL & key di calculator.js</span>';
    return;
  }
  if (!calcState.playerName || !calcState.charName) {
    msg.innerHTML = '<span style="color:#ef9a9a;">⚠ Isi Nama Player dan Nama Karakter dulu!</span>';
    return;
  }
  const lvl = parseInt(calcState.level) || 1;
  const derived = calculateDerivedStats({ race: calcState.race, level: lvl });
  const data = {
    player_name: calcState.playerName,
    char_name:   calcState.charName,
    race:        calcState.race,
    class:       calcState.class_,
    level:       lvl,
    max_hp:      derived.maxHp,
    max_mp:      derived.maxMp,
    atk:         derived.totalAtk,
    def:         derived.totalDef,
    max_ap:      derived.maxAp,
  };
  const { error } = await supabaseClient.from('characters').upsert(data, { onConflict: 'player_name' });
  if (error) {
    msg.innerHTML = `<span style="color:#ef9a9a;">❌ Error: ${error.message}</span>`;
  } else {
    msg.innerHTML = '<span style="color:#81c784;">✅ Karakter berhasil disimpan!</span>';
  }
}

async function loadCharacter() {
  const msg = document.getElementById('calc-msg');
  if (!supabaseClient) {
    msg.innerHTML = '<span style="color:#ef9a9a;">⚠ Supabase belum dikonfigurasi.</span>';
    return;
  }
  const name = calcState.playerName;
  if (!name) { msg.innerHTML = '<span style="color:#ef9a9a;">⚠ Isi Nama Player dulu!</span>'; return; }
  const { data, error } = await supabaseClient.from('characters').select('*').eq('player_name', name).single();
  if (error || !data) {
    msg.innerHTML = `<span style="color:#ef9a9a;">❌ Karakter tidak ditemukan.</span>`;
    return;
  }
  calcState = {
    playerName: data.player_name,
    charName: data.char_name,
    race: data.race,
    class_: data.class,
    level: data.level,
  };
  renderStatCalc();
  document.getElementById('calc-msg').innerHTML = '<span style="color:#81c784;">✅ Karakter berhasil dimuat!</span>';
}

// ─── BATTLE SIMULATOR RENDERER ───────────────────────────────
function renderBattleSimulator() {
  const area = document.getElementById('calc-display-area');
  area.innerHTML = `
    <div class="tab-content active">
      <div class="card text-center" style="padding:48px;">
        <div style="font-size:3rem;margin-bottom:16px;">⚔️</div>
        <div style="font-family:var(--font-ui);font-size:0.9rem;font-weight:700;color:var(--text-bright);margin-bottom:8px;">BATTLE SIMULATOR</div>
        <div style="font-size:0.82rem;color:var(--text-dim);margin-bottom:24px;">
          Battle simulator turn-by-turn dengan AP system, status effects, buff/debuff, dan battle log real-time.
        </div>
        <div style="font-size:0.75rem;color:var(--gold);font-family:var(--font-ui);">
          🚧 Halaman ini akan tersedia segera — buat karakter di tab Stat Kalkulator dulu!
        </div>
      </div>
    </div>
  `;
}

// ─── CHARACTER LIST RENDERER ─────────────────────────────────
async function renderCharacterList() {
  const area = document.getElementById('calc-display-area');
  if (!supabaseClient) {
    area.innerHTML = `
      <div class="tab-content active">
        <div class="card text-center" style="padding:48px;">
          <div style="font-size:2.5rem;margin-bottom:16px;">🗄️</div>
          <div style="font-family:var(--font-ui);font-size:0.9rem;color:var(--text-bright);margin-bottom:8px;">GM CHARACTER VIEW</div>
          <div style="font-size:0.82rem;color:var(--text-dim);">Konfigurasi Supabase URL dan Anon Key di file <code style="color:var(--gold)">calculator.js</code> untuk mengaktifkan fitur ini.</div>
        </div>
      </div>`;
    return;
  }
  area.innerHTML = '<div class="tab-content active"><div class="card text-center"><div class="pulse" style="color:var(--text-dim);">Loading...</div></div></div>';
  const { data, error } = await supabaseClient.from('characters').select('*').order('player_name');
  if (error) {
    area.innerHTML = `<div class="tab-content active"><div class="card"><span style="color:#ef9a9a;">Error: ${error.message}</span></div></div>`;
    return;
  }
  area.innerHTML = `
    <div class="tab-content active">
      <div style="margin-bottom:16px;">
        <input class="form-input" id="char-search" type="text" placeholder="🔍 Cari nama player atau karakter..." oninput="filterCharList(this.value, ${JSON.stringify(data).replace(/"/g,'&quot;')})" />
      </div>
      <div id="char-list-grid" class="grid-3">
        ${data.map(c => renderCharCard(c)).join('')}
      </div>
    </div>`;
}

function renderCharCard(c) {
  const d = calculateDerivedStats({ race: c.race, level: c.level });
  return `
    <div class="card">
      <div style="font-family:var(--font-ui);font-size:0.8rem;font-weight:700;color:var(--text-bright);">${c.char_name}</div>
      <div style="font-size:0.7rem;color:var(--text-dim);margin-bottom:12px;">${c.player_name}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;">
        <span style="font-size:0.65rem;font-family:var(--font-ui);background:rgba(212,168,67,0.1);border:1px solid rgba(212,168,67,0.2);color:var(--gold);padding:2px 8px;border-radius:10px;">Lv.${c.level}</span>
        <span style="font-size:0.65rem;font-family:var(--font-ui);background:rgba(255,255,255,0.05);border:1px solid var(--dark-border);color:var(--text-dim);padding:2px 8px;border-radius:10px;">${c.class}</span>
        <span style="font-size:0.65rem;font-family:var(--font-ui);background:rgba(255,255,255,0.05);border:1px solid var(--dark-border);color:var(--text-dim);padding:2px 8px;border-radius:10px;">${c.race}</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:0.7rem;color:var(--text-dim);margin-bottom:12px;">
        <span>HP: <strong style="color:#ef9a9a;">${d.maxHp}</strong></span>
        <span>MP: <strong style="color:#64b5f6;">${d.maxMp}</strong></span>
        <span>ATK: <strong style="color:#ffb74d;">${d.totalAtk}</strong></span>
        <span>DEF: <strong style="color:#80cbc4;">${d.totalDef}</strong></span>
      </div>
      <div style="display:flex;gap:8px;">
        <button class="btn-secondary" style="flex:1;padding:8px;font-size:0.65rem;" onclick="loadCharById('${c.player_name}')">📂 Load</button>
        <button class="btn-secondary" style="padding:8px;font-size:0.65rem;border-color:#ef9a9a;color:#ef9a9a;" onclick="deleteChar('${c.id}')">🗑️</button>
      </div>
    </div>`;
}

function filterCharList(query, data) {
  const q = query.toLowerCase().trim();
  const filtered = data.filter(c =>
    c.player_name.toLowerCase().includes(q) ||
    c.char_name.toLowerCase().includes(q)
  );
  const grid = document.getElementById('char-list-grid');
  if (grid) {
    grid.innerHTML = filtered.map(c => renderCharCard(c)).join('');
  }
}

async function deleteChar(id) {
  if (!confirm('Hapus karakter ini?')) return;
  await supabaseClient.from('characters').delete().eq('id', id);
  renderCharacterList();
}

async function loadCharById(playerName) {
  calcState.playerName = playerName;
  navigateTo('kalkulator');
  setTimeout(() => {
    document.querySelectorAll('#calc-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-calc-stat').classList.add('active');
    loadCharacter();
  }, 100);
}
