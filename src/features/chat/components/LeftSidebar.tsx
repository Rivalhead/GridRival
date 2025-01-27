import React from 'react';
import { MessageSquare } from 'lucide-react';

export function LeftSidebar() {
  return (
    <div>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-gray-400" />
          <h2 className="font-medium text-gray-200">Chat</h2>
        </div>
      </div>
      
      <div className="p-4 h-80 flex flex-col">
        <div className="flex-1 space-y-4">
          <div className="text-sm text-gray-400">
            <span className="text-blue-400">Player1:</span> Hello everyone!
          </div>
          <div className="text-sm text-gray-400">
            <span className="text-green-400">Player2:</span> Hey there!
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-700">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full bg-gray-700/50 text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}