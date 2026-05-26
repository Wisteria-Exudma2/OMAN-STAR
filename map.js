/* ============================================================
   MAP.JS — OMAN INTERACTIVE WORLD MAP (REBUILT)
   Canvas-based map dengan hover tooltip akurat per lokasi
   ============================================================ */

'use strict';

// ════════════════════════════════════════════════════════════
// STATE
// ════════════════════════════════════════════════════════════
let currentMapId   = 'world-oman';
let mapHistory     = ['world-oman'];
let mapInitialized = false;
let hoveredRegion  = null;   // world map: faction string
let hoveredLocId   = null;   // region map: location id string
let selectedLoc    = null;
let _lastHoverX    = 0;
let _lastHoverY    = 0;

// ─── IMAGE CACHE ──────────────────────────────────────────────
const mapImageCache = {};

function loadMapImage(mapData, callback) {
  if (!mapData.imageUrl) { callback(null); return; }
  if (mapImageCache[mapData.id]) { callback(mapImageCache[mapData.id]); return; }
  const img = new Image();
  img.onload = () => { mapImageCache[mapData.id] = img; callback(img); };
  img.onerror = () => { console.warn(`[MAP] Gagal memuat: ${mapData.imageUrl}`); callback(null); };
  img.src = mapData.imageUrl;
}

// ════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════
function initMapSystem() {
  if (mapInitialized) { drawMapCanvas(currentMapId); return; }
  mapInitialized = true;
  renderMapTabs();
  renderMapDisplay(currentMapId, false);
  window.addEventListener('resize', () => drawMapCanvas(currentMapId));
}

// ════════════════════════════════════════════════════════════
// MAP TABS
// ════════════════════════════════════════════════════════════
function renderMapTabs() {
  const tabsContainer = document.getElementById('map-tabs');
  if (!tabsContainer) return;
  const tabs = [
    { id: 'world-oman',               label: 'DUNIA',     emoji: '🌍' },
    { id: 'aurelian-nw-territory',    label: 'Aurelian',  emoji: '👑' },
    { id: 'arcane-central-towers',    label: 'Arcane',    emoji: '🔮' },
    { id: 'shadow-underground-realm', label: 'Shadow',    emoji: '🌑' },
    { id: 'wildlands-grassland-realm',label: 'Wildlands', emoji: '🌿' },
    { id: 'ironforge-forgelands',     label: 'Ironforge', emoji: '⚒️' },
    { id: 'crimson-fortress-realm',   label: 'Crimson',   emoji: '⚔️' },
    { id: 'void-corrupted-lands',     label: 'Void',      emoji: '🌀' },
  ];
  tabsContainer.innerHTML = tabs.map(t => `
    <button class="map-tab ${t.id === currentMapId ? 'active' : ''}"
            data-map-id="${t.id}" id="tab-map-${t.id}">
      <span class="map-tab-emoji">${t.emoji}</span>
      <span class="map-tab-label">${t.label}</span>
    </button>
  `).join('');
  tabsContainer.querySelectorAll('.map-tab').forEach(btn => {
    btn.addEventListener('click', () => switchMap(btn.dataset.mapId, true));
  });
}

function updateActiveTab(mapId) {
  document.querySelectorAll('.map-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.mapId === mapId);
  });
}

// ════════════════════════════════════════════════════════════
// SWITCH MAP
// ════════════════════════════════════════════════════════════
function switchMap(mapId, fromTab = false) {
  if (!WORLD_MAPS[mapId] || mapId === currentMapId) return;
  hoveredLocId  = null;
  hoveredRegion = null;

  if (fromTab) {
    mapHistory = mapId === 'world-oman' ? ['world-oman'] : ['world-oman', mapId];
  } else {
    mapHistory.push(mapId);
  }

  updateActiveTab(mapId);

  if (mapId !== 'world-oman') {
    triggerZoomTransition(mapId);
  } else {
    animateFadeSwitch(mapId);
  }
}

function triggerZoomTransition(mapId) {
  const overlay = document.getElementById('map-zoom-overlay');
  const ripple  = document.getElementById('map-zoom-ripple');
  const text    = document.getElementById('map-zoom-text');
  if (!overlay) { renderMapDisplay(mapId, true); return; }
  const mapData = WORLD_MAPS[mapId];
  text.textContent = `Memasuki ${mapData ? mapData.name : '...'}`;
  overlay.classList.add('active');
  ripple.classList.add('expand');
  setTimeout(() => { currentMapId = mapId; renderMapDisplay(mapId, true); }, 500);
  setTimeout(() => { overlay.classList.remove('active'); ripple.classList.remove('expand'); }, 900);
}

function animateFadeSwitch(mapId) {
  const container = document.getElementById('map-display-container');
  if (container) { container.style.opacity = '0'; container.style.transform = 'scale(0.97)'; }
  setTimeout(() => {
    currentMapId = mapId;
    renderMapDisplay(mapId, false);
    if (container) { container.style.opacity = '1'; container.style.transform = 'scale(1)'; }
  }, 220);
}

// ════════════════════════════════════════════════════════════
// RENDER MAP DISPLAY
// ════════════════════════════════════════════════════════════
function renderMapDisplay(mapId, zoomEffect) {
  const mapData = WORLD_MAPS[mapId];
  if (!mapData) return;

  const titleEl    = document.getElementById('map-title');
  const subtitleEl = document.getElementById('map-subtitle');
  if (titleEl)    titleEl.textContent    = mapData.name;
  if (subtitleEl) subtitleEl.textContent = mapData.subtitle || mapData.description;

  updateBreadcrumb(mapData);

  const backBtn = document.getElementById('map-back-btn');
  if (backBtn) backBtn.style.display = mapData.level > 0 ? 'flex' : 'none';

  renderLegend(mapData);

  // Locations panel (sidebar)
  const locPanel = document.getElementById('map-locations-panel');
  const locList  = document.getElementById('locations-list');
  if (mapData.locations && mapData.locations.length > 0) {
    if (locPanel) locPanel.style.display = 'block';
    renderLocationsList(mapData, locList);
  } else {
    if (locPanel) locPanel.style.display = 'none';
  }

  // Region cards vs location detail
  const regionsWrapper = document.getElementById('map-regions-wrapper');
  const locDetail      = document.getElementById('map-location-detail');
  if (mapData.regions) {
    if (regionsWrapper) regionsWrapper.style.display = 'block';
    if (locDetail)      locDetail.style.display = 'none';
    renderRegionCards(mapData);
  } else {
    if (regionsWrapper) regionsWrapper.style.display = 'none';
    if (locDetail)      locDetail.style.display = 'block';
    renderLocationDetail(mapData, locDetail);
  }

  requestAnimationFrame(() => drawMapCanvas(mapId, zoomEffect));
}

