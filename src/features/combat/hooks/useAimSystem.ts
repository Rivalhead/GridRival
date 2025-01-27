import { useState, useCallback } from 'react';
import { Direction, DirectionVector, DIRECTION_VECTORS } from '../types/combat';
import { Position } from '../../grid/types';
import { GRID_CONFIG } from '../../grid/config';

export function useAimSystem() {
  const [targetCell, setTargetCell] = useState<Position | null>(null);
  const [direction, setDirection] = useState<Direction>('n');

  const calculateDirection = useCallback((start: Position, end: Position): Direction => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const angle = Math.atan2(dy, dx);
    
    // Convert angle to 8-way direction
    const octant = Math.round(8 * angle / (2 * Math.PI) + 8) % 8;
    const directions: Direction[] = ['e', 'se', 's', 'sw', 'w', 'nw', 'n', 'ne'];
    return directions[octant];
  }, []);

  const getDirectionVector = useCallback((dir: Direction): DirectionVector => {
    return DIRECTION_VECTORS[dir];
  }, []);

  const updateAim = useCallback((mouseX: number, mouseY: number, playerPos: Position) => {
    const gridElement = document.querySelector('.grid-container');
    if (!gridElement) return;

    const rect = gridElement.getBoundingClientRect();
    const cellSize = rect.width / GRID_CONFIG.viewportSize;
    
    const gridX = Math.floor((mouseX - rect.left) / cellSize);
    const gridY = Math.floor((mouseY - rect.top) / cellSize);
    
    const halfViewport = Math.floor(GRID_CONFIG.viewportSize / 2);
    const worldX = playerPos.x - halfViewport + gridX;
    const worldY = playerPos.y - halfViewport + gridY;
    
    const newTargetCell = { x: worldX, y: worldY };
    const newDirection = calculateDirection(playerPos, newTargetCell);
    
    setTargetCell(newTargetCell);
    setDirection(newDirection);
  }, [calculateDirection]);

  return {
    targetCell,
    direction,
    updateAim,
    getDirectionVector
  };
}