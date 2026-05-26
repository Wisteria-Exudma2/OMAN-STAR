// ============================================================
// DATA.JS — OMAN WEBSITE
// Semua data konten statis
// ============================================================

// ─── RA CALENDAR DATA ────────────────────────────────────────
const RA_MONTHS = [
  { id: 1,  name: "Qamarun",    symbol: "☾",  meaning: "Bulan Purnama",       real: "Januari" },
  { id: 2,  name: "Thurayya",   symbol: "✦",  meaning: "Gugusan Pleiades",    real: "Februari" },
  { id: 3,  name: "Jawzaa",     symbol: "⊕",  meaning: "Rasi Orion",          real: "Maret" },
  { id: 4,  name: "Suhailun",   symbol: "★",  meaning: "Bintang Canopus",     real: "April" },
  { id: 5,  name: "Mizanun",    symbol: "⚖",  meaning: "Neraca Langit",       real: "Mei" },
  { id: 6,  name: "Aqrabun",    symbol: "♏",  meaning: "Rasi Scorpius",       real: "Juni" },
  { id: 7,  name: "Nasmun",     symbol: "🌌", meaning: "Angin Nebula",        real: "Juli" },
  { id: 8,  name: "Shaulaa",    symbol: "⚡",  meaning: "Bintang Shaula",      real: "Agustus" },
  { id: 9,  name: "Denabun",    symbol: "✧",  meaning: "Bintang Deneb",       real: "September" },
  { id: 10, name: "Rijlun",     symbol: "⬟",  meaning: "Bintang Rigel",       real: "Oktober" },
  { id: 11, name: "Dabaranun",  symbol: "♈",  meaning: "Bintang Aldebaran",   real: "November" },
  { id: 12, name: "Siryusun",   symbol: "✺",  meaning: "Bintang Sirius",      real: "Desember" },
];

const RA_DAYS = [
  { id: 0, name: "Yawm al-Qamar",    short: "QMR", meaning: "Hari Bulan" },
  { id: 1, name: "Yawm al-Mirrikh",  short: "MRK", meaning: "Hari Mars" },
  { id: 2, name: "Yawm al-Utarid",   short: "UTR", meaning: "Hari Merkurius" },
  { id: 3, name: "Yawm al-Mushtari", short: "MST", meaning: "Hari Jupiter" },
  { id: 4, name: "Yawm al-Zuhrah",   short: "ZHR", meaning: "Hari Venus" },
  { id: 5, name: "Yawm al-Zuhal",    short: "ZHL", meaning: "Hari Saturnus" },
  { id: 6, name: "Yawm al-Shams",    short: "SHM", meaning: "Hari Matahari" },
];

const RA_YEAR_OFFSET = 474;
const RA_TIME_OFFSET_HOURS = 9;

// ─── FACTION TIMEZONE DATA ────────────────────────────────────
const FACTION_TIMEZONES = [
  { id: "ironforge",  name: "Ironforge Guild",     region: "Tengah-Selatan", offset:  0, color: "#b87333", accentColor: "#ff6a00", emoji: "⚒️", image: "assets/faction-ironforge.png", desc: "Waktu Standar OMAN" },
  { id: "arcane",     name: "Arcane Consortium",   region: "Tengah-Utara",   offset:  1, color: "#00ced1", accentColor: "#4fc3f7", emoji: "🔮", image: "assets/faction-arcane.png",    desc: "+1 jam (Menara Terapung)" },
  { id: "aurelian",   name: "Aurelian Empire",     region: "Barat Laut",     offset: -2, color: "#d4a843", accentColor: "#ffd700", emoji: "👑", image: "assets/faction-aurelian.png",  desc: "-2 jam (Gurun Emas)" },
  { id: "shadow",     name: "Shadow Covenant",     region: "Timur Laut",     offset:  2, color: "#7b2d8b", accentColor: "#ce93d8", emoji: "🌑", image: "assets/faction-shadow.png",    desc: "+2 jam (Kota Bawah Tanah)" },
  { id: "wildlands",  name: "Wildlands Pact",      region: "Barat",          offset: -3, color: "#2e7d32", accentColor: "#81c784", emoji: "🌿", image: "assets/faction-wildlands.png", desc: "-3 jam (Padang Rumput)" },
  { id: "crimson",    name: "Crimson Crusade",     region: "Tenggara",       offset:  3, color: "#c62828", accentColor: "#ef9a9a", emoji: "⚔️", image: "assets/faction-crimson.png",   desc: "+3 jam (Benteng Militer)" },
  { id: "void",       name: "Void Council",        region: "Jauh Timur",     offset:  4, color: "#1a237e", accentColor: "#90caf9", emoji: "🌀", image: "assets/faction-void.png",      desc: "+4 jam (Tanah Terkorupsi)" },
];

