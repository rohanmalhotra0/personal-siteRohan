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
 * @property {string|undefined} summary - HTML/Markdown summary of the position
 * @property {string[]} highlights - Plain text highlights of the position (bulleted list)
 */

const work = [
  {
    name: 'PIVOT At VT',
    position: 'Lead Software Engineer',
    url: 'https://www.y-axis.com/',
    startDate: '2025-01-01',
    endDate: '2027-08-01',
    summary:
      'At PIVOT at VT, I actively pioneer interdisciplinary solutions at the intersection of Computer Science, Finance, and Physics.',
    highlights: [
      'Leading a team of 12 coders, I coordinate tasks, manage GitHub commits, oversee the integration of complex algorithms, and ensure strategic progress to deliver effective financial innovations.',
      'My primary project involves developing a Raspberry Pi-powered automated financial trading bot, integrating real-time market data, Python scripting, and physics-inspired models, achieving up to 85% predictive accuracy using the Alpaca Trading API.',
      'Our Raspberry Pi solution is economical and energy-efficient, enabling future expansion into broader financial applications, aligning with PIVOT’s mission to leverage physics-driven insights for global economic challenges.',
    ],
  },
  {
    name: 'Y-Axis',
    position: 'Software Engineering Intern',
    url: 'https://www.y-axis.com/',
    startDate: '2025-02-01',
    endDate: '2025-08-01',
    summary:
      'Collaborated with UI/UX designers to convert design prototypes into responsive web pages. Improved SEO rankings through semantic markup and DOM manipulation, resulting in a 13% increase in impressions on Google Search Console.',
    highlights: [
      'Converted design prototypes into responsive web pages in collaboration with UI/UX designers.',
      'Improved SEO rankings through effective semantic markup and DOM manipulation.',
      'Achieved a 13% increase in impressions on Google Search Console.',
    ],
  },
  {
    name: 'ARESS Software',
    position: 'Data Analytics Intern',
    url: 'https://www.aress.com/',
    startDate: '2024-06-01',
    endDate: '2024-08-01',
    summary:
      'Analyzed stock indicators to forecast market trends. Built regression models and developed web scrapers to automate data collection, enhancing data visualization and reporting for senior leadership.',
    highlights: [
      'Analyzed stock indicators (MACD, SMA, RSI) to forecast market trends.',
      'Built LASSO and Ridge Regression models for predictive analysis.',
      'Developed web scrapers to automate data collection.',
      'Enhanced data visualization and reporting in Excel for actionable insights.',
    ],
  },
  {
    name: 'Hume Center for National Security and Technology',
    position: 'Undergraduate Research Assistant',
    url: 'https://hume.vt.edu/',
    startDate: '2024-08-01',
    endDate: '2025-05-01',
    summary:
      'Researched advanced imaging and signal processing for space-based and defense applications. Utilized Python and satellite communication protocols for efficient data transmission from CubeSat imaging systems. Contributed to a proposal for NASA’s CubeSat Launch Initiative.',
    highlights: [
      'Researched advanced imaging and signal processing techniques for defense applications.',
      'Utilized Python and satellite communication protocols for efficient data transmission.',
      'Contributed to a NASA CubeSat Launch Initiative proposal integrating autonomous imaging and communication systems.',
    ],
  },
  {
    // New entry: Attach your resume as a downloadable resource.
    name: 'Download Full Resume',
    position: 'Click to download my full resume in PDF format.',
    url: '/R_Malhotra_Resume.pdf',
    startDate: '2025-03-34', // Placeholder date
    endDate: '',
    summary: '',
    highlights: [],
  },
];

export default work;
