export const FEATURED_EVENT = {
  title: 'Presidential Arena: Sports Showdown 2026',
  date: 'March 29 – April 5',
  sports: ['Basketball', 'Cricket', 'Futsal', 'Badminton', 'Table Tennis', 'Chess', 'Billiard Pool'],
  image: '/images/events/arena.jpg',
  registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeZIKxat02wsOBRRzvZivh-kQNyx4HnKNm9l_Z5ABM-6XLtjg/viewform',
};

export const REAL_EVENTS = [
  {
    id: 're1', title: 'CyberTalk: From Curiosity to Career', type: 'Seminar',
    date: 'Feb 20, 2026', time: '8:00 AM – 10:00 AM', location: 'PGS New Building Hall',
    organizer: 'PGS Cybersecurity Club × Women in Cybersecurity', mode: 'Offline',
    features: ['Career pathways', 'Certifications roadmap', 'Networking'],
    image: '/images/events/cybertalk.jpg', category: 'Seminar', platform: 'College',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc9wgWF4uuH30QMvh1zwmW4ZuDf4ZxJJR5FTBsXJQe8ft8cew/viewform',
  },
  {
    id: 're2', title: 'Presidential Battleground 2026', type: 'Esports Tournament',
    date: 'Jan 29 – Feb 1', games: ['PUBG Mobile', 'Valorant', 'FIFA', 'Clash Royale'],
    audience: 'PGS students only', mode: 'Offline',
    image: '/images/events/battleground.jpg', category: 'Esports', platform: 'College',
    registerUrl: 'https://forms.gle/k2ZHEkhUHfk8LD4H7',
  },
  {
    id: 're3', title: 'Business Data Analytics Workshop', type: 'Workshop',
    date: 'Jan 12–13', location: 'Sankhamul, Kathmandu', organizer: 'Skill Shikshya',
    features: ['AI + Analytics basics', 'Real-world use cases'], mode: 'Offline',
    image: '/images/events/workshop.jpg', category: 'Workshop', platform: 'Skill Shikshya',
    registerUrl: 'https://skillshikshya.com/workshop/business-data-analytics-with-ai-workshop',
  },
  {
    id: 're4', title: 'Nepal-US Hackathon 2026', type: 'Hackathon',
    date: 'Mar 27–29', mode: 'Virtual', prize: '$3000',
    participants: '300+ global innovators', theme: 'Mental health solutions',
    image: '/images/events/hack.jpg', category: 'Hackathon', platform: 'Devpost',
    registerUrl: 'https://www.nepalileadersnetwork.com/nepal-us-hackathon-2026',
  },
];

export const MOCK_EVENTS = [
  {
    id: 'me1', title: 'Frontend Developer Intern', location: 'Kirtipur, Pyukha Marg',
    organizer: 'Skill Shikshya',
    type: 'Internship', platform: 'LinkedIn', deadline: '3 days left',
    category: 'Internship', mode: 'Remote', urgent: true,
    registerUrl: 'https://skillshikshya.com/workshop/business-data-analytics-with-ai-workshop'
  },

];

export const ALL_EVENTS = [...REAL_EVENTS, ...MOCK_EVENTS];
