// Keyboard shortcuts configuration
export const KEYBOARD_SHORTCUTS = {
  // Windows
  INVENTORY: { key: 'i', description: 'Toggle Inventory' },
  CHAT: { key: 'c', description: 'Toggle Chat' },
  MINIMAP: { key: 'm', description: 'Toggle Minimap' },
  NAVIGATION: { key: 'p', description: 'Toggle Navigation' },

  // Movement
  MOVE_UP: { key: 'w', description: 'Move Up' },
  MOVE_LEFT: { key: 'a', description: 'Move Left' },
  MOVE_DOWN: { key: 's', description: 'Move Down' },
  MOVE_RIGHT: { key: 'd', description: 'Move Right' },

  // Combat
  WEAPON_1: { key: '1', description: 'Select Pistol' },
  WEAPON_2: { key: '2', description: 'Select Rifle' },
  WEAPON_3: { key: '3', description: 'Select Shotgun' },
  RELOAD: { key: 'r', description: 'Reload Weapon' },

  // View Controls
  ZOOM_IN: { key: '+', modifier: 'ctrl', description: 'Zoom In' },
  ZOOM_OUT: { key: '-', modifier: 'ctrl', description: 'Zoom Out' },
  ZOOM_RESET: { key: '0', modifier: 'ctrl', description: 'Reset Zoom' },
} as const;