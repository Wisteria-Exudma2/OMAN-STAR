# OMAN Website

**Open World Adventure & Mystery** — Portal resmi RPG WhatsApp Group OMAN.

## Tech Stack
- HTML + CSS + Vanilla JS (SPA)
- Supabase (database + storage)
- Vercel + GitHub (hosting)

## Struktur File
```
oman-website/
├── index.html          ← SPA utama (10 halaman)
├── styles.css          ← Design system + semua styling
├── main.js             ← Navigasi + Space Canvas + RA Clock + page renderers
├── data.js             ← Semua data konten (class, ras, faksi, dll)
├── calculator.js       ← Supabase config + rumus kalkulasi
├── supabase_setup.sql  ← SQL setup database
└── assets/             ← Gambar (buat folder ini, isi dengan gambar)
```

## 🕐 Sistem Kalender RA

**Waktu OMAN** = Waktu Nyata (WIB/UTC+7) **+ 9 jam**  
**Tahun RA** = Tahun Nyata + **474** (2026 → **2500 RA**)

### 12 Bulan RA (Arabian + Konstelasi)
| Bulan | Nama RA | Arti |
|-------|---------|------|
| Januari | Qamarun | Bulan Purnama |
| Februari | Thurayya | Gugusan Pleiades |
| Maret | Jawzaa | Rasi Orion |
| April | Suhailun | Bintang Canopus |
| Mei | Mizanun | Neraca Langit |
| Juni | Aqrabun | Rasi Scorpius |
| Juli | Nasmun | Angin Nebula |
| Agustus | Shaulaa | Bintang Shaula |
| September | Denabun | Bintang Deneb |
| Oktober | Rijlun | Bintang Rigel |
| November | Dabaranun | Bintang Aldebaran |
| Desember | Siryusun | Bintang Sirius |

### 7 Hari RA
| Hari | Nama RA |
|------|---------|
| Minggu | Yawm al-Qamar |
| Senin | Yawm al-Mirrikh |
| Selasa | Yawm al-Utarid |
| Rabu | Yawm al-Mushtari |
| Kamis | Yawm al-Zuhrah |
| Jumat | Yawm al-Zuhal |
| Sabtu | Yawm al-Shams |

### Zona Waktu Faksi
| Faksi | Offset |
|-------|--------|
| Ironforge Guild | ±0 (Standar) |
| Arcane Consortium | +1 jam |
| Aurelian Empire | -2 jam |
| Shadow Covenant | +2 jam |
| Wildlands Pact | -3 jam |
| Crimson Crusade | +3 jam |
| Void Council | +4 jam |

## Setup Supabase
1. Buat project di [supabase.com](https://supabase.com)
2. Jalankan `supabase_setup.sql` di SQL Editor
3. Isi `SUPABASE_URL` dan `SUPABASE_ANON_KEY` di `calculator.js`

## Cara Ganti Gambar
Semua path gambar ada di `data.js`:
```js
// Class
CLASS_DATA.warrior.image = "assets/class-warrior.jpg"

// Ras
RACE_DATA[0].image = "assets/race-human.jpg"  

// Faksi
FACTION_DATA[0].image = "assets/faction-aurelian.png"
```
Upload gambar ke Supabase Storage bucket `images` (public), lalu paste URL-nya.

## Deploy ke Vercel
1. Push ke GitHub repository
2. Connect di [vercel.com](https://vercel.com)
3. Deploy otomatis setiap push!
