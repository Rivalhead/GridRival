import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTimeSystem } from '../hooks/useTimeSystem';

export function TimeDisplay() {
  const { time } = useTimeSystem();
  
  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute} ${period}`;
  };
  
  return (
    <div className="flex items-center gap-2">
      {time.isDaylight ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-blue-400" />
      )}
      <span className="text-gray-200 text-sm">
        {formatTime(time.hour, time.minute)}
      </span>
    </div>
  );
}