import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Markdown from 'markdown-to-jsx';

const Job = ({
  data: {
    name, position, url, startDate, endDate, summary, highlights, location,
  },
}) => (
  <article className="job-card">
    <header className="job-header">
      <div className="job-title-section">
        <h4 className="job-title">
          <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
        </h4>
        <span className="job-position">{position}</span>
      </div>
      <div className="job-meta">
        <span className="job-dates">
          {dayjs(startDate).format('MMM YYYY')} -{' '}
          {endDate ? dayjs(endDate).format('MMM YYYY') : 'Present'}
        </span>
        {location && <span className="job-location">{location}</span>}
      </div>
    </header>
    {summary && (
      <div className="job-summary">
        <Markdown
          options={{
            overrides: {
              p: {
                props: {
                  className: 'summary-text',
                },
              },
            },
          }}
        >
          {summary}
        </Markdown>
      </div>
    )}
    {highlights && highlights.length > 0 && (
      <ul className="job-highlights">
        {highlights.map((highlight) => (
          <li key={highlight} className="highlight-item">
            {highlight}
          </li>
        ))}
      </ul>
    )}
  </article>
);

Job.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string,
    summary: PropTypes.string,
    highlights: PropTypes.arrayOf(PropTypes.string.isRequired),
    location: PropTypes.string,
  }).isRequired,
};

export default Job;
