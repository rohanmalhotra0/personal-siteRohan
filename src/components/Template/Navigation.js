import React from 'react';
import { Link } from 'react-router-dom';

import Hamburger from './Hamburger';
import routes from '../../data/routes';

// Websites Navbar, displays routes defined in 'src/data/routes'
const Navigation = () => (
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
                  <span className="nav-text">{l.label}</span>
                  <span className="nav-indicator" />
                </Link>
              </li>
            ))}
        </ul>
      </nav>
      <Hamburger />
    </div>
  </header>
);

export default Navigation;
