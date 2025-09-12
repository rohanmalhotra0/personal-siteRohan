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
            My research and publications
          </p>
        </div>
      </header>

      <div className="research-content">
        <div className="publications-section">
          <div className="section-header">
            <div className="section-icon">
              <i className="fas fa-file-alt" />
            </div>
            <h3>Published Research</h3>
          </div>

          <div className="publications-grid">
            <div className="publication-card">
              <div className="publication-image">
                <img
                  src={`${process.env.PUBLIC_URL}/images/reddit.png`}
                  alt="Reddit Data in Quantitative Financial Models - Paper Preview"
                />
                <div className="publication-overlay">
                  <a
                    href={`${process.env.PUBLIC_URL}/images/research/reddit-paper.pdf`}
                    download="Reddit Data in Quantitative Financial Models.pdf"
                    className="view-paper-btn"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
              <div className="publication-content">
                <div className="publication-meta">
                  <span className="publication-date">February 2025</span>
                  <span className="publication-status published">Published</span>
                </div>
                <h4 className="publication-title">
                  <a
                    href={`${process.env.PUBLIC_URL}/images/research/reddit-paper.pdf`}
                    download="Reddit Data in Quantitative Financial Models.pdf"
                  >
                    Reddit Data in Quantitative Financial Models
                  </a>
                </h4>
                <p className="publication-abstract">
                  Explores Reddit-driven sentiment post-GME/AMC and its implications on market
                  volatility. Analyzes the relationship between online sentiment spikes and
                  financial
                  market movements for predictive modeling applications.
                </p>
                <div className="publication-tags">
                  <span className="tag">Machine Learning</span>
                  <span className="tag">Financial Modeling</span>
                  <span className="tag">Sentiment Analysis</span>
                  <span className="tag">Reddit API</span>
                </div>
              </div>
            </div>

            <div className="publication-card">
              <div className="publication-image">
                <img
                  src={`${process.env.PUBLIC_URL}/images/economic.png`}
                  alt="An Economic Approach to Optimize Capital Allocation - Paper Preview"
                />
                <div className="publication-overlay">
                  <a
                    href={`${process.env.PUBLIC_URL}/images/research/capital-allocation-paper.pdf`}
                    download="An Economic Approach to Optimize Capital Allocation.pdf"
                    className="view-paper-btn"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
              <div className="publication-content">
                <div className="publication-meta">
                  <span className="publication-date">November 2024</span>
                  <span className="publication-status published">Published</span>
                </div>
                <h4 className="publication-title">
                  <a
                    href={`${process.env.PUBLIC_URL}/images/research/capital-allocation-paper.pdf`}
                    download="An Economic Approach to Optimize Capital Allocation.pdf"
                  >
                    An Economic Approach to Optimize Capital Allocation
                  </a>
                </h4>
                <p className="publication-abstract">
                  Applies the Kelly Criterion for maximizing capital growth through log-utility
                  optimization. Proposes an economic framework for risk-adjusted return strategies
                  and
                  investment sizing models.
                </p>
                <div className="publication-tags">
                  <span className="tag">Economics</span>
                  <span className="tag">Kelly Criterion</span>
                  <span className="tag">Capital Allocation</span>
                  <span className="tag">Risk Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="research-section">
          <div className="section-header">
            <div className="section-icon">
              <i className="fas fa-satellite" />
            </div>
            <h3>Undergraduate Research Assistant — Hume Center</h3>
          </div>
          <div className="research-content-with-image">
            <div className="research-image">
              <img
                src={`${process.env.PUBLIC_URL}/images/cubesats.jpeg`}
                alt="CubeSat Research at Hume Center"
              />
            </div>
            <div className="research-details">
              <div className="research-item">
                <div className="research-bullet">•</div>
                <p>
                  Conducted literature reviews on CubeSat missions, focusing on autonomous imaging
                  and Earth observation.
                </p>
              </div>
              <div className="research-item">
                <div className="research-bullet">•</div>
                <p>
                  Collaborated with engineers to design software systems for CubeSat imaging
                  and communication.
                </p>
              </div>
              <div className="research-item">
                <div className="research-bullet">•</div>
                <p>
                  Assisted in coding modules for satellite data transmission protocols in Python.
                </p>
              </div>
              <div className="research-item">
                <div className="research-bullet">•</div>
                <p>
                  Contributed to a NASA CubeSat Launch Initiative proposal, emphasizing integration
                  of autonomous imaging & comms systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </Main>
);

export default Stats;