// ─── CLASS DATA ───────────────────────────────────────────────
const CLASS_DATA = {
  warrior: {
    name: "Warrior",
    image: "https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Class%20system/Warrior%20pic2.jpg",
    roleBadge: "MELEE · DAMAGE · FRONTLINE",
    role: "Damage Dealer & Tank Frontline",
    focus: "Tank / DPS Melee",
    weapon: "Pedang Satu Tangan, Pedang Dua Tangan, Kapak",
    kekhasan: "Pertahanan ekstrem & serangan fisik brutal",
    trait: "Penguasa medan perang — kuat, tangguh, dan menakutkan",
    lore: "Warrior adalah tulang punggung setiap party. Dengan kekuatan fisik yang tak tertandingi dan armor tebal, Warrior hadir di garis terdepan medan perang, menerima pukulan keras demi melindungi rekan-rekannya.",
    playstyle: "Frontline tanking, mengalihkan perhatian musuh",
    stats: { STR: 90, VIT: 80, INT: 20, SPI: 25, AGI: 60 },
    color: "#c0392b",
    skills: ["Power Strike", "Shield Bash", "Berserk", "War Cry", "Last Stand"]
  },
  mage: {
    name: "Mage",
    image: "https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Class%20system/Mage%20pic3.jpg",
    roleBadge: "MAGIC · DAMAGE · BACKLINE",
    role: "Magic Damage Dealer",
    focus: "Burst Magic / AoE Damage",
    weapon: "Staff, Orb, Grimoire",
    kekhasan: "Sihir massif dengan efek area yang menghancurkan",
    trait: "Penguasa sihir kuno — destruktif dan tak terprediksi",
    lore: "Mage adalah penyihir paling kuat di dunia OMAN. Mereka mengorbankan pertahanan fisik demi menguasai sihir destruktif yang mampu menghancurkan pasukan musuh sebelum sempat mendekat.",
    playstyle: "Burst damage dari jarak aman, kontrol medan perang",
    stats: { STR: 20, VIT: 30, INT: 95, SPI: 70, AGI: 50 },
    color: "#8e44ad",
    skills: ["Fireball", "Arcane Bolt", "Blizzard", "Time Stop", "Meteor Strike"]
  },
  archer: {
    name: "Archer",
    image: "https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Class%20system/Archer%20pic1.jpg",
    roleBadge: "RANGED · DPS · SCOUT",
    role: "Ranged DPS & Scout",
    focus: "Ranged DPS / Assassin",
    weapon: "Busur, Crossbow, Dagger",
    kekhasan: "Kecepatan tinggi & akurasi presisi dari jarak jauh",
    trait: "Jiwa bebas berburu — cepat, presisi, dan licik",
    lore: "Archer adalah pemburu bayangan yang menghantui medan perang. Dengan mata yang tajam dan tangan yang lincah, mereka menghabisi lawan dari kejauhan sebelum musuh menyadari keberadaannya.",
    playstyle: "Kiting dari jarak jauh, hit-and-run tactics",
    stats: { STR: 55, VIT: 45, INT: 35, SPI: 30, AGI: 95 },
    color: "#27ae60",
    skills: ["Quick Shot", "Piercing Arrow", "Rain of Arrows", "Shadow Step", "Eagle Eye"]
  },
  priest: {
    name: "Priest",
    image: "https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Class%20system/Priest%20pic3.jpg",
    roleBadge: "SUPPORT · HEALER · HOLY",
    role: "Healer & Support",
    focus: "Full Support / Healer",
    weapon: "Staff Suci, Rosario, Buku Doa",
    kekhasan: "Heal massal & perlindungan tim dari status negatif",
    trait: "Cahaya di kegelapan — penjaga jiwa dan pemulih luka",
    lore: "Priest adalah harapan setiap tim yang terluka. Dengan kuasa cahaya ilahi, mereka memulihkan yang jatuh, melindungi yang lemah, dan mengusir kegelapan dari jiwa rekan-rekannya.",
    playstyle: "Mendukung tim dari belakang, heal prioritas",
    stats: { STR: 20, VIT: 40, INT: 60, SPI: 95, AGI: 40 },
    color: "#f39c12",
    skills: ["Holy Light", "Mend Wounds", "Divine Shield", "Resurrect", "Holy Nova"]
  },
  guardian: {
    name: "Guardian",
    image: "https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Class%20system/Guardian%20pic3.jpg",
    roleBadge: "TANK · PROTECT · FORTRESS",
    role: "Tank & Protector",
    focus: "Full Tank / Party Shield",
    weapon: "Perisai Besar, Warhammer, Halberd",
    kekhasan: "Daya tahan luar biasa & perlindungan mutlak untuk tim",
    trait: "Benteng hidup — tak tergoyahkan dan selalu melindungi",
    lore: "Guardian adalah perisai terakhir bagi setiap party. Dengan tubuh sekuat benteng dan tekad sekeras baja, mereka berdiri di antara bahaya dan rekan-rekannya tanpa pernah mundur selangkah pun.",
    playstyle: "Taunt semua musuh, absorb damage, lindungi party",
    stats: { STR: 65, VIT: 95, INT: 20, SPI: 45, AGI: 30 },
    color: "#2980b9",
    skills: ["Taunt", "Shield Wall", "Iron Fortress", "Counter Strike", "Aegis"]
  }
};

