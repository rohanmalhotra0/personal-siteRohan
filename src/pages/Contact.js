import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import EmailLink from '../components/Contact/EmailLink';
import ContactIcons from '../components/Contact/ContactIcons';

const Contact = () => (
  <Main
    title="Contact"
    description="Get in touch with Rohan Malhotra - Let's connect and discuss opportunities!"
  >
    <article className="post" id="contact">
      <header>
        <div className="title">
          <h2>
            <Link to="/contact">Get In Touch</Link>
          </h2>
          <p>
            I&apos;m always excited to connect with fellow developers, researchers
          </p>
        </div>
      </header>

      <div className="contact-content">
        <div className="contact-methods">
          <div className="contact-method">
            <div className="method-icon">
              <i className="fas fa-envelope" />
            </div>
            <div className="method-content">
              <h3>Email Me</h3>
              <p>For professional inquiries, collaborations, or just to say hello</p>
              <div className="email-container">
                <EmailLink />
              </div>
            </div>
          </div>

          <div className="contact-method">
            <div className="method-icon">
              <i className="fab fa-linkedin" />
            </div>
            <div className="method-content">
              <h3>LinkedIn</h3>
              <p>Connect with me professionally and view my experience</p>
              <a
                href="https://www.linkedin.com/in/rohanamal"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                linkedin.com/in/rohanamal
              </a>
            </div>
          </div>

          <div className="contact-method">
            <div className="method-icon">
              <i className="fab fa-instagram" />
            </div>
            <div className="method-content">
              <h3>Instagram</h3>
              <p>Follow my journey and see what I&apos;m working on</p>
              <a
                href="https://www.instagram.com/rohanmalhotra0/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                @rohanmalhotra0
              </a>
            </div>
          </div>

          <div className="contact-method">
            <div className="method-icon">
              <i className="fas fa-map-marker-alt" />
            </div>
            <div className="method-content">
              <h3>Location</h3>
              <p>Based in New York, NY and Chatham, NJ</p>
              <span className="location-text">New York, NY — Chatham, NJ</span>
            </div>
          </div>
        </div>

        <div className="social-section">
          <h3>Connect With Me</h3>
          <p>Follow my journey and stay updated with my latest work</p>
          <ContactIcons />
        </div>
      </div>
    </article>
  </Main>
);

export default Contact;
