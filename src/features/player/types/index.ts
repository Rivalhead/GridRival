export interface PlayerStats {
  health: number;
  maxHealth: number;
  hunger: number;
  maxHunger: number;
  thirst: number;
  maxThirst: number;
}

export type Direction = 'north' | 'south' | 'east' | 'west';

export interface PlayerState extends PlayerStats {
  position: {
    x: number;
    y: number;
  };
  direction: Direction;
}

export type DamageType = 'physical' | 'environmental' | 'radiation';

export type StatusEffect = {
  type: 'hunger' | 'thirst' | 'cold' | 'heat' | 'radiation';
  severity: 'low' | 'medium' | 'critical';
};

export interface DamageEvent {
  amount: number;
  type: DamageType;
  source?: string;
}