// ════════════════════════════════════════════════════════════
// BREADCRUMB
// ════════════════════════════════════════════════════════════
function updateBreadcrumb(mapData) {
  const bc = document.getElementById('map-breadcrumb');
  if (!bc) return;
  if (mapData.level === 0) {
    bc.innerHTML = `<span class="breadcrumb-item active">🌍 OMAN WORLD</span>`;
  } else {
    bc.innerHTML = `
      <span class="breadcrumb-item clickable" onclick="switchMap('world-oman', true)">🌍 OMAN WORLD</span>
      <span class="breadcrumb-sep">›</span>
      <span class="breadcrumb-item active">${mapData.name}</span>`;
  }
}

// ════════════════════════════════════════════════════════════
// LEGEND
// ════════════════════════════════════════════════════════════
function renderLegend(mapData) {
  const el = document.getElementById('map-legend');
  if (!el || !mapData.legend) return;
  el.innerHTML = `
    <div class="legend-header">📍 LEGENDA</div>
    <div class="legend-items">
      ${mapData.legend.map(item => `
        <div class="legend-item">
          <span class="legend-symbol" style="color:${item.color}">${item.symbol}</span>
          <span class="legend-label">${item.label}</span>
        </div>
      `).join('')}
    </div>`;
}

// ════════════════════════════════════════════════════════════
// REGION CARDS (world view)
// ════════════════════════════════════════════════════════════
function renderRegionCards(mapData) {
  const grid = document.getElementById('map-regions-grid');
  if (!grid || !mapData.regions) return;
  grid.innerHTML = mapData.regions.map(r => `
    <div class="region-card" id="rcard-${r.faction}"
         onclick="switchMap('${r.linkedMapId}')"
         style="--rc:${r.color}">
      <div class="region-card-top" style="border-color:${r.color}40">
        <div class="region-emoji">${r.emoji}</div>
        <div class="region-card-info">
          <div class="region-name">${r.name}</div>
          <div class="region-faction-label" style="color:${r.color}">${r.faction.toUpperCase()}</div>
        </div>
      </div>
      <div class="region-desc">${r.description}</div>
      <div class="region-cities">
        ${r.majorCities ? r.majorCities.map(c => `<span class="city-tag">${c}</span>`).join('') : ''}
      </div>
      <div class="region-action" style="color:${r.color}">🔍 Jelajahi Wilayah →</div>
    </div>
  `).join('');
}

// ════════════════════════════════════════════════════════════
// LOCATIONS LIST (sidebar, region view)
// ════════════════════════════════════════════════════════════
function renderLocationsList(mapData, container) {
  if (!container) return;
  container.innerHTML = mapData.locations.map(loc => `
    <div class="loc-item" onclick="highlightLocation('${loc.id}')">
      <span class="loc-emoji">${loc.emoji}</span>
      <div class="loc-info">
        <div class="loc-name">${loc.name || loc.id}</div>
        <div class="loc-type">${loc.type.replace(/_/g,' ')}</div>
      </div>
      <span class="loc-grid">${loc.grid}</span>
    </div>
  `).join('');
}

// ════════════════════════════════════════════════════════════
// LOCATION DETAIL GRID (region view bottom)
// ════════════════════════════════════════════════════════════
function renderLocationDetail(mapData, container) {
  if (!container) return;
  const typeColors = {
    major_city: '#d4a843', settlement: '#64b5f6', landmark: '#ce93d8',
    ruin: '#9e9e9e', oasis: '#4fc3f7', grey_zone: '#888',
    forbidden: '#ef5350', minor: '#a5d6a7',
  };
  container.innerHTML = `
    <div class="loc-detail-header">📍 LOKASI DI ${mapData.name}</div>
    <div class="loc-detail-grid">
      ${mapData.locations.map(loc => `
        <div class="loc-detail-card" id="lcd-${loc.id}" onclick="highlightLocation('${loc.id}')">
          <div class="loc-detail-emoji">${loc.emoji}</div>
          <div class="loc-detail-info">
            <div class="loc-detail-name">${loc.name || loc.id}</div>
            <div class="loc-detail-type" style="color:${typeColors[loc.type] || '#aaa'}">${loc.type.replace(/_/g,' ')}</div>
            <div class="loc-detail-grid-ref">Grid: <strong>${loc.grid}</strong></div>
            <div class="loc-detail-lore">${loc.lore || ''}</div>
          </div>
        </div>
      `).join('')}
    </div>`;
}

// ════════════════════════════════════════════════════════════
// HIGHLIGHT LOCATION
// ════════════════════════════════════════════════════════════
function highlightLocation(locId) {
  selectedLoc = locId;
  document.querySelectorAll('.loc-item').forEach(el => el.classList.remove('active'));
  const sideEl = document.querySelector(`.loc-item[onclick*="${locId}"]`);
  if (sideEl) { sideEl.classList.add('active'); sideEl.scrollIntoView({ block: 'nearest' }); }
  document.querySelectorAll('.loc-detail-card').forEach(el => el.classList.remove('active'));
  const detEl = document.getElementById(`lcd-${locId}`);
  if (detEl) detEl.classList.add('active');
  drawMapCanvas(currentMapId);
}

// ════════════════════════════════════════════════════════════
// CANVAS MAP RENDERER
// ════════════════════════════════════════════════════════════
function drawMapCanvas(mapId, zoomEffect = false) {
  const canvas  = document.getElementById('map-canvas');
  const wrapper = document.getElementById('map-canvas-wrapper');
  if (!canvas || !wrapper) return;
  const mapData = WORLD_MAPS[mapId];
  if (!mapData) return;

  const W = wrapper.clientWidth || 700;
  const ctx = canvas.getContext('2d');

  if (mapData.imageUrl) {
    loadMapImage(mapData, (img) => {
      if (img) {
        const ratio = img.naturalHeight / img.naturalWidth;
        const H = Math.round(W * ratio);
        canvas.width  = W;
        canvas.height = H;
        wrapper.style.height = H + 'px';
        _renderCanvas(ctx, canvas, wrapper, W, H, mapId, mapData, img);
      } else {
        const H = wrapper.clientHeight || 480;
        canvas.width  = W;
        canvas.height = H;
        _renderCanvas(ctx, canvas, wrapper, W, H, mapId, mapData, null);
      }
    });
    return;
  }
  const H = wrapper.clientHeight || 480;
  canvas.width  = W;
  canvas.height = H;
  _renderCanvas(ctx, canvas, wrapper, W, H, mapId, mapData, null);
}

