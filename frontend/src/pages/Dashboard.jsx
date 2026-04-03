import { useState, useEffect } from 'react';
import { Search, Loader2, Bookmark, MapPin, Clock, ExternalLink, Star, Users, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBookmarks } from '../contexts/BookmarkContext';
import { ALL_EVENTS, FEATURED_EVENT, REAL_EVENTS, MOCK_EVENTS } from '../data/mockEvents';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import EventCalendar from '../components/EventCalendar';
import toast from 'react-hot-toast';


const FILTERS = ['All', 'Hackathon', 'Internship', 'Webinar', 'Workshop', 'Sports', 'Esports', 'Competition', 'Seminar'];

const CATEGORY_COLORS = {
  Hackathon: 'bg-blue-100 text-blue-700',
  Internship: 'bg-emerald-100 text-emerald-700',
  Workshop: 'bg-yellow-100 text-yellow-700',
  Seminar: 'bg-purple-100 text-purple-700',
  Esports: 'bg-violet-100 text-violet-700',
  Competition: 'bg-orange-100 text-orange-700',
  Webinar: 'bg-teal-100 text-teal-700',
  Sports: 'bg-red-100 text-red-700',
  Quiz: 'bg-pink-100 text-pink-700',
};

/* ─── Loading Skeleton ─── */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-[160px] bg-gray-200"></div>
    <div className="p-5 space-y-3">
      <div className="h-3 w-20 bg-gray-200 rounded-full"></div>
      <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
      <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
      <div className="flex gap-2 pt-2"><div className="h-8 flex-1 bg-gray-200 rounded-xl"></div><div className="h-8 w-8 bg-gray-200 rounded-xl"></div></div>
    </div>
  </div>
);

