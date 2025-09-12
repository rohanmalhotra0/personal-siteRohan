/**
 * @typedef {Object} Position
 * Conforms to https://jsonresume.org/schema/
 *
 * @property {string} name - Name of the company or entry
 * @property {string} position - Position title or description
 * @property {string} url - Company website or link to resource
 * @property {string} startDate - Start date of the position in YYYY-MM-DD format
 * @property {string|undefined} endDate - End date of the position in YYYY-MM-DD format.
 * If undefined, the position is still active.
 * @property {string} location - Location of the position
 * @property {string|undefined} summary - HTML/Markdown summary of the position
 * @property {string[]} highlights - Plain text highlights of the position (bulleted list)
 */

const work = [
  {
    name: 'Download Full Resume',
    position: 'Click to download my full resume in PDF format.',
    url: '/R_Malhotra_Resume.pdf',
    startDate: '2025-01-20',
    endDate: '',
    location: '',
    summary: '',
    highlights: [],
  },
  {
    name: 'ARESS Software',
    position: 'Machine Learning Intern',
    url: 'https://www.aress.com/',
    startDate: '2025-06-01',
    endDate: '2025-08-01',
    location: 'Chatham, NJ',
    summary:
      'Collaborated on LASSO and Ridge Regression prototypes in Python (scikit-learn) to forecast IT-support incident resolution times, with pilot results indicating a 15% projected improvement in SLA compliance.',
    highlights: [
      'Collaborated on LASSO and Ridge Regression prototypes in Python (scikit-learn) to forecast IT-support incident resolution times, with pilot results indicating a 15% projected improvement in SLA compliance.',
      'Developed interactive Excel dashboards for real-time reporting of service metrics and model performance, enabling operations teams to make data-driven prioritization decisions.',
    ],
  },
  {
    name: 'Y-Axis Overseas Careers',
    position: 'Business Analyst Intern',
    url: 'https://www.y-axis.com/',
    startDate: '2024-06-01',
    endDate: '2024-08-01',
    location: 'Blacksburg, VA',
    summary:
      'Cleaned and normalized SQL data on client profiles and visa-application records to feed predictive models forecasting approval rates and processing timelines, reducing data-preparation time by 15%.',
    highlights: [
      'Cleaned and normalized SQL data on client profiles and visa-application records to feed predictive models forecasting approval rates and processing timelines, reducing data-preparation time by 15%.',
      'Built Excel dashboards visualizing forecasted metrics and translated findings into clear, actionable recommendations for non-technical stakeholders.',
    ],
  },
  {
    name: 'Hume Center for National Security and Technology',
    position: 'Aerospace Research Assistant',
    url: 'https://hume.vt.edu/',
    startDate: '2024-08-01',
    endDate: '2025-05-01',
    location: 'Blacksburg, VA',
    summary:
      'Collaborated with a multidisciplinary team to research imaging & signal-processing techniques for environmental coral reef health applications.',
    highlights: [
      'Collaborated with a multidisciplinary team to research imaging & signal-processing techniques for environmental coral reef health applications.',
      'Co-authored a NASA CubeSat Launch Initiative proposal, coordinating requirements with stakeholders and integrating autonomous imaging systems.',
    ],
  },
  {
    name: 'PIVOT at VT',
    position: 'Co-President & Lead Software Engineer',
    url: 'https://pivot.vt.edu/',
    startDate: '2024-09-01',
    endDate: 'present',
    location: 'Blacksburg, VA',
    summary:
      'Lead a 40-member interdisciplinary organization, coordinating project teams, managing GitHub workflows, and overseeing algorithm integration to apply physics-driven computational methods to engineering and financial challenges.',
    highlights: [
      'Lead a 40-member interdisciplinary organization, coordinating project teams, managing GitHub workflows, and overseeing algorithm integration to apply physics-driven computational methods to engineering and financial challenges.',
      'Developed a Raspberry Pi-powered automated trading bot integrating live market data, Python scripting, and oscillatory models, achieving up to 68% predictive accuracy with the Alpaca Trading API.',
      'Mentor members in advanced programming and quantitative methods, fostering collaboration across physics, finance, and CS.',
    ],
  },
  {
    name: 'Special Olympics',
    position: 'Intern & Volunteer',
    url: 'https://www.specialolympics.org/',
    startDate: '2019-09-01',
    endDate: 'present',
    location: 'Chatham, NJ',
    summary:
      'Interned at a school for students with disabilities teaching math and served as a 5-year volunteer for Special Olympics.',
    highlights: [
      'Interned at a school for students with disabilities teaching math and served as a 5-year volunteer for Special Olympics.',
    ],
  },
];

export default work;
