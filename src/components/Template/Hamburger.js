import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../../data/routes';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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

      <nav className={`hamburger-nav ${isOpen ? 'active' : ''}`}>
        <div className="hamburger-nav-content">
          <div style={{
            padding: '20px',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
          >
            Navigation
          </div>
          <ul className="hamburger-nav-list">
            {routes.map((route) => (
              <li key={route.label} className="hamburger-nav-item">
                <button
                  type="button"
                  className={`hamburger-nav-link ${route.index ? 'home-link' : ''}`}
                  onClick={() => handleNavigation(route.path)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '15px 20px',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  {route.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Hamburger;