/* ─── Main Dashboard ─── */
export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const globalSearchTerm = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || 'All';
  const { bookmarks, toggleBookmark } = useBookmarks();

  const [activeFilter, setActiveFilter] = useState(filterParam);
  const [searchTerm, setSearchTerm] = useState(globalSearchTerm);
  const [loading, setLoading] = useState(true);

  // Sync local search term with global URL search term when it changes
  useEffect(() => {
    setSearchTerm(globalSearchTerm);
  }, [globalSearchTerm]);

  // Sync filter when navigating from sidebar
  useEffect(() => {
    setActiveFilter(filterParam);
  }, [filterParam]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const requireAuth = (action) => {
    if (!currentUser) {
      toast('Please login to continue', { icon: '🔒' });
      navigate('/login');
      return false;
    }
    return true;
  };

  const handleToggleBookmark = (id) => {
    toggleBookmark(id, requireAuth);
  };

  const handleRegisterClick = (e, url) => {
    if (!currentUser) {
      e.preventDefault();
      requireAuth('register');
    }
  };

  const filteredEvents = ALL_EVENTS.filter(ev => {
    const matchesFilter = activeFilter === 'All' || ev.category === activeFilter || ev.type === activeFilter;
    const matchesSearch = ev.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full pb-20">

      {/* ─── FEATURED EVENT HERO SECTION ─── */}
      <section className="relative h-[360px] md:h-[400px] overflow-hidden">
        <img src={FEATURED_EVENT.image} alt={FEATURED_EVENT.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
        <div className="relative z-10 max-w-[1400px] mx-auto h-full flex flex-col justify-end px-4 lg:px-8 pb-10">
          <h1 className="text-3xl md:text-5xl font-[800] text-white tracking-tight leading-tight max-w-2xl" style={{fontFamily:'Sora'}}>
            {FEATURED_EVENT.title}
          </h1>
          <p className="text-white/80 text-[15px] font-[600] mt-2 flex items-center gap-2">
            <Clock size={16} /> {FEATURED_EVENT.date}
          </p>
          <p className="text-white/60 text-[13px] font-[600] mt-3">
            {FEATURED_EVENT.sports.join('  •  ')}
          </p>
          <div className="flex gap-3 mt-5">
            <a href={FEATURED_EVENT.registerUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => handleRegisterClick(e, FEATURED_EVENT.registerUrl)} className="px-7 py-3 rounded-full bg-[#2563EB] text-white text-[14px] font-[700] hover:bg-blue-700 transition-all shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2">Register <ExternalLink size={14} /></a>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT AREA ─── */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ─── LEFT: Calendar + Filters + Event Grid ─── */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* Event Calendar — visible to all, event markers only for logged-in */}
            <EventCalendar onDateSelect={(date) => console.log('Selected:', date)} showEvents={!!currentUser} />

            {/* Filter Section */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
                <h2 className="text-[22px] font-[800] text-gray-900 flex items-center gap-2.5">
                  <span className="w-1.5 h-7 bg-[#2563EB] rounded-full block"></span>
                  Discover Events
                </h2>
                <div className="relative w-full sm:w-auto sm:min-w-[260px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder="Filter events..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-[600] focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {FILTERS.map(f => (
                  <button key={f} onClick={() => setActiveFilter(f)}
                    className={`px-4 py-2 rounded-full text-[12px] font-[700] transition-all border ${
                      activeFilter === f
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-[#2563EB]'
                    }`}
                  >{f}</button>
                ))}
              </div>
            </div>

            {/* Event Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[1,2,3,4].map(n => <SkeletonCard key={n} />)}
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
                <Search className="mx-auto text-gray-300 mb-3" size={40} />
                <h3 className="text-[18px] font-[700] text-gray-900">No events found</h3>
                <p className="text-gray-500 text-[13px] font-[500] mt-1">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredEvents.map(event => (
                  <div key={event.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    {/* Card Image */}
                    {event.image ? (
                      <div className="relative h-[160px] overflow-hidden bg-gray-100">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-[800] uppercase tracking-wide ${CATEGORY_COLORS[event.category] || CATEGORY_COLORS[event.type] || 'bg-gray-100 text-gray-600'}`}>
                            {event.type || event.category}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="px-5 pt-5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-[800] uppercase tracking-wide ${CATEGORY_COLORS[event.category] || CATEGORY_COLORS[event.type] || 'bg-gray-100 text-gray-600'}`}>
                          {event.type || event.category}
                        </span>
                      </div>
                    )}

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-[16px] font-[800] text-gray-900 leading-snug mb-2 group-hover:text-[#2563EB] transition-colors line-clamp-2">
                        {event.title}
                      </h3>

                      <div className="space-y-1.5 text-[12px] text-gray-500 font-[600] mb-auto">
                        {event.date && (
                          <p className="flex items-center gap-1.5"><Clock size={13} /> {event.date}</p>
                        )}
                        {event.location && (
                          <p className="flex items-center gap-1.5"><MapPin size={13} /> {event.location}</p>
                        )}
                        {event.platform && (
                          <p className="flex items-center gap-1.5"><ExternalLink size={13} /> {event.platform}</p>
                        )}
                        {event.prize && (
                          <p className="flex items-center gap-1.5 text-emerald-600 font-[700]"><Star size={13} /> Prize: {event.prize}</p>
                        )}
                        {event.deadline && (
                          <p className={`flex items-center gap-1.5 font-[700] ${event.urgent ? 'text-red-600' : 'text-orange-600'}`}>
                            <Clock size={13} /> {event.deadline}
                          </p>
                        )}
                      </div>

                      {/* Tags */}
                      {(event.features || event.games) && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {(event.features || event.games)?.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-[700] rounded-md">{tag}</span>
                          ))}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                        <a href={event.registerUrl || '#'} target="_blank" rel="noopener noreferrer" onClick={(e) => handleRegisterClick(e, event.registerUrl)} className="flex-1 py-2.5 rounded-xl bg-blue-50 text-[#2563EB] text-[12px] font-[800] hover:bg-[#2563EB] hover:text-white transition-colors flex items-center justify-center gap-1.5">
                          Register <ExternalLink size={13} />
                        </a>
                        {currentUser && (
                          <button onClick={() => handleToggleBookmark(event.id)}
                            className={`p-2.5 rounded-xl transition-colors ${bookmarks.includes(event.id) ? 'bg-orange-50 text-orange-500' : 'bg-gray-50 text-gray-400 hover:text-[#2563EB] hover:bg-blue-50'}`}>
                            <Bookmark size={16} fill={bookmarks.includes(event.id) ? 'currentColor' : 'none'} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ─── RIGHT SIDEBAR ─── */}
          <aside className="w-full lg:w-[320px] flex-shrink-0 space-y-6">



            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-[15px] font-[800] text-gray-900 flex items-center gap-2"><Clock size={16} className="text-red-500" /> Upcoming Deadlines</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {MOCK_EVENTS.filter(e => e.deadline).slice(0, 3).map(ev => (
                  <div key={ev.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-red-50/30 transition-colors cursor-pointer">
                    <div>
                      <p className="text-[13px] font-[700] text-gray-800 line-clamp-1">{ev.title}</p>
                      <p className="text-[11px] text-gray-400 font-[600]">{ev.platform}</p>
                    </div>
                    <span className={`text-[11px] font-[800] px-2.5 py-1 rounded-full flex-shrink-0 ${
                      ev.urgent ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                    }`}>{ev.deadline}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-[15px] font-[800] text-gray-900 flex items-center gap-2"><Star size={16} className="text-yellow-500" /> Recommended</h3>
                <p className="text-[11px] text-gray-400 font-[500] mt-0.5">Based on Tech, AI, Sports</p>
              </div>
              <div className="divide-y divide-gray-50">
                {[REAL_EVENTS[3], REAL_EVENTS[0], REAL_EVENTS[2]].map(ev => (
                  <div key={ev.id} className="px-5 py-3.5 flex items-center gap-3 hover:bg-blue-50/40 transition-colors cursor-pointer group">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-[#2563EB] flex-shrink-0">
                      <Users size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-[700] text-gray-800 truncate group-hover:text-[#2563EB] transition-colors">{ev.title}</p>
                      <p className="text-[11px] text-gray-400 font-[600]">{ev.type || ev.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Events (Bookmarked) */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-[15px] font-[800] text-gray-900 flex items-center gap-2"><Bookmark size={16} className="text-[#2563EB]" /> My Events</h3>
                <Link to="/my-events" className="text-[11px] font-[700] text-[#2563EB] hover:underline">View All</Link>
              </div>
              <div className="p-4">
                {bookmarks.length === 0 ? (
                  <p className="text-[13px] text-gray-400 font-[500] text-center py-3">Bookmark events to see them here.</p>
                ) : (
                  <div className="space-y-2">
                    {ALL_EVENTS.filter(e => bookmarks.includes(e.id)).slice(0, 3).map(ev => (
                      <div key={ev.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer">
                        <Bookmark size={14} className="text-[#2563EB]" fill="currentColor" />
                        <p className="text-[12px] font-[700] text-gray-700 truncate">{ev.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