// ─── RACE DATA ────────────────────────────────────────────────
const RACE_DATA = [
  { id: "human",      
    name: "Human",
    image: "https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Race%20system/Human%20pic11.jpg",      
    hp: 20, mp: 20, atk: 2, def: 2, move: 2,
    trait: "Adaptasi Cepat",    
    traitDesc: "Semua efek status berkurang 1 ronde lebih cepat (misal: efek stun 2 ronde → 1 ronde) min 1 ronde",                          
    color: "#f8d211", 
    lore: "Manusia adalah ras paling adaptif di Oman. Kemampuan mereka untuk belajar dan beradaptasi membuat mereka unggul di semua bidang." },
  { id: "elf",        
    name: "Elf",
    image: "https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Race%20system/Elf%20pic1.jpg",        
    hp: 10, mp: 30, atk: 2, def: 1, move: 3,
    trait: "Regen Hutan",        
    traitDesc: "Hp regen alami saat berada di Field Hutan +1HP/ turn",                                          
    color: "#28da17", 
    lore: "Elf hidup ribuan tahun dalam harmoni dengan alam dan sihir. Telinga lancip mereka menangkap bisikan angin yang membawa rahasia dunia." },
  { id: "dwarf",      
    name: "Dwarf", 
    image: "https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Race%20system/Dwarf%20pic.jpg",      
    hp: 40, mp: 5, atk: 2, def: 3, move: 1, 
    trait: "Kulit Besi",        
    traitDesc: "Kamu kebal terhadap efek Knockback dan pemindahan posisi secara paksa.",                                                   
    color: "#c06714", 
    lore: "Dwarf adalah ahli tempa dan penambang ulung. Tubuh mereka yang kokoh seperti batu gunung tempat mereka tinggal." },
  { id: "wolfkin",    
    name: "Wolfkin",
    image: "https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Race%20system/Wolfkin%20pic1.jpg",    
    hp: 30, mp: 10, atk: 3, def: 1, move: 2, 
    trait: "Insting Predator",  
    traitDesc: "+1 damage jika target yang kamu serang HP-nya tidak penuh.",                                               
    color: "#78909c", 
    lore: "Keturunan serigala kuno yang berevolusi menjadi ras humanoid. Naluri berburu mereka tajam dan naluri kawanan mereka kuat." },
  { id: "darkelf",    
    name: "Dark Elf",
    image: "https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Race%20system/Darkelf%20pic.jpg",    
    hp: 10, mp: 30, atk: 2, def: 1, move: 3,
    trait: "Bayangan Abadi",    
    traitDesc: "Dapat menghilang 1 ronde (tidak bisa diserang), CD 5 ronde",    
    color: "#a22bb9", 
    lore: "Dark Elf hidup di kegelapan dan menguasai seni ilusi serta racun. Mereka adalah master stealth yang ditakuti di seluruh Oman." },
  { id: "faeborn", 
    name: "Faeborn", 
    emoji: "🧚", 
    image: "https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Race%20system/Pixie%20pic.jpg", 
    hp: 8, mp: 35, atk: 2, def: 0, move: 4,
    trait: "Bubuk peri",        
    traitDesc: "🧚 Fairy Dust: Biaya MP untuk semua spell-mu berkurang 2 (tidak bisa kurang dari 1).",
    color: "#30f8ee",
    lore: "Faeborn adalah keturunan peri yang memiliki kekuatan sihir dalam darah mereka. Mereka bangga, kuat, dan memiliki semangat juang yang membara." },
  { id: "undead",     
    name: "Undead",
    image: "https://hyutzatopojxwpyvdclp.supabase.co/storage/v1/object/public/OMAN%20IMG/Race%20system/Undead%20pic.jpg",     
    hp: 25, mp: 15, atk: 2, def: 2, move: 2,
    trait: "Kekal",           
    traitDesc: "Sekali per pertempuran, saat HP mencapai 0, kamu bertahan di 1 HP dan langsung mendapat 1 AP (hangus jika tidak dipakai di giliran itu)",      
    color: "#627e8b", 
    lore: "Undead adalah makhluk yang telah meninggal namun masih hidup. Mereka memiliki kekuatan yang luar biasa dan tidak mudah dikalahkan." },
];

