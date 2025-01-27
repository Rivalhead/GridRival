import { useState, useEffect } from 'react';
import { useCombatSystem } from './useCombatSystem';
import { usePlayerState } from '../../player/hooks/usePlayerState';
import { GRID_CONFIG } from '../../grid/config';
import { getWorldPositionFromMouse, normalizeToEightDirections } from '../utils/direction';

interface TargetCell {
  x: number;
  y: number;
}

export function useMouseAim() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const [direction, setDirection] = useState<{ x: number, y: number } | null>(null);
  const [targetCell, setTargetCell] = useState<TargetCell | null>(null);
  const { shoot } = useCombatSystem();
  const { player } = usePlayerState();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const worldPos = getWorldPositionFromMouse(e, player.position);
      if (!worldPos) return;
      
      // Calculate direction from player to target
      const dx = worldPos.x - player.position.x;
      const dy = worldPos.y - player.position.y;
      
      if (dx === 0 && dy === 0) return; // Don't shoot at self
      
      const normalized = normalizeToEightDirections(dx, dy);
      const snapAngle = Math.atan2(normalized.y, normalized.x);
      
      setDirection(normalized);
      setMousePosition(worldPos);
      setTargetCell(worldPos);
      setAngle(snapAngle);
    };

    const handleMouseClick = () => {
      if (targetCell) {
        shoot();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseClick);
    };
  }, [player.position, shoot]);

  return { mousePosition, angle, targetCell, direction };
}