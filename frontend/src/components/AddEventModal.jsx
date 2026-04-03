import { useState } from 'react';
import { X, Calendar, MapPin, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AddEventModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Hackathon',
    mode: 'Online',
    deadline: '',
    link: '',
    source: 'Eventify',
    description: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.deadline || !formData.link) {
      toast.error('Please fill in required fields: Title, Deadline, and Link.');
      return;
    }
    
    // Create new event object (mocking backend save)
    const newEvent = {
        ...formData,
        id: Date.now().toString(),
        // Mock default image
        image: 'https://images.unsplash.com/photo-1542382156909-9057b686e0fc?w=800&q=80'
    };
    
    onAdd(newEvent);
    toast.success('Event successfully added to your feed!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white rounded-lg w-full max-w-2xl shadow-xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-[var(--linkedin-divider)]">
          <h2 className="text-xl font-semibold text-[var(--linkedin-text-primary)]">Add an Event</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-[var(--linkedin-text-secondary)] transition-colors">
             <X size={24} />
          </button>
        </div>

        {/* Body (Scrollable form) */}
        <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
           <form id="add-event-form" onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1">
                 <label className="text-sm font-semibold text-[var(--linkedin-text-primary)]">Event Title *</label>
                 <input name="title" value={formData.title} onChange={handleChange} type="text" placeholder="E.g., Global AI Hackathon 2026" className="w-full px-3 py-2 border border-[var(--linkedin-border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--linkedin-blue)] text-sm" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-sm font-semibold text-[var(--linkedin-text-primary)]">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border border-[var(--linkedin-border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--linkedin-blue)] text-sm bg-white">
                       <option value="Hackathon">Hackathon</option>
                       <option value="Internship">Internship</option>
                       <option value="Workshop">Workshop</option>
                       <option value="Competition">Competition</option>
                    </select>
                 </div>
                 <div className="space-y-1">
                    <label className="text-sm font-semibold text-[var(--linkedin-text-primary)]">Mode</label>
                    <select name="mode" value={formData.mode} onChange={handleChange} className="w-full px-3 py-2 border border-[var(--linkedin-border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--linkedin-blue)] text-sm bg-white">
                       <option value="Online">Online</option>
                       <option value="In-Person">In-Person</option>
                       <option value="Hybrid">Hybrid</option>
                    </select>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-sm font-semibold text-[var(--linkedin-text-primary)] flex items-center gap-1"><Calendar size={14}/> Deadline *</label>
                    <input name="deadline" value={formData.deadline} onChange={handleChange} type="date" className="w-full px-3 py-2 border border-[var(--linkedin-border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--linkedin-blue)] text-sm" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-sm font-semibold text-[var(--linkedin-text-primary)] flex items-center gap-1"><LinkIcon size={14}/> Application Link *</label>
                    <input name="link" value={formData.link} onChange={handleChange} type="url" placeholder="https://" className="w-full px-3 py-2 border border-[var(--linkedin-border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--linkedin-blue)] text-sm" />
                 </div>
              </div>

              <div className="space-y-1">
                 <label className="text-sm font-semibold text-[var(--linkedin-text-primary)]">Description</label>
                 <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Share details about this opportunity..." className="w-full px-3 py-2 border border-[var(--linkedin-border)] rounded focus:outline-none focus:ring-1 focus:ring-[var(--linkedin-blue)] text-sm resize-none"></textarea>
              </div>

           </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--linkedin-divider)] flex justify-end gap-3 rounded-b-lg">
           <button onClick={onClose} className="px-4 py-1.5 font-semibold text-[var(--linkedin-text-secondary)] hover:bg-slate-100 rounded-full transition-colors text-sm">Cancel</button>
           <button type="submit" form="add-event-form" className="btn-primary text-sm px-5 py-1.5">Post Event</button>
        </div>
      </div>
    </div>
  );
}