const FACTION_DATA = [
  { id: "aurelian", name: "Aurelian Empire",   icon: "👑", image: "assets/faction-aurelian.png",  region: "Barat Laut — Gurun Emas",           color: "#d4a843", accent: "#ffd700", 
    desc: "Di hamparan gurun pasir emas yang tak pernah padam diterjang angin khamsin, berdirilah Aurelian Empire—sebuah kerajaan yang napasnya diatur oleh konstelasi Al-Taj, Mahkota Surgawi. Rakyatnya percaya bahwa sebelum alam semesta tercipta, Al-Taj adalah mahkota pertama yang dikenakan oleh Penguasa Kehampaan. Ketika sang dewa berbisik, mahkota itu pecah menjadi tujuh bintang raksasa, dan percikan emasnya jatuh ke bumi menjadi butiran pasir yang tak terhingga. Dari keyakinan inilah lahir doktrin Triad Kepemimpinan Surgawi. Bintang puncak, Al-Jabal, melambangkan kaisar—yang dinobatkan dalam upacara Cahaya Penguasa di Menara Tanpa Bayangan, tepat saat Al-Taj bersinar tegak di atas istana. Dua bintang sayap, Al-Janan, mewakili dua pilar kekaisaran yang seimbang: di sayap kiri berdiri militer paling terlatih, di sayap kanan para pedagang ulung penguasa jalur perdagangan. Adapun bintang dasar, Al-Asas, menjadi fondasi hukum yang menopang seluruh mahkota—termasuk kaisar sendiri.",                                     
    buff: "Gold Advantage: semua transaksi Zen -10%",                              
    pros: ["Akses pasar eksklusif", "Militer terlatih", "Diplomasi kuat"],               
    cons: ["Pajak tinggi untuk member", "Konflik dengan Shadow"],                 
    allies: ["Ironforge Guild"],              
    enemies: ["Shadow Covenant", "Void Council"] },
  { id: "shadow",   name: "Shadow Covenant",   icon: "🌑", image: "assets/faction-shadow.png",    region: "Timur Laut — Kota Bawah Tanah",     color: "#7b2d8b", accent: "#ce93d8", 
    desc: "Di bawah gemerlap kota-kota modern Oman yang disinari matahari gurun, tersembunyi sebuah dunia lain yang tak pernah tersentuh cahaya. Di sanalah, di dalam lorong-lorong berdebu kota bawah tanah yang terlupakan sejak era pra-Islam, Shadow Covenant berdiam. Mereka bukan sekadar jaringan kriminal atau gerombolan mata-mata—mereka adalah para pemuja konstelasi Al-Khafiy, gugusan bintang yang oleh orang awam dianggap remeh karena samar dan nyaris tak terlihat. Namun bagi Shadow Covenant, justru di dalam kegelapan itulah kebenaran tertinggi bersemayam. Al-Khafiy mengajarkan bahwa kekuatan sejati lahir dari apa yang tersembunyi, dari bisikan yang tak terdengar, dan dari bayang-bayang yang tak pernah dihiraukan. Berpakaian jubah hitam tanpa sulaman atau tanda pengenal, anggota-anggota mereka merayakan ritus-ritus hening di bawah langit bawah tanah yang mereka ukir sendiri dengan peta bintang buatan. Dari sarang rahasia ini, mereka merajut jaring intelijen yang mencengangkan—mereka tahu setiap rencana kesultanan, setiap urat nafsu para saudagar, dan setiap rahasia yang disembunyikan para pemuka agama.",                                              
    buff: "Shadow Veil: saat minimal dalam party terdapat 3 orang dan battle dilakukan malam hari, semua anggota party +1 move dalam 3 ronde pertama",    
    pros: ["Intel terbaik", "Jaringan luas", "Skill assassin eksklusif"],         
    cons: ["Reputasi buruk", "Musuh banyak"],                                     
    allies: ["Void Council"],                 
    enemies: ["Aurelian Empire", "Crimson Crusade"] },
  { id: "arcane",   name: "Arcane Consortium", icon: "🔮", image: "assets/faction-arcane.png",    region: "Tengah-Utara — Menara Terapung",    color: "#00acc1", accent: "#4fc3f7", 
    desc: "Di sinilah Arcane Consortium, persekutuan elit para penyihir dan ilmuwan, mengabdikan hidup mereka pada satu tujuan suci: memuja dan menafsirkan konstelasi Al-Hakim, gugusan bintang yang konon merupakan jejak mata air kebijaksanaan purba. Setiap malam, di puncak menara yang berdenyut dengan energi azure, mereka menyusun formasi kristal dan mantra resonansi langit, menangkap bisikan kosmik dari Al-Hakim yang hanya dapat didengar oleh hati yang bebas dari keraguan. Konstelasi itu bukan sekadar peta astrologi, melainkan wujud hidup dari Sang Hakim—dewa pengetahuan yang diam-diam merajut realitas. Dengan setiap pergerakan bintang, Consortium mencatat rumus-rumus baru yang kemudian mereka sulap menjadi ilmu sihir tertinggi: sihir yang mampu memanipulasi gravitasi, merajut waktu dalam benang paralel, dan menyembuhkan atau menghancurkan dengan satu suku kata yang diambil langsung dari lidah konstelasi.",                                         
    buff: "Arcane Insight: charge aksi ultimate ditiadakan, namun Damage yang diberikan pada lawan -2 Dmg",                            
    pros: ["Research & crafting terbaik", "Library sihir", "Neutral stance"],     
    cons: ["Biaya keanggotaan mahal", "Jarang terlibat perang"],                  
    allies: ["Wildlands Pact"],               
    enemies: ["Void Council"] },
  { id: "wildlands",name: "Wildlands Pact",    icon: "🌿", image: "assets/faction-wildlands.png", region: "Barat — Padang Rumput Luas",        color: "#2e7d32", accent: "#81c784", 
    desc: "Di bawah cakrawala yang tak pernah sama dari malam ke malam, para pengembara Wildland Pact tidak pernah kehilangan arah—karena mereka tidak membaca peta, melainkan membaca bintang. Konstelasi Al-umm, yang mereka yakini sebagai rahim pertama dari segala kehidupan, menjadi pusat segala ritus dan keputusan. Ketika gugus bintang itu tegak di puncak langit, suku-suku padang ilalang berkumpul dalam hening yang panjang; mereka mendengar bisikan rumput, membaca getaran tanah, dan menafsirkan ulat yang merayap di kulit kayu. Bagi Wildland Pact, alam bukanlah lawan yang harus ditaklukkan, melainkan ibu yang mengajarkan. Mereka hafal jadwal bunga racun mekar, tahu persis kapan getah mandrake mematikan dan kapan menjadi obat, serta mampu membalut luka dengan lumut yang hanya tumbuh di bawah sinar Al-umm—pada jam ketiga setelah bulan menghilang. Mereka tidak membangun kota, tetapi merangkai tenda dari anyaman akar napas; tidak menulis kitab, tetapi menoreh ingatan di tulang rusuk rusa. Musuh yang tersesat di wilayah mereka akan mati kehausan di tepi sungai yang airnya mereka tahu cara meminumnya; atau jatuh satu per satu karena duri tidur yang disebar seperti angin semilir. Namun kepada mereka yang datang dengan telapak tangan terbuka, Wildland Pact memberikan madu hutan dan petunjuk pulang—karena Al-umm mengajarkan bahwa hidup adalah memberi ruang, bukan menguasai.",                                   
    buff: "Nature's Embrace: saat berada di Field Padang Rumput dengan minimal 3 anggota party, semua anggota party +1 HP regen per turn pertama",                    
    pros: ["Taming beast mounts", "Herbalism & alchemy", "Anti-tracking"],        
    cons: ["Tidak bisa tinggal di kota", "Teknologi terbatas"],                   
    allies: ["Arcane Consortium"],            
    enemies: ["Ironforge Guild"] },
  { id: "ironforge", name: "Ironforge Guild",  icon: "⚒️", image: "assets/faction-ironforge.png", region: "Tengah-Selatan — Kota Tempa",       color: "#795548", accent: "#ff6a00", 
    desc: "Di balik gurun Oman yang terik, di tengah lembah yang diselimuti asap bara dan debu besi, berdiri markas megah Faksi Ironforge. Lebih dari sekadar gilda pandai besi dan insinyur terbesar di negeri itu, Ironforge adalah pusat ibadah rahasia yang memuja konstelasi Al-mitraqa—rasi bintang berbentuk palu raksasa yang konon merupakan peninggalan dewa pencipta pertama. Setiap malam, para pandai besi dan perancang mesin berkumpul di kubah observatorium beralas granit, menatap kilau bintang-bintang Al-mitraqa yang mereka yakini menuangkan energi kemurnian logam ke dalam bumi Oman. Para anggota Ironforge meyakini bahwa Al-mitraqa adalah palu surgawi yang menempa bintang-bintang menjadi senjata takdir. Dari keyakinan itulah lahir disiplin tak tergoyahkan: setiap pukulan landasan harus sempurna, setiap rancangan mesin harus mencerminkan keteraturan kosmos. Tak heran jika Ironforge dikenal memproduksi peralatan terbaik dan senjata paling mematian di OMAN—dari pedang berbilah meteorit yang menyerap cahaya rembulan hingga meriam bermuatan uap yang suaranya menggelegar seperti gemuruh langit.",                                             
    buff: "Mastercraft: semua equipment dari Ironforge +2HP dan +2DEF stat bonus untuk semua tier",           
    pros: ["Crafting tier tertinggi", "Equipment diskon", "Netral secara politik"],
    cons: ["Mahal bergabungnya", "Mobilitas rendah"],                              
    allies: ["Aurelian Empire"],              
    enemies: ["Wildlands Pact"] },
  { id: "crimson",  name: "Crimson Crusade",   icon: "⚔️", image: "assets/faction-crimson.png",   region: "Tenggara — Benteng Militer",        color: "#c62828", accent: "#ef9a9a", 
    desc: "Di tenggara yang tandus, di mana angin panas membawa bau besi dan darah, berdiri benteng hitam—benteng militer yang tak tertembus, berdiri di atas tebing basal yang menjulang seperti rahang raksasa. Di sinilah Crimson Crusade, pasukan perang fanatik yang hidup untuk pertumpahan darah dan kemenangan mutlak, memuja konstelasi Al-dhabih, Sang Tersembelih yang terukir di langit malam dengan bintang-bintang merah. Mereka percaya bahwa gugusan bintang itu adalah jejak luka dari korban pertama yang suci, dan setiap pertempuran adalah tiruan sakral dari pengorbanan kosmik tersebut. Para prajuritnya, dengan jubah merah yang telah lusuh oleh debu dan noda darah kering, menorehkan lambang belati di dahi mereka sebagai sumpah: hidup hanya untuk menebas, dan jika mati, leher mereka akan menghadap ke selatan, menuju konstelasi yang mereka puja. Di dalam benteng, tidak ada pasar atau rumah ibadah selain altar perang—sebuah arena bundar di mana setiap fajar, mereka menyembelih tawanan perang untuk membaca kehendak bintang dari cara darah mengalir di alur-alur batu. Tidak ada strategi yang lebih rumit dari serangan frontal habis-habisan, karena bagi Crimson Crusade, taktik hanyalah bisik pengecut. Mereka menguasai padang gurun timur dengan terror murni: pasukan berkuda mereka menyerbak seperti gelombang pasang, tidak pernah mundur, tidak pernah bernegosiasi.",                                                  
    buff: "War Fury: Saat dalam Battle, jumlah party min 5 tercukupi, semua anggota party +2 Dmg dan setiap hit fisik meregen +1 HP untuk 3 ronde pertama",                    
    pros: ["PvP specialist", "Dungeon clearing cepat", "Glory points bonus"],     
    cons: ["Tidak bisa menolak tantangan duel", "Reputasi agresif"],              
    allies: ["Aurelian Empire"],              
    enemies: ["Shadow Covenant", "Wildlands Pact"] },
  { id: "void",     name: "Void Council",      icon: "🌀", image: "assets/faction-void.png",      region: "Jauh Timur — Tanah Terkorupsi",     color: "#1565c0", accent: "#90caf9", 
    desc: "Di antara lipatan ruang yang tak tersentuh cahaya bintang, di mana waktu berputar seperti pusaran yang tak berujung, berdiri sebuah dewan yang namanya hanya dibisikkan di lorong-lorong realitas yang terlupakan. Mereka adalah Void Council — para penguasa dimensi kekosongan, yang tahtanya terukir dari kegelapan yang bernyawa. Mereka tidak memuja dewa, tidak pula setan. Mereka memuja Al-Faragh — sebuah konstelasi yang tidak tercatat dalam peta langit umat manusia. Menurut legenda para penjelajah dimensional, Al-Faragh adalah formasi tujuh lubang hitam yang saling mengorbit dalam tarian gravitasi yang mustahil, membentuk siluet seorang mahkota yang retak. Setiap bintang dalam konstelasi itu sebenarnya adalah mata dari kesadaran purba yang tidur di dasar kekosongan primordial. Para anggota Void Council percaya bahwa ketika keseluruhan konstelasi Al-Faragh mencapai puncak harmoninya, sang Mahkota Retak akan terbangun dan mengabulkan satu keinginan mutlak kekuasaan atas kanvas realita itu sendiri.",                              
    buff: "Void Touch: Saat skill bertema void dipakai dan party min 3 tercukupi, setiap anggota party memiliki kesempatan 1 kali/ battle untuk memindahkan lawan di daerah sekitar sejauh 2 hex",       
    pros: ["Skill unik eksklusif", "Time manipulation", "Lore terlengkap"],       
    cons: ["Dipandang sebagai ancaman", "Quest khusus sangat sulit"],             
    allies: ["Shadow Covenant"],              
    enemies: ["Arcane Consortium", "Aurelian Empire"] },
];

