/* ═══════════════════════════════════════════════════════════════
   STARGAZER.JS — v2 — Langit Bintang Interaktif OMAN
   Semua teks dalam Bahasa Indonesia, bintang lebih putih,
   pohon bercahaya, panel kanan interaktif dengan popup.
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────────
     DATA: INFORMASI KONSTELASI BAHASA INDONESIA
  ────────────────────────────────────────────────────────── */
  const CONSTELLATION_INFO = {
    'Orion': {
      namaIndonesia: 'Orion — Sang Pemburu',
      emoji: '🏹',
      warna: '#9080ff',
      deskripsi: 'Orion adalah salah satu rasi bintang yang paling mudah dikenali di seluruh dunia. Tiga bintang "Sabuk Orion" — Mintaka, Alnilam, dan Alnitak — membentuk garis lurus yang sangat ikonik. Dalam mitologi Yunani, Orion dikisahkan sebagai pemburu terbesar yang pernah ada, ditempatkan di langit oleh Dewa Zeus setelah kematiannya sebagai penghormatan.',
      bintangUtama: [
        'Betelgeuse — Raksasa merah di bahu kanan, 700× lebih besar dari Matahari kita',
        'Rigel — Bintang paling terang berwarna biru-putih, terletak di kaki kiri',
        'Bellatrix — "Pejuang Perempuan", bintang di bahu kiri Orion',
        'Alnilam — Bintang tengah dari tiga Sabuk Orion yang ikonis',
        'Alnitak — Bintang kiri Sabuk, memiliki Nebula Kuda Hitam di dekatnya',
      ],
      waktuTerbaik: 'Desember – Februari',
      belahan: 'Seluruh Dunia',
    },
    'Ursa Major': {
      namaIndonesia: 'Ursa Major — Beruang Besar',
      emoji: '🐻',
      warna: '#60b0ff',
      deskripsi: 'Ursa Major atau Beruang Besar adalah rasi bintang terbesar ketiga di langit malam. Tujuh bintang terangnya membentuk pola "Biduk" atau sendok besar yang sangat terkenal. Bintang Dubhe dan Merak di ujung sendok selalu menunjuk tepat ke arah Bintang Utara (Polaris), sehingga digunakan para pelaut sejak ribuan tahun lalu untuk navigasi.',
      bintangUtama: [
        'Alioth — Bintang paling terang di Ursa Major, bagian gagang sendok',
        'Dubhe — Ujung sendok, penunjuk setia ke arah Bintang Utara (Polaris)',
        'Alkaid — Ujung ekor beruang, salah satu bintang paling biru di rasi ini',
        'Merak — Pasangan Dubhe yang selalu digunakan untuk menemukan Polaris',
        'Mizar — Memiliki bintang pendamping Alcor yang terlihat dengan mata telanjang',
      ],
      waktuTerbaik: 'Maret – Juni',
      belahan: 'Belahan Bumi Utara',
    },
    'Ursa Minor': {
      namaIndonesia: 'Ursa Minor — Beruang Kecil',
      emoji: '⭐',
      warna: '#40d0ff',
      deskripsi: 'Ursa Minor adalah rumah bagi Polaris — Bintang Utara yang telah menjadi panduan navigasi bagi para pelaut selama ribuan tahun. Rasi ini membentuk "sendok kecil". Polaris hampir tepat berada di atas Kutub Utara Bumi, sehingga tampak diam sementara seluruh langit berputar mengelilinginya setiap malam.',
      bintangUtama: [
        'Polaris — Bintang Utara, penunjuk arah sejati bagi setiap navigator dan pejalan',
        'Kochab — Dahulu merupakan Bintang Utara sekitar 3.000 tahun yang lalu',
        'Pherkad — Bersama Kochab disebut "Penjaga Kutub" oleh para pelaut kuno',
      ],
      waktuTerbaik: 'Sepanjang Tahun (di belahan utara)',
      belahan: 'Belahan Bumi Utara',
    },
    'Cassiopeia': {
      namaIndonesia: 'Cassiopeia — Sang Ratu',
      emoji: '👑',
      warna: '#ff80c0',
      deskripsi: 'Cassiopeia membentuk huruf "W" atau "M" yang khas di langit utara. Dalam mitologi Yunani, ia adalah Ratu Etiopia yang terkenal karena kesombongannya atas kecantikan. Lima bintang utamanya mudah ditemukan di dekat jalur Bima Sakti. Rasi ini terletak hampir tepat di seberang Bintang Utara dari Ursa Major.',
      bintangUtama: [
        'Schedar — Bintang terbesar di Cassiopeia, raksasa oranye yang memesona',
        'Caph — Bintang pertama dari pola huruf W, berwarna putih-kuning',
        'Navi — Bintang tengah pola W, bintang tipe B yang tidak stabil dan berfluktuasi',
        'Ruchbah — "Lutut" sang ratu, sistem bintang ganda yang saling menutupi',
        'Segin — Ujung terakhir pola W yang membentuk mahkota ratu',
      ],
      waktuTerbaik: 'Oktober – Desember',
      belahan: 'Belahan Bumi Utara',
    },
    'Scorpius': {
      namaIndonesia: 'Scorpius — Sang Kalajengking',
      emoji: '🦂',
      warna: '#ff5050',
      deskripsi: 'Scorpius adalah salah satu rasi yang paling menakjubkan di langit selatan. Bentuknya benar-benar menyerupai kalajengking dengan ekor melengkung dan sengat runcing. Antares — bintang "jantung" Scorpius — adalah raksasa merah yang 700 kali lebih besar dari Matahari. Dalam mitologi, Scorpius adalah kalajengking yang dikirim untuk membunuh Orion.',
      bintangUtama: [
        'Antares — "Saingan Mars", raksasa merah yang mendominasi jantung kalajengking',
        'Shaula — "Sengat kalajengking", bintang paling terang di ekor yang melengkung',
        'Sargas — Bintang kuning-putih yang terang di bagian dalam ekor',
        'Graffias — Bintang di capit kalajengking, sistem bintang ganda yang indah',
        'Dschubba — "Dahi" kalajengking, bintang biru panas yang menarik',
      ],
      waktuTerbaik: 'Juni – Agustus',
      belahan: 'Belahan Bumi Selatan',
    },
    'Leo': {
      namaIndonesia: 'Leo — Sang Singa',
      emoji: '🦁',
      warna: '#ffc040',
      deskripsi: 'Leo adalah rasi bintang zodiak yang mewakili singa perkasa. Bintang-bintangnya membentuk sabit di bagian kepala singa dan trapesium di bagian belakang. Regulus, bintang paling terang di Leo, hampir tepat berada di jalur ekliptika — lintasan Matahari, Bulan, dan planet-planet di langit kita.',
      bintangUtama: [
        'Regulus — "Si Kecil Berkuasa", berputar dengan cepat sehingga berbentuk pipih',
        'Denebola — "Ekor singa", bintang putih-biru di ujung tubuh singa',
        'Algieba — Sistem bintang ganda yang indah di leher singa, cantik dilihat teropong',
        'Zosma — Bintang di punggung singa yang kokoh',
        'Adhafera — Menghiasi surai singa yang gagah dan megah',
      ],
      waktuTerbaik: 'Maret – Mei',
      belahan: 'Seluruh Dunia',
    },
    'Gemini': {
      namaIndonesia: 'Gemini — Si Kembar',
      emoji: '♊',
      warna: '#60ff90',
      deskripsi: 'Gemini mewakili si kembar dalam mitologi Yunani — Castor dan Pollux, putra-putra Zeus yang lahir dari telur yang sama. Dua bintang paling terangnya pun dinamai sesuai nama mereka. Pollux (berwarna oranye) sedikit lebih terang dari Castor (berwarna putih). Hujan meteor Geminid yang spektakuler tampak bersumber dari rasi ini setiap bulan Desember.',
      bintangUtama: [
        'Pollux — Si Kembar yang Abadi, telah ditemukan memiliki exoplanet raksasa',
        'Castor — Sebenarnya sistem enam bintang yang tampak sebagai satu bintang tunggal',
        'Alhena — "Tanda di leher unta", bintang terang ketiga yang berwarna putih-biru',
        'Wasat — Bintang di bagian tengah badan si kembar yang simetris',
        'Tejat — Menghiasi kaki kembar Castor, bintang raksasa merah yang besar',
      ],
      waktuTerbaik: 'Desember – Februari',
      belahan: 'Seluruh Dunia',
    },
    'Taurus': {
      namaIndonesia: 'Taurus — Sang Banteng',
      emoji: '🐂',
      warna: '#ffaa40',
      deskripsi: 'Taurus adalah salah satu rasi tertua yang dikenal umat manusia, sudah digambarkan sejak 4.000 tahun yang lalu. Aldebaran yang kemerahan mewakili mata banteng yang sedang marah. Gugus bintang Pleiades atau "Tujuh Bintang" yang sangat terkenal juga terletak di dalam rasi Taurus ini, menjadi objek pengamatan favorit para pecinta langit.',
      bintangUtama: [
        'Aldebaran — "Pengikut Pleiades", mata banteng yang merah membara dan memesona',
        'Elnath — Ujung tanduk utara banteng yang tajam dan menusuk ke langit',
        'Alcyone — Bintang paling terang di gugus Pleiades yang legendaris',
        'Ain — "Mata" kedua banteng dalam gugus Hyades yang membentuk huruf V',
      ],
      waktuTerbaik: 'November – Januari',
      belahan: 'Seluruh Dunia',
    },
    'Cygnus': {
      namaIndonesia: 'Cygnus — Sang Angsa',
      emoji: '🦢',
      warna: '#80e0ff',
      deskripsi: 'Cygnus, Sang Angsa, terbang sepanjang jalur Bima Sakti di langit musim panas utara. Lima bintang utamanya membentuk Salib Utara yang indah dan mudah dikenali. Deneb di ekor angsa adalah salah satu bintang paling bercahaya di galaksi kita — diperkirakan 200.000 kali lebih terang dari Matahari! Bersama Vega dan Altair, Deneb membentuk Segitiga Musim Panas.',
      bintangUtama: [
        'Deneb — "Ekor angsa", salah satu bintang paling luminous yang pernah dikenal manusia',
        'Sadr — "Dada angsa", bintang di pusat Salib Utara yang megah',
        'Albireo — "Mata angsa", sistem bintang ganda berwarna biru dan oranye yang kontras',
        'Gienah — Sayap kanan angsa yang terbentang lebar di langit malam',
      ],
      waktuTerbaik: 'Juli – Oktober',
      belahan: 'Belahan Bumi Utara',
    },
    'Lyra': {
      namaIndonesia: 'Lyra — Sang Kecapi',
      emoji: '🎵',
      warna: '#c090ff',
      deskripsi: 'Lyra mewakili kecapi milik Orpheus, musisi terbesar dalam mitologi Yunani yang dapat memikat seluruh alam semesta dengan musik indahnya. Vega, bintang paling terang di Lyra, adalah bintang cerah kedua di langit malam utara. Menariknya, Vega akan menjadi Bintang Utara baru sekitar tahun 13.727, menggantikan Polaris akibat presesi lambat sumbu rotasi Bumi.',
      bintangUtama: [
        'Vega — Bintang terbiru paling terang; pernah menjadi Bintang Utara 12.000 tahun lalu',
        'Sheliak — Bintang ganda yang saling menutupi (gerhana) dengan periode sangat teratur',
        'Sulafat — "Kura-kura", bintang terang di sudut bawah kecapi Orpheus',
        'ε¹ Lyra — "Bintang Ganda Ganda", empat bintang yang bisa dilihat dengan teropong',
      ],
      waktuTerbaik: 'Juli – September',
      belahan: 'Belahan Bumi Utara',
    },
    'Perseus': {
      namaIndonesia: 'Perseus — Sang Pahlawan',
      emoji: '⚔️',
      warna: '#70d0b0',
      deskripsi: 'Perseus adalah pahlawan mitos Yunani yang memenggal kepala Medusa dan menyelamatkan Putri Andromeda dari monster laut. Dalam rasi ini, Algol — "Bintang Setan" — mewakili kepala Medusa yang dipegangnya. Setiap 2,87 hari, Algol meredup secara dramatis karena bintang pendampingnya menutupi cahayanya, menciptakan efek gerhana yang mudah diamati.',
      bintangUtama: [
        'Mirfak — "Siku Perseus", bintang paling terang, raksasa kuning super yang menawan',
        'Algol — "Al-Ghul / Sang Setan", bintang gerhana yang berkedip setiap 2,87 hari',
        'Atik — Di bahu Perseus yang gagah, bintang biru-putih yang panas',
        'ε Persei — Bintang biru panas yang sangat luminous di tubuh pahlawan',
      ],
      waktuTerbaik: 'November – Februari',
      belahan: 'Belahan Bumi Utara',
    },
    'Aquila': {
      namaIndonesia: 'Aquila — Sang Elang',
      emoji: '🦅',
      warna: '#ffaa50',
      deskripsi: 'Aquila, Sang Elang, adalah burung kurir agung Zeus dalam mitologi Yunani. Altair, bintang paling terangnya, berputar dengan kecepatan yang luar biasa — setara dengan jarak antara Bumi dan Matahari setiap 6,5 jam saja! Bersama Deneb (Cygnus) dan Vega (Lyra), Altair membentuk Segitiga Musim Panas yang menjadi pemandangan ikonis di langit malam.',
      bintangUtama: [
        'Altair — "Si Elang Terbang", berputar 286 km/detik sehingga pipih di kedua kutub',
        'Tarazed — "Elang yang mengintai mangsa", raksasa oranye yang bercahaya terang',
        'Alshain — "Elang yang mengangkasa tinggi", bintang kuning-putih yang tenang',
        'δ Aquilae — Bintang terang keempat yang membentuk sayap elang yang kokoh',
      ],
      waktuTerbaik: 'Juli – September',
      belahan: 'Seluruh Dunia',
    },
  };

  /* ──────────────────────────────────────────────────────────
     WARNA SPEKTRAL — LEBIH PUTIH & NATURAL (TIDAK ABSTRAK)
  ────────────────────────────────────────────────────────── */
  const SPECTRAL_COLORS = {
    O: { r: 210, g: 222, b: 255 },   // Putih sedikit biru
    B: { r: 225, g: 234, b: 255 },   // Putih-biru halus
    A: { r: 248, g: 251, b: 255 },   // Putih murni
    F: { r: 255, g: 254, b: 248 },   // Putih hangat
    G: { r: 255, g: 249, b: 232 },   // Putih sedikit kekuningan
    K: { r: 255, g: 238, b: 212 },   // Putih-oranye sangat tipis
    M: { r: 255, g: 225, b: 202 },   // Putih-merah sangat tipis
  };

  /* ──────────────────────────────────────────────────────────
     DATA KONSTELASI — posisi normalized (0..1)
  ────────────────────────────────────────────────────────── */
  const CONSTELLATIONS = [
    {
      name: 'Orion',
      stars: [
        { id: 'betelgeuse',  name: 'Betelgeuse',  x: 0.335, y: 0.310, mag: 0.5,  spectral: 'M' },
        { id: 'rigel',       name: 'Rigel',        x: 0.370, y: 0.430, mag: 0.1,  spectral: 'B' },
        { id: 'bellatrix',   name: 'Bellatrix',    x: 0.295, y: 0.320, mag: 1.6,  spectral: 'B' },
        { id: 'saiph',       name: 'Saiph',        x: 0.340, y: 0.440, mag: 2.1,  spectral: 'B' },
        { id: 'mintaka',     name: 'Mintaka',      x: 0.315, y: 0.375, mag: 2.2,  spectral: 'O' },
        { id: 'alnilam',     name: 'Alnilam',      x: 0.330, y: 0.380, mag: 1.7,  spectral: 'B' },
        { id: 'alnitak',     name: 'Alnitak',      x: 0.350, y: 0.385, mag: 1.8,  spectral: 'O' },
        { id: 'meissa',      name: 'Meissa',       x: 0.320, y: 0.265, mag: 3.4,  spectral: 'O' },
      ],
      lines: [
        ['betelgeuse','mintaka'],['mintaka','alnilam'],['alnilam','alnitak'],
        ['alnitak','saiph'],['alnitak','rigel'],['betelgeuse','bellatrix'],
        ['bellatrix','mintaka'],['betelgeuse','meissa'],
      ]
    },
    {
      name: 'Ursa Major',
      stars: [
        { id: 'dubhe',   name: 'Dubhe',   x: 0.095, y: 0.165, mag: 1.8, spectral: 'K' },
        { id: 'merak',   name: 'Merak',   x: 0.105, y: 0.200, mag: 2.4, spectral: 'A' },
        { id: 'phecda',  name: 'Phecda',  x: 0.130, y: 0.215, mag: 2.4, spectral: 'A' },
        { id: 'megrez',  name: 'Megrez',  x: 0.115, y: 0.175, mag: 3.3, spectral: 'A' },
        { id: 'alioth',  name: 'Alioth',  x: 0.140, y: 0.175, mag: 1.8, spectral: 'A' },
        { id: 'mizar',   name: 'Mizar',   x: 0.160, y: 0.168, mag: 2.1, spectral: 'A' },
        { id: 'alkaid',  name: 'Alkaid',  x: 0.180, y: 0.150, mag: 1.9, spectral: 'B' },
      ],
      lines: [
        ['dubhe','merak'],['merak','phecda'],['phecda','megrez'],
        ['megrez','dubhe'],['megrez','alioth'],['alioth','mizar'],['mizar','alkaid'],
      ]
    },
    {
      name: 'Ursa Minor',
      stars: [
        { id: 'polaris',   name: 'Polaris',  x: 0.148, y: 0.085, mag: 2.0, spectral: 'F' },
        { id: 'kochab',    name: 'Kochab',   x: 0.138, y: 0.130, mag: 2.1, spectral: 'K' },
        { id: 'pherkad',   name: 'Pherkad',  x: 0.128, y: 0.128, mag: 3.1, spectral: 'A' },
        { id: 'yildun',    name: 'Yildun',   x: 0.152, y: 0.110, mag: 4.4, spectral: 'A' },
        { id: 'eps_umi',   name: 'ε UMi',    x: 0.165, y: 0.118, mag: 4.2, spectral: 'G' },
        { id: 'zeta_umi',  name: 'ζ UMi',    x: 0.170, y: 0.110, mag: 4.3, spectral: 'A' },
        { id: 'eta_umi',   name: 'η UMi',    x: 0.180, y: 0.106, mag: 4.9, spectral: 'F' },
      ],
      lines: [
        ['polaris','yildun'],['yildun','eps_umi'],['eps_umi','zeta_umi'],
        ['zeta_umi','eta_umi'],['kochab','pherkad'],['pherkad','yildun'],
      ]
    },
    {
      name: 'Cassiopeia',
      stars: [
        { id: 'schedar',   name: 'Schedar',  x: 0.220, y: 0.085, mag: 2.2, spectral: 'K' },
        { id: 'caph',      name: 'Caph',     x: 0.200, y: 0.072, mag: 2.3, spectral: 'F' },
        { id: 'gamma_cas', name: 'Navi',     x: 0.238, y: 0.095, mag: 2.5, spectral: 'B' },
        { id: 'ruchbah',   name: 'Ruchbah',  x: 0.255, y: 0.080, mag: 2.7, spectral: 'A' },
        { id: 'segin',     name: 'Segin',    x: 0.270, y: 0.067, mag: 3.4, spectral: 'B' },
      ],
      lines: [['caph','schedar'],['schedar','gamma_cas'],['gamma_cas','ruchbah'],['ruchbah','segin']]
    },
    {
      name: 'Scorpius',
      stars: [
        { id: 'antares',   name: 'Antares',  x: 0.680, y: 0.580, mag: 1.0, spectral: 'M' },
        { id: 'graffias',  name: 'Graffias', x: 0.650, y: 0.530, mag: 2.6, spectral: 'B' },
        { id: 'dschubba',  name: 'Dschubba', x: 0.665, y: 0.525, mag: 2.3, spectral: 'B' },
        { id: 'sigma_sco', name: 'σ Sco',    x: 0.670, y: 0.548, mag: 2.9, spectral: 'B' },
        { id: 'tau_sco',   name: 'τ Sco',    x: 0.672, y: 0.562, mag: 2.8, spectral: 'B' },
        { id: 'shaula',    name: 'Shaula',   x: 0.715, y: 0.650, mag: 1.6, spectral: 'B' },
        { id: 'lesath',    name: 'Lesath',   x: 0.720, y: 0.645, mag: 2.7, spectral: 'B' },
        { id: 'sargas',    name: 'Sargas',   x: 0.700, y: 0.635, mag: 1.9, spectral: 'F' },
        { id: 'girtab',    name: 'Girtab',   x: 0.710, y: 0.625, mag: 2.4, spectral: 'K' },
      ],
      lines: [
        ['graffias','dschubba'],['dschubba','sigma_sco'],['sigma_sco','tau_sco'],
        ['tau_sco','antares'],['antares','sargas'],['sargas','girtab'],
        ['girtab','shaula'],['shaula','lesath'],
      ]
    },
    {
      name: 'Leo',
      stars: [
        { id: 'regulus',   name: 'Regulus',  x: 0.460, y: 0.340, mag: 1.4, spectral: 'B' },
        { id: 'denebola',  name: 'Denebola', x: 0.530, y: 0.310, mag: 2.1, spectral: 'A' },
        { id: 'algieba',   name: 'Algieba',  x: 0.480, y: 0.310, mag: 2.0, spectral: 'K' },
        { id: 'zosma',     name: 'Zosma',    x: 0.508, y: 0.308, mag: 2.6, spectral: 'A' },
        { id: 'ras_elasg', name: 'Rasalas',  x: 0.462, y: 0.278, mag: 3.9, spectral: 'K' },
        { id: 'adhafera',  name: 'Adhafera', x: 0.470, y: 0.290, mag: 3.4, spectral: 'F' },
        { id: 'eta_leo',   name: 'Al Jabbah',x: 0.468, y: 0.296, mag: 3.5, spectral: 'A' },
      ],
      lines: [
        ['regulus','eta_leo'],['eta_leo','adhafera'],['adhafera','ras_elasg'],
        ['ras_elasg','algieba'],['algieba','regulus'],['algieba','zosma'],['zosma','denebola'],
      ]
    },
    {
      name: 'Gemini',
      stars: [
        { id: 'pollux',  name: 'Pollux',  x: 0.265, y: 0.295, mag: 1.1, spectral: 'K' },
        { id: 'castor',  name: 'Castor',  x: 0.258, y: 0.275, mag: 1.6, spectral: 'A' },
        { id: 'alhena',  name: 'Alhena',  x: 0.284, y: 0.330, mag: 1.9, spectral: 'A' },
        { id: 'wasat',   name: 'Wasat',   x: 0.272, y: 0.318, mag: 3.5, spectral: 'F' },
        { id: 'mebsuda', name: 'Mebsuda', x: 0.268, y: 0.310, mag: 3.1, spectral: 'G' },
        { id: 'tejat',   name: 'Tejat',   x: 0.278, y: 0.340, mag: 3.2, spectral: 'M' },
        { id: 'propus',  name: 'Propus',  x: 0.280, y: 0.348, mag: 3.3, spectral: 'K' },
      ],
      lines: [
        ['castor','pollux'],['castor','mebsuda'],['mebsuda','wasat'],
        ['wasat','alhena'],['alhena','tejat'],['tejat','propus'],['pollux','wasat'],
      ]
    },
    {
      name: 'Taurus',
      stars: [
        { id: 'aldebaran', name: 'Aldebaran', x: 0.393, y: 0.295, mag: 0.9, spectral: 'K' },
        { id: 'elnath',    name: 'Elnath',     x: 0.352, y: 0.253, mag: 1.7, spectral: 'B' },
        { id: 'alcyone',   name: 'Alcyone',    x: 0.380, y: 0.258, mag: 2.9, spectral: 'B' },
        { id: 'ain',       name: 'Ain',        x: 0.380, y: 0.285, mag: 3.5, spectral: 'G' },
        { id: 'hyadum1',   name: 'γ Tau',      x: 0.386, y: 0.289, mag: 3.6, spectral: 'G' },
        { id: 'delta_tau', name: 'δ Tau',      x: 0.390, y: 0.291, mag: 3.8, spectral: 'A' },
        { id: 'theta_tau', name: 'θ Tau',      x: 0.396, y: 0.293, mag: 3.4, spectral: 'K' },
      ],
      lines: [
        ['aldebaran','theta_tau'],['theta_tau','delta_tau'],['delta_tau','hyadum1'],
        ['hyadum1','ain'],['ain','aldebaran'],['aldebaran','elnath'],['elnath','alcyone'],
      ]
    },
    {
      name: 'Cygnus',
      stars: [
        { id: 'deneb',    name: 'Deneb',   x: 0.560, y: 0.165, mag: 1.3, spectral: 'A' },
        { id: 'sadr',     name: 'Sadr',    x: 0.545, y: 0.195, mag: 2.2, spectral: 'F' },
        { id: 'albireo',  name: 'Albireo', x: 0.530, y: 0.235, mag: 3.1, spectral: 'K' },
        { id: 'gienah_c', name: 'Gienah',  x: 0.528, y: 0.190, mag: 2.5, spectral: 'K' },
        { id: 'delta_cyg',name: 'δ Cyg',   x: 0.560, y: 0.188, mag: 2.9, spectral: 'B' },
      ],
      lines: [['deneb','sadr'],['sadr','albireo'],['gienah_c','sadr'],['delta_cyg','sadr']]
    },
    {
      name: 'Lyra',
      stars: [
        { id: 'vega',     name: 'Vega',    x: 0.598, y: 0.168, mag: 0.0, spectral: 'A' },
        { id: 'sheliak',  name: 'Sheliak', x: 0.608, y: 0.185, mag: 3.5, spectral: 'B' },
        { id: 'sulafat',  name: 'Sulafat', x: 0.620, y: 0.190, mag: 3.2, spectral: 'B' },
        { id: 'epsilon1', name: 'ε¹ Lyr',  x: 0.596, y: 0.175, mag: 4.7, spectral: 'A' },
        { id: 'zeta_lyr', name: 'ζ Lyr',   x: 0.606, y: 0.178, mag: 4.4, spectral: 'F' },
      ],
      lines: [
        ['vega','epsilon1'],['epsilon1','zeta_lyr'],['zeta_lyr','vega'],
        ['vega','sheliak'],['sheliak','sulafat'],['sulafat','zeta_lyr'],
      ]
    },
    {
      name: 'Perseus',
      stars: [
        { id: 'mirfak',  name: 'Mirfak',  x: 0.270, y: 0.185, mag: 1.8, spectral: 'F' },
        { id: 'algol',   name: 'Algol',   x: 0.252, y: 0.205, mag: 2.1, spectral: 'B' },
        { id: 'atik',    name: 'Atik',    x: 0.285, y: 0.175, mag: 2.9, spectral: 'B' },
        { id: 'menkib',  name: 'Menkib',  x: 0.300, y: 0.200, mag: 4.0, spectral: 'O' },
        { id: 'phi_per', name: 'φ Per',   x: 0.298, y: 0.175, mag: 4.0, spectral: 'B' },
        { id: 'eps_per', name: 'ε Per',   x: 0.285, y: 0.192, mag: 2.9, spectral: 'B' },
      ],
      lines: [
        ['algol','mirfak'],['mirfak','atik'],['atik','phi_per'],
        ['mirfak','eps_per'],['eps_per','menkib'],
      ]
    },
    {
      name: 'Aquila',
      stars: [
        { id: 'altair',    name: 'Altair',   x: 0.630, y: 0.360, mag: 0.8, spectral: 'A' },
        { id: 'tarazed',   name: 'Tarazed',  x: 0.625, y: 0.350, mag: 2.7, spectral: 'K' },
        { id: 'alshain',   name: 'Alshain',  x: 0.635, y: 0.365, mag: 3.7, spectral: 'G' },
        { id: 'delta_aql', name: 'δ Aql',    x: 0.638, y: 0.380, mag: 3.4, spectral: 'F' },
        { id: 'lambda_aql',name: 'λ Aql',    x: 0.645, y: 0.410, mag: 3.4, spectral: 'B' },
      ],
      lines: [['tarazed','altair'],['altair','alshain'],['alshain','delta_aql'],['delta_aql','lambda_aql']]
    },
  ];

  /* ──────────────────────────────────────────────────────────
     STATE GLOBAL
  ────────────────────────────────────────────────────────── */
  let canvas, ctx;
  let W, H;
  let offsetX = 0;
  let targetOffsetX = null;   // Untuk animasi fokus konstelasi
  let isDragging = false;
  let dragStartX = 0;
  let dragStartOffset = 0;
  let autoRotate = false;
  let showConstellations = true;
  let zoom = 1.0;
  let animFrame = null;
  let lastTime = 0;
  let currentTime = 0;
  let hiddenConstellations = new Set();
  let shootingStars = [];
  let nextShootingStar = 3000;
  let bgStars = [];
  let milkyWayStars = [];
  let twinklePhases = [];
  let hoveredStar = null;
  let hoveredConstellation = null;
  let tooltipEl = null;
  let focusedConstellation = null;
  let flashStars = [];   // Untuk efek kedip sesekali

  // ── Parallax State ────────────────────────────────────────────
  // parallaxOffsetX: current horizontal shift driven by mouse/drag velocity
  // parallaxOffsetY: current vertical shift driven by mouse position
  let parallaxOffsetX = 0;   // extra offset for far layer (radians-like, 0..1 scale)
  let parallaxOffsetY = 0;   // vertical parallax shift in normalized coords
  let parallaxTargetX = 0;
  let parallaxTargetY = 0;
  let mouseNX = 0.5;         // mouse normalized x 0..1
  let mouseNY = 0.5;         // mouse normalized y 0..1

  /* ──────────────────────────────────────────────────────────
     INIT
  ────────────────────────────────────────────────────────── */
  function init() {
    canvas = document.getElementById('stargazer-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    tooltipEl = document.getElementById('sg-tooltip');

    resize();
    window.addEventListener('resize', resize);

    generateBackgroundStars();
    generateMilkyWay();
    buildLegend();
    createPopupEl();

    // Controls
    const btnAuto    = document.getElementById('sg-btn-auto');
    const btnConst   = document.getElementById('sg-btn-const');
    const btnZoomIn  = document.getElementById('sg-btn-zoom-in');
    const btnZoomOut = document.getElementById('sg-btn-zoom-out');
    const btnReset   = document.getElementById('sg-btn-reset');

    if (btnAuto)    btnAuto.addEventListener('click',    toggleAutoRotate);
    if (btnConst)   btnConst.addEventListener('click',   toggleConstellations);
    if (btnZoomIn)  btnZoomIn.addEventListener('click',  () => adjustZoom(0.15));
    if (btnZoomOut) btnZoomOut.addEventListener('click', () => adjustZoom(-0.15));
    if (btnReset)   btnReset.addEventListener('click',   resetView);

    // Mouse
    canvas.addEventListener('mousedown',  onMouseDown);
    canvas.addEventListener('mousemove',  onMouseMove);
    canvas.addEventListener('mouseup',    onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);

    // Touch
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: false });
    canvas.addEventListener('touchend',   onMouseUp);

    // Wheel zoom
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      adjustZoom(e.deltaY < 0 ? 0.08 : -0.08);
    }, { passive: false });

    // Loading fade
    setTimeout(() => {
      const loading = document.getElementById('sg-loading');
      if (loading) {
        loading.classList.add('fade-out');
        setTimeout(() => loading.remove(), 900);
      }
    }, 600);

    requestAnimationFrame(loop);
  }

  /* ──────────────────────────────────────────────────────────
     RESIZE
  ────────────────────────────────────────────────────────── */
  function resize() {
    const parent = canvas.parentElement;
    W = canvas.width  = parent.offsetWidth;
    H = canvas.height = parent.offsetHeight;
  }

  /* ──────────────────────────────────────────────────────────
     GENERATE BACKGROUND STARS — LEBIH PUTIH
  ────────────────────────────────────────────────────────── */
  function generateBackgroundStars() {
    bgStars = [];
    const count = 2200;
    for (let i = 0; i < count; i++) {
      const mag = Math.random();
      const spectralPool = ['A','A','A','F','F','B','G','K'];
      // depth: 0 = very far (barely moves), 1 = close (moves most)
      // Most stars are far; a handful are mid-distance for depth
      const depth = mag < 0.12 ? 0.35 + Math.random() * 0.25 : 0.05 + Math.random() * 0.18;
      bgStars.push({
        nx: Math.random(),
        ny: Math.random() * 0.88,
        size: mag < 0.05 ? 2.0 : mag < 0.2 ? 1.4 : mag < 0.6 ? 0.9 : 0.5,
        alpha: 0.30 + Math.random() * 0.60,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.4 + Math.random() * 1.0,
        spectral: spectralPool[Math.floor(Math.random() * spectralPool.length)],
        nextFlash: 3000 + Math.random() * 15000,
        flashTimer: 0,
        flashing: false,
        depth,          // parallax depth factor
      });
    }
    twinklePhases = bgStars.map(s => s.twinkle);
  }

  /* ──────────────────────────────────────────────────────────
     MILKY WAY
  ────────────────────────────────────────────────────────── */
  function generateMilkyWay() {
    milkyWayStars = [];
    for (let i = 0; i < 700; i++) {
      const t = i / 700;
      const band = t * 1.4 - 0.2;
      const spread = 0.07 + Math.random() * 0.05;
      milkyWayStars.push({
        nx: band + (Math.random() - 0.5) * spread * 2,
        ny: (1 - band) * 0.7 + (Math.random() - 0.5) * spread * 1.5,
        alpha: 0.03 + Math.random() * 0.08,
        size: Math.random() < 0.3 ? 1.0 : 0.45,
      });
    }
  }

  /* ──────────────────────────────────────────────────────────
     HELPER: Sky → Screen
  ────────────────────────────────────────────────────────── */
  function skyToScreen(nx, ny, parallaxFactor = 1.0) {
    // Sky always fills the canvas at any zoom level.
    // zoom < 1  → clamped to 1 (no shrink), zoom > 1 → zooms in around center.
    const px = ((nx + offsetX + parallaxOffsetX * parallaxFactor) % 1 + 1) % 1;
    const pyShift = parallaxOffsetY * parallaxFactor;

    // Base coords at zoom = 1, sky fills canvas fully
    const baseX = px * W;
    const baseY = (ny + pyShift) * H * 0.93;

    // Effective zoom: never let sky shrink below canvas size
    const effectiveZoom = Math.max(1.0, zoom);
    const cx = W * 0.5;
    const cy = H * 0.46;

    return {
      sx: cx + (baseX - cx) * effectiveZoom,
      sy: cy + (baseY - cy) * effectiveZoom,
    };
  }
  function isOnScreen(sx, sy, margin = 20) {
    return sx > -margin && sx < W + margin && sy > -margin && sy < H * 0.93 + margin;
  }

  /* ──────────────────────────────────────────────────────────
     DRAW: BACKGROUND
  ────────────────────────────────────────────────────────── */
  function drawBackground() {
    const grad = ctx.createRadialGradient(W * 0.5, H * 0.28, 0, W * 0.5, H * 0.28, H * 0.95);
    grad.addColorStop(0,   '#0a041c');
    grad.addColorStop(0.4, '#060210');
    grad.addColorStop(1,   '#010108');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  /* ──────────────────────────────────────────────────────────
     DRAW: MILKY WAY
  ────────────────────────────────────────────────────────── */
  function drawMilkyWay() {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (const s of milkyWayStars) {
      const { sx, sy } = skyToScreen(s.nx, s.ny, 0.08);
      if (!isOnScreen(sx, sy)) continue;
      ctx.beginPath();
      ctx.arc(sx, sy, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 210, 240, ${s.alpha})`;
      ctx.fill();
    }
    // Glow band
    ctx.globalAlpha = 0.05;
    const mwGrad = ctx.createLinearGradient(W * 0.1, H * 0.05, W * 0.9, H * 0.75);
    mwGrad.addColorStop(0, 'transparent');
    mwGrad.addColorStop(0.4, 'rgba(200, 210, 240, 1)');
    mwGrad.addColorStop(0.6, 'rgba(200, 215, 245, 1)');
    mwGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = mwGrad;
    ctx.fillRect(0, 0, W, H * 0.85);
    ctx.restore();
  }

  /* ──────────────────────────────────────────────────────────
     DRAW: BACKGROUND STARS — PUTIH BERCAHAYA
  ────────────────────────────────────────────────────────── */
  function drawBackgroundStars(t, dt) {
    for (let i = 0; i < bgStars.length; i++) {
      const s = bgStars[i];

      // Update flash timer sesekali
      s.flashTimer += dt;
      if (!s.flashing && s.flashTimer >= s.nextFlash) {
        s.flashing = true;
        s.flashTimer = 0;
        s.flashDuration = 300 + Math.random() * 500;  // durasi flash
        s.nextFlash = 5000 + Math.random() * 20000;   // jeda berikutnya
      }
      if (s.flashing && s.flashTimer >= s.flashDuration) {
        s.flashing = false;
        s.flashTimer = 0;
      }

      const phase = twinklePhases[i] + t * s.twinkleSpeed * 0.001;
      const twink = 0.72 + 0.28 * Math.sin(phase);

      // Faktor flash sesekali: bintang menyala terang tiba-tiba
      let flashFactor = 1.0;
      if (s.flashing) {
        const fp = s.flashTimer / s.flashDuration;
        flashFactor = 1.0 + 3.5 * Math.sin(fp * Math.PI); // smooth peak
      }

      const alpha = Math.min(1, s.alpha * twink * flashFactor);
      const { sx, sy } = skyToScreen(s.nx, s.ny, s.depth);
      if (!isOnScreen(sx, sy)) continue;

      // Warna mendekati putih bersih, sedikit tint spektral
      const col = SPECTRAL_COLORS[s.spectral] || SPECTRAL_COLORS['A'];
      const r = Math.round(col.r * 0.4 + 255 * 0.6);
      const g = Math.round(col.g * 0.4 + 255 * 0.6);
      const b = Math.round(col.b * 0.4 + 255 * 0.6);

      const sz = s.size * zoom * (s.flashing ? 1 + 1.2 * Math.sin(s.flashTimer / s.flashDuration * Math.PI) : 1);

      if (sz > 1.2 || s.flashing) {
        const glowR = s.flashing ? sz * 5.5 : sz * 2.8;
        const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
        if (s.flashing) {
          grd.addColorStop(0, `rgba(255,252,230,${alpha})`);
          grd.addColorStop(0.3, `rgba(255,240,180,${alpha * 0.5})`);
          grd.addColorStop(0.7, `rgba(255,210,100,${alpha * 0.15})`);
        } else {
          grd.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.7})`);
          grd.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.2})`);
        }
        grd.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // Saat flash: gambar diffraction cross
      if (s.flashing && s.size > 0.8) {
        const fp = s.flashTimer / s.flashDuration;
        const spikeAlpha = alpha * 0.6 * Math.sin(fp * Math.PI);
        const spikeLen = sz * 4;
        ctx.save();
        ctx.globalAlpha = spikeAlpha;
        ctx.strokeStyle = 'rgba(255,245,200,1)';
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(sx - spikeLen, sy); ctx.lineTo(sx + spikeLen, sy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(sx, sy - spikeLen); ctx.lineTo(sx, sy + spikeLen); ctx.stroke();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(sx, sy, Math.max(0.3, sz), 0, Math.PI * 2);
      ctx.fillStyle = s.flashing
        ? `rgba(255,252,230,${Math.min(1, alpha * 1.3)})`
        : `rgba(${r},${g},${b},${Math.min(1, alpha * 1.1)})`;
      ctx.fill();
    }
  }

  /* ──────────────────────────────────────────────────────────
     DRAW: CONSTELLATION LINES
  ────────────────────────────────────────────────────────── */
  function drawConstellationLines(t) {
    if (!showConstellations) return;
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (const con of CONSTELLATIONS) {
      if (hiddenConstellations.has(con.name)) continue;
      const starMap = {};
      for (const s of con.stars) starMap[s.id] = s;
      const isFocused = focusedConstellation === con.name;
      const isHovered = hoveredConstellation === con.name;
      const isActive   = isFocused || isHovered;

      if (isActive) {
        // Animasi pulse opacity untuk garis yang aktif
        const pulse = 0.75 + 0.25 * Math.sin(t * 0.003);

        for (const [aId, bId] of con.lines) {
          const a = starMap[aId], b = starMap[bId];
          if (!a || !b) continue;
          const posA = skyToScreen(a.x, a.y);
          const posB = skyToScreen(b.x, b.y);
          if (!isOnScreen(posA.sx, posA.sy) && !isOnScreen(posB.sx, posB.sy)) continue;

          // Layer 1 — outer glow oranye lebar
          ctx.strokeStyle = `rgba(255, 140, 20, ${0.06 * pulse})`;
          ctx.lineWidth = 18 * zoom;
          ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(posA.sx, posA.sy); ctx.lineTo(posB.sx, posB.sy); ctx.stroke();

          // Layer 2 — mid glow kuning
          ctx.strokeStyle = `rgba(255, 210, 60, ${0.18 * pulse})`;
          ctx.lineWidth = 7 * zoom;
          ctx.beginPath(); ctx.moveTo(posA.sx, posA.sy); ctx.lineTo(posB.sx, posB.sy); ctx.stroke();

          // Layer 3 — inner glow putih-kuning
          ctx.strokeStyle = `rgba(255, 245, 180, ${0.55 * pulse})`;
          ctx.lineWidth = 2.5 * zoom;
          ctx.beginPath(); ctx.moveTo(posA.sx, posA.sy); ctx.lineTo(posB.sx, posB.sy); ctx.stroke();

          // Layer 4 — core putih
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.90 * pulse})`;
          ctx.lineWidth = 1.0 * zoom;
          ctx.beginPath(); ctx.moveTo(posA.sx, posA.sy); ctx.lineTo(posB.sx, posB.sy); ctx.stroke();
        }
      } else {
        // Garis normal samar
        ctx.strokeStyle = 'rgba(160, 200, 255, 0.18)';
        ctx.lineWidth = 0.7 * zoom;
        ctx.lineCap = 'round';
        for (const [aId, bId] of con.lines) {
          const a = starMap[aId], b = starMap[bId];
          if (!a || !b) continue;
          const posA = skyToScreen(a.x, a.y);
          const posB = skyToScreen(b.x, b.y);
          if (!isOnScreen(posA.sx, posA.sy) && !isOnScreen(posB.sx, posB.sy)) continue;
          ctx.beginPath();
          ctx.moveTo(posA.sx, posA.sy);
          ctx.lineTo(posB.sx, posB.sy);
          ctx.stroke();
        }
      }
    }
    ctx.restore();
  }

  /* ──────────────────────────────────────────────────────────
     DRAW: CONSTELLATION STARS — PUTIH BERCAHAYA
     (Nama TIDAK ditampilkan di canvas — hanya di panel kanan)
  ────────────────────────────────────────────────────────── */
  function drawConstellationStars(t) {
    for (const con of CONSTELLATIONS) {
      if (hiddenConstellations.has(con.name)) continue;
      const isFocused = focusedConstellation === con.name;

      for (const s of con.stars) {
        const { sx, sy } = skyToScreen(s.x, s.y);
        if (!isOnScreen(sx, sy)) continue;

        const twink = 0.88 + 0.12 * Math.sin(t * 0.0007 + s.x * 80);
        const brightness = Math.max(0.35, 1 - s.mag / 5.5);
        const alpha = brightness * twink;

        // Warna: hampir putih, sedikit tint spektral
        const col = SPECTRAL_COLORS[s.spectral] || SPECTRAL_COLORS['A'];
        const blend = isFocused ? 0.65 : 0.5;
        const r = Math.round(col.r * blend + 255 * (1 - blend));
        const g = Math.round(col.g * blend + 255 * (1 - blend));
        const b = Math.round(col.b * blend + 255 * (1 - blend));

        const sz = Math.max(0.8, (5 - s.mag) * 0.6) * zoom;
        const glowR = sz * (isFocused ? 5 : 3.5);

        // Glow
        const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
        if (isFocused) {
          grd.addColorStop(0, `rgba(180,255,230,${alpha * 0.8})`);
          grd.addColorStop(0.3, `rgba(${r},${g},${b},${alpha * 0.35})`);
        } else {
          grd.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.55})`);
          grd.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.12})`);
        }
        grd.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.6, sz), 0, Math.PI * 2);
        ctx.fillStyle = isFocused
          ? `rgba(220,255,240,${Math.min(1, alpha * 1.4)})`
          : `rgba(${r},${g},${b},${Math.min(1, alpha * 1.2)})`;
        ctx.fill();

        // Diffraction spike for bright stars
        if (s.mag < 2.0 && zoom > 0.7) {
          ctx.save();
          ctx.globalAlpha = alpha * (isFocused ? 0.55 : 0.3);
          ctx.strokeStyle = isFocused ? 'rgba(180,255,230,1)' : `rgb(${r},${g},${b})`;
          ctx.lineWidth = 0.7;
          const spikeLen = sz * (isFocused ? 5.5 : 4);
          ctx.beginPath(); ctx.moveTo(sx - spikeLen, sy); ctx.lineTo(sx + spikeLen, sy); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(sx, sy - spikeLen); ctx.lineTo(sx, sy + spikeLen); ctx.stroke();
          ctx.restore();
        }

        // Hover ring
        if (hoveredStar && hoveredStar.id === s.id) {
          ctx.beginPath();
          ctx.arc(sx, sy, sz * 2.8, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(0,255,200,0.5)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  /* ──────────────────────────────────────────────────────────
     DRAW: TREE GLOW — BIOLUMINESCENT FRAME
  ────────────────────────────────────────────────────────── */
  function drawTreeGlow(t) {
    const cx = W * 0.5;
    const trunkH = H * 0.22;
    const groundY = H * 0.98;
    const canopyCY = groundY - trunkH - trunkH * 0.22;
    const canopyR  = trunkH * 0.72;

    const pulse  = 0.55 + 0.45 * Math.sin(t * 0.0012);
    const pulse2 = 0.40 + 0.60 * Math.sin(t * 0.0008 + 1.2);
    const pulse3 = 0.60 + 0.40 * Math.sin(t * 0.0018 + 2.5);

    ctx.save();

    // Layer 1: Wide ambient glow — kuning-oranye jauh
    const g1 = ctx.createRadialGradient(cx, canopyCY, 0, cx, canopyCY, canopyR * 3.0);
    g1.addColorStop(0,   `rgba(255, 200, 30,  ${0.05 * pulse})`);
    g1.addColorStop(0.5, `rgba(255, 150, 10,  ${0.04 * pulse})`);
    g1.addColorStop(1,   'transparent');
    ctx.beginPath();
    ctx.ellipse(cx, canopyCY, canopyR * 3.0, canopyR * 2.0, 0, 0, Math.PI * 2);
    ctx.fillStyle = g1;
    ctx.fill();

    // Layer 2: Mid glow kuning hangat
    const g2 = ctx.createRadialGradient(cx, canopyCY, canopyR * 0.3, cx, canopyCY, canopyR * 1.7);
    g2.addColorStop(0,    'transparent');
    g2.addColorStop(0.6,  `rgba(255, 210, 50,  ${0.06 * pulse2})`);
    g2.addColorStop(0.85, `rgba(255, 230, 80,  ${0.10 * pulse})`);
    g2.addColorStop(1,    'transparent');
    ctx.beginPath();
    ctx.ellipse(cx, canopyCY, canopyR * 1.7, canopyR * 1.2, 0, 0, Math.PI * 2);
    ctx.fillStyle = g2;
    ctx.fill();

    // Layer 3: Rim glow di tepi kanopi — putih-kuning bercahaya
    ctx.globalCompositeOperation = 'screen';
    const g3 = ctx.createRadialGradient(cx, canopyCY, canopyR * 0.72, cx, canopyCY, canopyR * 1.18);
    g3.addColorStop(0,    'transparent');
    g3.addColorStop(0.65, `rgba(255, 220, 60,  ${0.08 * pulse})`);
    g3.addColorStop(0.90, `rgba(255, 245, 150, ${0.18 * pulse2})`);
    g3.addColorStop(1,    'transparent');
    ctx.beginPath();
    ctx.ellipse(cx, canopyCY, canopyR * 1.18, canopyR * 0.95, 0, 0, Math.PI * 2);
    ctx.fillStyle = g3;
    ctx.fill();

    // Layer 4: Firefly flicker — partikel cahaya kecil berpendar
    ctx.globalCompositeOperation = 'screen';
    for (let f = 0; f < 8; f++) {
      const angle = (f / 8) * Math.PI * 2 + t * 0.0004;
      const rad   = canopyR * (0.5 + 0.45 * Math.sin(t * 0.0007 + f * 1.3));
      const fx    = cx + Math.cos(angle) * rad;
      const fy    = canopyCY + Math.sin(angle) * rad * 0.7;
      const fa    = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.002 + f * 0.7));
      const fg    = ctx.createRadialGradient(fx, fy, 0, fx, fy, canopyR * 0.12);
      fg.addColorStop(0,   `rgba(255, 250, 160, ${0.9 * fa * pulse3})`);
      fg.addColorStop(0.5, `rgba(255, 200, 40,  ${0.35 * fa * pulse3})`);
      fg.addColorStop(1,   'transparent');
      ctx.beginPath();
      ctx.arc(fx, fy, canopyR * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = fg;
      ctx.fill();
    }

    // Layer 5: Ground mist glow kuning hangat
    ctx.globalCompositeOperation = 'source-over';
    const groundGlow = ctx.createRadialGradient(cx, groundY, 0, cx, groundY, canopyR * 1.5);
    groundGlow.addColorStop(0,   `rgba(255, 180, 20, ${0.10 * pulse})`);
    groundGlow.addColorStop(0.5, `rgba(200, 120, 10, ${0.05 * pulse2})`);
    groundGlow.addColorStop(1,   'transparent');
    ctx.beginPath();
    ctx.ellipse(cx, groundY, canopyR * 1.5, 28, 0, 0, Math.PI * 2);
    ctx.fillStyle = groundGlow;
    ctx.fill();

    // Layer 6: Trunk glow kuning
    const trunkGlow = ctx.createLinearGradient(cx - 30, 0, cx + 30, 0);
    trunkGlow.addColorStop(0,   `rgba(200, 130, 10, ${0.07 * pulse})`);
    trunkGlow.addColorStop(0.5, `rgba(255, 200, 40, ${0.03 * pulse})`);
    trunkGlow.addColorStop(1,   `rgba(200, 130, 10, ${0.07 * pulse})`);
    ctx.fillStyle = trunkGlow;
    ctx.fillRect(cx - 30, canopyCY, 60, trunkH + 30);

    ctx.restore();
  }

  /* ──────────────────────────────────────────────────────────
     DRAW: OAK TREE
  ────────────────────────────────────────────────────────── */
  function drawOakTree() {
    const cx = W * 0.5;
    const groundY = H * 0.98;
    const trunkH = H * 0.22;
    const trunkW = W * 0.022;

    ctx.save();

    // Ground fog
    const fogGrad = ctx.createLinearGradient(0, H * 0.82, 0, H);
    fogGrad.addColorStop(0, 'transparent');
    fogGrad.addColorStop(0.4, 'rgba(0, 4, 14, 0.65)');
    fogGrad.addColorStop(1,   'rgba(0, 2, 8, 0.95)');
    ctx.fillStyle = fogGrad;
    ctx.fillRect(0, H * 0.82, W, H * 0.18);

    // Trunk
    const trunkGrad = ctx.createLinearGradient(cx - trunkW, 0, cx + trunkW, 0);
    trunkGrad.addColorStop(0,   '#060414');
    trunkGrad.addColorStop(0.3, '#100820');
    trunkGrad.addColorStop(0.7, '#080614');
    trunkGrad.addColorStop(1,   '#040210');
    ctx.fillStyle = trunkGrad;
    ctx.beginPath();
    ctx.moveTo(cx - trunkW * 0.5, groundY);
    ctx.bezierCurveTo(
      cx - trunkW * 0.6, groundY - trunkH * 0.3,
      cx - trunkW * 0.4, groundY - trunkH * 0.6,
      cx - trunkW * 0.3, groundY - trunkH
    );
    ctx.lineTo(cx + trunkW * 0.3, groundY - trunkH);
    ctx.bezierCurveTo(
      cx + trunkW * 0.4, groundY - trunkH * 0.6,
      cx + trunkW * 0.6, groundY - trunkH * 0.3,
      cx + trunkW * 0.5, groundY
    );
    ctx.closePath();
    ctx.fill();

    // Root flares
    for (let i = -2; i <= 2; i++) {
      const rx = cx + i * trunkW * 0.8;
      ctx.beginPath();
      ctx.moveTo(rx, groundY);
      ctx.bezierCurveTo(
        rx - trunkW * 0.4, groundY - trunkH * 0.12,
        rx - trunkW * 0.2, groundY - trunkH * 0.06,
        rx + trunkW * (i < 0 ? 1.2 : -1.2), groundY
      );
      ctx.closePath();
      ctx.fillStyle = 'rgba(2,1,8,0.9)';
      ctx.fill();
    }

    // Branches & Canopy
    const canopyY = groundY - trunkH;
    drawBranches(cx, canopyY, trunkW, trunkH);
    drawCanopy(cx, canopyY, trunkH);

    ctx.restore();
  }

  function drawBranches(cx, baseY, trunkW, trunkH) {
    const branches = [
      { angle: -55, len: 0.45, thickness: 0.45 },
      { angle:  65, len: 0.40, thickness: 0.40 },
      { angle: -35, len: 0.35, thickness: 0.30 },
      { angle:  80, len: 0.28, thickness: 0.25 },
      { angle: -75, len: 0.25, thickness: 0.22 },
      { angle:  20, len: 0.20, thickness: 0.18 },
      { angle: -10, len: 0.18, thickness: 0.15 },
    ];
    for (const br of branches) {
      const rad = (br.angle * Math.PI) / 180;
      const len = trunkH * br.len;
      const ex = cx + Math.sin(rad) * len;
      const ey = baseY - Math.abs(Math.cos(rad)) * len * 0.5;
      ctx.strokeStyle = 'rgba(4, 2, 14, 0.9)';
      ctx.lineWidth = trunkW * br.thickness;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cx, baseY);
      ctx.quadraticCurveTo(cx + Math.sin(rad) * len * 0.5, baseY - Math.abs(Math.cos(rad)) * len * 0.3, ex, ey);
      ctx.stroke();
      for (let j = 0; j < 3; j++) {
        const subAngle = br.angle + (j - 1) * 30;
        const subRad = (subAngle * Math.PI) / 180;
        const subLen = len * 0.4;
        ctx.lineWidth = trunkW * br.thickness * 0.4;
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(ex + Math.sin(subRad) * subLen, ey - Math.abs(Math.cos(subRad)) * subLen * 0.5);
        ctx.stroke();
      }
    }
  }

  function drawCanopy(cx, baseY, trunkH) {
    const canopyRadius = trunkH * 0.72;
    const canopyCY = baseY - trunkH * 0.22;
    const blobs = [
      { dx: 0,                   dy: 0,                   rx: canopyRadius * 1.0,  ry: canopyRadius * 0.75 },
      { dx: -canopyRadius * 0.45, dy:  canopyRadius * 0.08, rx: canopyRadius * 0.65, ry: canopyRadius * 0.58 },
      { dx:  canopyRadius * 0.48, dy:  canopyRadius * 0.05, rx: canopyRadius * 0.62, ry: canopyRadius * 0.55 },
      { dx: -canopyRadius * 0.20, dy: -canopyRadius * 0.35, rx: canopyRadius * 0.55, ry: canopyRadius * 0.45 },
      { dx:  canopyRadius * 0.22, dy: -canopyRadius * 0.32, rx: canopyRadius * 0.52, ry: canopyRadius * 0.42 },
      { dx:  canopyRadius * 0.0,  dy:  canopyRadius * 0.35, rx: canopyRadius * 0.70, ry: canopyRadius * 0.38 },
      { dx: -canopyRadius * 0.60, dy: -canopyRadius * 0.10, rx: canopyRadius * 0.40, ry: canopyRadius * 0.38 },
      { dx:  canopyRadius * 0.62, dy: -canopyRadius * 0.08, rx: canopyRadius * 0.38, ry: canopyRadius * 0.36 },
    ];
    for (const blob of blobs) {
      const bx = cx + blob.dx;
      const by = canopyCY + blob.dy;
      const cg = ctx.createRadialGradient(bx, by - blob.ry * 0.2, 0, bx, by, blob.rx);
      cg.addColorStop(0,   'rgba(6, 3, 16, 0.88)');
      cg.addColorStop(0.6, 'rgba(4, 2, 12, 0.93)');
      cg.addColorStop(1,   'rgba(2, 1, 7,  0.97)');
      ctx.beginPath();
      ctx.ellipse(bx, by, blob.rx, blob.ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
    }
    // Leaf bump edges
    ctx.save();
    const bumpCount = 28;
    for (let i = 0; i < bumpCount; i++) {
      const angle = (i / bumpCount) * Math.PI * 2;
      const r = canopyRadius * (0.88 + 0.12 * Math.sin(angle * 5 + 0.5));
      const bx = cx + Math.cos(angle) * r;
      const by = canopyCY + Math.sin(angle) * r * 0.75;
      ctx.beginPath();
      ctx.arc(bx, by, canopyRadius * 0.06, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(4,2,12,0.92)';
      ctx.fill();
    }
    ctx.restore();
  }

  /* ──────────────────────────────────────────────────────────
     SHOOTING STARS
  ────────────────────────────────────────────────────────── */
  function updateShootingStars(dt) {
    nextShootingStar -= dt;
    if (nextShootingStar <= 0) {
      spawnShootingStar();
      nextShootingStar = 4500 + Math.random() * 9000;
    }
    shootingStars = shootingStars.filter(s => { s.progress += dt * s.speed; return s.progress < 1; });
  }
  function spawnShootingStar() {
    const angle = 40 + Math.random() * 30;
    shootingStars.push({
      x: 0.1 + Math.random() * 0.8, y: 0.05 + Math.random() * 0.35,
      angle, length: 0.07 + Math.random() * 0.10,
      speed: 0.0008 + Math.random() * 0.001,
      progress: 0, alpha: 0.85 + Math.random() * 0.15,
    });
  }
  function drawShootingStars() {
    for (const s of shootingStars) {
      const fade = s.progress < 0.1 ? s.progress / 0.1 : s.progress > 0.7 ? 1 - (s.progress - 0.7) / 0.3 : 1;
      const alpha = s.alpha * fade;
      const rad = (s.angle * Math.PI) / 180;
      const nx1 = s.x + s.progress * 0.3 * Math.cos(rad);
      const ny1 = s.y + s.progress * 0.3 * Math.sin(rad);
      const nx2 = nx1 - s.length * Math.cos(rad);
      const ny2 = ny1 - s.length * Math.sin(rad);
      const { sx: x1, sy: y1 } = skyToScreen(nx1, ny1);
      const { sx: x2, sy: y2 } = skyToScreen(nx2, ny2);
      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
      grad.addColorStop(0.3, `rgba(220,240,255,${alpha * 0.4})`);
      grad.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.lineCap = 'round'; ctx.stroke();
      ctx.beginPath(); ctx.arc(x1, y1, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`; ctx.fill();
    }
  }

  /* ──────────────────────────────────────────────────────────
     MAIN LOOP
  ────────────────────────────────────────────────────────── */
  function loop(timestamp) {
    const dt = Math.min(timestamp - lastTime, 50);
    lastTime = timestamp;
    currentTime = timestamp;

    // Auto-rotate
    if (autoRotate) offsetX = (offsetX + 0.00003) % 1;

    // Smooth focus lerp
    if (targetOffsetX !== null) {
      let diff = targetOffsetX - offsetX;
      if (diff >  0.5) diff -= 1;
      if (diff < -0.5) diff += 1;
      offsetX = ((offsetX + diff * 0.04) + 1) % 1;
      if (Math.abs(diff) < 0.0005) targetOffsetX = null;
    }

    // ── Parallax smooth lerp ─────────────────────────────────────
    // When dragging, no separate parallax (drag IS the offsetX movement)
    // When mouse moves freely, subtle layers shift at different speeds
    if (!isDragging) {
      // Target: mouse deviation from center drives a small extra shift
      parallaxTargetX = (mouseNX - 0.5) * -0.012;
      parallaxTargetY = (mouseNY - 0.5) * -0.008;
    } else {
      parallaxTargetX = 0;
      parallaxTargetY = 0;
    }
    parallaxOffsetX += (parallaxTargetX - parallaxOffsetX) * 0.035;
    parallaxOffsetY += (parallaxTargetY - parallaxOffsetY) * 0.035;

    ctx.clearRect(0, 0, W, H);
    drawBackground();
    drawMilkyWay();
    drawBackgroundStars(timestamp, dt);
    drawConstellationLines(timestamp);
    drawConstellationStars(timestamp);
    updateShootingStars(dt);
    drawShootingStars();
    drawTreeGlow(timestamp);
    drawOakTree();

    animFrame = requestAnimationFrame(loop);
  }

  /* ──────────────────────────────────────────────────────────
     INTERACTION
  ────────────────────────────────────────────────────────── */
  function onMouseDown(e)  { isDragging = true; dragStartX = e.clientX; dragStartOffset = offsetX; targetOffsetX = null; }
  function onTouchStart(e) { isDragging = true; dragStartX = e.touches[0].clientX; dragStartOffset = offsetX; targetOffsetX = null; }
  function onMouseUp()     { isDragging = false; }
  function onTouchMove(e)  { e.preventDefault(); if (isDragging) { const dx = e.touches[0].clientX - dragStartX; offsetX = ((dragStartOffset - dx / (W * zoom)) % 1 + 1) % 1; } }

  function onMouseMove(e) {
    if (isDragging) {
      const dx = e.clientX - dragStartX;
      offsetX = ((dragStartOffset - dx / (W * zoom)) % 1 + 1) % 1;
    }
    // Track mouse for parallax effect
    const rect = canvas.getBoundingClientRect();
    mouseNX = (e.clientX - rect.left) / rect.width;
    mouseNY = (e.clientY - rect.top)  / rect.height;
    checkHover(e.clientX, e.clientY);
  }

  function checkHover(mx, my) {
    const rect = canvas.getBoundingClientRect();
    const px = mx - rect.left, py = my - rect.top;
    let found = null, minDist = Infinity;
    let foundConName = null;

    for (const con of CONSTELLATIONS) {
      if (hiddenConstellations.has(con.name)) continue;
      for (const s of con.stars) {
        const { sx, sy } = skyToScreen(s.x, s.y);
        const dist = Math.hypot(sx - px, sy - py);
        const threshold = Math.max(14, (5 - s.mag) * 7) * zoom;
        if (dist < threshold && dist < minDist) {
          minDist = dist;
          found = { ...s, constellation: con.name };
          foundConName = con.name;
        }
      }
    }

    hoveredStar = found;
    // Track konstelasi yang sedang di-hover untuk highlight garis
    hoveredConstellation = foundConName;
    updateTooltip(found, px, py);
  }

  function updateTooltip(star, px, py) {
    if (!tooltipEl) return;
    if (!star) { tooltipEl.classList.remove('visible'); return; }

    const info = CONSTELLATION_INFO[star.constellation];
    const conName = info ? info.namaIndonesia.split(' — ')[0] : star.constellation;

    const inner = tooltipEl.querySelector('.tooltip-inner');
    if (inner) {
      const col = SPECTRAL_COLORS[star.spectral] || SPECTRAL_COLORS['A'];
      inner.querySelector('.tooltip-star-name').textContent = star.name;
      inner.querySelector('.tooltip-constellation').textContent = conName;
      inner.querySelector('.tooltip-mag').textContent =
        `Magnitudo: ${star.mag.toFixed(1)} • Tipe Spektral: ${star.spectral}`;
      const dot = inner.querySelector('.tooltip-dot');
      if (dot) {
        dot.style.background = `radial-gradient(circle, rgb(${col.r},${col.g},${col.b}), rgba(${col.r*0.6|0},${col.g*0.6|0},${col.b*0.6|0},0.6))`;
        dot.style.boxShadow = `0 0 6px rgb(${col.r},${col.g},${col.b})`;
      }
    }
    let tx = px + 16, ty = py - 60;
    if (tx + 240 > W) tx = px - 250;
    if (ty < 0) ty = py + 16;
    tooltipEl.style.left = tx + 'px';
    tooltipEl.style.top  = ty + 'px';
    tooltipEl.classList.add('visible');
  }

  /* ──────────────────────────────────────────────────────────
     CONTROLS
  ────────────────────────────────────────────────────────── */
  function toggleAutoRotate() {
    autoRotate = !autoRotate;
    document.getElementById('sg-btn-auto')?.classList.toggle('active', autoRotate);
  }
  function toggleConstellations() {
    showConstellations = !showConstellations;
    document.getElementById('sg-btn-const')?.classList.toggle('active', showConstellations);
  }
  function adjustZoom(delta) { zoom = Math.max(0.6, Math.min(2.5, zoom + delta)); }
  function resetView() {
    offsetX = 0; zoom = 1.0; autoRotate = false; showConstellations = true;
    hiddenConstellations.clear(); focusedConstellation = null; targetOffsetX = null;
    parallaxOffsetX = 0; parallaxOffsetY = 0; parallaxTargetX = 0; parallaxTargetY = 0;
    mouseNX = 0.5; mouseNY = 0.5;
    document.getElementById('sg-btn-auto')?.classList.remove('active');
    document.getElementById('sg-btn-const')?.classList.add('active');
    document.querySelectorAll('.sg-legend-item').forEach(i => { i.classList.remove('dimmed','focused'); });
  }

  /* ──────────────────────────────────────────────────────────
     LEGEND — Panel Kanan (klik → fokus + popup)
  ────────────────────────────────────────────────────────── */
  function buildLegend() {
    const legend = document.getElementById('sg-legend');
    if (!legend) return;
    legend.innerHTML = '';
    for (const con of CONSTELLATIONS) {
      const info = CONSTELLATION_INFO[con.name];
      const item = document.createElement('div');
      item.className = 'sg-legend-item';
      item.id = `sg-leg-${con.name}`;
      item.title = `Klik untuk fokus ke ${con.name}`;
      item.innerHTML = `
        <div class="sg-legend-dot" style="background:radial-gradient(circle, ${info?.warna || '#00ffcc'}, ${(info?.warna || '#00ffcc') + '66'});box-shadow:0 0 6px ${info?.warna || '#00ffcc'};"></div>
        <div class="sg-legend-name">${con.name}</div>
      `;
      item.addEventListener('click', () => {
        const allItems = document.querySelectorAll('.sg-legend-item');
        allItems.forEach(i => i.classList.remove('focused'));
        item.classList.add('focused');
        focusOnConstellation(con.name);
        showConstellationPopup(con.name);
      });
      legend.appendChild(item);
    }
  }

  /* ──────────────────────────────────────────────────────────
     FOKUS KE KONSTELASI (animasi kamera)
  ────────────────────────────────────────────────────────── */
  function focusOnConstellation(conName) {
    const con = CONSTELLATIONS.find(c => c.name === conName);
    if (!con) return;

    // Hitung centroid
    let cx = 0;
    for (const s of con.stars) cx += s.x;
    cx /= con.stars.length;

    // Target offsetX agar centroid berada di tengah layar
    targetOffsetX = ((0.5 - cx) % 1 + 1) % 1;
    focusedConstellation = conName;

    // Sedikit zoom-in ke konstelasi
    if (zoom < 1.0) zoom = 1.0;
  }

  /* ──────────────────────────────────────────────────────────
     POPUP — Informasi Konstelasi Bahasa Indonesia
  ────────────────────────────────────────────────────────── */
  function createPopupEl() {
    if (document.getElementById('sg-popup-overlay')) return;
    const overlay = document.createElement('div');
    overlay.className = 'sg-popup-overlay';
    overlay.id = 'sg-popup-overlay';
    overlay.innerHTML = `
      <div class="sg-popup" id="sg-popup">
        <button class="sg-popup-close" id="sg-popup-close-btn">✕</button>
        <div class="sg-popup-header">
          <div class="sg-popup-emoji" id="sg-popup-emoji">★</div>
          <div class="sg-popup-title-block">
            <div class="sg-popup-name" id="sg-popup-name">—</div>
            <div class="sg-popup-subtitle" id="sg-popup-subtitle">RASI BINTANG</div>
          </div>
        </div>
        <div class="sg-popup-divider"></div>
        <div class="sg-popup-desc" id="sg-popup-desc">—</div>
        <div class="sg-popup-section-title">✦ BINTANG UTAMA</div>
        <div class="sg-popup-stars" id="sg-popup-stars"></div>
        <div class="sg-popup-footer" id="sg-popup-footer"></div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });
    document.getElementById('sg-popup-close-btn').addEventListener('click', closePopup);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(); });
  }

  function showConstellationPopup(conName) {
    const info = CONSTELLATION_INFO[conName];
    if (!info) return;
    const overlay = document.getElementById('sg-popup-overlay');
    if (!overlay) return;

    const color = info.warna || '#00ffcc';

    // Update popup border color
    const popup = document.getElementById('sg-popup');
    popup.style.border = `1px solid ${color}44`;
    popup.style.boxShadow = `0 0 40px ${color}22, 0 8px 60px rgba(0,0,0,0.8), inset 0 1px 0 ${color}1a`;

    document.getElementById('sg-popup-emoji').textContent = info.emoji;
    const nameEl = document.getElementById('sg-popup-name');
    nameEl.textContent = info.namaIndonesia;
    nameEl.style.color = color;
    nameEl.style.textShadow = `0 0 16px ${color}bb, 0 0 32px ${color}55`;

    document.getElementById('sg-popup-subtitle').textContent = `RASI BINTANG — ${conName.toUpperCase()}`;
    document.getElementById('sg-popup-desc').textContent = info.deskripsi;

    // Bintang utama
    const starsEl = document.getElementById('sg-popup-stars');
    starsEl.innerHTML = info.bintangUtama.map(s => `
      <div class="sg-popup-star-row">
        <div class="sg-popup-star-dot" style="background:radial-gradient(circle,${color},${color}44);box-shadow:0 0 5px ${color};"></div>
        <span>${s}</span>
      </div>`).join('');

    // Footer badges
    document.getElementById('sg-popup-footer').innerHTML = `
      <div class="sg-popup-badge" style="border-color:${color}33;color:${color}aa;">
        🌙 Terbaik dilihat: ${info.waktuTerbaik}
      </div>
      <div class="sg-popup-badge" style="border-color:${color}33;color:${color}aa;">
        🌍 Belahan Bumi: ${info.belahan}
      </div>
      <div class="sg-popup-badge" style="border-color:${color}33;color:${color}aa;">
        ⭐ Jumlah bintang: ${CONSTELLATIONS.find(c => c.name === conName)?.stars.length || '?'}
      </div>`;

    overlay.classList.add('show');
    setTimeout(() => overlay.style.pointerEvents = 'auto', 50);
  }

  function closePopup() {
    const overlay = document.getElementById('sg-popup-overlay');
    if (overlay) {
      overlay.classList.remove('show');
      overlay.style.pointerEvents = 'none';
    }
    // Hapus fokus dari legend
    document.querySelectorAll('.sg-legend-item').forEach(i => i.classList.remove('focused'));
    focusedConstellation = null;
  }

  /* ──────────────────────────────────────────────────────────
     PAGE VISIBILITY
  ────────────────────────────────────────────────────────── */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (animFrame) cancelAnimationFrame(animFrame); animFrame = null; }
    else { lastTime = performance.now(); animFrame = requestAnimationFrame(loop); }
  });

  /* ──────────────────────────────────────────────────────────
     EXPORT
  ────────────────────────────────────────────────────────── */
  window.initStargazer = function () {
    if (!canvas) { init(); }
    else { resize(); if (!animFrame) { lastTime = performance.now(); animFrame = requestAnimationFrame(loop); } }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const page = document.getElementById('page-bintang');
    if (page && page.classList.contains('active')) init();
  });

})();
