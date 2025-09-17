import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main description="Rohan Malhotra's personal website.">
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2>
            <Link to="/">Rohan Malhotra</Link>
          </h2>
          <div className="subtitle">
            <p className="main-subtitle">
              Sophomore at NYU Courant Institute
            </p>
            <p className="secondary-subtitle">
              Double Majoring in Computer Science & Economics <br />
              Minor in Mathematics
            </p>
          </div>
        </div>
      </header>

      {/* Video Section */}
      <div className="video-section">
        <h3 className="video-title">Refrax Demo</h3>
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/watch?v=J7e7Fx0Nu2A"
            title="Refrax Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="welcome-section">
        <div className="quick-links">
          <h3>Explore My Work</h3>
          <div className="link-grid">
            <Link to="/about" className="quick-link">
              <div className="link-icon">
                <i className="fas fa-user" />
              </div>
              <div className="link-content">
                <h4>About Me</h4>
                <p>Learn more about my journey and interests</p>
              </div>
            </Link>
            <Link to="/resume" className="quick-link">
              <div className="link-icon">
                <i className="fas fa-file-alt" />
              </div>
              <div className="link-content">
                <h4>Resume</h4>
                <p>View my experience and achievements</p>
              </div>
            </Link>
            <Link to="/projects" className="quick-link">
              <div className="link-icon">
                <i className="fas fa-rocket" />
              </div>
              <div className="link-content">
                <h4>Projects</h4>
                <p>Explore my latest work and innovations</p>
              </div>
            </Link>
            <Link to="/stats" className="quick-link">
              <div className="link-icon">
                <i className="fas fa-chart-line" />
              </div>
              <div className="link-content">
                <h4>Research</h4>
                <p>Discover my publications and research</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </article>
  </Main>
);

export default Index;
