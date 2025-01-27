import React, { useMemo, useEffect } from 'react';
import { GRID_CONFIG } from '../config';
import { useGridExploration } from '../hooks/useGridExploration';
import { useTimeSystem } from '../../time/hooks/useTimeSystem';
import { useZoom } from '../../ui/hooks/useZoom';
import { GridCell } from './GridCell';
import { CellVisibility } from '../types';
import { usePlayerState } from '../../player/hooks/usePlayerState';
import { Projectile } from '../../combat/components/Projectile';
import { AimLine } from '../../combat/components/AimLine';
import { useMouseAim } from '../../combat/hooks/useMouseAim';
import { useCombatSystem } from '../../combat/hooks/useCombatSystem';

export default function GridMap() {
  const { player, canMove } = usePlayerState();
  const position = player.position;
  const { exploredCells, currentlyVisibleCells } = useGridExploration(position, GRID_CONFIG);
  const { time, updateTime } = useTimeSystem();
  const { projectiles } = useCombatSystem();
  const { zoom } = useZoom();
  const { targetCell } = useMouseAim();
  
  useEffect(() => {
    const interval = setInterval(() => {
      updateTime();
    }, 2000);
    
    return () => clearInterval(interval);
  }, [updateTime]);

  const viewportStart = useMemo(() => {
    const halfViewport = Math.floor(GRID_CONFIG.viewportSize / 2);
    const getStart = (pos: number) => {
      if (pos <= halfViewport) return 0;
      if (pos >= GRID_CONFIG.totalSize - halfViewport - 1) {
        return GRID_CONFIG.totalSize - GRID_CONFIG.viewportSize;
      }
      return pos - halfViewport;
    };

    return {
      x: getStart(position.x),
      y: getStart(position.y)
    };
  }, [position]);

  const getCellVisibility = (x: number, y: number): CellVisibility => {
    const cellKey = `${x},${y}`;
    
    if (currentlyVisibleCells.has(cellKey)) {
      return 'visible';
    }
    return exploredCells.has(cellKey) ? 'explored' : 'hidden';
  };

  const gridCells = useMemo(() => {
    const cells = [];
    
    for (let y = 0; y < GRID_CONFIG.viewportSize; y++) {
      for (let x = 0; x < GRID_CONFIG.viewportSize; x++) {
        const worldX = viewportStart.x + x;
        const worldY = viewportStart.y + y;
        
        cells.push(
          <GridCell
            key={`${worldX},${worldY}`}
            isPlayer={worldX === position.x && worldY === position.y}
            canMove={canMove}
            direction={player.direction}
            visibility={getCellVisibility(worldX, worldY)}
            position={{ x: worldX, y: worldY }}
            isHighlighted={targetCell?.x === worldX && targetCell?.y === worldY}
          />
        );
      }
    }
    
    return cells;
  }, [viewportStart, position, canMove, player.direction, targetCell]);

  return (
    <div className="h-full w-full grid-container">
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=80&w=2128&auto=format&fit=crop"
            alt="Landscape"
            className="absolute w-full h-full object-cover"
          />
        </div>
        <div 
          className="absolute inset-0 bg-black transition-opacity duration-1000 z-10"
          style={{ opacity: 1 - time.lightLevel }}
        />
        <div 
          className="absolute inset-0 grid gap-px z-20"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center',
            transition: 'transform 0.2s ease-out',
            gridTemplateColumns: `repeat(${GRID_CONFIG.viewportSize}, 1fr)`,
            backgroundColor: 'rgba(0, 0, 0, 0.9)'
          }}
        >
          {gridCells}
          {projectiles.map((projectile) => (
            <Projectile
              key={projectile.id}
              {...projectile}
            />
          ))}
          <AimLine />
        </div>
      </div>
    </div>
  );
}