// ─── LEVELING DATA ────────────────────────────────────────────
const LEVEL_TABLE = [
  { ras: "Human",    hpPerLevel: "+2", mpPerLevel: "+3" },
  { ras: "Elf",      hpPerLevel: "+1", mpPerLevel: "+4" },
  { ras: "Dark Elf", hpPerLevel: "+1", mpPerLevel: "+4" },
  { ras: "Wolfkin",  hpPerLevel: "+2", mpPerLevel: "+2" },
  { ras: "Dwarf",    hpPerLevel: "+3", mpPerLevel: "+1" },
  { ras: "Faeborn",  hpPerLevel: "+1", mpPerLevel: "+5" },
  { ras: "Undead",   hpPerLevel: "+2", mpPerLevel: "+2" },
];

// ─── QUEST DATA ───────────────────────────────────────────────
const QUEST_DATA = {
  daily: [
    { name: "Patroli Kota",      desc: "Lakukan 3 RP aktif di kota utama",        exp: 150, zen: 50,  item: "Potion x2",     difficulty: "Mudah" },
    { name: "Berburu Slime",     desc: "Kalahkan 5 slime di area pemula",          exp: 200, zen: 75,  item: "Slime Gel x5",  difficulty: "Mudah" },
    { name: "Antar Pesan",       desc: "Roleplay menjadi kurir antar kota",        exp: 180, zen: 60,  item: "Riding Crop",   difficulty: "Mudah" },
    { name: "Latihan Bertarung", desc: "Spar dengan 2 player berbeda",             exp: 250, zen: 100, item: "EXP Scroll x1", difficulty: "Normal" },
  ],
  weekly: [
    { name: "Dungeon Perdana",    desc: "Selesaikan 1 dungeon bersama grup (min 3 orang)",        exp: 800,  zen: 400,  item: "Rare Equipment Box",  difficulty: "Normal" },
    { name: "Turnamen Mini",      desc: "Ikuti PvP turnamen mingguan (min 5 peserta)",             exp: 1200, zen: 600,  item: "Glory Token x5",      difficulty: "Sulit" },
    { name: "Guild Contribution", desc: "Sumbangkan 500 Zen ke kas guild",                        exp: 600,  zen: 0,    item: "Guild Medal x2",      difficulty: "Normal" },
    { name: "Grand Hunt",         desc: "Kalahkan Boss Monster bersama raid (min 5 orang)",        exp: 2000, zen: 1000, item: "Epic Equipment Box",  difficulty: "Sangat Sulit" },
  ],
  story: [
    { name: "Awal Petualangan",    desc: "Selesaikan 10 Quest Harian pertama",                    exp: 500,  zen: 200,  item: "Starter Pack",       difficulty: "Mudah" },
    { name: "Pilih Faksi",         desc: "Bergabung dengan satu dari 7 faksi di Oman",            exp: 1000, zen: 500,  item: "Faction Badge",      difficulty: "Normal" },
    { name: "Rahasia Dungeon Kuno",desc: "Temukan 3 artefak tersembunyi di dungeon",              exp: 3000, zen: 1500, item: "Ancient Artifact",   difficulty: "Sulit" },
    { name: "Konfrontasi Void",    desc: "Hadapi dan kalahkan emissary Void Council",             exp: 5000, zen: 3000, item: "Legendary Scroll",   difficulty: "Ekstrem" },
  ],
  guild: [
    { name: "Defend the Fort",    desc: "Pertahankan markas guild dari serangan musuh (PvP event)", exp: 1500, zen: 800,  item: "Guild Weapon Blueprint", difficulty: "Sulit" },
    { name: "Territory War",      desc: "Menangkan 3 wilayah dalam perang antar faksi",             exp: 2500, zen: 1500, item: "Territory Flag",         difficulty: "Sangat Sulit" },
    { name: "Guild Hall Upgrade", desc: "Kumpulkan material untuk upgrade guild hall",              exp: 1000, zen: 0,    item: "Hall Token x10",         difficulty: "Normal" },
    { name: "Guild Boss Raid",    desc: "Kalahkan Boss Khusus Guild bersama-sama",                 exp: 4000, zen: 2000, item: "Guild Legendary Box",    difficulty: "Ekstrem" },
  ]
};

