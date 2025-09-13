import React from 'react';
import PropTypes from 'prop-types';

const Skills = ({ data }) => (
  <div className="skills">
    <div className="link-to" id="skills" />
    <div className="title">
      <h3>Technical Skills & Certifications</h3>
    </div>
    <div className="skills-grid">
      {data.map((category) => (
        <div key={category.category} className="skill-category">
          <h4 className="category-title">{category.category}</h4>
          <div className="skill-items">
            {category.items.map((item) => (
              <div key={item.name} className="skill-item">
                <span className="skill-name">{item.name}</span>
                {item.level && (
                  <span className={`skill-level skill-level-${item.level.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item.level}
                  </span>
                )}
                {item.status && (
                  <span className={`skill-status skill-status-${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

Skills.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          level: PropTypes.string,
          status: PropTypes.string,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

export default Skills;
