import React, { useState, useEffect, useRef } from 'react';
import { BellDot, Check, Clock } from 'lucide-react';
import api from '../utils/api';

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get('/notifications');
      setNotifications(data);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  const markAsRead = async (e, id) => {
    e.stopPropagation();
    try {
      // Typically PUT or PATCH, depends on routing but we use PATCH generically or PUT
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: 1 } : n));
    } catch (err) {
      console.error('Failed to mark read', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 w-full flex justify-center text-[var(--color-slate-gray)] hover:bg-white hover:shadow-sm rounded-xl transition-colors focus:outline-none"
      >
        <BellDot size={22} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-[25%] bg-[var(--color-alert-red)] w-2.5 h-2.5 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-12 left-16 md:bottom-auto md:top-0 md:left-[100%] ml-2 w-80 bg-white rounded-[20px] shadow-[0_12px_48px_rgba(28,73,128,0.15)] border border-[var(--color-cool-gray)] overflow-hidden z-[100]">
          <div className="px-4 py-3 border-b border-[var(--color-cool-gray)] bg-[var(--color-ghost-white)] flex justify-between items-center">
            <h3 className="font-[800] text-[var(--color-ink-black)] text-[14px]">Notifications</h3>
            {unreadCount > 0 && <span className="text-[10px] bg-[var(--color-alert-red)] text-white px-2 py-0.5 rounded-full font-[800] shadow-sm uppercase tracking-wide">{unreadCount} New</span>}
          </div>
          
          <div className="max-h-80 overflow-y-auto no-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-[13px] text-[var(--color-slate-gray)] font-[500]">
                You're all caught up!
              </div>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className={`p-4 border-b border-[var(--color-cool-gray)]/50 hover:bg-slate-50 transition-colors flex gap-3 ${!notif.is_read ? 'bg-blue-50/20' : ''}`}>
                  <div className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${notif.deadline_alert ? 'bg-red-50 text-[var(--color-alert-red)] shadow-sm border border-red-100' : 'bg-[var(--color-ice-blue)] text-[var(--color-primary)]'}`}>
                    <Clock size={16} strokeWidth={2.5}/>
                  </div>
                  <div className="flex-1">
                    <p className={`text-[13px] leading-[1.4] ${!notif.is_read ? 'font-[700] text-[var(--color-ink-black)]' : 'font-[500] text-[var(--color-slate-gray)]'}`}>
                      {notif.message}
                    </p>
                    <p className="text-[11px] text-[var(--color-slate-gray)] mt-1.5 font-[600]">
                      {new Date(notif.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {!notif.is_read && (
                    <button 
                      onClick={(e) => markAsRead(e, notif.id)}
                      className="text-[var(--color-primary)] hover:bg-[var(--color-ice-blue)] p-1.5 rounded-full h-fit flex-shrink-0 transition-colors"
                      title="Mark as read"
                    >
                      <Check size={16} strokeWidth={3} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
          
          <div className="p-2 border-t border-[var(--color-cool-gray)] bg-[var(--color-ghost-white)] text-center">
             <button className="text-[12px] font-[800] text-[var(--color-primary)] hover:underline py-1">View All Alerts</button>
          </div>
        </div>
      )}
    </div>
  );
}
