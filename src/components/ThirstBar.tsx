import React from 'react';
import { Droplets } from 'lucide-react';
import { usePlayerState } from '../hooks/usePlayerState';

export function ThirstBar() {
  const { player } = usePlayerState();
  const thirstPercentage = (player.thirst / player.maxThirst) * 100;
  
  return (
    <div className="flex items-center gap-2">
      <Droplets 
        className={`w-5 h-5 ${
          thirstPercentage > 50 
            ? 'text-blue-400' 
            : thirstPercentage > 25 
            ? 'text-yellow-400' 
            : 'text-red-400'
        }`} 
      />
      <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            thirstPercentage > 50 
              ? 'bg-blue-400' 
              : thirstPercentage > 25 
              ? 'bg-yellow-400' 
              : 'bg-red-400'
          }`}
          style={{ width: `${thirstPercentage}%` }}
        />
      </div>
      <span className="text-gray-200 text-sm">
        {Math.ceil(player.thirst)}/{player.maxThirst}
      </span>
    </div>
  );
}