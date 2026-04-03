import React, { useMemo } from 'react';

// Types & Data setup
interface Event {
  id: string;
  title: string;
  date: string;
  category: 'Hackathon' | 'Internship' | 'Webinar' | 'Events';
  platform: string;
  isTrending?: boolean;
}

const getFutureDate = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

const USER_INTERESTS = ['Hackathon', 'Internship'];

const DUMMY_EVENTS: Event[] = [
  { id: '1', title: 'Global AI Hackathon 2026', date: getFutureDate(3), category: 'Hackathon', platform: 'Devpost', isTrending: true },
  { id: '2', title: 'Frontend Engineering Intern', date: getFutureDate(15), category: 'Internship', platform: 'LinkedIn', isTrending: true },
  { id: '3', title: 'Mastering Web3 Development', date: getFutureDate(30), category: 'Webinar', platform: 'Unstop' },
  { id: '4', title: 'Open Source Code Jam', date: getFutureDate(5), category: 'Hackathon', platform: 'Devpost' },
  { id: '5', title: 'Startup Pitch Competition', date: getFutureDate(2), category: 'Events', platform: 'Other', isTrending: true },
  { id: '6', title: 'Product Design Internship', date: getFutureDate(10), category: 'Internship', platform: 'LinkedIn' },
];

// Helper to determine urgency
const checkIsUrgent = (dateString: string) => {
  const d = new Date(dateString);
  const today = new Date();
  const diffDays = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays <= 7 && diffDays >= 0; // Urgent if within 7 days
};

export default function UserDashboard() {
  const recommendedEvents = useMemo(() => {
    return DUMMY_EVENTS.filter(e => USER_INTERESTS.includes(e.category));
  }, []);

  const trendingEvents = useMemo(() => {
    return DUMMY_EVENTS.filter(e => e.isTrending);
  }, []);

  const upcomingDeadlines = useMemo(() => {
    return [...DUMMY_EVENTS].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, []);

  // Reusable Event Card Component
  const EventCard = ({ event }: { event: Event }) => {
    const isUrgent = checkIsUrgent(event.date);
    
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            event.category === 'Hackathon' ? 'bg-purple-100 text-purple-700' :
            event.category === 'Internship' ? 'bg-blue-100 text-blue-700' :
            event.category === 'Webinar' ? 'bg-emerald-100 text-emerald-700' :
            'bg-orange-100 text-orange-700'
          }`}>
            {event.category}
          </span>
          <button className="text-slate-400 hover:text-blue-500 hover:bg-slate-50 p-2 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
        
        <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {event.title}
        </h3>
        
        {/* Deadline visual highlight */}
        <div className={`flex items-center text-sm mb-6 mt-auto ${isUrgent ? 'text-red-600 font-semibold bg-red-50 py-1.5 px-3 rounded-lg w-max' : 'text-slate-500'}`}>
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {isUrgent && <span className="mr-1">Urgent: </span>}
          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
              {event.platform.charAt(0)}
            </div>
            <span className="text-sm font-medium text-slate-600">{event.platform}</span>
          </div>
          <span className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer">
            View &rarr;
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, Student! 👋</h1>
          <p className="text-slate-500 mt-2">Here's your personalized timeline of opportunities based on your interests in <span className="font-semibold text-blue-600">Hackathons</span> and <span className="font-semibold text-blue-600">Internships</span>.</p>
        </div>

        {/* Section: Recommended for You */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
              Recommended for You
            </h2>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedEvents.slice(0, 4).map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* Section: Upcoming Deadlines */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center">
              <svg className="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Upcoming Deadlines
            </h2>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingDeadlines.slice(0, 4).map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* Section: Trending Events */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center">
              <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Trending Events
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingEvents.slice(0, 3).map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
