import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';

const Cell = ({ data }) => (
  <CardContainer className="cell-container">
    <CardBody className="mini-post" style={{ padding: 0 }}>
      <header style={{ padding: '2em 2em 0 2em' }}>
        <CardItem translateZ={80} as="h3" className="">
          {data.link ? (
            <a href={data.link} target="_blank" rel="noopener noreferrer">
              {data.title}
            </a>
          ) : (
            <span>{data.title}</span>
          )}
        </CardItem>
        <time className="published">{dayjs(data.date).format('MMMM, YYYY')}</time>
      </header>
      <CardItem translateZ={140} className="image" as={data.link ? 'a' : 'div'} {...(data.link ? { href: data.link, target: '_blank', rel: 'noopener noreferrer' } : {})}>
        <img src={`${process.env.PUBLIC_URL}${data.image}`} alt={data.title} />
      </CardItem>
      <div className="description">
        <CardItem translateZ={60} as="p">{data.desc}</CardItem>
      </div>
    </CardBody>
  </CardContainer>
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
