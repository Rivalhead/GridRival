import { useState, useEffect, useCallback } from 'react';
import { Position, GridConfig } from '../types';

export function useGridMovement(config: GridConfig) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  const move = useCallback((newX: number, newY: number) => {
    if (!canMove) return;
    
    const x = Math.max(0, Math.min(config.totalSize - 1, newX));
    const y = Math.max(0, Math.min(config.totalSize - 1, newY));
    
    const dx = x - position.x;
    const dy = y - position.y;
    
    if (Math.abs(dx) + Math.abs(dy) === 1) {
      setPosition({ x, y });
      setCanMove(false);
      setTimeout(() => setCanMove(true), config.movementDelay);
    }
  }, [canMove, position, config.totalSize, config.movementDelay]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!canMove) return;
      
      const key = e.key.toLowerCase();
      let x = position.x;
      let y = position.y;

      switch (key) {
        case 'w': y = position.y - 1; break;
        case 's': y = position.y + 1; break;
        case 'a': x = position.x - 1; break;
        case 'd': x = position.x + 1; break;
        default: return;
      }

      e.preventDefault();
      move(x, y);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [position, canMove, move]);

  return { position, canMove };
}