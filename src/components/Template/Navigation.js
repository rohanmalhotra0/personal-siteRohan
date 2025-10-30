import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Hamburger from './Hamburger';
import routes from '../../data/routes';

// Websites Navbar, displays routes defined in 'src/data/routes'
const Navigation = () => {
  const getIconForRoute = (route) => {
    const iconMap = {
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

  const [theme, setTheme] = useState('light');

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

  return (
    <header id="header">
      <div className="nav-container">
        <h1 className="index-link">
          {routes
            .filter((l) => l.index)
            .map((l) => (
              <Link key={l.label} to={l.path} className="logo-link">
                <span className="logo-text">{l.label}</span>
                <span className="logo-subtitle">Personal Website</span>
              </Link>
            ))}
        </h1>
        <nav className="links">
          <ul>
            {routes
              .filter((l) => !l.index)
              .map((l) => (
                <li key={l.label} className="nav-item">
                  <Link to={l.path} className="nav-link">
                    <i className={`fas ${getIconForRoute(l)} nav-icon`} />
                    <span className="nav-text">{l.label}</span>
                    <span className="nav-indicator" />
                  </Link>
                </li>
              ))}
            <li className="nav-item">
              <button
                type="button"
                className={`theme-toggle-switch ${theme === 'dark' ? 'is-dark' : 'is-light'}`}
                onClick={toggleTheme}
                role="switch"
                aria-checked={theme === 'dark'}
                aria-label={`Theme: ${theme}. Toggle light/dark mode`}
                title={theme === 'dark' ? 'Dark mode (click for Light)' : 'Light mode (click for Dark)'}
              >
                <span className="switch-thumb" />
              </button>
              <span className="nav-text theme-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </li>
          </ul>
        </nav>
        <Hamburger />
      </div>
    </header>
  );
};

export default Navigation;
