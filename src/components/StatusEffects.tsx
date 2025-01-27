import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { usePlayerState } from '../hooks/usePlayerState';
import { StatusEffect } from '../types/player';

const STATUS_COLORS = {
  low: 'text-yellow-400',
  medium: 'text-orange-400',
  critical: 'text-red-400',
};

const STATUS_MESSAGES = {
  hunger: {
    low: 'Getting Hungry',
    medium: 'Very Hungry',
    critical: 'Starving',
  },
  thirst: {
    low: 'Getting Thirsty',
    medium: 'Very Thirsty',
    critical: 'Dehydrated',
  },
};

export function StatusEffects() {
  const { getStatusEffects } = usePlayerState();
  const effects = getStatusEffects();
  
  if (effects.length === 0) return null;
  
  return (
    <div className="fixed top-16 right-4 space-y-2">
      {effects.map((effect: StatusEffect, index) => (
        <div
          key={`${effect.type}-${index}`}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/90 backdrop-blur-sm border border-gray-700 ${STATUS_COLORS[effect.severity]}`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-medium">
            {STATUS_MESSAGES[effect.type][effect.severity]}
          </span>
        </div>
      ))}
    </div>
  );
}