import React from 'react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Spinner({ className, size = 'md', ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)} {...props}>
      <div className={cn("relative animate-[spin_2s_linear_infinite]", sizeClasses[size])}>
         <Logo className={sizeClasses[size]} isSpinner />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
