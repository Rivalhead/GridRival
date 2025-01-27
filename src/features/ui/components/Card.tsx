import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = React.memo(function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700 ${className}`}>
      {children}
    </div>
  );
});

export const CardHeader = React.memo(function CardHeader({ children, className = '' }: CardProps) {
  return (
    <div className={`p-4 border-b border-gray-700 ${className}`}>
      {children}
    </div>
  );
});

export const CardContent = React.memo(function CardContent({ children, className = '' }: CardProps) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
});