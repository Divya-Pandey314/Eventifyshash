import { useState, useEffect } from 'react';
import { BookmarkMinus, Loader2, Bookmark, ArrowRight, Zap, CircleUserRound } from 'lucide-react';
import api from '../utils/api';
import EventCard from '../components/EventCard';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBookmarks } from '../contexts/BookmarkContext';
import { ALL_EVENTS } from '../data/mockEvents';

export default function MyEvents() {
  const { currentUser } = useAuth();
  const { bookmarks, removeBookmark } = useBookmarks();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleRemoveBookmark = (eventId) => {
    removeBookmark(eventId);
  };

  const bookmarkedEventObjects = ALL_EVENTS.filter(e => bookmarks.includes(e.id));

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center">
      {/* Left Sidebar Profile Snippet */}
      <aside className="hidden md:block w-full lg:w-[280px] flex-shrink-0 space-y-4">
        <div className="card text-center relative overflow-hidden">
          <div className="h-14 bg-slate-300 w-full absolute top-0 left-0"></div>
          <div className="pt-6 pb-4 px-3 flex flex-col items-center relative z-10">
            <div className="w-16 h-16 bg-white rounded-full border-2 border-white mb-2 flex items-center justify-center text-slate-400 overflow-hidden shadow-sm">
               <CircleUserRound size={32} />
            </div>
            <h2 className="text-base font-semibold leading-tight hover:underline cursor-pointer">{currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Guest User'}</h2>
            <p className="text-xs text-[var(--linkedin-text-secondary)] mt-1 mb-3">Viewing saved repository</p>
            <div className="w-full border-t border-[var(--linkedin-divider)] my-2"></div>
            <div className="w-full text-left py-1 hover:bg-slate-50 cursor-pointer flex justify-between items-center group">
               <span className="text-xs text-[var(--linkedin-text-secondary)] font-semibold">Saved items</span>
               <span className="text-xs text-[var(--linkedin-blue)] font-semibold">{bookmarks.length}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Center Feed (Saved Events) */}
      <div className="flex-1 min-w-0 space-y-6">
        
        <div className="card p-4 pb-0 mb-4">
          <div className="flex justify-between items-center pb-4 border-b border-[var(--linkedin-divider)]">
            <div>
              <h1 className="text-xl font-semibold text-[var(--linkedin-text-primary)] tracking-tight flex items-center gap-2">
                My Items
              </h1>
              <p className="text-sm text-[var(--linkedin-text-secondary)] mt-1">
                A curated list of opportunities you've saved for later.
              </p>
            </div>
            <div className="bg-[var(--linkedin-bg)] px-3 py-1.5 rounded flex items-center gap-2 border border-[var(--linkedin-border)]">
              <span className="text-sm font-semibold text-[var(--linkedin-text-primary)]">{bookmarks.length} Saved</span>
            </div>
          </div>
          <div className="py-2">
             <div className="inline-block border-b-2 border-[var(--linkedin-blue)] px-2 py-2 text-sm font-semibold text-[var(--linkedin-blue)] cursor-pointer">
               Saved Events
             </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 card space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--linkedin-blue)]" />
            <p className="text-sm font-semibold text-[var(--linkedin-text-secondary)]">Loading your items...</p>
          </div>
        ) : bookmarkedEventObjects.length === 0 ? (
          <div className="card text-center py-20 px-4 space-y-4 flex flex-col items-center">
            <div className="bg-slate-100 p-4 rounded-full text-slate-400 mb-2">
              <BookmarkMinus className="h-10 w-10" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--linkedin-text-primary)]">You don't have any saved items yet</h3>
            <p className="text-sm text-[var(--linkedin-text-secondary)] max-w-sm mx-auto">
              Items you save will appear here. Start browsing your feed to find opportunities.
            </p>
            <Link
              to="/"
              className="btn-outline mt-4"
            >
              Go to feed
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {bookmarkedEventObjects.map(event => (
              <EventCard
                key={event.id}
                event={event}
                isBookmarked={true}
                onBookmarkToggle={handleRemoveBookmark}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <aside className="hidden xl:block w-[280px] flex-shrink-0">
          <div className="px-4 text-center sticky top-20">
             <ul className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-[var(--linkedin-text-secondary)] font-medium">
               <li><Link to="#" className="hover:text-[var(--linkedin-blue)] hover:underline">About</Link></li>
               <li><Link to="#" className="hover:text-[var(--linkedin-blue)] hover:underline">Accessibility</Link></li>
               <li><Link to="#" className="hover:text-[var(--linkedin-blue)] hover:underline">Help Center</Link></li>
               <li><Link to="#" className="hover:text-[var(--linkedin-blue)] hover:underline">Privacy & Terms</Link></li>
             </ul>
             <div className="mt-3 flex items-center justify-center gap-1 text-xs text-[var(--linkedin-text-primary)]">
                <span className="font-bold text-[var(--linkedin-blue)]">in</span> Eventify © 2026
             </div>
          </div>
      </aside>
    </div>
  );
}
