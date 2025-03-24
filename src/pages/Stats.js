import React from 'react';
import { Link } from 'react-router-dom';
import Main from '../layouts/Main';

const Stats = () => (
  <Main
    title="Research / Publications"
    description="Explore my undergraduate research and published work in machine learning, finance, and space systems."
  >
    <article className="post" id="research">
      <header>
        <div className="title">
          <h2>
            <Link to="/stats">Research & Publications</Link>
          </h2>
          <p>
            A showcase of my technical research experience and scholarly
            contributions
          </p>
        </div>
      </header>

      <h3>🛰️ Undergraduate Research Assistant — Hume Center</h3>
      <ul>
        <li>
          Researched imaging and signal processing for CubeSats used in space
          and ocean monitoring.
        </li>
        <li>
          Worked on autonomous communication and imaging systems for the NASA
          CubeSat Launch Initiative proposal.
        </li>
      </ul>

      <h3>📄 Publications</h3>
      <ul>
        <li>
          <strong>
            <a
              href="https://vtechworks.lib.vt.edu/items/046554a1-c4b0-46b0-b674-f4d62a490c27"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reddit Data in Quantitative Financial Models
            </a>
          </strong>{' '}
          — Feb 2025
          <br />
          Explores Reddit-driven sentiment post-GME/AMC and its implications on
          market volatility.
        </li>
        <li>
          <strong>
            <a
              href="https://vtechworks.lib.vt.edu/items/d2396f35-c165-4156-80b4-95bb2af8ecd8"
              target="_blank"
              rel="noopener noreferrer"
            >
              An Economic Approach to Optimize Capital Allocation
            </a>
          </strong>{' '}
          — Nov 2024
          <br />
          Applies the Kelly Criterion for maximizing capital growth through
          log-utility.
        </li>
      </ul>
    </article>
  </Main>
);

export default Stats;