function _renderCanvas(ctx, canvas, wrapper, W, H, mapId, mapData, img) {
  ctx.fillStyle = '#060a14';
  ctx.fillRect(0, 0, W, H);

  if (img) {
    ctx.save();
    ctx.globalAlpha = 1.0;
    ctx.drawImage(img, 0, 0, W, H);
    ctx.restore();
    // Overlay ringan agar ikon & label terbaca
    if (mapData.level > 0) {
      ctx.fillStyle = 'rgba(6,10,20,0.05)';
      ctx.fillRect(0, 0, W, H);
    }
  }

  if (mapData.level === 0) {
    drawWorldMapOverlay(ctx, W, H, mapData);
  } else {
    drawRegionMap(ctx, W, H, mapData);
  }

  // Setup interaksi canvas
  canvas.onclick     = (e) => handleCanvasClick(e, canvas, mapId, mapData);
  canvas.onmousemove = (e) => handleCanvasHover(e, canvas, mapId, mapData);
  canvas.onmouseleave = () => {
    hoveredRegion = null;
    hoveredLocId  = null;
    canvas.style.cursor = 'default';
    // Hapus tooltip HTML jika ada
    removeHtmlTooltip();
    drawMapCanvas(mapId);
  };
}

// ════════════════════════════════════════════════════════════
// WORLD MAP OVERLAY
// Gambar sudah di-render, kita tambahkan overlay hover ringan
// ════════════════════════════════════════════════════════════
function drawWorldMapOverlay(ctx, W, H, mapData) {
  // Hover highlight untuk region
  if (hoveredRegion && mapData.regions) {
    const region = mapData.regions.find(r => r.faction === hoveredRegion);
    if (region) {
      const COLS  = mapData.gridConfig.cols;
      const ROWS  = mapData.gridConfig.rows;
      const cellW = W / COLS;
      const cellH = H / ROWS;
      const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const sc = ALPHA.indexOf(region.bounds.startCol);
      const ec = ALPHA.indexOf(region.bounds.endCol);
      const sr = region.bounds.startRow - 1;
      const er = region.bounds.endRow - 1;
      ctx.save();
      ctx.strokeStyle = hexToRgba(region.color, 0.85);
      ctx.lineWidth   = 3;
      ctx.setLineDash([6, 3]);
      ctx.strokeRect(sc * cellW + 2, sr * cellH + 2, (ec - sc + 1) * cellW - 4, (er - sr + 1) * cellH - 4);
      ctx.fillStyle = hexToRgba(region.color, 0.12);
      ctx.fillRect(sc * cellW + 2, sr * cellH + 2, (ec - sc + 1) * cellW - 4, (er - sr + 1) * cellH - 4);
      ctx.restore();
    }
  }

  // Hover dots untuk worldLocations
  if (mapData.worldLocations) {
    const COLS  = mapData.gridConfig.cols;
    const ROWS  = mapData.gridConfig.rows;
    const cellW = W / COLS;
    const cellH = H / ROWS;
    const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    mapData.worldLocations.forEach(loc => {
      const [col, row] = gridToXY(loc.grid, ALPHA);
      const cx = col * cellW + cellW / 2;
      const cy = row * cellH + cellH / 2;
      const isHov = hoveredLocId === loc.id;

      if (isHov) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(loc.color, 0.25);
        ctx.fill();
        ctx.strokeStyle = hexToRgba(loc.color, 0.8);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }
    });
  }
}

