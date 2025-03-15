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
    <div className="min-vh-100 d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white" style={{ width: '250px' }}>
        <div className="p-4">
          <h2 className="h4 mb-4">Dashboard</h2>
          <nav>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a href="/" className="nav-link text-white d-flex align-items-center">
                  <i className="bi bi-people me-2"></i>
                  <span>Employees</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/tasks" className="nav-link text-white d-flex align-items-center">
                  <i className="bi bi-list-check me-2"></i>
                  <span>Tasks</span>
                </a>
              </li>
              <li className="nav-item">
                <a href="/reports" className="nav-link text-white d-flex align-items-center">
                  <i className="bi bi-graph-up me-2"></i>
                  <span>Reports</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        <nav className="navbar navbar-light bg-white shadow">
          <div className="container-fluid">
            <h1 className="navbar-brand mb-0 h1">Task Management System</h1>
            <div className="dropdown">
              <button className="btn btn-light dropdown-toggle d-flex align-items-center" 
                      type="button" 
                      data-bs-toggle="dropdown">
                <i className="bi bi-person-circle me-2"></i>
                Admin
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><a className="dropdown-item" href="#">Dashboard</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item text-danger" href="#">Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container-fluid py-4">
          <div className="card">
            <div className="card-body">
              <EmployeeList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
