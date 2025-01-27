import React from 'react';
import { Pickaxe, Settings } from 'lucide-react';
import { HealthBar, HungerBar, ThirstBar } from '../../player/components';
import { TimeDisplay } from '../../time/components';

export function TopBar({ className = '' }: { className?: string }) {
  return (
    <header className={`h-14 bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 px-4 flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-2">
        <Pickaxe className="w-6 h-6 text-gray-400" />
        <h1 className="text-xl font-bold text-gray-100">GridRivals</h1>
      </div>
      
      <div className="flex items-center gap-6">
        <HealthBar />
        <HungerBar />
        <ThirstBar />
        <TimeDisplay />
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-sm" />
            <span className="text-gray-200">250</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-sm" />
            <span className="text-gray-200">180</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-sm" />
            <span className="text-gray-200">320</span>
          </div>
        </div>
        
        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </header>
  );
}