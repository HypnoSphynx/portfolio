'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Handle progress updates
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          return 100;
        }
        return prevProgress + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // Handle completion callback
  useEffect(() => {
    if (isComplete) {
      onLoadingComplete();
    }
  }, [isComplete, onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black">
      <div className="text-center space-y-8">
        {/* Main title */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-zinc-300 via-zinc-100 to-white bg-clip-text text-transparent animate-pulse">
            Zawadul Karim
          </h1>
          <div className="w-1 h-1 bg-zinc-400 rounded-full mx-auto animate-ping"></div>
        </div>

        {/* Progress bar container */}
        <div className="w-80 md:w-96 mx-auto space-y-4">
          {/* Progress bar */}
          <div className="relative">
            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-zinc-400 via-zinc-300 to-zinc-200 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
            
            {/* Progress percentage */}
            <div className="absolute -top-8 right-0 text-sm text-zinc-400 font-mono">
              {progress}%
            </div>
          </div>

          {/* Loading text */}
          <div className="text-zinc-400 text-lg font-medium">
            {progress < 30 && "Initializing..."}
            {progress >= 30 && progress < 60 && "Loading..."}
            {progress >= 60 && progress < 90 && "Almost ready..."}
            {progress >= 90 && "Welcome!"}
          </div>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-zinc-200 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
} 