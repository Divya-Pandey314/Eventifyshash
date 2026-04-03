import { Briefcase, Search, MapPin } from 'lucide-react';

export default function Jobs() {
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center">
      {/* Left Sidebar */}
      <aside className="hidden md:block w-full md:w-[225px] flex-shrink-0 space-y-4">
        <div className="card p-4 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="text-[var(--linkedin-text-primary)]" size={20} />
            <h2 className="font-semibold text-[var(--linkedin-text-primary)]">My jobs</h2>
          </div>
          <div className="space-y-3">
             <div className="text-sm font-semibold text-[var(--linkedin-text-secondary)] hover:text-[var(--linkedin-text-primary)] cursor-pointer">Preferences</div>
             <div className="text-sm font-semibold text-[var(--linkedin-text-secondary)] hover:text-[var(--linkedin-text-primary)] cursor-pointer">My resume</div>
             <div className="text-sm font-semibold text-[var(--linkedin-text-secondary)] hover:text-[var(--linkedin-text-primary)] cursor-pointer">Interview prep</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 max-w-[555px] space-y-4">
        <div className="card p-6 text-center py-20">
          <div className="flex justify-center mb-4">
             <div className="bg-slate-100 p-4 rounded-full text-slate-400">
               <Briefcase className="h-10 w-10" />
             </div>
          </div>
          <h2 className="text-xl font-semibold text-[var(--linkedin-text-primary)] mb-2">Job recommendations coming soon</h2>
          <p className="text-sm text-[var(--linkedin-text-secondary)] max-w-sm mx-auto mb-6">
            We're building a tailored job board for internships and entry-level positions. Check back soon for updates!
          </p>
          <div className="flex items-center max-w-md mx-auto relative">
             <Search size={16} className="absolute left-3 text-[var(--linkedin-text-secondary)]" />
             <input type="text" placeholder="Search by title, skill, or company" className="w-full border border-[var(--linkedin-border)] rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--linkedin-blue)]" />
             <button className="bg-[var(--linkedin-blue)] text-white font-semibold text-sm px-4 py-2 rounded-r-md absolute right-0 top-0 bottom-0 hover:bg-[var(--linkedin-blue-hover)]">Search</button>
          </div>
        </div>
      </div>
      
      {/* Right Sidebar */}
      <aside className="hidden lg:block w-[300px] flex-shrink-0 space-y-4">
          <div className="card p-4">
             <h3 className="text-sm font-semibold text-[var(--linkedin-text-primary)] mb-2">Job seeker guidance</h3>
             <p className="text-xs text-[var(--linkedin-text-secondary)] mb-4">Recommended based on your activity</p>
             <div className="text-sm font-semibold text-[var(--linkedin-text-secondary)] hover:text-[var(--linkedin-blue)] cursor-pointer hover:underline mb-2">I want to improve my resume</div>
             <div className="text-sm font-semibold text-[var(--linkedin-text-secondary)] hover:text-[var(--linkedin-blue)] cursor-pointer hover:underline">Explore career paths</div>
          </div>
      </aside>
    </div>
  );
}
