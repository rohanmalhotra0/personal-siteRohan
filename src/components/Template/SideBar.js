import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src="/images/rohan24@vt.edu-22fe3a48.jpg" alt="Rohan Malhotra" />
      </Link>
      <header>
        <h2>Rohan Malhotra</h2>
        <p>
          <a href="mailto:rohan24@vt.edu">rohan24@vt.edu</a>
        </p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>
        Hi, I&apos;m Rohan Malhotra. I am a junior at Virginia Tech,
        majoring in Computer Science and minoring in Mathematics.
        I have a passion for developing innovative software solutions
        and exploring emerging technologies. In my free time, I enjoy
        working on coding projects, learning new programming languages,
        and contributing to open source.
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? (
            <Link to="/resume" className="button">
              Learn More
            </Link>
          ) : (
            <Link to="/about" className="button">
              About Me
            </Link>
          )}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">
        &copy; Rohan Malhotra <Link to="/">rohanmalhotra.com</Link>.
      </p>
    </section>
  </section>
);

export default SideBar;
