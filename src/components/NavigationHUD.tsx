import React from 'react';
import { Compass, ArrowRight, ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { Position, GridConfig } from '../types/grid';

type NavigationHUDProps = {
  position: Position;
  config: GridConfig;
};

export function NavigationHUD({ position, config }: NavigationHUDProps) {
  return (
    <div className="fixed bottom-4 left-4 text-gray-300 text-sm space-y-3 max-w-[90vw] sm:max-w-xs">
      <div className="flex items-center gap-2">
        <Compass className="w-5 h-5 text-blue-400" />
        <span className="font-medium">Navigation</span>
      </div>
      
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 space-y-2 w-full">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-sm" />
          <p>Position: ({position.x}, {position.y})</p>
        </div>
        
        <div className="grid grid-cols-3 gap-1 w-20 sm:w-24 mx-auto my-2">
          <div className="col-start-2">
            <ArrowUp className="w-6 h-6 mx-auto text-gray-400" />
          </div>
          <ArrowLeft className="w-6 h-6 mx-auto text-gray-400" />
          <div className="w-6 h-6 bg-blue-500/20 rounded-sm" />
          <ArrowRight className="w-6 h-6 mx-auto text-gray-400" />
          <div className="col-start-2">
            <ArrowDown className="w-6 h-6 mx-auto text-gray-400" />
          </div>
        </div>
        
        <div className="text-xs space-y-1 text-gray-400 overflow-x-auto whitespace-nowrap">
          <p>Map Size: {config.totalSize}x{config.totalSize}</p>
          <p>Vision: {config.visionSize}x{config.visionSize}</p>
          <p>Viewport: {config.viewportSize}x{config.viewportSize}</p>
        </div>
      </div>
    </div>
  );
}