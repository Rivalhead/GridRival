import React from 'react';
import { Crosshair, MousePointer } from 'lucide-react';
import { useMouseAim } from '../hooks/useMouseAim';
import { Card, CardHeader, CardContent } from '../../ui/components/Card';

export function WeaponHUD() {
  const { mousePosition, angle } = useMouseAim();

  return (
    <Card className="fixed bottom-20 right-4 min-w-[200px] z-[100]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Crosshair className="w-5 h-5 text-gray-400" />
          <h2 className="font-medium text-gray-200">Combat</h2>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MousePointer className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-200">Position:</span>
            <span className="text-xs text-gray-400 ml-auto">
              ({mousePosition.x}, {mousePosition.y})
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-200">Angle:</span>
            <span className="text-xs text-gray-400 ml-auto">
              {Math.round(((angle * 180 / Math.PI) + 360) % 360)}°
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}