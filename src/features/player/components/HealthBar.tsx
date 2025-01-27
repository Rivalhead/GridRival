import React from 'react';
import { Heart } from 'lucide-react';
import { usePlayerState } from '../hooks/usePlayerState';

export function HealthBar() {
  const { player } = usePlayerState();
  const healthPercentage = (player.health / player.maxHealth) * 100;
  
  return (
    <div className="flex items-center gap-2">
      <Heart className={`w-5 h-5 ${healthPercentage > 25 ? 'text-red-400' : 'text-red-600'}`} />
      <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-400 transition-all duration-300"
          style={{ width: `${healthPercentage}%` }}
        />
      </div>
      <span className="text-gray-200 text-sm">
        {Math.ceil(player.health)}/{player.maxHealth}
      </span>
    </div>
  );
}