// ════════════════════════════════════════════════════════════
// REGION MAP RENDERER
// Render ikon lokasi di atas gambar peta region
// ════════════════════════════════════════════════════════════
function drawRegionMap(ctx, W, H, mapData) {
  if (!mapData.locations) return;

  const COLS  = mapData.gridConfig.cols;
  const ROWS  = mapData.gridConfig.rows;
  const cellW = W / COLS;
  const cellH = H / ROWS;
  const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const fc    = mapData.factionColor || '#d4a843';

  // Draw trade routes / connections
  if (mapData.connections) {
    mapData.connections.forEach(conn => {
      const fromLoc = mapData.locations.find(l => l.id === conn.from);
      const toLoc   = mapData.locations.find(l => l.id === conn.to);
      if (!fromLoc || !toLoc) return;

      const [fc1, fr1] = gridToXYLocal(fromLoc, mapData, ALPHA);
      const [fc2, fr2] = gridToXYLocal(toLoc,   mapData, ALPHA);
      const fx = fc1 * cellW + cellW / 2;
      const fy = fr1 * cellH + cellH / 2;
      const tx = fc2 * cellW + cellW / 2;
      const ty = fr2 * cellH + cellH / 2;

      ctx.save();
      ctx.setLineDash(conn.type === 'trade_route' ? [5, 4] : [2, 4]);
      ctx.strokeStyle = conn.type === 'trade_route'
        ? hexToRgba(fc, 0.55)
        : 'rgba(255,255,255,0.22)';
      ctx.lineWidth = conn.type === 'trade_route' ? 1.5 : 1;
      ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(tx, ty); ctx.stroke();
      ctx.restore();
    });
  }

  // Draw location markers
  mapData.locations.forEach(loc => {
    const [col, row] = gridToXYLocal(loc, mapData, ALPHA);
    const cx = col * cellW + cellW / 2;
    const cy = row * cellH + cellH / 2;
    const isSelected = selectedLoc  === loc.id;
    const isHovered  = hoveredLocId === loc.id;
    const isActive   = isSelected || isHovered;

    const markerColor = typeToColor(loc.type, fc);
    const markerSize  = isActive ? 18 : (loc.type === 'major_city' ? 15 : 12);
    const labelSize   = isActive ? 7.5 : (loc.type === 'major_city' ? 6.5 : 5.5);

    // Glow ring for selected / hovered
    if (isActive) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, markerSize + 5, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(markerColor, 0.18);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.shadowColor  = markerColor;
      ctx.shadowBlur   = 18;
      ctx.strokeStyle  = hexToRgba(markerColor, 0.85);
      ctx.lineWidth    = 1.8;
      ctx.beginPath();
      ctx.arc(cx, cy, markerSize + 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Segitiga penanda di bawah ikon (tidak menutupi gambar)
    ctx.save();
    const triSize  = loc.type === 'major_city' ? 7 : 5;   // ukuran segitiga
    const triColor = isActive ? markerColor : hexToRgba(markerColor, 0.75);
    const triY     = cy + markerSize * 0.6;                // posisi: tepat di bawah ikon

    // Glow segitiga
    if (isActive) {
      ctx.shadowColor = markerColor;
      ctx.shadowBlur  = 14;
    } else {
      ctx.shadowColor = markerColor;
      ctx.shadowBlur  = 6;
    }

    // Gambar segitiga ▼
    ctx.beginPath();
    ctx.moveTo(cx,            triY);              // puncak atas (tengah)
    ctx.lineTo(cx - triSize,  triY + triSize * 1.6); // kiri bawah
    ctx.lineTo(cx + triSize,  triY + triSize * 1.6); // kanan bawah
    ctx.closePath();

    // Fill segitiga
    ctx.fillStyle = triColor;
    ctx.fill();

    // Border segitiga (lebih terang)
    ctx.strokeStyle = isActive ? '#ffffff' : hexToRgba(markerColor, 0.9);
    ctx.lineWidth   = isActive ? 1.2 : 0.8;
    ctx.stroke();

    ctx.restore();

    // Emoji icon
    ctx.save();
    ctx.font          = `${markerSize}px serif`;
    ctx.textAlign     = 'center';
    ctx.textBaseline  = 'middle';
    ctx.shadowColor   = markerColor;
    ctx.shadowBlur    = isActive ? 18 : 8;
    // GANTI DENGAN:
    ctx.fillText(loc.emoji, cx, cy - markerSize * 0.3);  // naik sedikit agar tidak overlap segitiga
    ctx.restore();

    // Location name label
    const label = loc.name || loc.id;
    ctx.save();
    ctx.font      = `bold ${labelSize}px "Segoe UI", sans-serif`;
    ctx.textAlign = 'center';

    // Label shadow / background pill
    const tw = ctx.measureText(label).width;
    const lx = cx - tw / 2 - 4;
    const ly = cy + markerSize - 1;
    ctx.fillStyle = 'rgba(6,10,20,0.72)';
    roundRect(ctx, lx, ly, tw + 8, labelSize + 4, 3);
    ctx.fill();

    ctx.fillStyle    = isActive ? '#ffffff' : 'rgba(240,230,210,0.9)';
    ctx.shadowColor  = markerColor;
    ctx.shadowBlur   = isActive ? 8 : 4;
    ctx.textBaseline = 'top';
    ctx.fillText(label, cx, ly + 2);
    ctx.restore();
  });
}

// ════════════════════════════════════════════════════════════
// CANVAS INTERACTION
// ════════════════════════════════════════════════════════════
function handleCanvasClick(e, canvas, mapId, mapData) {
  const { mx, my, W, H } = getMousePos(e, canvas);

  if (mapData.level === 0) {
    // World map: klik faction region → zoom ke region map
    const region = getRegionAtPos(mx, my, W, H, mapData);
    if (region) switchMap(region.linkedMapId);

  } else {
    // Region map: klik lokasi → highlight + buka popup detail jika ada
    const loc = getLocAtPos(mx, my, canvas.width, canvas.height, mapData);
    if (loc) {
      highlightLocation(loc.id);
      if (loc.detailUrl) {
        const fc = mapData.factionColor || '#d4a843';
        const mc = typeToColor(loc.type, fc);
        openLocationPopup(loc.detailUrl, loc.name, loc.emoji, mc);
      }
    }
  }
}

function handleCanvasHover(e, canvas, mapId, mapData) {
  const { mx, my, W, H } = getMousePos(e, canvas);
  _lastHoverX = e.clientX;
  _lastHoverY = e.clientY;

  if (mapData.level === 0) {
    // World map hover — faction region highlight
    const region = getRegionAtPos(mx, my, W, H, mapData);
    const newFaction = region ? region.faction : null;

    // World map — cek juga worldLocations untuk tooltip detail
    let newLocId = null;
    if (mapData.worldLocations) {
      const COLS  = mapData.gridConfig.cols;
      const ROWS  = mapData.gridConfig.rows;
      const cellW = W / COLS;
      const cellH = H / ROWS;
      const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let minDist = 999;
      mapData.worldLocations.forEach(loc => {
        const [col, row] = gridToXY(loc.grid, ALPHA);
        const cx = col * cellW + cellW / 2;
        const cy = row * cellH + cellH / 2;
        const dist = Math.hypot(mx - cx, my - cy);
        if (dist < 18 && dist < minDist) { minDist = dist; newLocId = loc.id; }
      });
    }

    const changed = newFaction !== hoveredRegion || newLocId !== hoveredLocId;
    hoveredRegion = newFaction;
    hoveredLocId  = newLocId;
    canvas.style.cursor = (newFaction || newLocId) ? 'pointer' : 'default';

    if (changed) {
      drawMapCanvas(mapId);
      if (newLocId && mapData.worldLocations) {
        const loc = mapData.worldLocations.find(l => l.id === newLocId);
        if (loc) showHtmlTooltip(e.clientX, e.clientY, loc.name, loc.emoji, loc.color, null, loc.detailUrl || null);
        else removeHtmlTooltip();
      } else if (newFaction && region) {
        showHtmlTooltip(e.clientX, e.clientY, region.name, region.emoji, region.color,
          `${region.majorCities ? region.majorCities.slice(0,3).join(' · ') : ''}`, null);
      } else {
        removeHtmlTooltip();
      }
    } else if (newLocId || newFaction) {
      // Update tooltip position
      moveHtmlTooltip(e.clientX, e.clientY);
    }

  } else {
    // Region map hover — location tooltip
    const loc = getLocAtPos(mx, my, canvas.width, canvas.height, mapData);
    const newLocId = loc ? loc.id : null;
    const changed  = newLocId !== hoveredLocId;
    hoveredLocId   = newLocId;
    canvas.style.cursor = newLocId ? 'pointer' : 'default';

    if (changed) {
      drawMapCanvas(mapId);
      if (loc) {
        const fc = mapData.factionColor || '#d4a843';
        const mc = typeToColor(loc.type, fc);
        showHtmlTooltip(e.clientX, e.clientY, loc.name, loc.emoji, mc, loc.lore || null, loc.detailUrl || null);
      } else {
        removeHtmlTooltip();
      }
    } else if (newLocId) {
      moveHtmlTooltip(e.clientX, e.clientY);
    }
  }
}

// ════════════════════════════════════════════════════════════
// HTML TOOLTIP (floating div — more accurate than canvas text)
// ════════════════════════════════════════════════════════════
function getOrCreateTooltipEl() {
  let el = document.getElementById('map-hover-tooltip');
  if (!el) {
    el = document.createElement('div');
    el.id = 'map-hover-tooltip';
    el.style.cssText = `
      position: fixed;
      z-index: 9000;
      pointer-events: none;
      background: rgba(6,10,20,0.94);
      border: 1px solid rgba(212,168,67,0.45);
      border-radius: 10px;
      padding: 9px 13px;
      max-width: 260px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(212,168,67,0.08);
      font-family: "Segoe UI", sans-serif;
      backdrop-filter: blur(6px);
      transition: opacity 0.12s ease;
      opacity: 0;
    `;
    document.body.appendChild(el);
  }
  return el;
}

// _tooltipDetailUrl stores the url for the currently shown tooltip
let _tooltipDetailUrl = null;

function showHtmlTooltip(clientX, clientY, name, emoji, color, desc, detailUrl) {
  const el = getOrCreateTooltipEl();
  _tooltipDetailUrl = detailUrl || null;

  // Make tooltip clickable if detailUrl exists
  if (detailUrl) {
    el.style.pointerEvents = 'all';
    el.style.cursor = 'pointer';
    el.onclick = (e) => {
      e.stopPropagation();
      if (_tooltipDetailUrl) openLocationPopup(_tooltipDetailUrl, name, emoji, color);
    };
  } else {
    el.style.pointerEvents = 'none';
    el.style.cursor = 'default';
    el.onclick = null;
  }

  const clickHint = detailUrl
    ? `<div style="margin-top:7px;padding-top:6px;border-top:1px solid rgba(212,168,67,0.18);display:flex;align-items:center;gap:5px;">
        <span style="font-size:0.6rem;color:rgba(212,168,67,0.75);letter-spacing:0.08em;">🗺️ KLIK UNTUK DETAIL MAP</span>
       </div>`
    : '';

  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:7px;margin-bottom:${desc ? 5 : 0}px;">
      <span style="font-size:1.1rem;">${emoji}</span>
      <span style="font-size:0.75rem;font-weight:700;color:${color};letter-spacing:0.04em;">${name}</span>
    </div>
    ${desc ? `<div style="font-size:0.67rem;color:rgba(200,190,170,0.85);line-height:1.5;">${desc}</div>` : ''}
    ${clickHint}
  `;
  el.style.borderColor = hexToRgba(color, detailUrl ? 0.75 : 0.5);
  el.style.boxShadow   = detailUrl
    ? `0 8px 32px rgba(0,0,0,0.6), 0 0 28px ${hexToRgba(color, 0.25)}`
    : `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${hexToRgba(color, 0.12)}`;
  positionTooltip(el, clientX, clientY);
  el.style.opacity = '1';
}

// ════════════════════════════════════════════════════════════
// LOCATION DETAIL POPUP — Canvas image viewer with drag-to-pan
// Gambar dimuat via Image(), ditampilkan di canvas, bisa di-drag
// ════════════════════════════════════════════════════════════
function openLocationPopup(url, name, emoji, color) {
  // Remove existing popup if any
  const existing = document.getElementById('map-location-popup');
  if (existing) existing.remove();

  // ── Inject styles once ──────────────────────────────────
  if (!document.getElementById('popup-style')) {
    const style = document.createElement('style');
    style.id = 'popup-style';
    style.textContent = `
      @keyframes _popupFadeIn  { from{opacity:0} to{opacity:1} }
      @keyframes _popupSlideIn {
        from { transform: translateY(24px) scale(0.96); opacity:0 }
        to   { transform: translateY(0)    scale(1);    opacity:1 }
      }
      #map-location-popup-box { animation: _popupSlideIn 0.32s cubic-bezier(0.22,1,0.36,1); }
      #map-detail-canvas {
        display: block;
        cursor: grab;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
      }
      #map-detail-canvas.dragging { cursor: grabbing; }
      .popup-ctrl-btn {
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.13);
        color: rgba(255,255,255,0.75);
        font-size: 0.8rem;
        font-weight: 700;
        width: 32px; height: 32px;
        border-radius: 8px;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: all 0.15s ease;
        font-family: "Segoe UI", sans-serif;
        flex-shrink: 0;
        line-height: 1;
        padding: 0;
      }
      .popup-ctrl-btn:hover { background: rgba(255,255,255,0.14); color:#fff; }
      .popup-zoom-label {
        font-family: "Segoe UI", monospace;
        font-size: 0.62rem;
        color: rgba(255,255,255,0.35);
        letter-spacing: 0.08em;
        min-width: 42px;
        text-align: center;
      }
    `;
    document.head.appendChild(style);
  }

  // ── Overlay ─────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.id = 'map-location-popup';
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:99999;
    background:rgba(4,6,14,0.9);
    backdrop-filter:blur(10px);
    display:flex; align-items:center; justify-content:center;
    animation:_popupFadeIn 0.22s ease;
    padding:16px; box-sizing:border-box;
  `;

  // ── Box ─────────────────────────────────────────────────
  const box = document.createElement('div');
  box.id = 'map-location-popup-box';
  box.style.cssText = `
    background: #06090e;
    border: 1px solid ${hexToRgba(color, 0.55)};
    border-radius: 18px;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.04),
                0 40px 100px rgba(0,0,0,0.85),
                0 0 70px ${hexToRgba(color, 0.18)};
    width: 100%; max-width: 1100px;
    height: 90vh; max-height: 820px;
    display: flex; flex-direction: column;
    overflow: hidden;
    font-family: "Segoe UI", sans-serif;
    position: relative;
  `;

  // ── Header ───────────────────────────────────────────────
  const header = document.createElement('div');
  header.style.cssText = `
    display:flex; align-items:center; gap:10px;
    padding:12px 16px;
    border-bottom:1px solid ${hexToRgba(color,0.18)};
    background:rgba(0,0,0,0.45);
    flex-shrink:0; position:relative; z-index:2;
  `;
  header.innerHTML = `
    <span style="font-size:1.25rem;flex-shrink:0;">${emoji}</span>
    <span style="font-size:0.72rem;font-weight:800;color:${color};letter-spacing:0.14em;
      flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${name.toUpperCase()}</span>

    <!-- Zoom controls -->
    <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
      <button class="popup-ctrl-btn" id="popup-zoom-out" title="Zoom Out">−</button>
      <span class="popup-zoom-label" id="popup-zoom-label">100%</span>
      <button class="popup-ctrl-btn" id="popup-zoom-in"  title="Zoom In">+</button>
      <button class="popup-ctrl-btn" id="popup-zoom-fit" title="Fit to screen"
        style="font-size:0.6rem;letter-spacing:0.04em;width:auto;padding:0 8px;">FIT</button>
    </div>

    <div style="width:1px;height:20px;background:rgba(255,255,255,0.1);flex-shrink:0;margin:0 4px;"></div>

    <!-- Close -->
    <button id="map-popup-close" class="popup-ctrl-btn" style="border-radius:50%;width:30px;height:30px;"
      onmouseover="this.style.background='rgba(220,60,60,0.25)';this.style.color='#fff'"
      onmouseout="this.style.background='rgba(255,255,255,0.06)';this.style.color='rgba(255,255,255,0.75)'"
    >✕</button>
  `;

  // ── Canvas wrapper ────────────────────────────────────────
  const canvasWrap = document.createElement('div');
  canvasWrap.style.cssText = `
    flex:1; position:relative; overflow:hidden;
    background: radial-gradient(ellipse at center, #0c1020 0%, #060912 100%);
  `;

  const canvas = document.createElement('canvas');
  canvas.id = 'map-detail-canvas';
  canvasWrap.appendChild(canvas);

  // ── Loader overlay ────────────────────────────────────────
  const loader = document.createElement('div');
  loader.id = 'popup-loader';
  loader.style.cssText = `
    position:absolute; inset:0;
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
    color:${color}; font-size:0.7rem; letter-spacing:0.14em;
    background:#060912; z-index:10; transition:opacity 0.35s ease;
  `;
  loader.innerHTML = `
    <span style="font-size:2.5rem;animation:_popupFadeIn 0.8s ease infinite alternate;">${emoji}</span>
    <span style="color:rgba(255,255,255,0.5);">Memuat peta ${name}…</span>
    <div style="width:120px;height:2px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;">
      <div id="popup-loader-bar" style="width:0%;height:100%;background:${color};
        border-radius:2px;transition:width 0.4s ease;"></div>
    </div>
  `;
  canvasWrap.appendChild(loader);

  // ── Hint label ────────────────────────────────────────────
  const hint = document.createElement('div');
  hint.style.cssText = `
    position:absolute; bottom:12px; left:50%; transform:translateX(-50%);
    font-size:0.58rem; color:rgba(255,255,255,0.2); letter-spacing:0.12em;
    pointer-events:none; white-space:nowrap; z-index:2;
  `;
  hint.textContent = '🖱 DRAG UNTUK PAN   •   SCROLL UNTUK ZOOM';
  canvasWrap.appendChild(hint);

  box.appendChild(header);
  box.appendChild(canvasWrap);
  overlay.appendChild(box);
  document.body.appendChild(overlay);

  // ════════════════════════════════════════════════════════
  // PAN & ZOOM STATE
  // ════════════════════════════════════════════════════════
  let img      = null;
  let scale    = 1;
  let fitScale = 1;    // ← dikunci saat gambar dimuat; minScale = fitScale
  let maxScale = 4;
  let panX = 0, panY = 0;
  let fitPanX = 0, fitPanY = 0;  // posisi center saat fit
  let isDragging = false;
  let lastMX = 0, lastMY = 0;

  const ctx = canvas.getContext('2d');

  // Resize canvas to wrapper size
  function resizeCanvas() {
    const r = canvasWrap.getBoundingClientRect();
    canvas.width  = Math.round(r.width);
    canvas.height = Math.round(r.height);
    if (img) calcFit();
    render();
  }

  // Hitung fitScale + fitPan (centered contain) tanpa apply
  function calcFit() {
    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    fitScale = Math.min(cw / iw, ch / ih);
    fitPanX  = (cw - iw * fitScale) / 2;
    fitPanY  = (ch - ih * fitScale) / 2;
  }

  // Terapkan fit — snap ke full centered view
  function fitToCanvas() {
    if (!img) return;
    calcFit();
    scale = fitScale;
    panX  = fitPanX;
    panY  = fitPanY;
    updateZoomLabel();
    render();
  }

  function clampPan() {
    if (!img) return;
    // Saat zoom di batas minimum, paksa center agar tidak melayang di pojok
    if (scale <= fitScale + 0.001) {
      panX = fitPanX;
      panY = fitPanY;
      return;
    }
    const iw  = img.naturalWidth  * scale;
    const ih  = img.naturalHeight * scale;
    const cw  = canvas.width, ch = canvas.height;
    const pad = 40;
    panX = Math.min(pad, Math.max(cw - iw - pad, panX));
    panY = Math.min(pad, Math.max(ch - ih - pad, panY));
  }

  function render() {
    if (!img) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(panX, panY);
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);
    ctx.restore();
  }

  function updateZoomLabel() {
    const lbl = document.getElementById('popup-zoom-label');
    if (lbl) lbl.textContent = Math.round(scale * 100) + '%';
  }

  function zoomAt(cx, cy, factor) {
    // Minimum = fitScale; tidak bisa lebih kecil dari fit-to-screen
    const newScale = Math.min(maxScale, Math.max(fitScale, scale * factor));

    // Sudah di batas minimum → snap ke posisi fit yang centered
    if (newScale <= fitScale) {
      scale = fitScale;
      panX  = fitPanX;
      panY  = fitPanY;
      updateZoomLabel();
      render();
      return;
    }

    const ratio = newScale / scale;
    panX  = cx - ratio * (cx - panX);
    panY  = cy - ratio * (cy - panY);
    scale = newScale;
    clampPan();
    updateZoomLabel();
    render();
  }

  // ── Load image ───────────────────────────────────────────
  const image = new Image();
  image.crossOrigin = 'anonymous';

  // Fake loading progress
  let fakeProgress = 0;
  const fakeBar = () => {
    const bar = document.getElementById('popup-loader-bar');
    if (bar && fakeProgress < 85) {
      fakeProgress += Math.random() * 18;
      bar.style.width = Math.min(85, fakeProgress) + '%';
      setTimeout(fakeBar, 200 + Math.random() * 200);
    }
  };
  fakeBar();

  image.onload = () => {
    img = image;
    // Complete bar
    const bar = document.getElementById('popup-loader-bar');
    if (bar) bar.style.width = '100%';

    // Resize canvas first
    resizeCanvas();
    // Fit entire map to canvas
    fitToCanvas();

    // Hide loader
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 350);
    }, 200);
  };

  image.onerror = () => {
    loader.innerHTML = `
      <span style="font-size:2rem;">⚠️</span>
      <span style="color:rgba(255,120,120,0.8);font-size:0.68rem;">Gagal memuat gambar peta.</span>
      <span style="color:rgba(255,255,255,0.25);font-size:0.6rem;">${url}</span>`;
  };

  image.src = url;

  // ── Resize observer ───────────────────────────────────────
  const ro = new ResizeObserver(() => { resizeCanvas(); });
  ro.observe(canvasWrap);

  // ════════════════════════════════════════════════════════
  // MOUSE EVENTS — drag to pan
  // ════════════════════════════════════════════════════════
  canvas.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isDragging = true;
    lastMX = e.clientX;
    lastMY = e.clientY;
    canvas.classList.add('dragging');
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    panX += e.clientX - lastMX;
    panY += e.clientY - lastMY;
    lastMX = e.clientX;
    lastMY = e.clientY;
    clampPan();
    render();
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) { isDragging = false; canvas.classList.remove('dragging'); }
  });

  // ── Scroll to zoom ────────────────────────────────────────
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
    zoomAt(cx, cy, factor);
  }, { passive: false });

  // ── Touch events — pinch zoom + pan ──────────────────────
  let lastTouchDist = 0;
  let lastTouchMidX = 0, lastTouchMidY = 0;

  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastMX = e.touches[0].clientX;
      lastMY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
      isDragging = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      lastTouchDist = Math.hypot(dx, dy);
      lastTouchMidX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      lastTouchMidY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    }
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && isDragging) {
      panX += e.touches[0].clientX - lastMX;
      panY += e.touches[0].clientY - lastMY;
      lastMX = e.touches[0].clientX;
      lastMY = e.touches[0].clientY;
      clampPan();
      render();
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const rect = canvas.getBoundingClientRect();
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
      if (lastTouchDist > 0) zoomAt(midX, midY, dist / lastTouchDist);
      lastTouchDist = dist;
    }
    e.preventDefault();
  }, { passive: false });

  canvas.addEventListener('touchend', () => { isDragging = false; });

  // ════════════════════════════════════════════════════════
  // BUTTON CONTROLS
  // ════════════════════════════════════════════════════════
  document.getElementById('popup-zoom-in').addEventListener('click', () => {
    zoomAt(canvas.width / 2, canvas.height / 2, 1.25);
  });
  document.getElementById('popup-zoom-out').addEventListener('click', () => {
    zoomAt(canvas.width / 2, canvas.height / 2, 1 / 1.25);
  });
  document.getElementById('popup-zoom-fit').addEventListener('click', fitToCanvas);

  // ════════════════════════════════════════════════════════
  // CLOSE
  // ════════════════════════════════════════════════════════
  const closePopup = () => {
    ro.disconnect();
    window.removeEventListener('mousemove', arguments.callee);
    window.removeEventListener('mouseup',  arguments.callee);
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.2s ease';
    setTimeout(() => overlay.remove(), 210);
  };

  const doClose = () => {
    ro.disconnect();
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.2s ease';
    setTimeout(() => overlay.remove(), 210);
  };

  document.getElementById('map-popup-close').addEventListener('click', doClose);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) doClose(); });
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') { doClose(); document.removeEventListener('keydown', escHandler); }
  });
}

