import { Calendar, MapPin, Building2, Bookmark, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EventCard({ event, isBookmarked, onBookmarkToggle }) {
  // Use cover image if exists, else generic tech/business placeholders based on category
  const defaultCover = "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&q=80&w=600";
  const coverImg = event.coverImage || defaultCover;
  
  // Use organization logo or generate an avatar
  const orgLogo = event.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(event.organization)}&background=f1f5f9&color=1c4980`;

  return (
    <div className="group bg-white rounded-[20px] border border-[var(--color-cool-gray)] overflow-hidden shadow-sm hover:shadow-[0_12px_32px_rgba(28,73,128,0.08)] transition-all duration-300 flex flex-col h-full hover:-translate-y-1 relative">
      
      {/* Cover Image & Category Badge */}
      <div className="h-[140px] w-full relative overflow-hidden bg-[var(--color-ghost-white)]">
        <img 
          src={coverImg} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] font-[800] text-[var(--color-primary)] shadow-sm tracking-wide uppercase border border-white/50">
          {event.category || 'Opportunity'}
        </div>
      </div>

      {/* Organizer Logo Overlap */}
      <div className="absolute top-[110px] right-5 w-14 h-14 bg-white rounded-[14px] shadow-md border-2 border-white overflow-hidden flex items-center justify-center p-1 z-10">
        <img src={orgLogo} alt={event.organization} className="w-full h-full object-contain" />
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col pt-4">
        <div className="flex items-center gap-1.5 text-[var(--color-slate-gray)] text-[12px] font-[600] mb-2 uppercase tracking-wide">
          <Building2 size={13} /> {event.organization}
        </div>
        
        <h3 className="text-[17px] font-[800] text-[var(--color-ink-black)] leading-[1.3] mb-3 line-clamp-2">
          {event.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {event.tags?.slice(0, 2).map((tag, idx) => (
             <span key={idx} className="bg-[var(--color-ice-blue)] text-[var(--color-primary)] text-[11px] font-[700] px-2.5 py-1 rounded-[6px]">
               {tag}
             </span>
          ))}
        </div>

        <div className="space-y-2.5 mb-2 mt-auto">
          <div className="flex items-center gap-2 text-[13px] text-[var(--color-slate-gray)] font-[600]">
            <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-[var(--color-primary)]"><Calendar size={13} /></div> 
            Deadline: <span className="text-[var(--color-ink-black)] font-[700]">{event.deadline}</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-[var(--color-slate-gray)] font-[600]">
            <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center text-purple-600"><MapPin size={13} /></div>
            {event.mode || 'Online'}
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 mt-4 border-t border-[var(--color-cool-gray)] flex items-center justify-between">
          <Link 
            to={`/events/${event.id}`}
            className="flex-1 bg-[var(--color-ice-blue)] text-[var(--color-primary)] font-[800] py-2.5 rounded-[12px] text-[13px] flex items-center justify-center gap-2 hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            Apply Now <ExternalLink size={14} strokeWidth={2.5}/>
          </Link>
          <button 
            onClick={(e) => {
              e.preventDefault();
              onBookmarkToggle(event.id);
            }}
             className={`ml-3 p-2.5 rounded-[12px] transition-colors ${
              isBookmarked 
                ? 'bg-[var(--color-amber)]/20 text-[var(--color-signal-orange)]' 
                : 'bg-[var(--color-ghost-white)] text-[var(--color-slate-gray)] hover:text-[var(--color-primary)] hover:bg-[var(--color-ice-blue)]'
            }`}
          >
            <Bookmark size={18} strokeWidth={isBookmarked ? 3 : 2} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
}
