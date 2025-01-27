import React from 'react';
import { TopBar } from './TopBar';
import { StatusEffects } from '../../status/components';
import { WeatherHUD } from '../../weather/components/WeatherHUD';
import { WeaponHUD } from '../../combat/components/WeaponHUD';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { LeftSidebar as Chat } from '../../chat/components/LeftSidebar';
import { RightSidebar as Inventory } from '../../inventory/components/RightSidebar';
import { useUIState } from '../hooks/useUIState';
import { usePlayerState } from '../../player/hooks/usePlayerState';
import { GRID_CONFIG } from '../../grid/config';

export function Layout({ children }: { children: React.ReactNode }) {
  const { isInventoryOpen, isChatOpen, isMinimapOpen, isNavigationOpen } = useUIState();
  const { player } = usePlayerState();

  return (
    <div className="h-screen w-screen bg-gray-900 relative overflow-hidden select-none">
      <TopBar className="z-[150]" />
      <StatusEffects className="z-[110]" />
      
      {/* Main Content */}
      {children}
      
      {/* HUDs */}
      <WeatherHUD />
      <WeaponHUD />
      
      {/* Windows */}
      {isNavigationOpen && (
        <div className="fixed bottom-4 left-4 text-gray-300 text-sm space-y-3 max-w-[90vw] sm:max-w-xs z-[60]">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 space-y-2 w-full">
            <div className="text-xs space-y-1 text-gray-400 overflow-x-auto whitespace-nowrap">
              <p>Position: ({player.position.x}, {player.position.y})</p>
              <p>Map Size: {GRID_CONFIG.totalSize}x{GRID_CONFIG.totalSize}</p>
              <p>Vision: {GRID_CONFIG.visionSize}x{GRID_CONFIG.visionSize}</p>
              <p>Viewport: {GRID_CONFIG.viewportSize}x{GRID_CONFIG.viewportSize}</p>
            </div>
          </div>
        </div>
      )}
      {isMinimapOpen && (
        <div className="absolute bottom-4 left-4 w-64 h-64 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700 z-[60]">
          <div className="p-4">
            <div className="relative w-full h-full bg-gray-900/50 rounded">
              <div 
                className="absolute w-2 h-2 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${(player.position.x / GRID_CONFIG.totalSize) * 100}%`,
                  top: `${(player.position.y / GRID_CONFIG.totalSize) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      )}
      {isChatOpen && (
        <div className="absolute left-4 top-4 w-80 h-96 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700 z-[60]">
          <Chat />
        </div>
      )}
      {isInventoryOpen && (
        <div className="absolute right-4 top-4 w-80 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700 z-[60]">
          <Inventory />
        </div>
      )}
      
      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts />
    </div>
  );
}