// ─── EQUIPMENT DATA ───────────────────────────────────────────
const EQUIPMENT_TIERS = [
  { tier: "Common",    color: "#9e9e9e", level: "1",   efek: "Stat dasar" },
  { tier: "Fine",  color: "#4caf50", level: "15",   efek: "1 efek ringan" },
  { tier: "Superior",      color: "#2196f3", level: "35",   efek: "1 efek sedang + 1 utility" },
  { tier: "Masterwork",      color: "#9c27b0", level: "55",   efek: "2 efek sinergis" },
  { tier: "Legendary", color: "#ff9800", level: "75",   efek: "1 efek legendaris mempengaruhi battle field" },
];

const EQUIPMENT_SLOTS = [
  { slot: "Helm",      icon: "🪖", desc: "Pelindung kepala, berikan bonus HP/DEF" },
  { slot: "Armor",     icon: "🧥", desc: "Baju perang utama, berikan bonus HP/DEF" },
  { slot: "Weapon",    icon: "⚔️", desc: "Senjata utama, berikan bonus ATK" },
  { slot: "Offhand",   icon: "🛡️", desc: "Tangan kiri, bisa shield/tome/quiver" },
  { slot: "Boots",     icon: "👢", desc: "Sepatu, berikan bonus MOVE, jika ada" },
  { slot: "Accessory", icon: "💍", desc: "Cincin/kalung, berikan bonus Non-Combat" },
];

