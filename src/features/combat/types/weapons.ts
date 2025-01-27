export type WeaponType = 'pistol' | 'rifle' | 'shotgun';

export interface WeaponStats {
  damage: number;
  range: number;
  cooldown: number;
  reloadTime: number;
  spread: number;
  projectileSpeed: number;
  projectileCount: number;
}

export const WEAPON_STATS: Record<WeaponType, WeaponStats> = {
  pistol: {
    damage: 20,
    range: 8,
    cooldown: 400,
    reloadTime: 1000,
    spread: 0.1,
    projectileSpeed: 200,
    projectileCount: 1
  },
  rifle: {
    damage: 35,
    range: 12,
    cooldown: 600,
    reloadTime: 2000,
    spread: 0.05,
    projectileSpeed: 300,
    projectileCount: 1
  },
  shotgun: {
    damage: 15,
    range: 4,
    cooldown: 800,
    reloadTime: 2500,
    spread: 0.3,
    projectileSpeed: 250,
    projectileCount: 5
  }
};