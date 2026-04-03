import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Home, Bookmark, Bell, CircleUserRound, Search, Menu, X, Trophy, Briefcase, Monitor, Dumbbell, Gamepad2, ChevronRight, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NotificationDropdown from './NotificationDropdown';

const Layout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => { try { await logout(); navigate('/login'); } catch (e) { console.error(e); }};
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: 'Home', path: '/', icon: <Home size={20} /> },
  ];

  const authNavLinks = [
    { label: 'My Activities', path: '/my-events', icon: <Bookmark size={20} /> },
    { label: 'Profile', path: '/profile', icon: <CircleUserRound size={20} /> },
  ];

  const menuSections = [
    { title: 'Explore', items: [
      { label: 'Hackathons', path: '/?filter=Hackathon', icon: <Trophy size={18} /> },
      { label: 'Internships', path: '/?filter=Internship', icon: <Briefcase size={18} /> },
      { label: 'Webinars', path: '/?filter=Webinar', icon: <Monitor size={18} /> },
      { label: 'Sports', path: '/?filter=Sports', icon: <Dumbbell size={18} /> },
      { label: 'Competitions', path: '/?filter=Competition', icon: <Gamepad2 size={18} /> },
    ]},
    { title: 'Others', items: [
      { label: 'My Activity', path: '/my-events', icon: <Bookmark size={18} /> },
      { label: 'Settings', path: '/profile', icon: <Settings size={18} /> },
    ]},
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[64px] px-4 lg:px-8">

          {/* Left: Logo + Hamburger */}
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors lg:hidden">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link to="/" className="flex items-center gap-2.5 select-none">
              <img src="/images/events/logo.png" alt="Eventify" className="h-8 w-8 rounded-lg object-cover" />
              <span className="text-[22px] font-[800] tracking-tight text-[#2563EB]" style={{fontFamily:'Sora,sans-serif'}}>
                Eventify<span className="text-orange-500">.</span>
              </span>
            </Link>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 max-w-[520px] mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search events, internships, hackathons, workshops..."
                onChange={(e) => {
                  if (e.target.value) {
                    navigate('/?search=' + encodeURIComponent(e.target.value));
                  } else {
                    navigate('/');
                  }
                }}
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 text-[14px] font-medium focus:outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Right: Nav Links */}
          <div className="flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}
                className={`hidden lg:flex flex-col items-center justify-center px-4 py-1.5 rounded-xl text-[11px] font-[600] transition-all ${
                  isActive(link.path) ? 'text-[#2563EB] bg-blue-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.icon}
                <span className="mt-0.5">{link.label}</span>
              </Link>
            ))}

            {/* Auth-only nav links: My Activities, Profile, Notifications */}
            {currentUser && (
              <>
                {authNavLinks.map(link => (
                  <Link key={link.path} to={link.path}
                    className={`hidden lg:flex flex-col items-center justify-center px-4 py-1.5 rounded-xl text-[11px] font-[600] transition-all ${
                      isActive(link.path) ? 'text-[#2563EB] bg-blue-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.icon}
                    <span className="mt-0.5">{link.label}</span>
                  </Link>
                ))}

                <Link to="/notifications"
                  className={`hidden lg:flex flex-col items-center justify-center px-4 py-1.5 rounded-xl text-[11px] font-[600] transition-all relative ${
                    isActive('/notifications') ? 'text-[#2563EB] bg-blue-50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="relative">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                  </div>
                  <span className="mt-0.5">Notifications</span>
                </Link>
              </>
            )}

            {/* Desktop Hamburger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="hidden lg:flex p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors">
              <Menu size={20} />
            </button>

            {!currentUser && (
              <Link to="/login" className="ml-2 px-5 py-2 rounded-full bg-[#2563EB] text-white text-[13px] font-[700] hover:bg-blue-700 transition-colors shadow-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Slide-in Hamburger Menu Panel */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm" onClick={() => setMenuOpen(false)}>
          <div ref={menuRef} onClick={e => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-[300px] bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <span className="font-[800] text-[18px] text-gray-900">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6">
              {menuSections.map(section => (
                <div key={section.title}>
                  <p className="text-[11px] font-[800] uppercase tracking-widest text-gray-400 mb-3 px-2">{section.title}</p>
                  <div className="space-y-1">
                    {section.items.map(item => (
                      <Link key={item.label} to={item.path} onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-[600] text-gray-700 hover:bg-blue-50 hover:text-[#2563EB] transition-colors group"
                      >
                        <span className="text-gray-400 group-hover:text-[#2563EB] transition-colors">{item.icon}</span>
                        {item.label}
                        <ChevronRight size={14} className="ml-auto text-gray-300 group-hover:text-blue-400" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {currentUser && (
              <div className="p-4 border-t border-gray-100">
                <button onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[14px] font-[600] text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-10 mt-auto">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#2563EB] font-[800] text-[18px]" style={{fontFamily:'Sora'}}>Eventify<span className="text-orange-500">.</span></span>
            <span className="text-gray-400 text-[13px] font-[500] border-l border-gray-200 pl-3 ml-1">Built for Students</span>
          </div>
          <div className="flex gap-6 text-[13px] font-[600] text-gray-500">
            <Link to="#" className="hover:text-[#2563EB] transition-colors">About</Link>
            <Link to="#" className="hover:text-[#2563EB] transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-[#2563EB] transition-colors">Terms</Link>
            <Link to="#" className="hover:text-[#2563EB] transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
