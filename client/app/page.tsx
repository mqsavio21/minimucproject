'use client';
import { useState, useRef, useEffect } from 'react';
import EmployeeList from './components/EmployeeList';
import LoadingScreen from './components/LoadingScreen';

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show content after loading screen is done
    setTimeout(() => {
      setIsContentVisible(true);
    }, 2500); // Slightly longer than loading screen to ensure smooth transition
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <LoadingScreen />
      <div className={`transition-opacity duration-1000 ease-in-out ${
        isContentVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="min-h-screen bg-gray-100 flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-900 text-white">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Dashboard</h2>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="flex items-center p-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors duration-200">
                      <span className="ml-3">Employees</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors duration-200">
                      <span className="ml-3">Tasks</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center p-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors duration-200">
                      <span className="ml-3">Reports</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
      {/* Header */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Task Management System</h1>
                  </div>
                  
                  {/* User Profile Dropdown */}
                  <div className="flex items-center" ref={dropdownRef}>
                    <div className="relative">
                      <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
                      >
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <svg 
                            className="w-5 h-5 text-gray-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700">Admin</span>
                      </button>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                          <a
                            href="#"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile
                          </a>
                          <a
                            href="/dashboard"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Dashboard
                          </a>
                          <hr className="my-1 border-gray-200" />
                          <button
                            onClick={() => {
                              // Add logout logic here
                              console.log('Logging out...');
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <EmployeeList />
        </div>
      </div>
    </div>
        </div>
      </div>
    </>
  );
}