// ─── SKILL DATA ───────────────────────────────────────────────
const SKILL_SYSTEM = {
  slots: [
    { type: "Nova",      icon: "🛡️", slots: 3, ap: 2,     mana: "Min (10)",       desc: "Aksi Normal — serangan dasar yang efisien" },
    { type: "Supernova", icon: "💥", slots: 2, ap: 3,     mana: "Mid (min 20)",  desc: "Aksi Kuat — serangan bertenaga dengan efek" },
    { type: "HyperNova", icon: "⚡", slots: 1, ap: "4–5", mana: "High (80–100% total mana)",desc: "Aksi Ultimate — serangan paling powerful" },
    { type: "Wild",      icon: "🎯", slots: 2, ap: 1,     mana: "Min (5)",       desc: "Aksi Khusus — trik unik di luar combat normal" },
    { type: "Signature", icon: "🌟", slots: 1, ap: "—",   mana: "Special",       desc: "Signature Move — unlock di Level 100, serangan khas" },
  ],
  unlockLevels: [1, 5, 7, 15, 20, 25, 30, 40, 50, 55, 70, 80, 90, 99, 100],
  unlockTable: [
    { level: 1,   type: 'nova',      icon: '🛡️', color: '#4fc3f7', label: 'NOVA',      desc: '+1 Aksi Normal (Nova) dari Starter Skill Class' },
    { level: 5,   type: 'wild',      icon: '🎯', color: '#ff7043', label: 'WILD',      desc: '+1 Aksi Khusus (Wild) setelah Level Up' },
    { level: 7,   type: 'nova',      icon: '🛡️', color: '#4fc3f7', label: 'NOVA',      desc: '+1 Aksi Normal (Nova) setelah Level Up' },
    { level: 15,  type: 'supernova', icon: '💥', color: '#ff5252', label: 'SUPERNOVA', desc: '+1 Aksi Kuat (Supernova) setelah Level Up' },
    { level: 20,  type: 'wild',      icon: '🎯', color: '#ff7043', label: 'WILD',      desc: '+1 Aksi Khusus (Wild) setelah Level Up' },
    { level: 25,  type: 'supernova', icon: '💥', color: '#ff5252', label: 'SUPERNOVA', desc: '+1 Aksi Kuat (Supernova) setelah Level Up' },
    { level: 30,  type: 'supernova', icon: '💥', color: '#ff5252', label: 'SUPERNOVA', desc: 'Supernova Enhancement: Pilih 1 Aksi Kuat untuk diberikan enchant +1 Damage permanen' },
    { level: 40,  type: 'supernova', icon: '💥', color: '#ff5252', label: 'SUPERNOVA', desc: 'Supernova Enhancement 2: Pilih 1 Aksi Kuat untuk diberikan enchant +2 Damage permanen' },
    { level: 50,  type: 'hypernova', icon: '⚡', color: '#ffd740', label: 'HYPERNOVA', desc: 'Unlock +1 Aksi Ultimate / HyperNova Action' },
    { level: 55,  type: 'hypernova', icon: '⚡', color: '#ffd740', label: 'HYPERNOVA', desc: 'Ultimate Upgrade: Bonus Damage +3' },
    { level: 70,  type: 'hypernova', icon: '⚡', color: '#ffd740', label: 'HYPERNOVA', desc: 'Ultimate Branch: Pilih 1 — (1) CD -1 Turn / (2) Mana -10Mp / (3) Status Effect +1 Turn' },
    { level: 80,  type: 'hypernova', icon: '⚡', color: '#ffd740', label: 'HYPERNOVA', desc: 'Ultimate Combine: Boleh gabungkan Ultimate (Max 1 Player). Syarat ketentuan berlaku.' },
    { level: 90,  type: 'hypernova', icon: '⚡', color: '#ffd740', label: 'HYPERNOVA', desc: 'Ultimate pasti mengenai target. Max damage yang diterima musuh: 80% Max HP.' },
    { level: 99,  type: 'mastery',   icon: '💎', color: '#e040fb', label: 'MASTERY',   desc: '+30 All Stat. Tahap tertinggi yang dapat dicapai saat ini.' },
    { level: 100, type: 'signature', icon: '🗡️', color: '#d4a843', label: 'SIGNATURE', desc: 'Unlock Signature Move. Cara mencapainya berbeda tiap player. Harus disetujui Arbiter.' },
  ],
  damageFormula: {
    ATK: "(Base Atk ras + Base Atk Equipment + Base Atk skill + Bonus Atk echo faksi, jika ada) - (Base Def target + Base Def Equipment + Bonus Def echo faksi, jika ada)",
    MinDmg:  2,
    MaxDmg:  "Bergantung pada jenis aksi yang digunakan",
    CritDmg: "Flank: serang dari arah samping +1 Dmg, Backstab: serang dari arah belakang x2 Dmg"
  }
};

