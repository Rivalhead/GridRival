// Z-index hierarchy for consistent layering
export const Z_INDEX = {
  // Base layers (0-49)
  background: 0,
  grid: 10,
  gridOverlay: 20,
  projectiles: 30,
  aimLine: 40,
  player: 45,

  // Game UI (50-99)
  hud: 50,
  minimap: 60,
  navigation: 60,
  chat: 60,
  inventory: 60,
  shortcuts: 60,

  // Floating UI (100-149)
  weatherHUD: 100,
  weaponHUD: 100,
  statusEffects: 110,

  // Top-level UI (150+)
  topBar: 150,
  modal: 200,
  tooltip: 250
} as const;