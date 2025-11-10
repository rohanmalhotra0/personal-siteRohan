import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';

const YT_ID = 'J7e7Fx0Nu2A';
const THUMB_HQ = `https://img.youtube.com/vi/${YT_ID}/hqdefault.jpg`;
const THUMB_SD = `https://img.youtube.com/vi/${YT_ID}/sddefault.jpg`;
const THUMB_MAX = `https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`;

const RefraxCard = ({ className }) => {
  const [playing, setPlaying] = useState(false);

  const iframeSrc = useMemo(() => (
    `https://www.youtube.com/embed/${YT_ID}?rel=0&modestbranding=1&autoplay=${playing ? 1 : 0}&mute=${playing ? 1 : 0}&controls=1`
  ), [playing]);

  const onPlay = () => setPlaying(true);

  return (
    <CardContainer className={`refrax-card ${className || ''}`} enabled={!playing} perspective={700} maxRotate={12} hoverScale={1.02}>
      <CardBody className="refrax-body">
        <CardItem translateZ={70} as="h3" className="refrax-title">
          Refrax Demo
        </CardItem>

        {!playing ? (
          <CardItem translateZ={0} className="refrax-thumb">
            <button type="button" className="refrax-thumb-btn" onClick={onPlay} aria-label="Play Refrax demo">
              <img
                src={THUMB_MAX}
                srcSet={`${THUMB_MAX} 1280w, ${THUMB_SD} 640w, ${THUMB_HQ} 480w`}
                sizes="(max-width: 600px) 100vw, 720px"
                alt="Refrax Demo thumbnail"
                loading="lazy"
                decoding="async"
              />
              <span className="refrax-play">
                <i className="fas fa-play" />
              </span>
            </button>
          </CardItem>
        ) : (
          <div className="refrax-video">
            <iframe
              src={iframeSrc}
              title="Refrax Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </CardBody>
    </CardContainer>
  );
};

RefraxCard.propTypes = {
  className: PropTypes.string,
};

RefraxCard.defaultProps = {
  className: '',
};

export default RefraxCard;
