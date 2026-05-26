-- ============================================================
-- SUPABASE_SETUP.SQL — OMAN WEBSITE
-- Jalankan di Supabase SQL Editor
-- ============================================================

-- Tabel races (data HP/MP dasar)
CREATE TABLE IF NOT EXISTS races (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  base_hp    INT  NOT NULL DEFAULT 50,
  base_mp    INT  NOT NULL DEFAULT 20
);

INSERT INTO races (id, name, base_hp, base_mp) VALUES
  ('human',     'Human',     50, 20),
  ('elf',       'Elf',       25, 45),
  ('dwarf',     'Dwarf',     60, 10),
  ('wolfkin',   'Wolfkin',   45, 25),
  ('darkelf',   'Dark Elf',  35, 35),
  ('dragonborn','Dragonborn',55, 30),
  ('faeborn',   'Faeborn',   20, 50),
  ('beastkin',  'Beastkin',  50, 15),
  ('undead',    'Undead',    40, 30),
  ('celestial', 'Celestial', 30, 45)
ON CONFLICT (id) DO NOTHING;

-- Tabel characters (1 row per player_name)
CREATE TABLE IF NOT EXISTS characters (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name  TEXT UNIQUE NOT NULL,
  char_name    TEXT NOT NULL,
  race         TEXT NOT NULL REFERENCES races(id),
  class        TEXT NOT NULL,
  level        INT  NOT NULL DEFAULT 1 CHECK (level BETWEEN 1 AND 100),

  -- Base Stats (point alokasi player)
  base_str     INT NOT NULL DEFAULT 5,
  base_vit     INT NOT NULL DEFAULT 5,
  base_int     INT NOT NULL DEFAULT 5,
  base_spi     INT NOT NULL DEFAULT 5,
  base_agi     INT NOT NULL DEFAULT 5,

  -- Equipment Bonuses
  equip_str    INT NOT NULL DEFAULT 0,
  equip_vit    INT NOT NULL DEFAULT 0,
  equip_int    INT NOT NULL DEFAULT 0,
  equip_spi    INT NOT NULL DEFAULT 0,
  equip_agi    INT NOT NULL DEFAULT 0,

  -- Title Bonuses
  title_str    INT NOT NULL DEFAULT 0,
  title_vit    INT NOT NULL DEFAULT 0,
  title_int    INT NOT NULL DEFAULT 0,
  title_spi    INT NOT NULL DEFAULT 0,
  title_agi    INT NOT NULL DEFAULT 0,

  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_characters_updated ON characters;
CREATE TRIGGER trg_characters_updated
  BEFORE UPDATE ON characters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function: hitung derived stats otomatis di server
CREATE OR REPLACE FUNCTION calculate_derived_stats(char_id UUID)
RETURNS TABLE (
  max_hp   INT,
  max_mp   INT,
  max_ap   INT,
  crit_pct INT,
  phys_atk INT,
  phys_def INT,
  mag_atk  INT,
  mag_def  INT
) AS $$
DECLARE
  c  characters%ROWTYPE;
  r  races%ROWTYPE;
  eff_str INT;
  eff_vit INT;
  eff_int INT;
  eff_spi INT;
  eff_agi INT;
BEGIN
  SELECT * INTO c FROM characters WHERE id = char_id;
  SELECT * INTO r FROM races WHERE id = c.race;

  eff_str := c.base_str + c.equip_str + c.title_str;
  eff_vit := c.base_vit + c.equip_vit + c.title_vit;
  eff_int := c.base_int + c.equip_int + c.title_int;
  eff_spi := c.base_spi + c.equip_spi + c.title_spi;
  eff_agi := c.base_agi + c.equip_agi + c.title_agi;

  RETURN QUERY SELECT
    (r.base_hp + (eff_str + eff_vit) * 2 + c.level * 2)::INT  AS max_hp,
    (r.base_mp + (eff_int + eff_spi) * 2 + c.level * 2)::INT  AS max_mp,
    (5 + FLOOR(eff_agi / 10.0))::INT                            AS max_ap,
    LEAST(eff_agi, 20)::INT                                     AS crit_pct,
    (eff_str * 2 + 5)::INT                                      AS phys_atk,
    (eff_vit * 2)::INT                                          AS phys_def,
    (eff_int * 2 + 5)::INT                                      AS mag_atk,
    (eff_spi * 2)::INT                                          AS mag_def;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (opsional — aktifkan jika mau proteksi)
-- ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Public read" ON characters FOR SELECT USING (true);
-- CREATE POLICY "Player insert/update own" ON characters
--   FOR ALL USING (auth.uid()::text = player_name);

-- Index untuk pencarian cepat
CREATE INDEX IF NOT EXISTS idx_characters_player_name ON characters(player_name);
CREATE INDEX IF NOT EXISTS idx_characters_race        ON characters(race);
CREATE INDEX IF NOT EXISTS idx_characters_class       ON characters(class);
