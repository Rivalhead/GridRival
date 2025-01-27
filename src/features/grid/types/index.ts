export type CellVisibility = 'hidden' | 'explored' | 'visible' | 'revealing';

export type Position = {
  x: number;
  y: number;
};

export type GridConfig = {
  totalSize: number;
  viewportSize: number;
  visionSize: number;
  movementDelay: number;
  revealDelay: number;
};