// ════════════════════════════════════════════════════════════
// IMAGE PROTECTION — prevent right-click save & inspect download
// ════════════════════════════════════════════════════════════
function initImageProtection() {
  // 1. Block context menu on canvas & all images
  document.addEventListener('contextmenu', (e) => {
    const t = e.target;
    if (
      t.tagName === 'CANVAS' ||
      t.tagName === 'IMG' ||
      t.closest('#map-display-container') ||
      t.closest('#app')
    ) {
      e.preventDefault();
      return false;
    }
  });

  // 2. Block drag-to-save on all images
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG' || e.target.tagName === 'CANVAS') {
      e.preventDefault();
      return false;
    }
  });

  // 3. Override all <img> to use CSS background + transparent overlay
  //    so the src is not directly accessible via right-click
  function shieldImages() {
    document.querySelectorAll('img:not([data-shielded])').forEach(img => {
      img.setAttribute('data-shielded', '1');
      // Prevent long-press save on mobile
      img.style.webkitUserSelect  = 'none';
      img.style.userSelect        = 'none';
      img.style.pointerEvents     = 'none';
      // Replace with background-image div to break right-click → Save Image
      if (img.complete && img.naturalWidth > 0) {
        replaceImgWithDiv(img);
      } else {
        img.addEventListener('load', () => replaceImgWithDiv(img), { once: true });
      }
    });
  }

  function replaceImgWithDiv(img) {
    // Skip tiny icons / emoji images
    if (img.naturalWidth < 48 && img.naturalHeight < 48) return;
    // Skip if already replaced
    if (img.dataset.replaced) return;
    img.dataset.replaced = '1';

    const div = document.createElement('div');
    // Copy relevant attributes for layout
    div.className    = img.className;
    div.id           = img.id || '';
    div.style.cssText = `
      display: inline-block;
      background-image: url('${img.src}');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width:  ${img.offsetWidth  || img.width  || '100%'}px;
      height: ${img.offsetHeight || img.height || 'auto'}px;
      user-select: none;
      -webkit-user-drag: none;
      pointer-events: none;
    `;
    // Copy explicit style overrides from original
    if (img.getAttribute('style')) {
      div.setAttribute('style', div.style.cssText + img.getAttribute('style'));
    }
    // Insert div before img, then hide img
    img.parentNode.insertBefore(div, img);
    img.style.display = 'none';
  }

  // 4. Canvas: draw from hidden off-screen canvas, never expose src
  //    (already handled — map images load into Image() objects, never <img> tags)

  // 5. Block keyboard shortcuts for save / print / view-source that might expose assets
  document.addEventListener('keydown', (e) => {
    // Block Ctrl+S (save page), Ctrl+U (view source), Ctrl+P (print)
    if (e.ctrlKey && ['s','u','p'].includes(e.key.toLowerCase())) {
      e.preventDefault();
      return false;
    }
    // Block F12 / Ctrl+Shift+I (devtools) — cosmetic only, can't fully block
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
      e.preventDefault();
      return false;
    }
  });

  // 6. Apply shielding now + on DOM changes
  shieldImages();
  const observer = new MutationObserver(() => shieldImages());
  observer.observe(document.body, { childList: true, subtree: true });
}

