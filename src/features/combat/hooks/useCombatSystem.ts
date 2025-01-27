import { create } from 'zustand';
import { CombatState, Position, Projectile, COMBAT_CONFIG } from '../types';
import { usePlayerState } from '../../player/hooks/usePlayerState';
import { nanoid } from 'nanoid';

interface CombatStore extends CombatState {
  setTarget: (target: Position | null) => void;
  shoot: () => void;
  updateProjectiles: () => void;
}

export const useCombatSystem = create<CombatStore>((set, get) => ({
  projectiles: [],
  currentTarget: null,
  lastShotTime: 0,

  setTarget: (target) => {
    if (!target) {
      set({ currentTarget: null });
      return;
    }

    const { player } = usePlayerState.getState();
    const dx = target.x - player.position.x;
    const dy = target.y - player.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Only set target if within range
    if (distance <= COMBAT_CONFIG.MAX_RANGE) {
      set({ currentTarget: { ...target, distance } });
    } else {
      set({ currentTarget: null });
    }
  },

  shoot: () => {
    const state = get();
    const now = Date.now();
    
    // Check cooldown and target
    if (now - state.lastShotTime < COMBAT_CONFIG.SHOT_COOLDOWN || !state.currentTarget) {
      return;
    }

    const { player } = usePlayerState.getState();
    
    const projectile: Projectile = {
      id: nanoid(),
      type: 'bullet',
      position: { ...player.position },
      targetPosition: { ...state.currentTarget },
      progress: 0,
      speed: COMBAT_CONFIG.PROJECTILE_SPEED
    };

    set(state => ({
      projectiles: [...state.projectiles, projectile],
      lastShotTime: now
    }));
  },

  updateProjectiles: () => {
    set(state => ({
      projectiles: state.projectiles
        .map(projectile => ({
          ...projectile,
          progress: Math.min(1, projectile.progress + projectile.speed)
        }))
        .filter(projectile => projectile.progress < 1)
    }));
  }
}));