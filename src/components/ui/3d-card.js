import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

const CardContext = createContext({ depthEnabled: true });

export const CardContainer = ({
  children,
  className,
  perspective = 600,
  maxRotate = 18,
  hoverScale = 1.03,
  hoverShadow = '0 20px 60px rgba(0,0,0,0.35)',
  offsetTop = 12,
  enabled = true,
}) => {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e) => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rotX = (0.5 - py) * maxRotate; // tilt up/down
    const rotY = (px - 0.5) * maxRotate; // tilt left/right
    setRotate({ x: rotX, y: rotY });
  };

  const handleEnter = () => setHovered(enabled);
  const handleLeave = () => {
    setHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const contextValue = useMemo(
    () => ({
      depthEnabled: true,
      rotate,
      hovered,
      hoverScale,
      hoverShadow,
      perspective,
      enabled,
    }),
    [rotate, hovered, hoverScale, hoverShadow, perspective, enabled],
  );

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: '50% 50%',
        marginTop: `${offsetTop}px`,
      }}
    >
      <CardContext.Provider value={contextValue}>
        {children}
      </CardContext.Provider>
    </div>
  );
};

export const CardBody = ({ children, className, style }) => {
  const {
    rotate,
    hovered,
    hoverScale,
    hoverShadow,
    enabled,
  } = useContext(CardContext);
  return (
    <div
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        transform: enabled
          ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${hovered ? hoverScale : 1})`
          : 'none',
        transition: 'transform 150ms ease',
        transformOrigin: '50% 50%',
        boxShadow: enabled && hovered ? hoverShadow : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  children,
  className,
  as: Tag = 'div',
  translateZ = 0,
  style,
  ...rest
}) => {
  const { perspective: ctxPerspective, enabled } = useContext(CardContext);
  const toNumber = (val) => (typeof val === 'number' ? val : parseFloat(String(val).replace('px', '')) || 0);
  const z = toNumber(translateZ);
  const p = toNumber(ctxPerspective) || 600;
  // Counter-scale so items don't visually grow when moved toward the viewer
  const scaleComp = enabled ? Math.max(0.85, 1 - z / (p * 1.5)) : 1;

  return (
    <Tag
      className={className}
      style={{
        transform: enabled
          ? `translateZ(${typeof translateZ === 'number' ? `${translateZ}px` : translateZ}) scale(${scaleComp})`
          : 'none',
        transformStyle: 'preserve-3d',
        transformOrigin: '50% 50%',
        willChange: 'transform',
        transition: 'transform 150ms ease',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default { CardContainer, CardBody, CardItem };

CardContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  perspective: PropTypes.number,
  maxRotate: PropTypes.number,
  hoverScale: PropTypes.number,
  hoverShadow: PropTypes.string,
  offsetTop: PropTypes.number,
  enabled: PropTypes.bool,
};

CardContainer.defaultProps = {
  children: null,
  className: '',
  perspective: 600,
  maxRotate: 18,
  hoverScale: 1.03,
  hoverShadow: '0 20px 60px rgba(0,0,0,0.35)',
  offsetTop: 12,
  enabled: true,
};

CardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

CardBody.defaultProps = {
  children: null,
  className: '',
  style: {},
};

CardItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  as: PropTypes.elementType,
  translateZ: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.shape({}),
};

CardItem.defaultProps = {
  children: null,
  className: '',
  as: 'div',
  translateZ: 0,
  style: {},
};
