import React from 'react';
import { Map } from 'lucide-react';
import { usePlayerState } from '../../player/hooks/usePlayerState';
import { GRID_CONFIG } from '../../grid/config';

export default function Minimap() {
  const { player } = usePlayerState();
  const position = player.position;

  return (
    <div className="absolute bottom-4 left-4 w-64 h-64 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700 z-[60]">
      <div className="p-2 border-b border-gray-700 flex items-center gap-2">
        <Map className="w-4 h-4 text-gray-400" />
        <h2 className="text-sm font-medium text-gray-200">Minimap</h2>
      </div>
      <div className="p-4">
        <div className="relative w-full h-full bg-gray-900/50 rounded">
          {/* Player position indicator */}
          <div 
            className="absolute w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(position.x / GRID_CONFIG.totalSize) * 100}%`,
              top: `${(position.y / GRID_CONFIG.totalSize) * 100}%`
            }}
          />
          
          {/* Viewport area indicator */}
          <div 
            className="absolute border border-blue-500/30"
            style={{
              left: `${(Math.max(0, position.x - GRID_CONFIG.viewportSize / 2) / GRID_CONFIG.totalSize) * 100}%`,
              top: `${(Math.max(0, position.y - GRID_CONFIG.viewportSize / 2) / GRID_CONFIG.totalSize) * 100}%`,
              width: `${(GRID_CONFIG.viewportSize / GRID_CONFIG.totalSize) * 100}%`,
              height: `${(GRID_CONFIG.viewportSize / GRID_CONFIG.totalSize) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}