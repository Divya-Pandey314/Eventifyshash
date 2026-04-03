import { useState, useEffect } from 'react';
import { CircleUserRound, Mail, Shield, Loader2, Key, ArrowRight, BookCheck, Settings, Award, Briefcase, GraduationCap, MapPin, Link as LinkIcon, Camera, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function Profile() {
  const { currentUser, resetPassword } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resettingPwd, setResettingPwd] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [oppAlerts, setOppAlerts] = useState(true);
  const [profilePublic, setProfilePublic] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/profile');
        setProfilePublic(res.data?.isPublic || false);
        setProfileData(res.data);
      } catch (error) {
        toast.error('Could not load detailed profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handlePasswordReset = async () => {
    try {
      setResettingPwd(true);
      await resetPassword(currentUser.email);
      toast.success('Reset link sent to your email!');
    } catch (error) {
      toast.error('Failed to send reset email');
    } finally {
      setResettingPwd(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-40">
        <Loader2 className="h-12 w-12 animate-spin text-[var(--color-primary)] mb-4" />
        <p className="text-[var(--color-slate-gray)] font-[600]">Setting up your identity...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <CircleUserRound size={18} /> },
    { id: 'experience', label: 'Experience & Education', icon: <GraduationCap size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Banner & Header Image */}
      <div className="w-full h-48 md:h-64 rounded-t-[24px] bg-gradient-to-r from-[var(--color-primary)] to-[#14add9] relative overflow-hidden flex items-end justify-end p-4 lg:p-6">
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative -mt-24 px-4 lg:px-8">
        
        {/* Left Column: Avatar & Summary Sticky Card */}
        <div className="lg:col-span-4 flex flex-col gap-6 relative z-20">
          <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[var(--color-cool-gray)] flex flex-col items-center text-center">
            
            <div className="relative -mt-20 mb-6">
              <div className="h-32 w-32 bg-white rounded-full flex items-center justify-center p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-[var(--color-cool-gray)]">
                <div className="w-full h-full bg-[var(--color-ice-blue)] rounded-full flex items-center justify-center text-[var(--color-primary)] overflow-hidden">
                   <CircleUserRound size={64} strokeWidth={1.5} />
                </div>
              </div>
              <div className="absolute bottom-1 right-1 bg-[var(--color-emerald)] p-2 rounded-full text-white shadow-lg border-2 border-white" title="Verified Member">
                <Shield size={16} />
              </div>
            </div>

            <div className="space-y-1 mb-6 w-full">
              <h1 className="text-2xl font-[800] text-[var(--color-ink-black)] tracking-tight">
                {profileData?.name || currentUser?.displayName || 'Student User'}
              </h1>
              <p className="text-[14px] font-[500] text-[var(--color-primary)]">Frontend Developer <span className="text-[var(--color-slate-gray)]">at</span> Meta</p>
              
              <div className="flex items-center justify-center gap-1.5 text-[13px] text-[var(--color-slate-gray)] font-[500] mt-2">
                 <MapPin size={14} /> Kathmandu, Nepal
              </div>
            </div>

            <div className="w-full border-t border-[var(--color-cool-gray)] my-6"></div>

            <div className="w-full flex justify-between items-center text-left">
              <div>
                <p className="text-[12px] font-[600] text-[var(--color-slate-gray)] uppercase tracking-wider mb-1">Profile Views</p>
                <p className="text-xl font-[800] text-[var(--color-ink-black)]">0</p>
              </div>
              <div className="text-right">
                <p className="text-[12px] font-[600] text-[var(--color-slate-gray)] uppercase tracking-wider mb-1">Applications</p>
                <p className="text-xl font-[800] text-[var(--color-ink-black)]">1</p>
              </div>
            </div>
          </div>

          {/* Quick Links Card */}
          <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[var(--color-cool-gray)] space-y-4">
             <h3 className="font-[700] text-[16px] text-[var(--color-ink-black)] mb-2">Portfolio</h3>
             <div className="flex items-center gap-2 text-[14px] font-[600] text-[var(--color-primary)] cursor-pointer hover:underline">
               <LinkIcon size={16} /> add personal portfolio link
             </div>
          </div>
        </div>

        {/* Right Column: Tabbed Content Area */}
        <div className="lg:col-span-8 flex flex-col relative z-10 pt-4 lg:pt-24">
          
          {/* Custom Tabs Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
             {tabs.map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={`flex items-center gap-2 px-6 py-3 rounded-full font-[700] text-[14px] whitespace-nowrap transition-all ${
                   activeTab === tab.id 
                    ? 'bg-[var(--color-primary)] text-white shadow-md' 
                    : 'bg-white text-[var(--color-slate-gray)] border border-[var(--color-cool-gray)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                 }`}
               >
                 {tab.icon} {tab.label}
               </button>
             ))}
          </div>

          {/* Tab Panes */}
          <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[var(--color-cool-gray)] p-8 min-h-[500px]">
             
             {/* OVERVIEW TAB */}
             {activeTab === 'overview' && (
               <div className="space-y-10 animate-fade-in">
                 <section>
                   <h2 className="text-xl font-[800] text-[var(--color-ink-black)] mb-4">About Me</h2>
                   <p className="text-[15px] font-[500] text-[var(--color-slate-gray)] leading-relaxed">
                     Passionate computer science student deeply interested in frontend engineering and UI/UX design. I constantly seek out hackathons to challenge myself and build tools that solve genuine problems. Looking for internship opportunities in fast-paced software teams where I can learn and contribute.
                   </p>
                 </section>

                 <div className="w-full border-t border-[var(--color-cool-gray)]"></div>

                 <section>
                   <h2 className="text-xl font-[800] text-[var(--color-ink-black)] mb-4">Skills & Strengths</h2>
                   <div className="flex flex-wrap gap-2">
                     {['React.js', 'TailwindCSS', 'Node.js', 'Figma', 'UI Design', 'Public Speaking', 'Git'].map((skill, i) => (
                        <span key={i} className="px-4 py-2 bg-[var(--color-ghost-white)] text-[var(--color-ink-black)] font-[600] text-[13px] rounded-[10px] border border-[var(--color-cool-gray)]">
                          {skill}
                        </span>
                     ))}
                   </div>
                 </section>
               </div>
             )}

             {/* EXPERIENCE & EDUCATION TAB */}
             {activeTab === 'experience' && (
               <div className="space-y-10 animate-fade-in">
                 <section>
                   <div className="flex items-center justify-between mb-6">
                     <h2 className="text-xl font-[800] text-[var(--color-ink-black)]">Experience</h2>
                     <button className="text-[var(--color-primary)] text-[14px] font-[700] hover:underline">+ Add</button>
                   </div>
                   
                   <div className="flex gap-4">
                     <div className="w-12 h-12 rounded-[12px] bg-slate-100 border border-[var(--color-cool-gray)] flex-shrink-0 flex items-center justify-center font-bold text-xl text-[var(--color-primary)]">G</div>
                     <div>
                       <h3 className="text-[16px] font-[700] text-[var(--color-ink-black)]">Frontend Developer Intern</h3>
                       <p className="text-[14px] font-[500] text-[var(--color-slate-gray)] mt-0.5">Google • Remote</p>
                       <p className="text-[13px] font-[500] text-[var(--color-slate-gray)] mt-0.5">Jan 2025 - Present (1 yr 3 mos)</p>
                       <p className="text-[14px] font-[500] text-[var(--color-ink-black)] mt-3 max-w-2xl">
                         Developed internal dashboards using React and Material UI. Reduced bundle size by 15% through lazy loading implementation.
                       </p>
                     </div>
                   </div>
                 </section>

                 <div className="w-full border-t border-[var(--color-cool-gray)]"></div>

                 <section>
                   <div className="flex items-center justify-between mb-6">
                     <h2 className="text-xl font-[800] text-[var(--color-ink-black)]">Education</h2>
                     <button className="text-[var(--color-primary)] text-[14px] font-[700] hover:underline">+ Add</button>
                   </div>
                   
                   <div className="flex gap-4">
                     <div className="w-12 h-12 rounded-[12px] bg-slate-100 border border-[var(--color-cool-gray)] flex-shrink-0 flex items-center justify-center font-bold text-xl text-[var(--color-primary)]">W</div>
                     <div>
                       <h3 className="text-[16px] font-[700] text-[var(--color-ink-black)]">Westcliff University</h3>
                       <p className="text-[14px] font-[500] text-[var(--color-slate-gray)] mt-0.5">Bachelor of Science in Information Technology (BSc.IT)</p>
                       <p className="text-[13px] font-[500] text-[var(--color-slate-gray)] mt-0.5">2022 - 2026</p>
                     </div>
                   </div>
                 </section>
               </div>
             )}

             {/* SETTINGS TAB */}
             {activeTab === 'settings' && (
               <div className="space-y-10 animate-fade-in">
                 
                 <section>
                   <h2 className="text-xl font-[800] text-[var(--color-ink-black)] mb-6 flex items-center gap-2">
                     <Shield size={22} className="text-[var(--color-emerald)]" /> Account & Security
                   </h2>
                   
                   <div className="space-y-6 max-w-3xl">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-[var(--color-ghost-white)] rounded-[16px] border border-[var(--color-cool-gray)]">
                       <div>
                         <h4 className="font-[700] text-[15px] text-[var(--color-ink-black)]">Primary Email</h4>
                         <p className="text-[13px] font-[500] text-[var(--color-slate-gray)] mt-1">{currentUser?.email || "taescupandcookies@gmail.com"}</p>
                       </div>
                       <button className="px-4 py-2 border border-[var(--color-slate-gray)] text-[var(--color-slate-gray)] font-[600] text-[13px] rounded-full hover:bg-slate-100 transition-colors">
                         Change
                       </button>
                     </div>

                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-[var(--color-ghost-white)] rounded-[16px] border border-[var(--color-cool-gray)]">
                       <div className="pr-4">
                         <h4 className="font-[700] text-[15px] text-[var(--color-ink-black)] flex items-center gap-1.5"><Key size={16}/> Password Reset</h4>
                         <p className="text-[13px] font-[500] text-[var(--color-slate-gray)] mt-1">Initiate a secure password update via your primary email address.</p>
                       </div>
                       <button 
                         onClick={handlePasswordReset}
                         disabled={resettingPwd}
                         className="flex-shrink-0 px-5 py-2.5 bg-[var(--color-primary)] text-white font-[700] text-[13px] rounded-full hover:bg-[var(--color-primary-hover)] transition-colors shadow-sm flex items-center justify-center gap-2"
                       >
                         {resettingPwd ? 'Sending...' : 'Send Reset Link'} <ArrowRight size={14} />
                       </button>
                     </div>
                   </div>
                 </section>

                 <div className="w-full border-t border-[var(--color-cool-gray)]"></div>

                 <section>
                   <h2 className="text-xl font-[800] text-[var(--color-ink-black)] mb-6 flex items-center gap-2">
                     <Bell size={22} className="text-[var(--color-signal-orange)]" /> Preferences
                   </h2>
                   
                   <div className="space-y-4 max-w-3xl">
                     <label className="flex items-center justify-between p-4 border border-[var(--color-cool-gray)] rounded-[16px] cursor-pointer hover:bg-[var(--color-ghost-white)] transition-colors">
                       <div>
                         <p className="font-[700] text-[15px] text-[var(--color-ink-black)]">Email Notifications</p>
                         <p className="text-[13px] font-[500] text-[var(--color-slate-gray)] mt-0.5">Receive updates about your applications.</p>
                       </div>
                       <input type="checkbox" checked={emailNotifs} onChange={(e) => setEmailNotifs(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                     </label>

                     <label className="flex items-center justify-between p-4 border border-[var(--color-cool-gray)] rounded-[16px] cursor-pointer hover:bg-[var(--color-ghost-white)] transition-colors">
                       <div>
                         <p className="font-[700] text-[15px] text-[var(--color-ink-black)]">Opportunity Alerts</p>
                         <p className="text-[13px] font-[500] text-[var(--color-slate-gray)] mt-0.5">Get notified when hackathons match your skills.</p>
                       </div>
                       <input type="checkbox" checked={oppAlerts} onChange={(e) => setOppAlerts(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                     </label>
                   </div>
                 </section>
                 
               </div>
             )}

          </div>
        </div>
      </div>
    </div>
  );
}
