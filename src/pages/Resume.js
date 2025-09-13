import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../layouts/Main';
import Education from '../components/Resume/Education';
import Experience from '../components/Resume/Experience';
import Skills from '../components/Resume/Skills';
import Projects from '../components/Resume/Projects';
import degrees from '../data/resume/degrees';
import work from '../data/resume/work';
import skills from '../data/resume/skills';
import projects from '../data/resume/projects';

const sections = {
  Education: () => <Education data={degrees} />,
  Experience: () => <Experience data={work} />,
  Skills: () => <Skills data={skills} />,
  Projects: () => <Projects data={projects} />,
};

const Resume = () => {
  const [activeTab, setActiveTab] = useState('Experience');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabClick = (tabName) => {
    if (tabName === activeTab) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tabName);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <Main
      title="Resume"
      description="Rohan Malhotra's Resume, view my education, experience, skills, and more."
    >
      <article className="post" id="resume">
        <header>
          <div className="title">
            <h2>
              <Link to="resume">Resume</Link>
            </h2>
            <div className="tab-navigation">
              {Object.keys(sections).map((sec) => (
                <button
                  key={sec}
                  type="button"
                  className={`tab-button ${activeTab === sec ? 'active' : ''}`}
                  onClick={() => handleTabClick(sec)}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>
        </header>
        <div className="tab-content">
          {isTransitioning && (
            <div className="tab-loading">
              <div className="loading-spinner" />
            </div>
          )}
          {Object.entries(sections).map(([name, Section]) => (
            <div
              key={name}
              className={`tab-panel ${activeTab === name ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}
            >
              <Section />
            </div>
          ))}
        </div>
      </article>
    </Main>
  );
};

export default Resume;
