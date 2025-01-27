import React from 'react';
import { CellVisibility } from '../types';
import { useTimeSystem } from '../../time/hooks/useTimeSystem';
import { PlayerAvatar } from '../../player/components/PlayerAvatar';
import { Direction } from '../../player/types';
import { Position } from '../types';

interface GridCellProps {
  isPlayer: boolean;
  canMove: boolean;
  visibility: CellVisibility;
  isOtherPlayer?: boolean;
  isAlly?: boolean;
  health?: number;
  direction?: Direction;
  position: Position;
  isHighlighted?: boolean;
}

export const GridCell = React.memo(function GridCell({ 
  isPlayer, 
  canMove, 
  visibility, 
  isOtherPlayer, 
  isAlly, 
  health,
  direction = 'south',
  position,
  isHighlighted
}: GridCellProps) {
  const { time } = useTimeSystem();
  
  const getVisibilityClass = (visibility: CellVisibility) => {
    const baseClasses = {
      'visible': '',
      'revealing': '',
      'explored': 'bg-black/70',
      'hidden': 'bg-black/100'
    };
    
    return baseClasses[visibility];
  };
  
  return (
    <div 
      className={`
        aspect-square relative 
        ${getVisibilityClass(visibility)}
        ${isHighlighted ? 'ring-2 ring-blue-500/50' : ''}
        transition-all duration-100
      `}
      data-position={`${position.x},${position.y}`}
    >
      {isPlayer && (
        <PlayerAvatar
          direction={direction}
          isOtherPlayer={isOtherPlayer}
          isAlly={isAlly}
          health={health}
          canMove={canMove}
        />
      )}
    </div>
  );
});