import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

const { NODE_ENV, REACT_APP_GA_TRACKING_ID } = process.env;
const isProd = NODE_ENV === 'production';
const hasGA = Boolean(REACT_APP_GA_TRACKING_ID);

if (isProd && hasGA) {
  try {
    ReactGA.initialize(REACT_APP_GA_TRACKING_ID, {
      gaOptions: { siteSpeedSampleRate: 100 },
      debug: false,
    });
  } catch (e) {
    // no-op if GA fails
  }
}

const Analytics = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isProd && hasGA) {
      try {
        ReactGA.set({ page: pathname });
        ReactGA.pageview(pathname);
      } catch (e) {
        // ignore
      }
    }
  }, [pathname]);

  return null;
};

export default Analytics;
