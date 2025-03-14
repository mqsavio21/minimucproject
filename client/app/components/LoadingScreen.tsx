'use client';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Add another timeout for the fade-out effect
      setTimeout(() => {
        setIsHidden(true);
      }, 1000); // Wait for fade out animation to complete
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isHidden) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-1000 ease-in-out ${
        !isLoading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 animate-gradient">
        <div className="flex items-center justify-center h-screen">
          {/* Loading Animation */}
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-white animate-spin"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin-slow"></div>
          </div>
          {/* Loading Text */}
          <div className="absolute mt-32">
            <h2 className="text-white text-xl font-semibold">Loading...</h2>
          </div>
        </div>
      </div>
    </div>
  );
} 