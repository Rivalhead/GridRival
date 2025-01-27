import React from 'react';

interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

export function Kbd({ children, className = '' }: KbdProps) {
  return (
    <kbd className={`px-2 py-1 bg-gray-700 rounded ${className}`}>
      {children}
    </kbd>
  );
}