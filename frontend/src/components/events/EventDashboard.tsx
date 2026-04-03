import React, { useState, useMemo } from 'react';

// Types
interface Event {
  id: string;
  title: string;
  date: string; // ISO string format preferred, using simple YYYY-MM-DD for dummy
  category: 'Hackathon' | 'Internship' | 'Webinar' | 'Events';
  platform: 'Devpost' | 'Unstop' | 'LinkedIn' | 'Other';
  bookmarked: boolean;
  image?: string;
}

// Dummy Data
const DUMMY_EVENTS: Event[] = [

];

export default function EventDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedDeadline, setSelectedDeadline] = useState('All');
  const [events, setEvents] = useState<Event[]>(DUMMY_EVENTS);

  const toggleBookmark = (id: string) => {
    setEvents(events.map(ev => ev.id === id ? { ...ev, bookmarked: !ev.bookmarked } : ev));
  };

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesSearch = ev.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || ev.category === selectedCategory;
      const matchesPlatform = selectedPlatform === 'All' || ev.platform === selectedPlatform;
      // Dummy check for deadline; real logic would compare dates
      const matchesDeadline = selectedDeadline === 'All';
      return matchesSearch && matchesCategory && matchesPlatform && matchesDeadline;
    });
  }, [events, searchTerm, selectedCategory, selectedPlatform, selectedDeadline]);

  const categories = ['All', 'Hackathon', 'Internship', 'Webinar', 'Events'];
  const platforms = ['All', 'Devpost', 'Unstop', 'LinkedIn', 'Other'];
  const deadlines = ['All', 'This Week', 'This Month', 'Next Month'];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header & Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Discover Opportunities</h1>
              <p className="text-slate-500 mt-1">Find your next hackathon, internship, or event.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700"
            >
              {platforms.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <select
              value={selectedDeadline}
              onChange={(e) => setSelectedDeadline(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700"
            >
              {deadlines.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ev.category === 'Hackathon' ? 'bg-purple-100 text-purple-700' :
                      ev.category === 'Internship' ? 'bg-blue-100 text-blue-700' :
                        ev.category === 'Webinar' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-orange-100 text-orange-700'
                    }`}>
                    {ev.category}
                  </span>

                  <button
                    onClick={() => toggleBookmark(ev.id)}
                    className={`p-2 rounded-full transition-colors ${ev.bookmarked ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50 hover:text-blue-500'}`}
                  >
                    <svg className="w-5 h-5" fill={ev.bookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      {ev.bookmarked ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                      )}
                    </svg>
                  </button>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {ev.title}
                </h3>

                <div className="flex items-center text-slate-500 text-sm mb-6">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                    {ev.platform.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-slate-600">{ev.platform}</span>
                </div>

                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center">
                  View Details
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900">No events found</h3>
            <p className="text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
