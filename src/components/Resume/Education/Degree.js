import React from 'react';
import PropTypes from 'prop-types';

const Degree = ({ data }) => (
  <article className="degree-card">
    <div className="degree-content">
      <div className="degree-info">
        <h4 className="degree-title">{data.degree}</h4>
        <p className="school-info">
          <a href={data.link} target="_blank" rel="noopener noreferrer" className="school-link">
            {data.school}
          </a>
        </p>
      </div>
      <div className="degree-year">
        <span className="year-badge">{data.year}</span>
      </div>
    </div>
  </article>
);

Degree.propTypes = {
  data: PropTypes.shape({
    degree: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
};

export default Degree;
