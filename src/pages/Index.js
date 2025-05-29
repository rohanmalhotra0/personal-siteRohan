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
          <p>
            Sophmore studying at NYU, Double majoring in Computer Science and Economics.
          </p>
        </div>
      </header>
      <p>
        Welcome to my website. Please feel free to read more{' '}
        <Link to="/about">about me</Link>, check out my{' '}
        <Link to="/resume">resume</Link>, and explore my{' '}
        <Link to="/projects">projects</Link>.
      </p>
      <p>
        I also have a <Link to="/stats">research page</Link> where I share
        some of my work and publications.
      </p>
    </article>
  </Main>
);

export default Index;
