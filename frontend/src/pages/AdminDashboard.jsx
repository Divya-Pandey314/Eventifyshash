import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, Search, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'Hackathon', deadline: '', mode: 'Online', link: '', source: 'Admin'
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/events');
      setEvents(data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Failed to fetch events as admin');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.delete(`/admin/events/${id}`);
      setEvents(events.filter(e => e.id !== id));
      toast.success('Event deleted');
    } catch (err) {
      toast.error('Failed to delete event');
    }
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      description: event.description || '',
      category: event.category,
      deadline: event.deadline ? event.deadline.split('T')[0] : '',
      mode: event.mode,
      link: event.link,
      source: event.source || 'Admin'
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', category: 'Hackathon', deadline: '', mode: 'Online', link: '', source: 'Admin' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/events/${editingId}`, formData);
        toast.success('Event updated successfully');
      } else {
        await api.post('/admin/events', formData);
        toast.success('Event created successfully');
      }
      setIsModalOpen(false);
      fetchEvents();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Operation failed');
    }
  };

  const filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (e.source && e.source.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-[800] text-[var(--color-ink-black)] tracking-tight">Admin Dashboard</h1>
          <p className="text-[var(--color-slate-gray)] mt-1 font-[500]">Manage all platform opportunities in one place.</p>
        </div>
        <button onClick={handleAdd} className="btn-primary flex items-center gap-2 py-2.5 px-6 shadow-md hover:-translate-y-0.5 transition-transform">
          <Plus size={18} strokeWidth={3} /> Add Opportunity
        </button>
      </div>

      <div className="bg-white rounded-[20px] shadow-[0_4px_16px_rgba(28,73,128,0.06)] border border-[var(--color-cool-gray)] overflow-hidden">
        <div className="p-5 border-b border-[var(--color-cool-gray)] bg-[var(--color-ghost-white)]">
          <div className="relative max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-slate-gray)]" size={18} />
            <input 
              type="text" 
              placeholder="Search by title or source..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-[12px] border border-[var(--color-cool-gray)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all text-[13px] font-[600] tracking-wide placeholder:font-[500]"
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-[var(--color-slate-gray)]">
              <Loader2 className="animate-spin text-[var(--color-signal-orange)] mb-3" size={40} />
              <span className="font-[600]">Verifying admin credentials & loading data...</span>
            </div>
          ) : (
            <table className="w-full text-left text-[13px] whitespace-nowrap">
              <thead className="bg-[#f8fafc] text-[var(--color-primary)] font-[800] text-[11px] uppercase tracking-widest border-b border-[var(--color-cool-gray)]">
                <tr>
                  <th className="px-6 py-4 rounded-tl-[12px]">Opportunity Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Deadline</th>
                  <th className="px-6 py-4">Source</th>
                  <th className="px-6 py-4 text-right rounded-tr-[12px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-cool-gray)] text-[var(--color-ink-black)] font-[600]">
                {filteredEvents.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-12 text-center text-[var(--color-slate-gray)] font-[500]">No opportunities matched your search criteria.</td></tr>
                ) : (
                  filteredEvents.map(event => (
                    <tr key={event.id} className="hover:bg-[var(--color-ice-blue)]/50 transition-colors">
                      <td className="px-6 py-4 flex flex-col justify-center">
                        <div className="font-[800] text-[14px] truncate max-w-[300px] text-[var(--color-primary)]">{event.title}</div>
                        <div className="text-[10px] mt-1 text-[var(--color-slate-gray)] font-[700] hover:text-[var(--color-signal-orange)] transition-colors"><a href={event.link} target="_blank" rel="noopener noreferrer">VIEW EXTERNAL LINK ↗</a></div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1.5 rounded-full text-[10px] font-[800] uppercase tracking-wide bg-indigo-50 text-indigo-700 border border-indigo-100">{event.category}</span>
                      </td>
                      <td className="px-6 py-4 font-[700] text-[var(--color-slate-gray)]">{event.deadline ? new Date(event.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}) : 'No Deadline'}</td>
                      <td className="px-6 py-4"><span className="px-2.5 py-1.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-[700]">{event.source || 'Manual'}</span></td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button onClick={() => handleEdit(event)} className="p-2 text-blue-600 hover:bg-white border border-transparent hover:border-blue-200 hover:shadow-sm rounded-[10px] transition-all"><Edit2 size={16} strokeWidth={2.5}/></button>
                          <button onClick={() => handleDelete(event.id)} className="p-2 text-red-600 hover:bg-white border border-transparent hover:border-red-200 hover:shadow-sm rounded-[10px] transition-all"><Trash2 size={16} strokeWidth={2.5}/></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
           <div className="bg-white rounded-[24px] w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden transform transition-all">
             <div className="flex justify-between items-center p-6 border-b border-[var(--color-cool-gray)] bg-[var(--color-ghost-white)]">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white"><Edit2 size={18} /></div>
                 <h2 className="text-[20px] font-[800] text-[var(--color-ink-black)] tracking-tight">{editingId ? 'Edit Selected Record' : 'Create New Record'}</h2>
               </div>
               <button onClick={() => setIsModalOpen(false)} className="text-[var(--color-slate-gray)] hover:bg-slate-200 hover:text-black w-8 h-8 flex items-center justify-center rounded-full transition-colors text-[16px] font-bold">✕</button>
             </div>
             <div className="p-8 overflow-y-auto no-scrollbar">
               <form id="admin-event-form" onSubmit={handleSubmit} className="space-y-6">
                 <div>
                   <label className="block text-[13px] font-[800] uppercase tracking-widest text-[var(--color-slate-gray)] mb-2">Title</label>
                   <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-[12px] border border-[var(--color-cool-gray)] outline-none focus:border-[var(--color-primary)] font-[600] text-[14px] bg-[#fafafa] focus:bg-white transition-colors" />
                 </div>
                 <div className="grid grid-cols-2 gap-5">
                   <div>
                     <label className="block text-[13px] font-[800] uppercase tracking-widest text-[var(--color-slate-gray)] mb-2">Category</label>
                     <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 rounded-[12px] border border-[var(--color-cool-gray)] outline-none focus:border-[var(--color-primary)] font-[600] text-[14px] bg-[#fafafa] focus:bg-white transition-colors cursor-pointer">
                        <option value="Hackathon">Hackathon</option><option value="Internship">Internship</option><option value="Workshop">Workshop</option><option value="Competition">Competition</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-[13px] font-[800] uppercase tracking-widest text-[var(--color-slate-gray)] mb-2">Mode</label>
                     <select value={formData.mode} onChange={e => setFormData({...formData, mode: e.target.value})} className="w-full px-4 py-3 rounded-[12px] border border-[var(--color-cool-gray)] outline-none focus:border-[var(--color-primary)] font-[600] text-[14px] bg-[#fafafa] focus:bg-white transition-colors cursor-pointer">
                        <option value="Online">Online</option><option value="Offline">Offline</option>
                     </select>
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-5">
                   <div>
                     <label className="block text-[13px] font-[800] uppercase tracking-widest text-[var(--color-slate-gray)] mb-2">Deadline</label>
                     <input type="date" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} className="w-full px-4 py-3 rounded-[12px] border border-[var(--color-cool-gray)] outline-none focus:border-[var(--color-primary)] font-[600] text-[14px] bg-[#fafafa] focus:bg-white transition-colors" />
                   </div>
                   <div>
                     <label className="block text-[13px] font-[800] uppercase tracking-widest text-[var(--color-slate-gray)] mb-2">Source / Sponsor</label>
                     <input type="text" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} className="w-full px-4 py-3 rounded-[12px] border border-[var(--color-cool-gray)] outline-none focus:border-[var(--color-primary)] font-[600] text-[14px] bg-[#fafafa] focus:bg-white transition-colors" placeholder="e.g. Unstop" />
                   </div>
                 </div>
                 <div>
                   <label className="block text-[13px] font-[800] uppercase tracking-widest text-[var(--color-slate-gray)] mb-2">External Link URI</label>
                   <input required type="url" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full px-4 py-3 rounded-[12px] border border-[var(--color-cool-gray)] outline-none focus:border-[var(--color-primary)] font-[600] text-[14px] bg-[#fafafa] focus:bg-white transition-colors" placeholder="https://" />
                 </div>
                 <div>
                   <label className="block text-[13px] font-[800] uppercase tracking-widest text-[var(--color-slate-gray)] mb-2">Description / Theme</label>
                   <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-[12px] border border-[var(--color-cool-gray)] outline-none focus:border-[var(--color-primary)] font-[500] text-[14px] bg-[#fafafa] focus:bg-white transition-colors resize-none" />
                 </div>
               </form>
             </div>
             <div className="p-6 border-t border-[var(--color-cool-gray)] bg-white flex justify-end gap-4 rounded-b-[24px]">
               <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-full font-[700] text-[var(--color-ink-black)] hover:bg-[var(--color-ghost-white)] transition-colors text-[14px]">Cancel</button>
               <button type="submit" form="admin-event-form" className="btn-primary hover:-translate-y-0.5 shadow-lg px-8 py-2.5 text-[14px]">{editingId ? 'Save Core Changes' : 'Initialize Event Data'}</button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
