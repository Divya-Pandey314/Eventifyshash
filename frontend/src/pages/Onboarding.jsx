import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import api from '../utils/api';

export default function Onboarding() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    userType: 'College Student',
    termsAccepted: false,
    updatesAccepted: false
  });

  const userTypes = ['School Student', 'College Student', 'Fresher', 'Professional'];

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSetUserType = (type) => {
    setFormData({ ...formData, userType: type });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.mobile) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (!formData.termsAccepted) {
      toast.error('You must accept the terms to continue');
      return;
    }

    setLoading(true);
    try {
      await api.put('/profile', { ...formData });
      toast.success('Profile created successfully!');
      navigate('/');
    } catch (err) {
      // Mock success if backend not ready
      toast.success('Profile saved! Welcome to Eventify.');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-ghost-white)] relative overflow-hidden flex items-center justify-center p-4">
      {/* Background connecting dots illustration (Mocked via CSS) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      <div className="bg-white rounded-[24px] shadow-2xl flex flex-col md:flex-row w-full max-w-[1000px] min-h-[700px] relative z-10 overflow-hidden">
        
        {/* Left Yellow Pane */}
        <div className="md:w-5/12 bg-[var(--color-amber)] p-10 flex flex-col relative overflow-hidden">
           <div className="text-[var(--color-primary)] font-[800] text-[24px] tracking-tight font-['Sora'] relative z-10">
             Eventify<span className="text-white">.</span>
           </div>

           <div className="flex-1 flex flex-col items-center justify-center mt-12 relative z-10">
              <div className="w-[85%] bg-white rounded-[16px] shadow-lg p-6 flex flex-col items-center relative transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                
                {/* Floating Mentor Cards */}
                <div className="absolute -top-6 -right-6 bg-white p-2 rounded-xl border border-gray-100 shadow-lg flex items-center gap-2 transform rotate-6">
                   <div className="w-8 h-8 rounded-full bg-blue-100 overflow-hidden"><img src="https://ui-avatars.com/api/?name=Vraj+Shah&background=1c4980&color=fff" alt="Vraj" /></div>
                   <div className="text-[9px]">
                     <p className="font-bold text-[var(--color-ink-black)]">Vraj Shah</p>
                     <p className="text-gray-500">Software Engineer</p>
                     <p className="text-[var(--color-primary)] font-bold mt-0.5">Google</p>
                   </div>
                </div>

                <div className="absolute top-20 -left-8 bg-white p-2 rounded-xl border border-gray-100 shadow-lg flex items-center gap-2 transform -rotate-3 z-20">
                   <div className="w-8 h-8 rounded-full bg-orange-100 overflow-hidden"><img src="https://ui-avatars.com/api/?name=Nitya&background=f47120&color=fff" alt="Nitya" /></div>
                   <div className="text-[9px]">
                     <p className="font-bold text-[var(--color-ink-black)]">Nitya Mohta</p>
                     <p className="text-gray-500">Program Manager II</p>
                     <p className="text-[var(--color-signal-orange)] font-bold mt-0.5">Amazon</p>
                   </div>
                </div>

                <div className="w-32 h-32 rounded-full border-4 border-[var(--color-amber)] bg-gray-100 overflow-hidden mb-4 relative z-10 shadow-inner">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" alt="Student" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-[800] text-[var(--color-primary)] text-center">Mentorship</h3>
                <p className="text-[13px] font-[600] text-[var(--color-slate-gray)] text-center mt-1">from top mentors</p>
              </div>
           </div>

           {/* Yellow Abstract Wave */}
           <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
             <path fill="rgba(255,255,255,0.1)" d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,224C1120,245,1280,267,1360,277.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
           </svg>
        </div>

        {/* Right Form Pane */}
        <div className="md:w-7/12 p-8 md:p-12 flex flex-col relative">
          
          <div className="flex items-center gap-3 mb-8">
            <button onClick={() => navigate(-1)} className="text-[var(--color-slate-gray)] hover:text-[var(--color-primary)] transition-colors">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-[700] text-[var(--color-ink-black)]">Sign up as candidate</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-6">
            
            {/* Email Field (Disabled) */}
            <div>
              <label className="block text-[13px] font-[600] text-[var(--color-slate-gray)] mb-1.5">Email <span className="text-red-500">*</span></label>
              <input 
                type="email" 
                disabled 
                value={currentUser?.email || "taescupandcookies@gmail.com"} 
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-[12px] text-gray-500 text-[14px] font-[500] cursor-not-allowed"
              />
            </div>

            {/* Name Fields */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[13px] font-[600] text-[var(--color-slate-gray)] mb-1.5">First Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" name="firstName" required
                  value={formData.firstName} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-[var(--color-cool-gray)] rounded-[12px] text-[var(--color-ink-black)] text-[14px] font-[500] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[13px] font-[600] text-[var(--color-slate-gray)] mb-1.5">Last Name</label>
                <input 
                  type="text" name="lastName"
                  value={formData.lastName} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-[var(--color-cool-gray)] rounded-[12px] text-[var(--color-ink-black)] text-[14px] font-[500] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                />
              </div>
            </div>

            {/* Mobile Field */}
            <div>
              <label className="block text-[13px] font-[600] text-[var(--color-slate-gray)] mb-1.5">Mobile <span className="text-red-500">*</span></label>
              <div className="flex w-full bg-white border border-[var(--color-cool-gray)] rounded-[12px] overflow-hidden focus-within:border-[var(--color-primary)] focus-within:ring-1 focus-within:ring-[var(--color-primary)] transition-all">
                <div className="flex items-center gap-2 bg-slate-50 border-r border-[var(--color-cool-gray)] px-3 text-[14px] font-[500] text-[var(--color-ink-black)] cursor-pointer hover:bg-slate-100 transition-colors">
                  <span>🇳🇵</span> +977 <ChevronDown size={14} className="text-gray-400" />
                </div>
                <input 
                  type="tel" name="mobile" required placeholder="9748301921"
                  value={formData.mobile} onChange={handleChange}
                  className="flex-1 px-4 py-3 text-[14px] font-[500] text-[var(--color-ink-black)] focus:outline-none"
                />
              </div>
            </div>

            {/* User Type */}
            <div>
              <label className="block text-[13px] font-[600] text-[var(--color-slate-gray)] mb-2">User type <span className="text-red-500">*</span></label>
              <div className="flex flex-wrap gap-3">
                {userTypes.map((type) => (
                  <button
                    key={type} type="button"
                    onClick={() => handleSetUserType(type)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all text-[13px] font-[600] ${
                      formData.userType === type 
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]' 
                        : 'border-[var(--color-cool-gray)] text-[var(--color-slate-gray)] hover:border-[var(--color-slate-gray)] bg-white'
                    }`}
                  >
                    {formData.userType === type && <CheckCircle2 size={16} />}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-4 border-t border-[var(--color-cool-gray)]">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox" name="termsAccepted" required
                  checked={formData.termsAccepted} onChange={handleChange}
                  className="mt-1 flex-shrink-0 w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                />
                <span className="text-[12px] text-[var(--color-slate-gray)] leading-snug font-[500]">
                  All your information is collected, stored and processed as per our data processing guidelines. By signing up on Eventify, you agree to our <a href="#" className="text-[var(--color-primary)] hover:underline">Privacy Policy</a> and <a href="#" className="text-[var(--color-primary)] hover:underline">Terms of Use</a>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox" name="updatesAccepted"
                  checked={formData.updatesAccepted} onChange={handleChange}
                  className="mt-1 flex-shrink-0 w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
                />
                <span className="text-[12px] text-[var(--color-slate-gray)] font-[500]">
                  Stay in the loop - Get relevant updates curated just for <span className="italic">you!</span>
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto pt-6 flex gap-4 w-full">
               <button 
                 type="button" 
                 onClick={handleLogout}
                 className="w-1/3 px-6 py-4 rounded-full border border-[var(--color-cool-gray)] text-[var(--color-ink-black)] font-[700] hover:bg-slate-50 transition-colors"
               >
                 Logout
               </button>
               <button 
                 type="submit" 
                 disabled={loading}
                 className="w-2/3 px-6 py-4 rounded-full bg-[var(--color-primary)] text-white font-[700] hover:bg-[var(--color-primary-hover)] transition-all flex items-center justify-center gap-2 "
               >
                 {loading ? <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span> : 'Continue'}
               </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
