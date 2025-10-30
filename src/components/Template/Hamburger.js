import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../data/routes';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const getIconForRoute = (route) => {
    const iconMap = {
      Home: 'fa-building',
      About: 'fa-user',
      Projects: 'fa-rocket',
      Resume: 'fa-file-alt',
      Research: 'fa-microscope',
      Contact: 'fa-envelope',
      Stats: 'fa-chart-bar',
      RohanGPT: 'fa-robot',
    };
    return iconMap[route.label] || 'fa-circle';
  };

  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.classList.toggle('theme-dark', saved === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('theme-dark', next === 'dark');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.hamburger-container')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <div className="hamburger-container">
      <button
        type="button"
        className={`hamburger-toggle ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span className="hamburger-line" />
        <span className="hamburger-line" />
        <span className="hamburger-line" />
      </button>

      <div className={`hamburger-overlay ${isOpen ? 'active' : ''}`} onClick={toggleMenu} />

      <nav
        className={`hamburger-nav ${isOpen ? 'active' : ''}`}
        style={{
          maxWidth: '420px',
          width: '85vw',
        }}
      >
        <div
          className="hamburger-nav-content"
          style={{
            padding: '8px 8px 12px 8px',
          }}
        >
          <ul className="hamburger-nav-list">
            {routes.map((route) => (
              <li
                key={route.label}
                className="hamburger-nav-item"
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                  margin: 0,
                }}
              >
                <button
                  type="button"
                  className={`hamburger-nav-link ${route.index ? 'home-link' : ''}`}
                  onClick={() => handleNavigation(route.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '16px 20px',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: route.index ? 400 : 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    gap: '16px',
                  }}
                >
                  <i
                    className={`fas ${getIconForRoute(route)}`}
                    style={{
                      fontSize: '18px',
                      width: '24px',
                      textAlign: 'center',
                    }}
                  />
                  {route.index ? 'Home' : route.label}
                </button>
              </li>
            ))}
            {/* Theme toggle switch for mobile/iOS */}
            <li className="hamburger-nav-item" style={{ borderBottom: 'none' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 20px',
                }}
              >
                <span
                  style={{
                    color: 'white',
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  Theme
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={theme === 'dark'}
                  aria-label={`Theme: ${theme}. Toggle light/dark mode`}
                  onClick={toggleTheme}
                  className={`hamburger-theme-toggle ${theme === 'dark' ? 'is-dark' : 'is-light'}`}
                  style={{
                    position: 'relative',
                    width: 48,
                    height: 26,
                    borderRadius: 9999,
                    border: '1px solid rgba(255,255,255,0.18)',
                    background: 'rgba(255,255,255,0.12)',
                    padding: 0,
                    outline: 'none',
                    boxShadow: 'none',
                  }}
                  title={theme === 'dark' ? 'Dark mode (tap for Light)' : 'Light mode (tap for Dark)'}
                >
                  <span
                    className="hamburger-switch-thumb"
                    style={{
                      position: 'absolute',
                      top: 2,
                      left: 2,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: '#ffffff',
                      transform: theme === 'dark' ? 'translateX(20px)' : 'translateX(0)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Hamburger;
