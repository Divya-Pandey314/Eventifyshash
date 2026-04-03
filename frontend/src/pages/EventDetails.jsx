import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Globe, ExternalLink, Bookmark, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const [eventRes, bookmarksRes] = await Promise.all([
          api.get(`/events/${id}`),
          api.get('/bookmarks').catch(() => ({ data: [] }))
        ]);
        
        setEvent(eventRes.data);
        setIsBookmarked(bookmarksRes.data.some(b => b.id === parseInt(id)));
      } catch (error) {
        console.error('Failed to fetch event:', error);
        toast.error('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  const handleBookmarkToggle = async () => {
    try {
      if (isBookmarked) {
        await api.delete(`/bookmarks/${id}`);
        setIsBookmarked(false);
        toast.success('Removed from bookmarks');
      } else {
        await api.post('/bookmarks', { event_id: id });
        setIsBookmarked(true);
        toast.success('Event saved!');
      }
    } catch (error) {
      toast.error('Failed to update bookmark');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900">Event Not Found</h2>
        <Link to="/" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header Block */}
        <div className="p-8 border-b border-slate-100 bg-slate-50">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-primary-100 text-primary-800 border border-primary-200 mb-4">
                {event.category}
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
                {event.title}
              </h1>
            </div>
            <button
              onClick={handleBookmarkToggle}
              className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 border rounded-lg font-medium transition-colors ${
                isBookmarked 
                  ? 'border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100' 
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
              {isBookmarked ? 'Saved' : 'Save Event'}
            </button>
          </div>
        </div>

        {/* Content Block */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 border-b border-slate-100 pb-2">
                About this Event
              </h3>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                {event.description || 'No description provided.'}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 h-fit space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Details</h4>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-slate-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Deadline / Date</p>
                    <p className="text-sm text-slate-600">{format(new Date(event.deadline), 'EEEE, MMMM d, yyyy')}</p>
                    <p className="text-sm text-slate-500">{format(new Date(event.deadline), 'h:mm a')}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-slate-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Format</p>
                    <p className="text-sm text-slate-600 capitalize">{event.mode}</p>
                  </div>
                </div>

                {event.source && (
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-slate-400 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Source Platform</p>
                      <p className="text-sm text-slate-600">{event.source}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <a 
                href={event.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                Register Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
              <p className="mt-3 text-xs text-center text-slate-500">
                You will be redirected to the external registration page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
