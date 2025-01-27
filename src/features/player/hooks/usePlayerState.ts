import { create } from 'zustand';
import { PlayerState, DamageEvent, StatusEffect } from '../types';
import { GRID_CONFIG } from '../../grid/config';

interface PlayerStateStore {
  player: PlayerState;
  canMove: boolean;
  damage: (event: DamageEvent) => void;
  heal: (amount: number) => void;
  updateHunger: (amount: number) => void;
  updateThirst: (amount: number) => void;
  getStatusEffects: () => StatusEffect[];
  move: (x: number, y: number) => void;
}

export const usePlayerState = create<PlayerStateStore>((set, get) => ({
  player: {
    health: 100,
    maxHealth: 100,
    hunger: 100,
    maxHunger: 100,
    thirst: 100,
    maxThirst: 100,
    position: { x: 0, y: 0 },
    direction: 'south',
  },
  canMove: true,
  move: (newX: number, newY: number) => {
    const state = get();
    if (!state.canMove) return;
    
    const x = Math.max(0, Math.min(GRID_CONFIG.totalSize - 1, newX));
    const y = Math.max(0, Math.min(GRID_CONFIG.totalSize - 1, newY));
    
    const dx = x - state.player.position.x;
    const dy = y - state.player.position.y;
    
    if (Math.abs(dx) + Math.abs(dy) === 1) {
      let direction = state.player.direction;
      if (dx > 0) direction = 'east';
      else if (dx < 0) direction = 'west';
      else if (dy > 0) direction = 'south';
      else if (dy < 0) direction = 'north';
      
      set((state) => ({
        player: {
          ...state.player,
          position: { x, y },
          direction
        },
        canMove: false
      }));
      
      setTimeout(() => set({ canMove: true }), GRID_CONFIG.movementDelay);
    }
  },
  damage: (event: DamageEvent) =>
    set((state) => ({
      player: {
        ...state.player,
        health: Math.max(0, state.player.health - event.amount),
      },
    })),
  heal: (amount: number) =>
    set((state) => ({
      player: {
        ...state.player,
        health: Math.min(state.player.maxHealth, state.player.health + amount),
      },
    })),
  updateHunger: (amount: number) =>
    set((state) => ({
      player: {
        ...state.player,
        hunger: Math.max(0, Math.min(state.player.maxHunger, state.player.hunger + amount)),
      },
    })),
  updateThirst: (amount: number) =>
    set((state) => ({
      player: {
        ...state.player,
        thirst: Math.max(0, Math.min(state.player.maxThirst, state.player.thirst + amount)),
      },
    })),
  getStatusEffects: () => {
    const { hunger, thirst } = get().player;
    const effects: StatusEffect[] = [];
    
    if (hunger <= 0) {
      effects.push({ type: 'hunger', severity: 'critical' });
    } else if (hunger <= 25) {
      effects.push({ type: 'hunger', severity: 'medium' });
    } else if (hunger <= 50) {
      effects.push({ type: 'hunger', severity: 'low' });
    }
    
    if (thirst <= 0) {
      effects.push({ type: 'thirst', severity: 'critical' });
    } else if (thirst <= 20) {
      effects.push({ type: 'thirst', severity: 'medium' });
    } else if (thirst <= 40) {
      effects.push({ type: 'thirst', severity: 'low' });
    }
    
    return effects;
  },
}));