// ─── CREATE SKILL GUIDE (PANDUAN) DATA ───────────────────────────────
const SKILL_GUIDE_DATA = [
  {
    id: "nova",
    title: "Aksi Normal /\nNova Action",
    icon: "🛡️",
    color: "#4fc3f7",
    colorDim: "#4fc3f722",
    ap: "2 AP",
    mana: "Min 10 MP",
    tagline: "Basic Physical/Magical\nAction — Raw Damage",
    karakteristik: [
      "Murni damage fisik/mental tanpa efek tambahan",
      "Damage: MIN 1+(0.8xATK) Sampai MAX 2+(0.8xATK)",
      "Single target only",
      "Tidak ada cooldown",
    ],
    contohSkill: [
      { kelas: "Warrior", name: "Basic Slash",  desc: "Tebasan pedang dasar" },
      { kelas: "Archer",  name: "Quick Shot",   desc: "Panahan cepat" },
      { kelas: "Mage",    name: "Energy Bolt",  desc: "Proyektil magic sederhana" },
    ],
  },
  {
    id: "supernova",
    title: "Aksi Kuat /\nSupernova Action",
    icon: "💥",
    color: "#ff5252",
    colorDim: "#ff525222",
    ap: "3 AP",
    mana: "Mid Mana (min 20 MP)",
    tagline: "Enhanced Attack with\nAdditional Effect",
    karakteristik: [
      "Damage menengah: MIN 2+(1×ATK) — MAX 4+(1×ATK)",
      "Selalu disertai efek khusus (Slow, Stun, Def Break, dll)",
      "Bisa single target atau AoE",
      "Cooldown min 2, max 4 turn",
    ],
    contohSkill: [
      { kelas: "Warrior", name: "Shield Bash",  desc: "Damage + Stun chance (Single)" },
      { kelas: "Mage",    name: "Frost Nova",   desc: "Damage + Slow (AoE)" },
      { kelas: "Archer",  name: "Poison Arrow", desc: "Damage + Poison DoT (Single)" },
    ],
  },
  {
    id: "hypernova",
    title: "Aksi Ultimate /\nHyperNova Action",
    icon: "⚡",
    color: "#ffd740",
    colorDim: "#ffd74022",
    ap: "4-5 AP",
    mana: "High Mana (80-100%)",
    tagline: "Sustained High-\nImpact Ability",
    karakteristik: [
      "Damage tinggi: MIN 5+(1.5×ATK) — MAX 10+(1.5×ATK)",
      "Efek berkelanjutan (DoT, buff/debuff durasi panjang, field effect)",
      "Bisa single target atau AoE",
      "Cooldown panjang: min 5, max 10 turn",
    ],
    contohSkill: [
      { kelas: "Warrior", name: "Dragon's Rage",  desc: "High damage + Self ATK Buff beberapa turn" },
      { kelas: "Mage",    name: "Meteor Shower",  desc: "High damage + Burning DoT di area (AoE)" },
      { kelas: "Priest",  name: "Sanctuary",      desc: "Heal overtime besar di area (AoE)" },
    ],
  },
  {
    id: "wild",
    title: "Aksi Khusus /\nWild Action",
    icon: "🎯",
    color: "#ff7043",
    colorDim: "#ff704322",
    ap: "1 AP",
    mana: "5-10 MP",
    tagline: "Utility Action —\nNon-Combat Specialty",
    karakteristik: [
      "Tidak untuk damage langsung",
      "Bisa berupa buff, debuff, provoke, taunt, escape",
      "Tidak ada batasan target",
      "Bisa digunakan setiap giliran (no cooldown, asal ada MP)",
    ],
    contohSkill: [
      { kelas: "Warrior",  name: "Battle Cry", desc: "Boost ATK sendiri selama 1 turn" },
      { kelas: "Archer",   name: "Evade", desc: "Menghindari serangan satu target" },
      { kelas: "Guardian", name: "Taunt",      desc: "Paksa musuh menyerang kamu 1 turn" },
    ],
  },
  {
    id: "signature",
    title: "Signature Move",
    icon: "🗡️",
    color: "#d4a843",
    colorDim: "#d4a84322",
    ap: "Special",
    mana: "Unlock Lv.100",
    tagline: "Your Legend —\nThe Ultimate Signature",
    karakteristik: [
      "Hanya bisa dibuat setelah mencapai Level 100",
      "Unique per player — Jati diri sejati yang tercermin dalam skill ini",
      "Harus disetujui oleh Arbiter / GM sebelum digunakan",
      "Cara mencapainya berbeda untuk setiap player",
    ],
    contohSkill: [
      { kelas: "Warrior", name: "Last Conqueror",  desc: "Serangan legendaris yang menentukan nasib pertarungan" },
      { kelas: "Mage",    name: "Astral Collapse",  desc: "Menarik kekuatan bintang untuk menghancurkan dimensi" },
      { kelas: "Archer",  name: "Infinity Arrow",   desc: "Satu panah yang menembus seluruh waktu dan ruang" },
    ],
  },
];

// ─── ECONOMY DATA ─────────────────────────────────────────────
const ECONOMY_DATA = {
  currency: "Zen",
  currencyIcon: "💰",
  tiers: [
    { name: "Petualang", range: "0 – 999 Zen",       color: "#9e9e9e", perks: "Akses pasar dasar" },
    { name: "Pedagang",  range: "1,000 – 9,999 Zen", color: "#4caf50", perks: "Diskon 5% merchant" },
    { name: "Saudagar",  range: "10,000 – 49,999",   color: "#2196f3", perks: "Bisa mengadakan acara lelang eksklusif" },
    { name: "Taipan",    range: "50,000+ Zen",        color: "#ffd700", perks: "Pengaruh ekonomi faksi" },
  ],
  earn:  ["Quest & Misi", "Menang PvP/Dungeon", "Jual item", "Transaksi antar player", "Event spesial"],
  spend: ["Beli equipment", "Upgrade item", "Sewa properti", "Bayar informan", "Donasi guild"],
  rules: [
    "Dilarang minta Zen gratis tanpa alasan RP",
    "Semua transaksi wajib disertai roleplay",
    "Harga ditentukan oleh supply & demand komunitas",
    "GM berhak freeze akun yang curang",
  ]
};
