import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';

const About = () => {
  const [markdown, setMarkdown] = useState('');
  const galleryRef = useRef(null);
  const importAll = (r) => r.keys().map((key) => ({ key, src: r(key) }));
  const galleryImages = useMemo(() => {
    try {
      const imgs = importAll(require.context('../assets/photos-of-me', false, /\.(png|jpe?g|webp)$/));
      const sorted = imgs.sort((a, b) => a.key.localeCompare(b.key));
      return sorted.slice(1); // remove the first image from the collage
    } catch (e) {
      return [];
    }
  }, []);
  const handleNext = () => {
    const track = galleryRef.current;
    if (!track) return;
    const step = Math.round(track.clientWidth);
    const max = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft >= max - 5) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: step, behavior: 'smooth' });
    }
  };
  const handlePrev = () => {
    const track = galleryRef.current;
    if (!track) return;
    const step = Math.round(track.clientWidth);
    const max = track.scrollWidth - track.clientWidth;
    if (track.scrollLeft <= 5) {
      track.scrollTo({ left: max, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -step, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let isMounted = true;
    import('../data/about.md').then((res) => {
      fetch(res.default)
        .then((r) => r.text())
        .then((text) => {
          if (isMounted) setMarkdown(text);
        });
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Main title="About" description="About Me">
      <article className="post markdown" id="about">
        <header className="post-header">
          <div className="title">
            <h2>
              <i className="fas fa-user" />
              About Me
            </h2>
          </div>
        </header>
        <div className="about-content">
          <div className="about-intro">
            <div className="intro-card">
              <div className="intro-icon">
                <i className="fas fa-graduation-cap" />
              </div>
              <div className="intro-text">
                <h3>Student at NYU Courant </h3>
                <p>
                  Computer Science and Mathematics student at NYU, passionate about
                  leveraging data science, machine learning, and analytics to drive
                  impactful solutions.
                </p>
              </div>
            </div>
          </div>

          <div className="about-sections">
            <Markdown>{markdown}</Markdown>
          </div>

          {/* Swipeable Photo Gallery at bottom */}
          <section className="about-gallery" aria-label="Photo gallery">
            <div className="gallery-header">
              <h3><i className="fas fa-images" /> Photos</h3>
            </div>
            <div className="gallery-wrapper">
              <button
                type="button"
                className="gallery-nav prev"
                aria-label="Previous"
                onClick={handlePrev}
              >
                <i className="fas fa-chevron-left" />
              </button>
              <div className="gallery-track" ref={galleryRef}>
                {galleryImages.map((img) => (
                  <div className="gallery-card" key={img.key}>
                    <img src={img.src} alt="Rohan Malhotra" loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="gallery-nav next"
                aria-label="Next"
                onClick={handleNext}
              >
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </section>

        </div>
      </article>
    </Main>
  );
};

export default About;
