import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const Cell = ({ data }) => (
  <div className="cell-container">
    <div className="mini-post" style={{ padding: 0 }}>
      <header style={{ padding: '2em 2em 0 2em' }}>
        <h3>
          {data.link ? (
            <a href={data.link} target="_blank" rel="noopener noreferrer">
              {data.title}
            </a>
          ) : (
            <span>{data.title}</span>
          )}
        </h3>
        <time className="published">{dayjs(data.date).format('MMMM, YYYY')}</time>
      </header>
      {data.link ? (
        <a className="image" href={data.link} target="_blank" rel="noopener noreferrer">
          <img src={`${process.env.PUBLIC_URL}${data.image}`} alt={data.title} loading="lazy" decoding="async" />
        </a>
      ) : (
        <div className="image">
          <img src={`${process.env.PUBLIC_URL}${data.image}`} alt={data.title} loading="lazy" decoding="async" />
        </div>
      )}
      <div className="description">
        <p>{data.desc}</p>
      </div>
    </div>
  </div>
);

Cell.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    image: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cell;
