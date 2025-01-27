import { Position, Direction } from './index';

// 8-way direction constants
export type CardinalDirection = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';

export const DIRECTION_VECTORS: Record<CardinalDirection, Direction> = {
  n:  { x: 0, y: -1 },
  ne: { x: 1, y: -1 },
  e:  { x: 1, y: 0 },
  se: { x: 1, y: 1 },
  s:  { x: 0, y: 1 },
  sw: { x: -1, y: 1 },
  w:  { x: -1, y: 0 },
  nw: { x: -1, y: -1 }
};

// Combat system configuration
export const COMBAT_CONFIG = {
  SHOT_COOLDOWN: 200,
  PROJECTILE_SPEED: 200,
  PROJECTILE_RANGE: 8,
} as const;