import React from 'react';
import { useMouseAim } from '../hooks/useMouseAim';
import { GRID_CONFIG } from '../../grid/config';
import { usePlayerState } from '../../player/hooks/usePlayerState';
import { Z_INDEX } from '../../ui/constants/zIndex';

export function AimLine() {
  const { angle, targetCell } = useMouseAim();
  const { player } = usePlayerState();
  
  if (!targetCell) return null;

  // Calculate viewport start position
  const halfViewport = Math.floor(GRID_CONFIG.viewportSize / 2);
  const viewportStartX = Math.max(0, Math.min(
    GRID_CONFIG.totalSize - GRID_CONFIG.viewportSize,
    player.position.x - halfViewport
  ));
  const viewportStartY = Math.max(0, Math.min(
    GRID_CONFIG.totalSize - GRID_CONFIG.viewportSize,
    player.position.y - halfViewport
  ));

  // Calculate relative positions within the viewport
  const relativePlayerX = player.position.x - viewportStartX;
  const relativePlayerY = player.position.y - viewportStartY;
  const relativeTargetX = targetCell.x - viewportStartX;
  const relativeTargetY = targetCell.y - viewportStartY;

  // Convert to percentages
  const startX = (relativePlayerX / GRID_CONFIG.viewportSize) * 100;
  const startY = (relativePlayerY / GRID_CONFIG.viewportSize) * 100;

  // Calculate line length using relative coordinates
  const dx = relativeTargetX - relativePlayerX;
  const dy = relativeTargetY - relativePlayerY;
  const length = Math.sqrt(
    Math.pow(dx * (100 / GRID_CONFIG.viewportSize), 2) +
    Math.pow(dy * (100 / GRID_CONFIG.viewportSize), 2)
  );
  
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: Z_INDEX.aimLine }}
    >
      <div 
        className="absolute h-0.5 bg-blue-500/50 origin-left transition-transform duration-100"
        style={{
          left: `${startX}%`,
          top: `${startY}%`,
          width: `${length}%`,
          transform: `rotate(${angle}rad)`
        }}
      />
    </div>
  );
}