'use client';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setIsHidden(true);
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isHidden) return null;

  return (
    <div 
      className={`position-fixed top-0 start-0 w-100 h-100 ${
        !isLoading ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        zIndex: 9999,
        transition: 'opacity 1s ease-in-out',
      }}
    >
      <div className="animated-bg">
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
          <div className="text-center">
            {/* Main Spinner */}
            <div className="position-relative d-inline-block">
              {/* Outer spinner */}
              <div 
                className="spinner-border text-light"
                style={{ 
                  width: '5rem', 
                  height: '5rem',
                  opacity: 0.3
                }}
                role="status"
              />
              {/* Inner spinner */}
              <div 
                className="position-absolute top-50 start-50 translate-middle spinner-border text-light"
                style={{ 
                  width: '3rem', 
                  height: '3rem'
                }}
                role="status"
              />
            </div>
            
            {/* Loading Text */}
            <div className="mt-4">
              <h2 className="text-white fs-4 fw-light mb-0">Loading</h2>
              <div className="text-white-50 mt-2">
                <div className="d-flex justify-content-center gap-1">
                  <span className="loading-dot">.</span>
                  <span className="loading-dot">.</span>
                  <span className="loading-dot">.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add this style block for animations */}
      <style jsx>{`
        .animated-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            225deg,
            #0a1832,
            #0d1f40,
            #102950,
            #0d1f40,
            #0a1832
          );
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .loading-dot {
          animation: loadingDots 1.5s infinite;
          font-size: 2rem;
          line-height: 1;
          color: rgba(255, 255, 255, 0.8);
        }
        .loading-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .loading-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes loadingDots {
          0%, 100% {
            opacity: 0.2;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
} 