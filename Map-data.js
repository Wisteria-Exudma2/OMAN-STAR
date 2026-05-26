// ============================================================
// MAP-DATA.JS — OMAN INTERACTIVE WORLD MAP (REBUILT)
// Semua koordinat dikalibrasi dari gambar asli tiap peta
// ============================================================

const WORLD_MAPS = {

  // ══════════════════════════════════════════════════════════
  // LEVEL 0: WORLD MAP
  // ══════════════════════════════════════════════════════════
  'world-oman': {
    id: 'world-oman',
    name: 'OMAN WORLD MAP',
    level: 0,
    year: 2500,
    subtitle: 'Year 2500 RA — A Post-Apocalyptic World of Seven Factions',
    imageUrl: 'Map/OMAN WORLD MAP.png',
    description: 'Dunia OMAN — 7 faksi besar, zona terlarang, dan Dead Sea of Ashur.',
    gridConfig: { cols: 26, rows: 30, scale: 50 },
    regions: [
      {
        cellId: 'A-N:1-15',
        name: 'Aurelian Empire',
        emoji: '👑',
        color: '#d4a843',
        faction: 'aurelian',
        bounds: { startCol: 'A', endCol: 'N', startRow: 1, endRow: 15 },
        linkedMapId: 'aurelian-nw-territory',
        description: 'Kerajaan gurun emas dengan kuil matahari kuno dan jalur perdagangan besar.',
        majorCities: ['Solaris Prime', 'Helios Gate', 'Radiance', "Sunking's Crown", 'Golden Spire'],
      },
      {
        cellId: 'F-P:1-14',
        name: 'Arcane Consortium',
        emoji: '🔮',
        color: '#00acc1',
        faction: 'arcane',
        bounds: { startCol: 'F', endCol: 'P', startRow: 1, endRow: 14 },
        linkedMapId: 'arcane-central-towers',
        description: 'Menara terapung, laboratorium sihir, dan zona anomali arcane.',
        majorCities: ['Aetherion', 'Lumnora', 'Celestial Nexus', 'The Spirecluster', 'Obsidian Academy'],
      },
      {
        cellId: 'O-Z:1-16',
        name: 'Shadow Covenant',
        emoji: '🌑',
        color: '#7b2d8b',
        faction: 'shadow',
        bounds: { startCol: 'O', endCol: 'Z', startRow: 1, endRow: 16 },
        linkedMapId: 'shadow-underground-realm',
        description: 'Jaringan canyon tersembunyi, kota bawah tanah, wilayah para assassin.',
        majorCities: ['Umbral Hold', 'Nightveil', 'Duskreach', 'Shadowspine', 'Coven Depths'],
      },
      {
        cellId: 'A-H:11-30',
        name: 'Wildlands Pact',
        emoji: '🌿',
        color: '#2e7d32',
        faction: 'wildlands',
        bounds: { startCol: 'A', endCol: 'H', startRow: 11, endRow: 30 },
        linkedMapId: 'wildlands-grassland-realm',
        description: 'Padang rumput terbesar di dunia, suku nomaden, dan beast riders.',
        majorCities: ['Greenhearth', "Beastcaller's Camp", 'Rootward', 'Stormgrass', 'Windward Fort'],
      },
      {
        cellId: 'H-R:14-30',
        name: 'Ironforge Guild',
        emoji: '⚒️',
        color: '#795548',
        faction: 'ironforge',
        bounds: { startCol: 'H', endCol: 'R', startRow: 14, endRow: 30 },
        linkedMapId: 'ironforge-forgelands',
        description: 'Kota industri raksasa, pertambangan, dan forge-city penuh asap dan baja.',
        majorCities: ['Ironhall', 'Forgebastion', 'Cindercrown', 'Deepmine', 'Molten Gate'],
      },
      {
        cellId: 'O-W:16-30',
        name: 'Crimson Crusade',
        emoji: '⚔️',
        color: '#c62828',
        faction: 'crimson',
        bounds: { startCol: 'O', endCol: 'W', startRow: 16, endRow: 30 },
        linkedMapId: 'crimson-fortress-realm',
        description: 'Gurun merah darah, benteng militer, dan fanatik religius.',
        majorCities: ['Bloodhold', 'Scarlet Citadel', "Faith's Bulwark", "Purifier's Rest", 'Red Sands Fort'],
      },
      {
        cellId: 'T-Z:1-30',
        name: 'Void Council',
        emoji: '🌀',
        color: '#1565c0',
        faction: 'void',
        bounds: { startCol: 'T', endCol: 'Z', startRow: 1, endRow: 30 },
        linkedMapId: 'void-corrupted-lands',
        description: 'Tanah terkorupsi, retakan realitas, dan arsitektur abnormal.',
        majorCities: ['Voidwatch', 'Reality Spire', 'Echo Abyss', 'Silent Archive', 'The Unspoken'],
      },
    ],
    worldLocations: [
      // Dipakai untuk hover tooltip di world map (label kota besar)
      // Aurelian
      { id: 'w-solaris',    name: 'Solaris Prime',      grid: 'F3',  emoji: '👑', faction: 'aurelian',  color: '#d4a843' },
      { id: 'w-helios',     name: 'Helios Gate',         grid: 'D7',  emoji: '🏰', faction: 'aurelian',  color: '#d4a843' },
      { id: 'w-radiance',   name: 'Radiance',            grid: 'H5',  emoji: '✨', faction: 'aurelian',  color: '#d4a843' },
      { id: 'w-sunking',    name: "Sunking's Crown",     grid: 'E9',  emoji: '👑', faction: 'aurelian',  color: '#d4a843' },
      { id: 'w-goldenspire',name: 'Golden Spire',        grid: 'J8',  emoji: '🏰', faction: 'aurelian',  color: '#d4a843' },
      // Arcane
      { id: 'w-aetherion',  name: 'Aetherion',           grid: 'K3',  emoji: '🔮', faction: 'arcane',    color: '#00acc1' },
      { id: 'w-lumnora',    name: 'Lumnora',             grid: 'I6',  emoji: '🔮', faction: 'arcane',    color: '#00acc1' },
      { id: 'w-celestial',  name: 'Celestial Nexus',     grid: 'M6',  emoji: '⭐', faction: 'arcane',    color: '#00acc1' },
      { id: 'w-spire',      name: 'The Spirecluster',    grid: 'K9',  emoji: '🔮', faction: 'arcane',    color: '#00acc1' },
      { id: 'w-obsidian',   name: 'Obsidian Academy',    grid: 'L12', emoji: '🏫', faction: 'arcane',    color: '#00acc1' },
      // Shadow
      { id: 'w-umbral',     name: 'Umbral Hold',         grid: 'R3',  emoji: '🌑', faction: 'shadow',    color: '#7b2d8b' },
      { id: 'w-nightveil',  name: 'Nightveil',           grid: 'T4',  emoji: '🌑', faction: 'shadow',    color: '#7b2d8b' },
      { id: 'w-duskreach',  name: 'Duskreach',           grid: 'P7',  emoji: '🌑', faction: 'shadow',    color: '#7b2d8b' },
      { id: 'w-shadowspine',name: 'Shadowspine',         grid: 'S9',  emoji: '🌑', faction: 'shadow',    color: '#7b2d8b' },
      { id: 'w-coven',      name: 'Coven Depths',        grid: 'U11', emoji: '🌑', faction: 'shadow',    color: '#7b2d8b' },
      // Wildlands
      { id: 'w-green',      name: 'Greenhearth',         grid: 'C14', emoji: '🌿', faction: 'wildlands', color: '#2e7d32' },
      { id: 'w-beast',      name: "Beastcaller's Camp",  grid: 'E16', emoji: '🦁', faction: 'wildlands', color: '#2e7d32' },
      { id: 'w-rootward',   name: 'Rootward',            grid: 'B18', emoji: '🌿', faction: 'wildlands', color: '#2e7d32' },
      { id: 'w-storm',      name: 'Stormgrass',          grid: 'F19', emoji: '🌿', faction: 'wildlands', color: '#2e7d32' },
      { id: 'w-windward',   name: 'Windward Fort',       grid: 'D21', emoji: '🛡️', faction: 'wildlands', color: '#2e7d32' },
      // Ironforge
      { id: 'w-ironhall',   name: 'Ironhall',            grid: 'J16', emoji: '⚒️', faction: 'ironforge', color: '#795548' },
      { id: 'w-forgebas',   name: 'Forgebastion',        grid: 'L15', emoji: '⚒️', faction: 'ironforge', color: '#795548' },
      { id: 'w-cinder',     name: 'Cindercrown',         grid: 'N17', emoji: '🔥', faction: 'ironforge', color: '#795548' },
      { id: 'w-deepmine',   name: 'Deepmine',            grid: 'K20', emoji: '⛏️', faction: 'ironforge', color: '#795548' },
      { id: 'w-molten',     name: 'Molten Gate',         grid: 'M21', emoji: '🔥', faction: 'ironforge', color: '#795548' },
      // Crimson
      { id: 'w-bloodhold',  name: 'Bloodhold',           grid: 'R16', emoji: '⚔️', faction: 'crimson',   color: '#c62828' },
      { id: 'w-scarlet',    name: 'Scarlet Citadel',     grid: 'T15', emoji: '🏯', faction: 'crimson',   color: '#c62828' },
      { id: 'w-faith',      name: "Faith's Bulwark",     grid: 'Q18', emoji: '⚔️', faction: 'crimson',   color: '#c62828' },
      { id: 'w-purifier',   name: "Purifier's Rest",     grid: 'S20', emoji: '⚔️', faction: 'crimson',   color: '#c62828' },
      { id: 'w-redsands',   name: 'Red Sands Fort',      grid: 'V22', emoji: '🏯', faction: 'crimson',   color: '#c62828' },
      // Void
      { id: 'w-voidwatch',  name: 'Voidwatch',           grid: 'X5',  emoji: '🌀', faction: 'void',      color: '#1565c0' },
      { id: 'w-realspire',  name: 'Reality Spire',       grid: 'Z6',  emoji: '🌀', faction: 'void',      color: '#1565c0' },
      { id: 'w-echo',       name: 'Echo Abyss',          grid: 'Y10', emoji: '🌀', faction: 'void',      color: '#1565c0' },
      { id: 'w-silent',     name: 'Silent Archive',      grid: 'X14', emoji: '🌀', faction: 'void',      color: '#1565c0' },
      { id: 'w-unspoken',   name: 'The Unspoken',        grid: 'Y19', emoji: '🌀', faction: 'void',      color: '#1565c0' },
      // Forbidden Zones
      { id: 'w-bone',       name: 'The Bone Wastes',     grid: 'L15', emoji: '💀', faction: 'forbidden', color: '#ef5350' },
      { id: 'w-shattered',  name: 'The Shattered Expanse',grid:'S15', emoji: '💀', faction: 'forbidden', color: '#ef5350' },
      { id: 'w-howling',    name: 'The Howling Waste',   grid: 'K29', emoji: '💀', faction: 'forbidden', color: '#ef5350' },
    ],
    legend: [
      { symbol: '🏰', label: 'Kota Besar',      color: '#d4a843' },
      { symbol: '🏘️', label: 'Permukiman Kecil', color: '#64b5f6' },
      { symbol: '⛰️', label: 'Pegunungan',       color: '#9e9e9e' },
      { symbol: '💧', label: 'Oasis / Danau',    color: '#4fc3f7' },
      { symbol: '💀', label: 'Zona Terlarang',   color: '#ef5350' },
      { symbol: '✖',  label: 'Reruntuhan Kuno',  color: '#9e9e9e' },
      { symbol: '░',  label: 'Grey Zone',         color: '#888' },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // AURELIAN EMPIRE — Northwest Territory
  // Grid referensi dari peta: kolom A-N, baris 1-15
  // ══════════════════════════════════════════════════════════
  'aurelian-nw-territory': {
    id: 'aurelian-nw-territory',
    name: 'AURELIAN EMPIRE',
    subtitle: 'Northwest Territory — Year 2500 RA',
    level: 1,
    year: 2500,
    parentMapId: 'world-oman',
    imageUrl: 'Map/AURELIAN EMPIRE MAP.png',
    factionColor: '#d4a843',
    description: 'Kerajaan gurun emas. Kuil-kuil kuno, kota megah, dan jalur perdagangan menghubungkan seluruh penjuru gurun.',
    gridConfig: { cols: 14, rows: 15, scale: 50 },
    locations: [
      // ── Major Cities ──
      { id: 'solaris-prime',   name: 'Solaris Prime',      grid: 'F4', gridlocal: 'F4',
        offsetX: -0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city',  emoji: '👑',
        lore: 'Ibu kota Aurelian Empire. Istana Surya berdiri di puncak bukit emas, terlihat dari seluruh penjuru kerajaan.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/1-AE-Solaris%20Prime.png' },
      { id: 'helios-gate',     name: 'Helios Gate',         grid: 'C7', gridlocal: 'C7',
        offsetX: 0.5,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city',  emoji: '🏰',
        lore: 'Benteng gerbang barat. Kota militer yang menjaga jalur masuk utama dari padang gurun.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/2-AE-Helios%20Gate.png' },
      { id: 'radiance',        name: 'Radiance',            grid: 'G6', gridlocal: 'G6',
        offsetX: -0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city',  emoji: '✨',
        lore: 'Kota perdagangan dan budaya terbesar. Pasar Emas Radiance terkenal hingga ke seluruh OMAN.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/3-AE-Radiance.png' },
      { id: 'sunking-crown',   name: "Sunking's Crown",     grid: 'E10', gridlocal: 'E10',
        offsetX: -0.1,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.1,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah) 
        type: 'major_city',  emoji: '👑',
        lore: 'Kota mahkota selatan — pusat administrasi dan kenegaraan wilayah selatan.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/4-AE-Sunking%20Crown.png' },
      { id: 'golden-spire',    name: 'Golden Spire',        grid: 'I9', gridlocal: 'I9', 
        offsetX: -0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.2,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city',  emoji: '🏰',
        lore: 'Menara emas yang menjulang tinggi, menjadi mercusuar navigasi seluruh gurun timur.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/5-AE-Golden%20Spire.png' },
      // ── Minor Settlements ──
      { id: 'amberwatch',      name: 'Amberwatch',          grid: 'H2', gridlocal: 'H2',
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement',  emoji: '🏘️',
        lore: 'Pos pengamatan di perbukitan amber, menjaga jalur utara dari ancaman luar.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/Amberwatch.png' },
      { id: 'sunreach',        name: 'Sunreach',            grid: 'C5', gridlocal: 'C5',
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.4,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement',  emoji: '🏘️',
        lore: 'Desa kecil di tepi jalur kafilah. Tempat singgah bagi pedagang dari barat.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/Sunreach.png' },
      { id: 'dusthold',        name: 'Dusthold',            grid: 'B10', type: 'settlement', emoji: '🏘️',
        lore: 'Pemukiman tepi gurun yang keras. Rakyatnya tangguh dan terbiasa bertahan hidup di pasir.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/Dusthold.png' },
      // ── Notable Landmarks ──
      { id: 'suntemple-ra',    name: 'Sun Temple of Ra',    grid: 'E7', gridLocal: 'E7',
        //TAMBAHKAN URL MAP NYA
        offsetX: 0.6,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.5,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'ruin',        emoji: '🏛️',
        lore: 'Kuil kuno yang dibangun sebelum era Aurelian. Dijaga ketat dan menjadi situs ziarah suci.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/Suntemple-Ra.png' },
      { id: 'obelisk-dawn',    name: 'Obelisk of Dawn',     grid: 'I5', type: 'landmark',    emoji: '🗿',
        lore: 'Obelisk setinggi 40 meter yang menandai titik timur perdagangan kuno.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/Obelisk%20of%20dawn2.png' },
      { id: 'sunspire-ruins',  name: 'Sunspire Ruins',      grid: 'J3', gridlocal: 'J3',
        offsetX: 0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'ruin',        emoji: '✖',
        lore: 'Reruntuhan menara matahari dari peradaban pra-OMAN. Bahaya bagi pendatang.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/Sunspire%20oasis.png' },
      { id: 'eye-sun',         name: 'Eye of the Sun',      grid: 'J8', gridLocal: 'J8',
        offsetX: 0.1,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.5,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'oasis',       emoji: '💧',
        lore: 'Oasis besar di gurun timur. Menjadi titik pertemuan kafilah dan sumber air vital.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/Eye%20of%20sun.png' },
      // Di Map-data.js:
      { id: 'mirage-oasis', name: 'Mirage Oasis', grid: 'K14', gridLocal: 'I12',
        offsetX: 0.5,   // ← geser +50% ke kanan (setengah cell ke arah J)
        offsetY: 0.8,   // ← tidak geser vertikal
        type: 'oasis', emoji: '💧',
        lore: 'Oasis legendaris yang kadang terlihat, kadang menghilang seperti fatamorgana.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/Mirage%20oasis.png' },
      { id: 'tomb-first-sun',  name: 'Tomb of the First Sun',grid: 'E13', gridlocal: 'E13',
        offsetX: -0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'ruin',       emoji: '✖',
        lore: 'Makan raja-raja pertama Aurelian. Dipenuhi jebakan dan penjaga abadi.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/UP-Tomb%20of%20the%20first%20sun.png' },
      { id: 'caravans-rest',   name: "Caravan's Rest",      grid: 'C12', gridLocal: 'C12',
        // TAMBAHKAN URL MAP NYA
        offsetX: 0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.4,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🏕️',
        lore: 'Titik peristirahatan kafilah di jalur selatan. Ada sumur, penginapan, dan penjaga.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/Caravans-Rest.png' },
      { id: 'drowned-caravan', name: 'The Drowned Caravan', grid: 'B7', gridLocal: 'B7',
        offsetX: 0,   // ← tidak geser horizontal
        offsetY: 0, // ← geser 50% ke bawah
        type: 'ruin',        emoji: '✖',
        lore: 'Reruntuhan kafilah besar yang tewas dalam badai pasir berabad lalu.',
        detailUrl: 'https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Aurelian%20map/The%20Drowned%20caravan.png' },
    ],
    connections: [
      { from: 'solaris-prime', to: 'radiance',      type: 'trade_route' },
      { from: 'solaris-prime', to: 'helios-gate',   type: 'trade_route' },
      { from: 'radiance',      to: 'golden-spire',  type: 'trade_route' },
      { from: 'helios-gate',   to: 'sunking-crown', type: 'trade_route' },
      { from: 'sunking-crown', to: 'golden-spire',  type: 'trade_route' },
      { from: 'solaris-prime', to: 'amberwatch',    type: 'path' },
      { from: 'helios-gate',   to: 'sunreach',      type: 'path' },
    ],
    legend: [
      { symbol: '👑', label: 'Kota Besar (Major City)', color: '#d4a843' },
      { symbol: '🏘️', label: 'Permukiman Kecil',         color: '#64b5f6' },
      { symbol: '🏛️', label: 'Kuil / Situs Suci',        color: '#ffcc80' },
      { symbol: '✖',  label: 'Reruntuhan Kuno',           color: '#9e9e9e' },
      { symbol: '💧', label: 'Oasis',                     color: '#4fc3f7' },
      { symbol: '🏕️', label: 'Titik Persinggahan',        color: '#a5d6a7' },
      { symbol: '-- ',label: 'Jalur Perdagangan',          color: '#d4a843' },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // ARCANE CONSORTIUM — Central-North Territories
  // Grid: kolom G-P, baris 1-14. Label hex di peta: G-P, 1-14
  // ══════════════════════════════════════════════════════════
  'arcane-central-towers': {
    id: 'arcane-central-towers',
    name: 'ARCANE CONSORTIUM',
    subtitle: 'Central-North Territories — Year 2500 RA',
    level: 1,
    year: 2500,
    parentMapId: 'world-oman',
    imageUrl: 'Map/Arcane Consortium Map.png',
    factionColor: '#00acc1',
    description: 'Tanah menara terapung, laboratorium arcane, dan sihir tak stabil.',
    gridConfig: { cols: 10, rows: 14, scale: 50 },
    // Peta Arcane pakai grid G-P (10 kolom) dan baris 1-14
    // Konversi: G=0, H=1, I=2, J=3, K=4, L=5, M=6, N=7, O=8, P=9
    gridOffset: { colStart: 'G', rowStart: 1 },
    locations: [
      // ── Major Cities ──
      { id: 'aetherion',      name: 'Aetherion',           grid: 'K3',  gridLocal: 'E3',  type: 'major_city', emoji: '🏰',
        lore: 'Ibukota Arcane Consortium. Pusat Dewan Tinggi dan Grand Spire — menara tertinggi di OMAN.',
        detailUrl: 'https://map.omanworld.com/location/aetherion' },
      { id: 'lumnora',        name: 'Lumnora',             grid: 'I6',  gridLocal: 'C6',  
        offsetX: 0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.1,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🔮',
        lore: 'Kota pelabuhan angkasa. Pintu masuk perdagangan dan artefak arcane dari seluruh dunia.',
        detailUrl: 'https://map.omanworld.com/location/lumnora' },
      { id: 'celestial-nexus',name: 'Celestial Nexus',     grid: 'M6',  gridLocal: 'G6',  
        offsetX: -0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '⭐',
        lore: 'Observatorium astral dan nexus energi celestial. Tempat para ahli nujum mempelajari bintang.',
        detailUrl: 'https://map.omanworld.com/location/celestial-nexus' },
      { id: 'spirecluster',   name: 'The Spirecluster',    grid: 'K9',  gridLocal: 'E9',  
        offsetX: -0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🏰',
        lore: 'Klaster menara saling terhubung. Tempat tinggal para mage, artisan, dan sarjana.',
        detailUrl: 'https://map.omanworld.com/location/spirecluster' },
      { id: 'obsidian-academy',name: 'Obsidian Academy',  grid: 'E12', gridLocal: 'E12', 
        offsetX: 0.1,   // ← geser kanan/ kiri (semakin angka naik, semakin ke kanan)
        offsetY: -0.8,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🏫',
        lore: 'Akademi arcane paling prestisius. Hanya yang terbaik dapat belajar di sini.',
        detailUrl: 'https://map.omanworld.com/location/obsidian-academy' },
      // ── Minor Settlements ──
      { id: 'runeforge',      name: 'Runeforge',           grid: 'D4',  gridLocal: 'D4',  
        offsetX: -0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Pandai besi arcane yang menempa logam bercahaya rune. Produknya paling dicari di seluruh OMAN.',
        detailUrl: 'https://map.omanworld.com/location/runeforge' },
      { id: 'starfall',       name: 'Starfall',            grid: 'F2',  gridLocal: 'F2', 
        offsetX: 0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Pos pengamatan bintang jatuh dan garis ley. Dihuni para stargazer dan penjaga leyline.',
        detailUrl: 'https://map.omanworld.com/location/starfall' },
      { id: 'voidlight',      name: 'Voidlight',           grid: 'G7',  gridLocal: 'B7',  
        offsetX: -0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.1,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Enklave misterius yang mempelajari energi void dan anomali. Berbahaya bagi orang luar.',
        detailUrl: 'https://map.omanworld.com/location/voidlight' },
      // ── Notable Landmarks & Features ──
      { id: 'arcane-rift',    name: 'Arcane Rift Fields',  grid: 'N5',  gridLocal: 'H5', 
        offsetX: -0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.2,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🌀',
        lore: 'Zona anomali arcane yang tidak stabil. Realitas berubah-ubah. Tidak disarankan untuk dikunjungi.',
        detailUrl: 'https://map.omanworld.com/location/arcane-rift' },
      { id: 'echoing-depths', name: 'Echoing Depths',      grid: 'G9',  gridLocal: 'G9',  
        offsetX: -0.1,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🌀',
        lore: 'Gua dalam dengan gema sihir. Suara berubah menjadi mantra di dalamnya.',
        detailUrl: 'https://map.omanworld.com/location/echoing-depths' },
      { id: 'glimmerlake',    name: 'Glimmerlake Oasis',   grid: 'E5',  gridLocal: 'E5',  
        offsetX: 0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'oasis',      emoji: '💧',
        lore: 'Danau yang memancarkan cahaya biru karena kandungan kristal aether di dasarnya.',
        detailUrl: 'https://map.omanworld.com/location/glimmerlake' },
      { id: 'frostglass',     name: 'Frostglass Heights',  grid: 'M1',  gridLocal: 'G1',  
        offsetX: 0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.5,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '⛰️',
        lore: 'Pegunungan dengan kristal es ajaib yang tidak pernah mencair. Dijaga ilusi permanen.',
        detailUrl: 'https://map.omanworld.com/location/frostglass' },
      { id: 'celestial-mtn',  name: 'Celestial Mountains', grid: 'C11', gridLocal: 'C11', 
        offsetX: -0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.5,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '⛰️',
        lore: 'Rangkaian pegunungan selatan yang menyentuh awan. Puncaknya dicapai hanya dengan sihir.',
        detailUrl: 'https://map.omanworld.com/location/celestial-mtn' },
      { id: 'river-echoes',   name: 'River of Echoes',     grid: 'G11', gridLocal: 'G11', 
        offsetX: -0.5,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '〰️',
        lore: 'Sungai kering yang dulu mengalirkan air ajaib. Kini hanya bisikan kuno yang tersisa.',
        detailUrl: 'https://map.omanworld.com/location/river-echoes' },
      { id: 'whispering-dunes',name: 'Whispering Dunes',   grid: 'K7',  gridLocal: 'E7',  
        offsetX: 0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🏜️',
        lore: 'Bukit pasir yang berbisik mantra kuno saat angin bertiup. Tempat meditasi para mage.',
        detailUrl: 'https://map.omanworld.com/location/whispering-dunes' },
      { id: 'mirage-plains',  name: 'Miragevale Plains',   grid: 'C8',  gridLocal: 'C8',  
        offsetX: -0.1,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.2,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🏜️',
        lore: 'Dataran ilusi di barat. Siapapun yang masuk tanpa perlindungan sihir bisa tersesat selamanya.',
        detailUrl: 'https://map.omanworld.com/location/mirage-plains' },
    ],
    connections: [
      { from: 'aetherion',       to: 'lumnora',         type: 'trade_route' },
      { from: 'aetherion',       to: 'celestial-nexus', type: 'trade_route' },
      { from: 'aetherion',       to: 'spirecluster',    type: 'trade_route' },
      { from: 'spirecluster',    to: 'obsidian-academy',type: 'trade_route' },
      { from: 'lumnora',         to: 'spirecluster',    type: 'trade_route' },
      { from: 'celestial-nexus', to: 'spirecluster',    type: 'trade_route' },
      { from: 'aetherion',       to: 'runeforge',       type: 'path' },
      { from: 'aetherion',       to: 'starfall',        type: 'path' },
    ],
    legend: [
      { symbol: '🏰', label: 'Kota Besar (Melayang)',   color: '#00acc1' },
      { symbol: '🏘️', label: 'Permukiman Kecil',         color: '#4fc3f7' },
      { symbol: '🌀', label: 'Zona Anomali Arcane',      color: '#ce93d8' },
      { symbol: '💧', label: 'Magic Oasis',              color: '#4fc3f7' },
      { symbol: '⛰️', label: 'Pegunungan',               color: '#9e9e9e' },
      { symbol: '〰️', label: 'Sungai Kering',            color: '#8d6e63' },
      { symbol: '-- ',label: 'Jalur Leyline / Rute',     color: '#00acc1' },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // SHADOW COVENANT — Northeast Territory
  // Grid peta: kolom O-X, baris 1-16
  // ══════════════════════════════════════════════════════════
  'shadow-underground-realm': {
    id: 'shadow-underground-realm',
    name: 'SHADOW COVENANT',
    subtitle: 'Northeast Territory — Year 2500 RA',
    level: 1,
    year: 2500,
    parentMapId: 'world-oman',
    imageUrl: 'Map/Shadow Covenant Map.png',
    factionColor: '#7b2d8b',
    description: 'Kerajaan bayangan dan keheningan. Terukir dalam canyon, tersembunyi dari permukaan.',
    gridConfig: { cols: 10, rows: 16, scale: 50 },
    gridOffset: { colStart: 'O', rowStart: 1 },
    locations: [
      // ── Major Cities ──
      { id: 'umbral-hold',    name: 'Umbral Hold',         grid: 'D4',  gridLocal: 'D4',  
        offsetX: 0.5,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.2,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🌑',
        lore: 'Ibukota Shadow Covenant. Terletak di dalam gua besar, tersembunyi dari pandangan dunia.',
        detailUrl: 'https://map.omanworld.com/location/umbral-hold' },
      { id: 'nightveil',      name: 'Nightveil',           grid: 'G5',  gridLocal: 'G5',  
        offsetX: -0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🌑',
        lore: 'Kota tabir malam. Diselimuti kabut sihir permanen. Tempat bermarkas para shadowmancer.',
        detailUrl: 'https://map.omanworld.com/location/nightveil' },
      { id: 'duskreach',      name: 'Duskreach',           grid: 'C7',  gridLocal: 'D7',  
        offsetX: -0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.6,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🌑',
        lore: 'Kota di tepi barat wilayah Shadow. Gerbang pertama yang ditemui penyusup dari luar.',
        detailUrl: 'https://map.omanworld.com/location/duskreach' },
      { id: 'shadowspine',    name: 'Shadowspine',         grid: 'F9',  gridLocal: 'F9',  
        offsetX: -0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.2,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🌑',
        lore: 'Kota di punggung pegunungan bayangan. Pusat pelatihan assassin terbaik di OMAN.',
        detailUrl: 'https://map.omanworld.com/location/shadowspine' },
      { id: 'coven-depths',   name: 'Coven Depths',        grid: 'H11', gridLocal: 'H11', 
        offsetX: -0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.1,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🌑',
        lore: 'Kedalaman koven. Tempat ritual paling gelap dilakukan. Hanya anggota tinggi yang boleh masuk.',
        detailUrl: 'https://map.omanworld.com/location/coven-depths' },
      // ── Minor Settlements ──
      { id: 'whispering-pass',name: 'Whispering Pass',     grid: 'F2',  gridLocal: 'F2',  
        offsetX: -0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.7,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Celah sempit di pegunungan. Jalur rahasia masuk wilayah Shadow dari utara.',
        detailUrl: 'https://map.omanworld.com/location/whispering-pass' },
      { id: 'ebonwatch',      name: 'Ebonwatch',           grid: 'I5',  gridLocal: 'H5',  
        offsetX: 0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.2,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Pos pengamatan di tepi timur. Memantau pergerakan Void Council dari kejauhan.',
        detailUrl: 'https://map.omanworld.com/location/ebonwatch' },
      { id: 'gloomtide',      name: 'Gloomtide',           grid: 'G12', gridLocal: 'G12', 
        offsetX: -0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.1,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Desa gelap di selatan. Penduduknya hampir tidak pernah terlihat siang hari.',
        detailUrl: 'https://map.omanworld.com/location/gloomtide' },
      // ── Notable Features ──
      { id: 'bone-wastes-s',  name: 'The Bone Wastes',     grid: 'C12', gridLocal: 'C12', 
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'forbidden',  emoji: '💀',
        lore: 'Zona terlarang — gurun tulang. Tidak ada yang keluar hidup-hidup.',
        detailUrl: 'https://map.omanworld.com/location/bone-wastes-s' },
      { id: 'shattered-s',    name: 'The Shattered Expanse',grid:'W2', gridLocal: 'I2',  
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.5,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'forbidden',  emoji: '💀',
        lore: 'Hamparan realitas yang hancur di timur laut. Dihindari bahkan oleh Shadow Covenant.',
        detailUrl: 'https://map.omanworld.com/location/shattered-s' },
      { id: 'darkfall-chasm', name: 'Darkfall Chasm',      grid: 'F6',  gridLocal: 'F6',  
        offsetX: -0.5,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🕳️',
        lore: 'Jurang terjal tempat sinar matahari tidak pernah menjangkau. Dihuni makhluk bayangan.',
        detailUrl: 'https://map.omanworld.com/location/darkfall-chasm' },
      { id: 'twilight-canyons',name: 'Twilight Canyons',   grid: 'H8',  gridLocal: 'H8',  
        offsetX: -0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '⛰️',
        lore: 'Rangkaian canyon yang selalu dalam kondisi senja. Labirin alami terbaik di OMAN.',
        detailUrl: 'https://map.omanworld.com/location/twilight-canyons' },
      { id: 'hushed-cliffs',  name: 'The Hushed Cliffs',   grid: 'C4',  gridLocal: 'C4',  
        offsetX: 0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.2,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '⛰️',
        lore: 'Tebing bisu di barat. Tak ada suara yang bisa melewati tebing ini.',
        detailUrl: 'https://map.omanworld.com/location/hushed-cliffs' },
      { id: 'silent-cut',     name: 'The Silent Cut',      grid: 'D11', gridLocal: 'D11', 
        offsetX: 0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🕳️',
        lore: 'Celah terdalam di wilayah Shadow. Jalur tersembunyi menuju Sunless Depths.',
        detailUrl: 'https://map.omanworld.com/location/silent-cut' },
      { id: 'sunless-depths', name: 'The Sunless Depths',  grid: 'E12', gridLocal: 'E12', 
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.2,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🌑',
        lore: 'Kedalaman tanpa sinar. Kota bawah tanah paling tersembunyi milik Shadow Covenant.',
        detailUrl: 'https://map.omanworld.com/location/sunless-depths' },
      { id: 'forsaken-maw',   name: 'The Forsaken Maw',    grid: 'I13', gridLocal: 'I13', 
        offsetX: -0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.4,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🕳️',
        lore: 'Mulut gua raksasa yang dianggap portal ke dunia bawah. Ditakuti bahkan oleh Shadow.',
        detailUrl: 'https://map.omanworld.com/location/forsaken-maw' },
      { id: 'veiled-ravine',  name: 'The Veiled Ravine',   grid: 'I8',  gridLocal: 'I8',  
        offsetX: 0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '⛰️',
        lore: 'Ravine yang diselimuti ilusi. Hanya anggota Shadow yang tahu jalan sesungguhnya.',
        detailUrl: 'https://map.omanworld.com/location/veiled-ravine' },
    ],
    connections: [
      { from: 'umbral-hold',  to: 'nightveil',      type: 'trade_route' },
      { from: 'umbral-hold',  to: 'duskreach',      type: 'trade_route' },
      { from: 'umbral-hold',  to: 'shadowspine',    type: 'trade_route' },
      { from: 'shadowspine',  to: 'coven-depths',   type: 'trade_route' },
      { from: 'nightveil',    to: 'coven-depths',   type: 'trade_route' },
      { from: 'whispering-pass', to: 'umbral-hold', type: 'path' },
      { from: 'ebonwatch',    to: 'nightveil',      type: 'path' },
    ],
    legend: [
      { symbol: '🌑', label: 'Kota Besar',       color: '#7b2d8b' },
      { symbol: '🏘️', label: 'Permukiman Kecil',  color: '#ce93d8' },
      { symbol: '💀', label: 'Zona Terlarang',    color: '#ef5350' },
      { symbol: '🕳️', label: 'Jurang / Gua',      color: '#9c27b0' },
      { symbol: '⛰️', label: 'Tebing / Canyon',   color: '#9e9e9e' },
      { symbol: '-- ',label: 'Jalur Perdagangan',  color: '#7b2d8b' },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // WILDLANDS PACT — The Great Grasslands (West)
  // Grid peta: kolom A-I, baris 11-24
  // ══════════════════════════════════════════════════════════
  'wildlands-grassland-realm': {
    id: 'wildlands-grassland-realm',
    name: 'WILDLANDS PACT',
    subtitle: 'The Great Grasslands — Year 2500 RA',
    level: 1,
    year: 2500,
    parentMapId: 'world-oman',
    imageUrl: 'Map/Wildland Pack Map.png',
    factionColor: '#2e7d32',
    description: 'Padang luas yang dihuni suku-suku bebas, beast riders, dan makhluk alam.',
    gridConfig: { cols: 9, rows: 14, scale: 50 },
    gridOffset: { colStart: 'A', rowStart: 11 },
    locations: [
      // ── Major Cities ──
      { id: 'greenhearth',    name: 'Greenhearth',         grid: 'D4', gridLocal: 'D4',  
        offsetX: -0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.6,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🌿',
        lore: 'Ibukota Wildlands Pact. Kota kayu dan batu alam yang harmonis dengan lingkungan sekitarnya.',
        detailUrl: 'https://map.omanworld.com/location/greenhearth' },
      { id: 'beastcaller',    name: "Beastcaller's Camp",  grid: 'E16', gridLocal: 'E6',  
        offsetX: 0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.5,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🦁',
        lore: 'Kamp pelatihan beast rider terbesar. Ribuan hewan buas jinak hidup berdampingan di sini.',
        detailUrl: 'https://map.omanworld.com/location/beastcaller' },
      { id: 'rootward',       name: 'Rootward',            grid: 'C8', gridLocal: 'C8',  
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.2,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🌿',
        lore: 'Kota yang dibangun mengelilingi pohon kuno raksasa. Akar-akarnya membentuk dinding kota.',
        detailUrl: 'https://map.omanworld.com/location/rootward' },
      { id: 'stormgrass',     name: 'Stormgrass',          grid: 'E9', gridLocal: 'E9',  
        offsetX: 0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '⚡',
        lore: 'Kota di tengah padang yang sering diterpa badai listrik. Penduduknya menganggapnya berkah.',
        detailUrl: 'https://map.omanworld.com/location/stormgrass' },
      { id: 'windward-fort',  name: 'Windward Fort',       grid: 'D21', gridLocal: 'D11',
        offsetX: 0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.5,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🛡️',
        lore: 'Benteng selatan Wildlands. Garis pertahanan terakhir menghadapi ancaman dari Ironforge.',
        detailUrl: 'https://map.omanworld.com/location/windward-fort' },
      // ── Minor Settlements ──
      { id: 'grachome',       name: 'Grachome',            grid: 'D2', gridLocal: 'D2',  
        offsetX: -0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.2,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Desa kecil di utara. Penduduknya adalah pengembara yang memilih menetap untuk satu musim.',
        detailUrl: 'https://map.omanworld.com/location/grachome' },
      { id: 'riders-rest',    name: "Rider's Rest",        grid: 'F4', gridLocal: 'F4',  
        offsetX: 0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.6,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Pos peristirahatan para beast rider di jalur timur. Penuh dengan kandang hewan buas.',
        detailUrl: 'https://map.omanworld.com/location/riders-rest' },
      { id: 'stonegrove',     name: 'Stonegrove',          grid: 'B9', gridLocal: 'B9', 
        offsetX: -0.1,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Desa suku tua di tepi barat. Menjaga tradisi batu suci yang tidak boleh disentuh orang luar.',
        detailUrl: 'https://map.omanworld.com/location/stonegrove' },
      // ── Notable Features ──
      { id: 'emerald-expanse',name: 'Emerald Expanse',     grid: 'E3', gridLocal: 'E3',  
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🌾',
        lore: 'Padang rumput emerald terluas di OMAN. Ribuan mil tanpa batas, habitat alami seluruh spesies.',
        detailUrl: 'https://map.omanworld.com/location/emerald-expanse' },
      { id: 'spiritgrove',    name: 'Spiritgrove Thicket', grid: 'B14', gridLocal: 'B4',  
        offsetX: 0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🌲',
        lore: 'Hutan tebal yang dianggap suci. Roh leluhur konon masih berkeliaran di dalamnya.',
        detailUrl: 'https://map.omanworld.com/location/spiritgrove' },
      { id: 'grazelands',     name: 'The Grazelands',      grid: 'B6', gridLocal: 'B6',  
        offsetX: 0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🌾',
        lore: 'Wilayah penggembalaan luas di barat. Ribuan binatang buas hidup bebas tanpa gangguan.',
        detailUrl: 'https://map.omanworld.com/location/grazelands' },
      { id: 'verdant-plains', name: 'Verdant Plains',      grid: 'D6', gridLocal: 'D6',  
        offsetX: 0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🌾',
        lore: 'Dataran subur di tengah pact. Tanaman tumbuh sepanjang tahun tanpa perlu pengairan.',
        detailUrl: 'https://map.omanworld.com/location/verdant-plains' },
      { id: 'gnomie-knurbed', name: 'Gnomie Knurbed',      grid: 'D16', gridLocal: 'D7',  
        offsetX: -0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🪨',
        lore: 'Hamparan batu berlekuk aneh yang tampak seperti patung gnome purba.',
        detailUrl: 'https://map.omanworld.com/location/gnomie-knurbed' },
      { id: 'tallhoof-steppe',name: 'Tallhoof Steppe',     grid: 'C10', gridLocal: 'C10',  
        offsetX: -0.1,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🏜️',
        lore: 'Stepa tinggi tempat kawanan kuda liar berkumpul. Tempat berburu beast rider baru.',
        detailUrl: 'https://map.omanworld.com/location/tallhoof-steppe' },
      { id: 'thundertrail',   name: 'Thundertrail Plains', grid: 'F21', gridLocal: 'F11', 
        offsetX: -0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '⚡',
        lore: 'Jalur petir alami. Tiap malam badai menyambut siapapun yang melintasinya.',
        detailUrl: 'https://map.omanworld.com/location/thundertrail' },
      { id: 'running-wilds',  name: 'The Running Wilds',   grid: 'G6', gridLocal: 'G6',  
        offsetX: -0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🌾',
        lore: 'Zona liar di timur. Hewan-hewan di sini lebih agresif dan belum pernah dijinakkan.',
        detailUrl: 'https://map.omanworld.com/location/running-wilds' },
      { id: 'howlwind-peaks', name: 'Howlwind Peaks',      grid: 'G12', gridLocal: 'G2',  
        offsetX: -0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '⛰️',
        lore: 'Pegunungan di timur laut. Angin howlwind membuat suara melolong sepanjang malam.',
        detailUrl: 'https://map.omanworld.com/location/howlwind-peaks' },
    ],
    connections: [
      { from: 'greenhearth',   to: 'beastcaller',  type: 'trade_route' },
      { from: 'greenhearth',   to: 'rootward',     type: 'trade_route' },
      { from: 'beastcaller',   to: 'stormgrass',   type: 'trade_route' },
      { from: 'rootward',      to: 'windward-fort',type: 'trade_route' },
      { from: 'stormgrass',    to: 'windward-fort',type: 'trade_route' },
      { from: 'grachome',      to: 'greenhearth',  type: 'path' },
      { from: 'riders-rest',   to: 'beastcaller',  type: 'path' },
    ],
    legend: [
      { symbol: '🌿', label: 'Kota Besar',        color: '#2e7d32' },
      { symbol: '🏘️', label: 'Permukiman Kecil',   color: '#81c784' },
      { symbol: '🌾', label: 'Padang / Dataran',   color: '#a5d6a7' },
      { symbol: '🌲', label: 'Hutan Suci',          color: '#388e3c' },
      { symbol: '⛰️', label: 'Pegunungan',          color: '#9e9e9e' },
      { symbol: '⚡', label: 'Zona Badai',          color: '#ffd740' },
      { symbol: '-- ',label: 'Jalur Perdagangan',   color: '#2e7d32' },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // IRONFORGE GUILD — South-Central Territory
  // Grid peta: kolom A-Z (label), baris 10-32. Lokasi pakai grid aktual dari peta
  // ══════════════════════════════════════════════════════════
  'ironforge-forgelands': {
    id: 'ironforge-forgelands',
    name: 'IRONFORGE GUILD',
    subtitle: 'South-Central Territory — Year 2500 RA',
    level: 1,
    year: 2500,
    parentMapId: 'world-oman',
    imageUrl: 'Map/IRONFORGE MAP.png',
    factionColor: '#795548',
    description: 'Wilayah industri raksasa. Langit berasap, pertambangan, dan kota baja yang tak pernah tidur.',
    gridConfig: { cols: 26, rows: 23, scale: 50 },
    gridOffset: { colStart: 'A', rowStart: 10 },
    locations: [
      // ── Major Cities ──
      { id: 'ironhall',       name: 'Ironhall',            grid: 'J9', gridLocal: 'J9',  
        offsetX: 0.3,   // ← geser kanan/ kiri (semakin angka naik, semakin ke kanan)
        offsetY: 0.2,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '⚒️',
        lore: 'Ibukota Ironforge Guild. Kota industri terbesar, dipenuhi forge aktif dan asap besi panas.',
        detailUrl: 'https://map.omanworld.com/location/ironhall' },
      { id: 'forgebastion',   name: 'Forgebastion',        grid: 'N6', gridLocal: 'N6',  
        offsetX: 0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.2,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '⚒️',
        lore: 'Bastion tempa utama. Senjata dan armor terbaik OMAN semuanya dibuat di sini.',
        detailUrl: 'https://map.omanworld.com/location/forgebastion' },
      { id: 'cindercrown',    name: 'Cindercrown',         grid: 'S10', gridLocal: 'S10',  
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🔥',
        lore: 'Mahkota abu. Dibangun di atas kaldera gunung berapi yang sudah mati — atau begitu yang mereka kira.',
        detailUrl: 'https://map.omanworld.com/location/cindercrown' },
      { id: 'deepmine',       name: 'Deepmine',            grid: 'M14', gridLocal: 'M14', 
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '⛏️',
        lore: 'Kota pertambangan terdalam. Terowongannya menuju ke perut bumi selama berkilometer.',
        detailUrl: 'https://map.omanworld.com/location/deepmine' },
      { id: 'molten-gate-if', name: 'Molten Gate',         grid: 'R17', gridLocal: 'R17', 
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🔥',
        lore: 'Gerbang cair di selatan. Aliran lava dari gunung membentuk jembatan alami masuk kota.',
        detailUrl: 'https://map.omanworld.com/location/molten-gate-if' },
      // ── Minor Settlements ──
      { id: 'ashhammer',      name: 'Ashhammer',           grid: 'I13', gridLocal: 'I5',  
        offsetX: -0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.2,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Desa penambang di utara. Spesialis dalam material abu vulkanik untuk campuran logam.',
        detailUrl: 'https://map.omanworld.com/location/ashhammer' },
      { id: 'grimfield',      name: 'Grimfield',           grid: 'T5', gridLocal: 'T5',  
        offsetX: -0.5,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.6,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Ladang kelam di timur laut. Tempat tumbuhnya tanaman besi — mineral yang dibutuhkan smithing.',
        detailUrl: 'https://map.omanworld.com/location/grimfield' },
      { id: 'blackcrag',      name: 'Blackcrag',           grid: 'I15', gridLocal: 'I15', 
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.5,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Tebing hitam di selatan. Markas mining crew yang menggali endapan besi paling dalam.',
        detailUrl: 'https://map.omanworld.com/location/blackcrag' },
      // ── Notable Features ──
      { id: 'grey-zone-w-if', name: 'Grey Zone (West)',    grid: 'H3', gridLocal: 'H3',  
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'grey_zone',  emoji: '░',
        lore: 'Zona perbatasan sengketa antara Wildlands Pact dan Ironforge Guild.',
        detailUrl: 'https://map.omanworld.com/location/grey-zone-w-if' },
      { id: 'grey-zone-e-if', name: 'Grey Zone (East)',    grid: 'W4', gridLocal: 'W4',  
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.5,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'grey_zone',  emoji: '░',
        lore: 'Zona perbatasan sengketa timur antara Ironforge Guild dan Crimson Crusade.',
        detailUrl: 'https://map.omanworld.com/location/grey-zone-e-if' },
      { id: 'grey-zone-s-if', name: 'Grey Zone (South)',   grid: 'E17', gridLocal: 'E17', 
        offsetX: 0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'grey_zone',  emoji: '░',
        lore: 'Zona perbatasan selatan dekat Dead Sea of Ashur. Rawan konflik.',
        detailUrl: 'https://map.omanworld.com/location/grey-zone-s-if' },
      { id: 'dead-sea',       name: 'Dead Sea of Ashur',   grid: 'U21', gridLocal: 'U21', 
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🌊',
        lore: 'Laut mati di selatan. Tidak ada makhluk hidup yang bertahan di perairannya.',
        detailUrl: 'https://map.omanworld.com/location/dead-sea' },
      { id: 'arcane-ref-if',  name: 'Arcane Consortium ↑', grid: 'N2', gridLocal: 'N2',  
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🔮',
        lore: 'Perbatasan utara dengan Arcane Consortium.',
        detailUrl: 'https://map.omanworld.com/location/arcane-ref-if' },
      { id: 'crimson-ref-if', name: 'Crimson Crusade →',   grid: 'X18', gridLocal: 'X9',  type: 'landmark',   emoji: '⚔️',
        lore: 'Perbatasan timur dengan Crimson Crusade.',
        detailUrl: 'https://map.omanworld.com/location/crimson-ref-if' },
    ],
    connections: [
      { from: 'ironhall',     to: 'forgebastion',   type: 'trade_route' },
      { from: 'ironhall',     to: 'deepmine',       type: 'trade_route' },
      { from: 'forgebastion', to: 'cindercrown',    type: 'trade_route' },
      { from: 'cindercrown',  to: 'molten-gate-if', type: 'trade_route' },
      { from: 'deepmine',     to: 'molten-gate-if', type: 'trade_route' },
      { from: 'ashhammer',    to: 'forgebastion',   type: 'path' },
      { from: 'grimfield',    to: 'cindercrown',    type: 'path' },
      { from: 'blackcrag',    to: 'deepmine',       type: 'path' },
    ],
    legend: [
      { symbol: '⚒️', label: 'Kota Besar',          color: '#795548' },
      { symbol: '🏘️', label: 'Permukiman Kecil',     color: '#a1887f' },
      { symbol: '🔥', label: 'Kota Vulkanik',         color: '#ff6a00' },
      { symbol: '⛏️', label: 'Kota Pertambangan',     color: '#8d6e63' },
      { symbol: '░',  label: 'Grey Zone (Sengketa)',  color: '#888' },
      { symbol: '🌊', label: 'Dead Sea of Ashur',     color: '#1565c0' },
      { symbol: '-- ',label: 'Jalur Perdagangan',      color: '#ff6a00' },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // CRIMSON CRUSADE — Southeast Territory
  // Grid peta: kolom O-X, baris 12-25
  // ══════════════════════════════════════════════════════════
  'crimson-fortress-realm': {
    id: 'crimson-fortress-realm',
    name: 'CRIMSON CRUSADE',
    subtitle: 'Southeast Territory — Year 2500 RA',
    level: 1,
    year: 2500,
    parentMapId: 'world-oman',
    imageUrl: 'Map/Crimson Crusade.png',
    factionColor: '#c62828',
    description: 'Alam pembakaran iman dan perang tanpa henti. Pasukan Crimson menyebarkan murka suci di atas pasir merah.',
    gridConfig: { cols: 10, rows: 14, scale: 50 },
    gridOffset: { colStart: 'O', rowStart: 12 },
    locations: [
      // ── Major Cities ──
      { id: 'bloodhold',      name: 'Bloodhold',           grid: 'R16', gridLocal: 'D5',  
        offsetX: -0.1,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '⚔️',
        lore: 'Markas Komando Crimson Crusade. Setiap batu bangunannya dicampur darah para martir.',
        detailUrl: 'https://map.omanworld.com/location/bloodhold' },
      { id: 'scarlet-citadel',name: 'Scarlet Citadel',     grid: 'G4', gridLocal: 'G4',  
        offsetX: -0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.6,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🏯',
        lore: 'Citadel merah tertinggi di OMAN. Dari sini High Cardinal Vortigern IX memerintah.',
        detailUrl: 'https://map.omanworld.com/location/scarlet-citadel' },
      { id: 'faiths-bulwark', name: "Faith's Bulwark",     grid: 'D8', gridLocal: 'D8',  
        offsetX: -0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🏯',
        lore: 'Benteng iman. Tidak pernah jatuh dalam 500 tahun. Diperkuat oleh semangat keagamaan.',
        detailUrl: 'https://map.omanworld.com/location/faiths-bulwark' },
      { id: 'purifiers-rest', name: "Purifier's Rest",     grid: 'F8', gridLocal: 'F8',  
        offsetX: -0.5,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '⚔️',
        lore: 'Kota istirahat para penyuci. Tempat pasukan kembali setelah misi pembersihan selesai.',
        detailUrl: 'https://map.omanworld.com/location/purifiers-rest' },
      { id: 'red-sands-fort', name: 'Red Sands Fort',      grid: 'H9', gridLocal: 'H9', 
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.2,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🏯',
        lore: 'Benteng pasir merah di timur. Garis pertahanan terluar menghadapi Void Council.',
        detailUrl: 'https://map.omanworld.com/location/red-sands-fort' },
      // ── Minor Settlements ──
      { id: 'saints-keep',    name: "Saint's Keep",        grid: 'D2', gridLocal: 'D2',  
        offsetX: -0.1,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Pemukiman para saint. Tempat tinggal para peziarah yang mendedikasikan hidup untuk One Light.',
        detailUrl: 'https://map.omanworld.com/location/saints-keep' },
      { id: 'dune-penance',   name: 'Dune of Penance',     grid: 'V13', gridLocal: 'H2',  
        offsetX: -0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.4,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Bukit penebusan. Tempat orang-orang berdosa dikirim untuk bertobat di bawah terik matahari.',
        detailUrl: 'https://map.omanworld.com/location/dune-penance' },
      { id: 'zealots-watch',  name: "Zealot's Watch",      grid: 'H6', gridLocal: 'H6',  
        offsetX: 0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Pos pengamatan para zelot di timur. Memantau pergerakan Void dari jarak aman.',
        detailUrl: 'https://map.omanworld.com/location/zealots-watch' },
      // ── Notable Features ──
      { id: 'bloodmarch-dunes',name: 'Bloodmarch Dunes',   grid: 'F5', gridLocal: 'F5',  
        offsetX: -0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.2,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🏜️',
        lore: 'Gundukan pasir yang bernoda merah abadi — darah para korban perang selama berabad-abad.',
        detailUrl: 'https://map.omanworld.com/location/bloodmarch-dunes' },
      { id: 'penitent-expanse',name: 'The Penitent Expanse',grid:'G7', gridLocal: 'G7',  
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🏜️',
        lore: 'Hamparan luas tempat pendosa dibiarkan mati perlahan sebagai bentuk hukuman.',
        detailUrl: 'https://map.omanworld.com/location/penitent-expanse' },
      { id: 'martyrs-road',   name: "Martyr's Road",       grid: 'E10', gridLocal: 'E10',  
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '✝️',
        lore: 'Jalur suci dan jalur perang yang sama. Dipenuhi monumen bagi mereka yang gugur dalam jihad.',
        detailUrl: 'https://map.omanworld.com/location/martyrs-road' },
      { id: 'ruins-old-caelum',name: 'Ruins of Old Caelum',grid:'E3', gridLocal: 'E3',  
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'ruin',       emoji: '✖',
        lore: 'Kota pertama Crimson Crusade yang jatuh. Kini menjadi situs peringatan kekalahan heroik.',
        detailUrl: 'https://map.omanworld.com/location/ruins-old-caelum' },
      { id: 'grey-zone-c',    name: 'Grey Zone (Contested)',grid:'W16', gridLocal: 'I5',  
        offsetX: 0.5,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.4,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'grey_zone',  emoji: '░',
        lore: 'Zona perbatasan sengketa antara Crimson Crusade dan Void Council.',
        detailUrl: 'https://map.omanworld.com/location/grey-zone-c' },
      { id: 'howling-waste-c',name: 'The Howling Waste',   grid: 'H11', gridLocal: 'H11', 
        offsetX: -0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'forbidden',  emoji: '💀',
        lore: 'Zona terlarang selatan. Di luar bukit terletak hanya kegilaan dan korupsi suci.',
        detailUrl: 'https://map.omanworld.com/location/howling-waste-c' },
    ],
    connections: [
      { from: 'bloodhold',      to: 'scarlet-citadel',  type: 'trade_route' },
      { from: 'bloodhold',      to: 'faiths-bulwark',   type: 'trade_route' },
      { from: 'scarlet-citadel',to: 'purifiers-rest',   type: 'trade_route' },
      { from: 'faiths-bulwark', to: 'purifiers-rest',   type: 'trade_route' },
      { from: 'purifiers-rest', to: 'red-sands-fort',   type: 'trade_route' },
      { from: 'saints-keep',    to: 'bloodhold',        type: 'path' },
      { from: 'zealots-watch',  to: 'red-sands-fort',   type: 'path' },
    ],
    legend: [
      { symbol: '⚔️', label: 'Kota Besar',          color: '#c62828' },
      { symbol: '🏘️', label: 'Permukiman Kecil',     color: '#ef9a9a' },
      { symbol: '🏜️', label: 'Gurun / Hamparan',     color: '#ff8a65' },
      { symbol: '✖',  label: 'Reruntuhan Kuno',       color: '#9e9e9e' },
      { symbol: '💀', label: 'Zona Terlarang',        color: '#ef5350' },
      { symbol: '░',  label: 'Grey Zone (Sengketa)',  color: '#888' },
      { symbol: '-- ',label: 'Jalur Perang / Dagang', color: '#c62828' },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // VOID COUNCIL — Far Eastern Territory
  // Grid peta: kolom A-Z (relabel dari X-Z world), baris 1-30
  // ══════════════════════════════════════════════════════════
  'void-corrupted-lands': {
    id: 'void-corrupted-lands',
    name: 'VOID COUNCIL',
    subtitle: 'Far Eastern Territory — Year 2500 RA',
    level: 1,
    year: 2500,
    parentMapId: 'world-oman',
    imageUrl: 'Map/Void Council Map.png',
    factionColor: '#1565c0',
    description: 'Di mana realitas retak dan terurai. Kota-kota menentang logika. Hukum menentang kehidupan.',
    gridConfig: { cols: 26, rows: 30, scale: 50 },
    gridOffset: { colStart: 'A', rowStart: 1 },
    locations: [
      // ── Major Cities ──
      { id: 'voidwatch',      name: 'Voidwatch',           grid: 'N6',  gridLocal: 'N6',  
        offsetX: 0.2,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🌀',
        lore: 'Kota pengawas void. Dari sini Dewan memantau retakan realitas di seluruh wilayah timur.',
        detailUrl: 'https://map.omanworld.com/location/voidwatch' },
      { id: 'reality-spire',  name: 'Reality Spire',       grid: 'T9',  gridLocal: 'T9',  
        offsetX: -0.5,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.4,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🌀',
        lore: 'Menara realitas. Bangunan yang berubah bentuk setiap hari. Hanya void walker yang bisa menavigasinya.',
        detailUrl: 'https://map.omanworld.com/location/reality-spire' },
      { id: 'echo-abyss',     name: 'Echo Abyss',          grid: 'P12', gridLocal: 'P12', 
        offsetX: 0.5,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.6,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🌀',
        lore: 'Jurang gema. Pusat kota yang dibangun di tepi retakan realitas terbesar.',
        detailUrl: 'https://map.omanworld.com/location/echo-abyss' },
      { id: 'silent-archive', name: 'Silent Archive',      grid: 'O16', gridLocal: 'O16', 
        offsetX: -0.7,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '📚',
        lore: 'Arsip sunyi. Semua pengetahuan tentang void tersimpan di sini. Tidak ada suara di dalamnya.',
        detailUrl: 'https://map.omanworld.com/location/silent-archive' },
      { id: 'the-unspoken',   name: 'The Unspoken',        grid: 'Q19', gridLocal: 'Q19', 
        offsetX: 0,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'major_city', emoji: '🌀',
        lore: 'Yang Tak Terucap. Kota yang namanya dilarang diucapkan keras. Pusat kekuatan Dewan.',
        detailUrl: 'https://map.omanworld.com/location/the-unspoken' },
      // ── Minor Settlements ──
      { id: 'fracture-point', name: 'Fracture Point',      grid: 'P3',  gridLocal: 'P3',  
        offsetX: -0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.4,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Titik patah di utara. Pos pengamatan dekat perbatasan Shadow Covenant.',
        detailUrl: 'https://map.omanworld.com/location/fracture-point' },
      { id: 'nullgate',       name: 'Nullgate',            grid: 'N10',  gridLocal: 'N10',  
        offsetX: -0.1,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0.1,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Gerbang nol. Titik masuk bagi mereka yang ingin bergabung dengan Void Council.',
        detailUrl: 'https://map.omanworld.com/location/nullgate' },
      { id: 'reality-rift',   name: 'Reality Rift',        grid: 'R6', gridLocal: 'R6', 
        offsetX: 0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: -0.3,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'settlement', emoji: '🏘️',
        lore: 'Celah realitas. Desa kecil yang dibangun tepat di atas retakan dimensi aktif.',
        detailUrl: 'https://map.omanworld.com/location/reality-rift' },
      // ── Notable Features ──
      { id: 'nulled-expanse',  name: 'Nulled Expanse',     grid: 'S21', gridLocal: 'S21', 
        offsetX: 0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'forbidden',  emoji: '💀',
        lore: 'Hamparan nol di selatan. Tidak ada cahaya, suara, atau kehidupan yang bisa bertahan.',
        detailUrl: 'https://map.omanworld.com/location/nulled-expanse' },
      { id: 'void-anomaly-1', name: 'Void Anomaly Field',  grid: 'P6',  gridLocal: 'P6',  
        offsetX: 0.4,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '🌀',
        lore: 'Medan anomali void paling aktif. Realitas terus-menerus bergejolak tanpa henti.',
        detailUrl: 'https://map.omanworld.com/location/void-anomaly-1' },
      { id: 'reality-fray-n', name: 'Northern Reality Fray',grid:'N3', gridLocal: 'N3',  
        offsetX: -0.3,   // ← geser kanan/ kiri (semakin abjad naik, semakin ke kanan)
        offsetY: 0,   // ← geser atas/ bawah (semakin angka naik, semakin ke bawah)
        type: 'landmark',   emoji: '⚡',
        lore: 'Zona gangguan realitas utara. Siapapun yang tinggal terlalu lama akan kehilangan ingatan.',
        detailUrl: 'https://map.omanworld.com/location/reality-fray-n' },
    ],
    connections: [
      { from: 'voidwatch',     to: 'reality-spire',  type: 'trade_route' },
      { from: 'voidwatch',     to: 'echo-abyss',     type: 'trade_route' },
      { from: 'echo-abyss',    to: 'silent-archive', type: 'trade_route' },
      { from: 'silent-archive',to: 'the-unspoken',   type: 'trade_route' },
      { from: 'reality-spire', to: 'echo-abyss',     type: 'trade_route' },
      { from: 'fracture-point',to: 'voidwatch',      type: 'path' },
      { from: 'nullgate',      to: 'echo-abyss',     type: 'path' },
      { from: 'reality-rift',  to: 'reality-spire',  type: 'path' },
    ],
    legend: [
      { symbol: '🌀', label: 'Kota Besar (Void)',    color: '#1565c0' },
      { symbol: '🏘️', label: 'Permukiman Kecil',     color: '#90caf9' },
      { symbol: '💀', label: 'Zona Terlarang',        color: '#ef5350' },
      { symbol: '⚡', label: 'Gangguan Realitas',     color: '#ce93d8' },
      { symbol: '📚', label: 'Arsip / Pengetahuan',   color: '#64b5f6' },
      { symbol: '-- ',label: 'Jalur Void',            color: '#1565c0' },
    ],
  },

};

// ─── HELPER ────────────────────────────────────────────────────
function getMapByGridCell(worldMapId, cellId) {
  const worldMap = WORLD_MAPS[worldMapId];
  if (!worldMap || !worldMap.regions) return null;
  return worldMap.regions.find(r => r.cellId === cellId) || null;
}