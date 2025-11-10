// Projects page dataset
// Images prioritized from public/images/projects; rohanm.org intentionally excluded
const data = [
  // Projects
  {
    title: 'Refrax.io',
    subtitle: 'Interactive financial & scientific visualization',
    link: 'https://refrax.io',
    image: '/images/refrax2.png',
    date: '2025-01-20',
    desc:
      'Upload CSV/Excel for instant 2D/3D plots. Equation fitting and simple ML helpers. '
      + 'Plotly + WebGL responsive charts. Live demo: youtube.com/watch?v=J7e7Fx0Nu2A.',
  },
  {
    title: 'Green Sticker (Accessibility Tool)',
    subtitle: 'Hands-free cursor via computer vision',
    link: 'https://greensticker.us',
    image: '/images/greensticker.png',
    date: '2024-08-01',
    desc:
      'Hands-free cursor using a colored sticker and on-device computer vision. '
      + 'Runs on low-cost hardware with low latency; private by default.',
  },
  {
    title: 'Autism Research',
    subtitle: 'Simple screening experiments & data collection',
    link: 'https://autismtester.com',
    image: '/images/autism.png',
    date: '2024-05-01',
    desc:
      'Accessible tools for non-specialists. Prototype studies with clear UX. '
      + 'Public site for community feedback.',
  },

  // Organizations
  {
    title: 'Pivot at VT',
    subtitle: 'Student-led STEM community & project hub',
    link: 'https://vtpivot.org',
    image: '/images/pivot.png',
    date: '2023-09-01',
    desc:
      'Mentorship, project incubation, workshops, and cross-university collaboration.',
  },

  // Publications
  {
    title: 'Reddit Sentiment in Financial Markets',
    subtitle: 'Publication',
    link: 'https://hdl.handle.net/10919/124730',
    image: '/images/reddit.png',
    date: '2025-02-10',
    desc:
      'Measured Reddit retail sentiment, built time-series features, compared to realized volatility, '
      + 'and outlined risks/ethics.',
  },
  {
    title: 'Capital Allocation with the Kelly Criterion',
    subtitle: 'Publication',
    link: 'https://hdl.handle.net/10919/124871',
    image: '/images/economic.png',
    date: '2024-11-20',
    desc:
      'Implemented Kelly-based sizing, backtested on historical data, analyzed drawdowns and growth, '
      + 'derived practical rules.',
  },
  {
    title: 'Aerospace Research (CubeSat)',
    subtitle: 'Research & prototyping',
    image: '/images/cubesats.jpeg',
    date: '2023-06-01',
    desc:
      'Subsystems and integration, ground station/comms, prototyped flight software/control, '
      + 'partnered with campus labs.',
  },

  // Selected Experiments & Models
  {
    title: 'Machine-Learning RSI Predictor (Starbucks sales → SPY RSI)',
    subtitle: 'Experiments',
    image: '/images/images (2).jpeg',
    date: '2025-01-15',
    desc:
      'Engineered SMA, MACD, RSI, and volume features. Random Forest baseline with cross-validation and time-series viz.',
  },
  {
    title: 'Quantum-Oscillating Stock Model (SPY/QQQ)',
    subtitle: 'Signals & screening',
    image: '/images/displacement.png',
    date: '2025-06-01',
    desc:
      'Wave-based cyclical signals, regime scans, overvaluation/momentum screens, automated data pulls/reports.',
  },
  {
    title: 'Linear Generator',
    subtitle: 'Hardware prototype',
    image: '/images/linear-generator-1.webp',
    date: '2024-04-01',
    desc:
      'Wearable Faraday-law generator harvesting motion to power small devices and safety gear.',
  },
  {
    title: 'Automated Raspberry Pi–based Binomial Options Pricing',
    subtitle: 'Automation',
    image: '/images/discreteOptions.jpeg',
    date: '2023-12-01',
    desc:
      'Streams live data into a binomial tree, prices options, selects trades, and executes with guardrails.',
  },
];

export default data;
