import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CALENDAR_EVENTS = [
  { id: 'ce1', title: 'Business Data Analytics Workshop', start: new Date(2026, 0, 12), end: new Date(2026, 0, 13), color: '#EAB308', category: 'Workshop' },
  { id: 'ce2', title: 'Presidential Battleground', start: new Date(2026, 0, 29), end: new Date(2026, 1, 1), color: '#8B5CF6', category: 'Esports' },
  { id: 'ce3', title: 'CyberTalk Event', start: new Date(2026, 1, 20), end: new Date(2026, 1, 20), color: '#2563EB', category: 'Seminar' },
  { id: 'ce4', title: 'Nepal-US Hackathon', start: new Date(2026, 2, 27), end: new Date(2026, 2, 29), color: '#2563EB', category: 'Hackathon' },
  { id: 'ce5', title: 'Sports Showdown 2026', start: new Date(2026, 2, 29), end: new Date(2026, 3, 5), color: '#EF4444', category: 'Sports' },
];

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function isSameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

function isDateInRange(date, start, end) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return d >= s && d <= e;
}

export default function EventCalendar({ onDateSelect, showEvents = true }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hoveredPos, setHoveredPos] = useState({ x: 0, y: 0 });

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, isCurrentMonth: false, date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - i) });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true, date: new Date(currentYear, currentMonth, i) });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, isCurrentMonth: false, date: new Date(currentYear, currentMonth + 1, i) });
    }
    return days;
  }, [currentMonth, currentYear]);

  const getEventsForDate = (date) => showEvents ? CALENDAR_EVENTS.filter(ev => isDateInRange(date, ev.start, ev.end)) : [];
  const isToday = (date) => isSameDay(date, today);

  const handleMouseEnter = (e, ev) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredPos({ x: rect.left, y: rect.bottom + 8 });
    setHoveredEvent(ev);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Month Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="text-[17px] font-[800] text-gray-900">{MONTH_NAMES[currentMonth]} {currentYear}</h3>
        <div className="flex items-center gap-1">
          <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"><ChevronLeft size={18} /></button>
          <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"><ChevronRight size={18} /></button>
        </div>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 border-b border-gray-50">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center py-2 text-[11px] font-[700] uppercase tracking-wider text-gray-400">{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map((cell, idx) => {
          const events = getEventsForDate(cell.date);
          const todayClass = isToday(cell.date);
          return (
            <div
              key={idx}
              onClick={() => onDateSelect && onDateSelect(cell.date)}
              className={`relative min-h-[52px] p-1.5 border-b border-r border-gray-50 cursor-pointer transition-colors hover:bg-blue-50/40 ${
                !cell.isCurrentMonth ? 'bg-gray-50/50' : ''
              }`}
            >
              <span className={`text-[12px] font-[700] inline-flex items-center justify-center w-7 h-7 rounded-full ${
                todayClass ? 'bg-[#2563EB] text-white shadow-sm' : 
                cell.isCurrentMonth ? 'text-gray-700' : 'text-gray-300'
              }`}>
                {cell.day}
              </span>
              {/* Event dots */}
              <div className="flex flex-wrap gap-[3px] mt-0.5">
                {events.slice(0, 3).map(ev => (
                  <div
                    key={ev.id}
                    className="w-full h-[5px] rounded-full cursor-pointer transition-all hover:h-[7px]"
                    style={{ backgroundColor: ev.color }}
                    onMouseEnter={(e) => handleMouseEnter(e, ev)}
                    onMouseLeave={() => setHoveredEvent(null)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend — only when events are shown */}
      {showEvents && (
        <div className="px-5 py-3 border-t border-gray-100 flex flex-wrap gap-4 text-[11px] font-[700] text-gray-500">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>Hackathons</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]"></span>Internships</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]"></span>Workshops</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>Deadlines</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></span>College</span>
        </div>
      )}

      {/* Hover Tooltip — only when events are shown */}
      {showEvents && hoveredEvent && (
        <div className="fixed z-[200] bg-gray-900 text-white px-3 py-2 rounded-xl shadow-xl text-[12px] font-[600] max-w-[200px] pointer-events-none"
          style={{ left: hoveredPos.x, top: hoveredPos.y }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredEvent.color }}></span>
            {hoveredEvent.category}
          </div>
          <p className="font-[700]">{hoveredEvent.title}</p>
          <p className="text-gray-400 text-[10px] mt-1">
            {hoveredEvent.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            {!isSameDay(hoveredEvent.start, hoveredEvent.end) && ` – ${hoveredEvent.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
          </p>
        </div>
      )}
    </div>
  );
}
