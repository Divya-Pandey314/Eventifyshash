import { X, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function DueDatesModal({ isOpen, onClose, events }) {
  if (!isOpen) return null;

  // Filter events that have deadlines and sort them by closest deadline
  const today = new Date();
  const sortedEvents = [...events]
    .filter(e => e.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const getUrgencyColor = (deadline) => {
    const diffTime = new Date(deadline) - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'text-red-600 bg-red-50 border-red-200';
    if (diffDays <= 7) return 'text-orange-600 bg-orange-50 border-orange-200';
    if (diffDays <= 14) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getUrgencyText = (deadline) => {
    const diffTime = new Date(deadline) - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays < 0) return 'Passed';
    if (diffDays === 1) return 'Due tomorrow';
    return `In ${diffDays} days`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[var(--linkedin-divider)]">
          <h2 className="text-xl font-semibold text-[var(--linkedin-text-primary)] flex items-center gap-2">
            <CalendarIcon size={22} className="text-green-600" />
            Upcoming Due Dates
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-[var(--linkedin-text-secondary)] transition-colors">
             <X size={24} />
          </button>
        </div>

        {/* Body (Scrollable list) */}
        <div className="p-2 overflow-y-auto flex-1 custom-scrollbar">
           {sortedEvents.length === 0 ? (
             <div className="text-center p-8">
               <p className="text-[var(--linkedin-text-secondary)]">No upcoming deadlines found.</p>
             </div>
           ) : (
             <div className="space-y-2">
               {sortedEvents.map(event => (
                 <div key={event.id} className="p-3 hover:bg-slate-50 border border-transparent hover:border-[var(--linkedin-border)] rounded-lg transition-all flex gap-3 items-start group cursor-pointer">
                    <div className="w-12 h-12 bg-slate-100 rounded border border-[var(--linkedin-border)] flex-shrink-0 flex flex-col items-center justify-center overflow-hidden">
                       <span className="text-[10px] font-bold text-red-600 uppercase leading-none">{format(new Date(event.deadline), 'MMM')}</span>
                       <span className="text-lg font-black text-slate-700 leading-none">{format(new Date(event.deadline), 'dd')}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                       <h3 className="font-semibold text-sm text-[var(--linkedin-text-primary)] truncate group-hover:text-[var(--linkedin-blue)] transition-colors">{event.title}</h3>
                       <p className="text-xs text-[var(--linkedin-text-secondary)] truncate">{event.category} • {event.source}</p>
                    </div>
                    <div className={`flex flex-col items-end flex-shrink-0`}>
                       <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${getUrgencyColor(event.deadline)}`}>
                         {getUrgencyText(event.deadline)}
                       </span>
                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
