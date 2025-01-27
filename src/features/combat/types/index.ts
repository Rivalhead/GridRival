// Core types
export interface Position {
  x: number;
  y: number;
}

export interface GridTarget {
  x: number;
  y: number;
  distance: number;
}

export type ProjectileType = 'bullet';

export interface Projectile {
  id: string;
  type: ProjectileType;
  position: Position;
  targetPosition: Position;
  progress: number;
  speed: number;
}

// Combat system state
export interface CombatState {
  projectiles: Projectile[];
  currentTarget: GridTarget | null;
  lastShotTime: number;
}

// Combat configuration
export const COMBAT_CONFIG = {
  SHOT_COOLDOWN: 200,
  PROJECTILE_SPEED: 0.1, // Progress per frame (0-1)
  MAX_RANGE: 8, // Maximum shooting range in grid cells
} as const;