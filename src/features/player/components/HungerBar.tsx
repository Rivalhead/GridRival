import React from 'react';
import { Apple } from 'lucide-react';
import { usePlayerState } from '../hooks/usePlayerState';

export function HungerBar() {
  const { player } = usePlayerState();
  const hungerPercentage = (player.hunger / player.maxHunger) * 100;
  
  return (
    <div className="flex items-center gap-2">
      <Apple 
        className={`w-5 h-5 ${
          hungerPercentage > 50 
            ? 'text-green-400' 
            : hungerPercentage > 25 
            ? 'text-yellow-400' 
            : 'text-red-400'
        }`} 
      />
      <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            hungerPercentage > 50 
              ? 'bg-green-400' 
              : hungerPercentage > 25 
              ? 'bg-yellow-400' 
              : 'bg-red-400'
          }`}
          style={{ width: `${hungerPercentage}%` }}
        />
      </div>
      <span className="text-gray-200 text-sm">
        {Math.ceil(player.hunger)}/{player.maxHunger}
      </span>
    </div>
  );
}