// Run image protection immediately
initImageProtection();

function moveHtmlTooltip(clientX, clientY) {
  const el = document.getElementById('map-hover-tooltip');
  if (el) positionTooltip(el, clientX, clientY);
}

function positionTooltip(el, clientX, clientY) {
  const margin = 14;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // Temporarily make visible to measure
  el.style.visibility = 'hidden';
  el.style.display    = 'block';
  const w = el.offsetWidth  || 200;
  const h = el.offsetHeight || 50;
  el.style.visibility = '';

  let tx = clientX + margin;
  let ty = clientY - h / 2;
  if (tx + w > vw - 8) tx = clientX - w - margin;
  if (ty < 8) ty = 8;
  if (ty + h > vh - 8) ty = vh - h - 8;
  el.style.left = tx + 'px';
  el.style.top  = ty + 'px';
}

function removeHtmlTooltip() {
  const el = document.getElementById('map-hover-tooltip');
  if (el) { el.style.opacity = '0'; }
}

// ════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ════════════════════════════════════════════════════════════

// Konversi grid referensi (e.g. "E3") → [col, row] index
function gridToXY(gridRef, ALPHA) {
  const letter = gridRef.replace(/[^A-Z]/gi, '').toUpperCase();
  const num    = parseInt(gridRef.replace(/[^0-9]/g, ''), 10);
  const col    = ALPHA.indexOf(letter.charAt(0));
  const row    = isNaN(num) ? 0 : num - 1;
  return [Math.max(0, col), Math.max(0, row)];
}

