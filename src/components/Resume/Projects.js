import React from 'react';
import PropTypes from 'prop-types';

const Project = ({ data }) => (
  <div className="project-item">
    <div className="project-header">
      <h4 className="project-name">
        {data.url ? (
          <a href={data.url} target="_blank" rel="noopener noreferrer">
            {data.name}
          </a>
        ) : (
          data.name
        )}
      </h4>
      <span className="project-year">{data.year}</span>
    </div>
    <p className="project-description">{data.description}</p>
    <div className="project-technologies">
      {data.technologies.map((tech) => (
        <span key={tech} className="tech-tag">
          {tech}
        </span>
      ))}
    </div>
    <ul className="project-highlights">
      {data.highlights.map((highlight) => (
        <li key={highlight} className="project-highlight">
          {highlight}
        </li>
      ))}
    </ul>
  </div>
);

Project.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string,
    year: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const Projects = ({ data }) => (
  <div className="projects">
    <div className="link-to" id="projects" />
    <div className="title">
      <h3>Projects & Publications</h3>
    </div>
    {data.map((project) => (
      <Project data={project} key={project.name} />
    ))}
  </div>
);

Projects.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      url: PropTypes.string,
      year: PropTypes.string.isRequired,
      technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
      highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
};

export default Projects;
