import { useState, useEffect } from 'react';
import { Bell, Check, Clock, Loader2, Sparkles, Inbox, Zap } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data);
    } catch (error) {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, is_read: 1 } : n)
      );
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-200 pb-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
            Internal Communications
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Active Notifications</h1>
          <p className="text-slate-500 font-medium text-lg">
            You have <span className="text-blue-600 font-bold underline underline-offset-4">{unreadCount} unread</span> updates requiring your attention.
          </p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-bold text-slate-500 uppercase tracking-widest">
          <Zap size={14} className="text-blue-600" />
          Live Updates Enabled
        </div>
      </header>

      <div className="bg-white rounded-[2rem] card-shadow overflow-hidden border border-slate-200">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-40 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syncing Inbox...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-32 space-y-8">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-[2.5rem] bg-slate-50 text-slate-200 border-2 border-dashed border-slate-100">
              <Inbox size={48} strokeWidth={1.5} />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">System Clear</h3>
              <p className="text-slate-500 max-w-sm mx-auto font-medium leading-relaxed px-6">
                Your communication log is currently empty. We'll notify you here when new opportunities emerge.
              </p>
            </div>
            <button
              onClick={fetchNotifications}
              className="text-blue-600 font-bold hover:underline uppercase tracking-widest text-[10px]"
            >
              Manual Refresh
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {notifications.map(notification => (
              <li
                key={notification.id}
                className={`group p-10 transition-all duration-300 ${!notification.is_read ? 'bg-blue-50/20' : 'hover:bg-slate-50'}`}
              >
                <div className="flex gap-8 items-start">
                  <div className={`mt-2.5 flex-shrink-0 w-3 h-3 rounded-full shadow-lg ${!notification.is_read ? 'bg-blue-600 ring-4 ring-blue-100 animate-pulse' : 'bg-slate-200 border-2 border-white'}`} />

                  <div className="flex-1 space-y-4">
                    <p className={`text-lg leading-relaxed tracking-tight ${!notification.is_read ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Clock size={12} className="mr-2 text-blue-500" />
                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                      </div>
                      {!notification.is_read && (
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2 py-0.5 bg-blue-100 rounded">New</span>
                      )}
                    </div>
                  </div>

                  {!notification.is_read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="flex-shrink-0 p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-600 hover:shadow-md transition-all active:scale-95"
                      title="Mark as read"
                    >
                      <Check size={18} strokeWidth={3} />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

