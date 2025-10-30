import React from 'react';
import PropTypes from 'prop-types';
import { CardContainer, CardBody, CardItem } from './3d-card';

const Hero3D = ({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  maxWidth,
  compact,
}) => (
  <div style={{ width: '100%', margin: '0 auto 1.5em auto' }}>
    <CardContainer
      perspective={700}
      maxRotate={10}
      hoverScale={1.02}
      offsetTop={8}
      className="hero3d"
    >
      <CardBody
        style={{
          borderRadius: 20,
          padding: 16,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(4px)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
          maxWidth,
          margin: '0 auto',
        }}
      >
        {title ? (
          <CardItem
            translateZ={50}
            as="h2"
            style={{
              margin: 0,
              textAlign: 'center',
              fontSize: compact ? '1.2em' : '1.8em',
              letterSpacing: compact ? '0.1em' : '0.15em',
            }}
          >
            {title}
          </CardItem>
        ) : null}

        {subtitle ? (
          <CardItem
            translateZ={40}
            as="p"
            style={{
              textAlign: 'center',
              opacity: 0.9,
              margin: compact ? '0.15em 0 0.5em 0' : '0.25em 0 0.75em 0',
              fontSize: compact ? '0.9em' : undefined,
            }}
          >
            {subtitle}
          </CardItem>
        ) : null}

        <CardItem translateZ={compact ? 80 : 120}>
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              borderRadius: 16,
            }}
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  </div>
);

Hero3D.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  compact: PropTypes.bool,
};

Hero3D.defaultProps = {
  imageAlt: '',
  title: null,
  subtitle: null,
  maxWidth: 720,
  compact: false,
};

export default Hero3D;
