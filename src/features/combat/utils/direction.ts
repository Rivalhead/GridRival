export function normalizeToEightDirections(x: number, y: number) {
  if (x === 0 && y === 0) return { x: 0, y: 0 };
  
  // Convert to angle in radians
  const angle = Math.atan2(y, x);
  
  // Convert to degrees and normalize to 0-360
  let degrees = (angle * 180 / Math.PI);
  if (degrees < 0) degrees += 360;
  
  // Round to nearest 45 degrees
  degrees = Math.round(degrees / 45) * 45;
  
  // Convert back to radians
  const normalizedAngle = degrees * Math.PI / 180;
  
  // Return normalized vector
  return {
    x: Math.cos(normalizedAngle),
    y: Math.sin(normalizedAngle)
  };
}