import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';

const About = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    import('../data/about.md').then((res) => {
      fetch(res.default)
        .then((r) => r.text())
        .then(setMarkdown);
    });
  });

  return (
    <Main title="About" description="About Me">
      <article className="post markdown" id="about">
        <header className="post-header">
          <div className="title">
            <h2>
              <i className="fas fa-user" />
              About Me
            </h2>
          </div>
        </header>

        <div className="about-content">
          <div className="about-intro">
            <div className="intro-card">
              <div className="intro-icon">
                <i className="fas fa-graduation-cap" />
              </div>
              <div className="intro-text">
                <h3>Student at NYU Courant </h3>
                <p>
                  Computer Science and Economics student at NYU, passionate about
                  leveraging data science, machine learning, and analytics to drive
                  impactful solutions.
                </p>
              </div>
            </div>
          </div>

          <div className="about-sections">
            <Markdown>{markdown}</Markdown>
          </div>

        </div>
      </article>
    </Main>
  );
};

export default About;