// GANTI DENGAN:
function gridToXYLocal(loc, mapData, ALPHA) {
  const ref = loc.gridLocal || loc.grid;
  const [col, row] = gridToXY(ref, ALPHA);
  const ox = loc.offsetX || 0;   // tambahan kolom (0.5 = setengah cell ke kanan)
  const oy = loc.offsetY || 0;   // tambahan baris (0.5 = setengah cell ke bawah)
  return [col + ox, row + oy];
}

function getMousePos(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    mx: (e.clientX - rect.left) * (canvas.width  / rect.width),
    my: (e.clientY - rect.top)  * (canvas.height / rect.height),
    W:  canvas.width,
    H:  canvas.height,
  };
}

function getRegionAtPos(mx, my, W, H, mapData) {
  if (!mapData.regions) return null;
  const COLS  = mapData.gridConfig.cols;
  const ROWS  = mapData.gridConfig.rows;
  const cellW = W / COLS;
  const cellH = H / ROWS;
  const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const clickCol = Math.floor(mx / cellW);
  const clickRow = Math.floor(my / cellH) + 1;
  return mapData.regions.find(r => {
    const sc = ALPHA.indexOf(r.bounds.startCol);
    const ec = ALPHA.indexOf(r.bounds.endCol);
    return clickCol >= sc && clickCol <= ec &&
           clickRow >= r.bounds.startRow && clickRow <= r.bounds.endRow;
  }) || null;
}

