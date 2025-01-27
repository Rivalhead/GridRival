import React from 'react';
import { Map } from 'lucide-react';
import { useUIState } from '../hooks/useUIState';

export function BottomBar() {
  const { toggleMinimap } = useUIState();

  return (
    <footer className="h-20 bg-gray-800/90 backdrop-blur-sm border-t border-gray-700 px-4 flex items-center justify-between">
      <button
        onClick={toggleMinimap}
        className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <Map className="w-5 h-5 text-gray-400" />
        <span className="text-gray-200 text-sm">Toggle Minimap</span>
      </button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-12 h-12 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-blue-500 transition-colors"
          />
        ))}
      </div>
    </footer>
  );
}