function getLocAtPos(mx, my, W, H, mapData) {
  if (!mapData.locations) return null;
  const COLS  = mapData.gridConfig.cols;
  const ROWS  = mapData.gridConfig.rows;
  const cellW = W / COLS;
  const cellH = H / ROWS;
  const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let closest = null;
  let minDist = 999;
  // Radius hit lebih besar untuk major city
  mapData.locations.forEach(loc => {
    const [col, row] = gridToXYLocal(loc, mapData, ALPHA);
    const cx = col * cellW + cellW / 2;
    const cy = row * cellH + cellH / 2;
    const dist = Math.hypot(mx - cx, my - cy);
    const hitR = loc.type === 'major_city' ? 28 : 20;
    if (dist < hitR && dist < minDist) { minDist = dist; closest = loc; }
  });
  return closest;
}

function typeToColor(type, fallback) {
  const map = {
    major_city: fallback || '#d4a843',
    settlement: '#64b5f6',
    landmark:   '#ce93d8',
    ruin:       '#9e9e9e',
    oasis:      '#4fc3f7',
    grey_zone:  '#888',
    forbidden:  '#ef5350',
    minor:      '#a5d6a7',
  };
  return map[type] || fallback || '#d4a843';
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function hexToRgba(hex, alpha = 1) {
  if (!hex || hex.length < 7) return `rgba(212,168,67,${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ════════════════════════════════════════════════════════════
// GO BACK
// ════════════════════════════════════════════════════════════
function mapGoBack() {
  if (mapHistory.length > 1) {
    mapHistory.pop();
    const prev = mapHistory[mapHistory.length - 1];
    currentMapId  = prev;
    hoveredLocId  = null;
    hoveredRegion = null;
    selectedLoc   = null;
    removeHtmlTooltip();
    updateActiveTab(prev);
    animateFadeSwitch(prev);
  }
}

// ════════════════════════════════════════════════════════════
// EXPORTS
// ════════════════════════════════════════════════════════════
window.initMapSystem      = initMapSystem;
window.switchMap          = switchMap;
window.mapGoBack          = mapGoBack;
window.highlightLocation  = highlightLocation;