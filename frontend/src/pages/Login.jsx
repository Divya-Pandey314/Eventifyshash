import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sparkles, Calendar, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      toast.success('Welcome back to Eventify!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      await loginWithGoogle();
      toast.success('Signed in with Google!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error('Google Sign-In failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left Branding Section */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-blue-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full -ml-48 -mb-48 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 mb-16">
            <img src="/images/events/logo.png" alt="Logo" className="h-10 w-10 brightness-200" />
            <span className="text-2xl font-bold tracking-tight">Eventify</span>
          </Link>

          <div className="space-y-8 max-w-md">
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
              Your Professional <br />
              <span className="text-blue-300">Journey</span> Starts Here.
            </h1>
            <p className="text-blue-100/80 text-lg font-medium leading-relaxed">
              Access a curated list of opportunities designed to elevate your career and academic success.
            </p>

            <ul className="space-y-4 pt-4">
              {[
                "Verified Hackathons & Internships",
                "Real-time Deadline Tracking",
                "Personalized Opportunity Alerts"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-semibold text-blue-100">
                  <CheckCircle2 size={18} className="text-blue-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative z-10 pt-12 border-t border-white/10">
          <p className="text-blue-200/60 text-xs font-bold uppercase tracking-widest">
            Trusted by students
          </p>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-[#f8fafc]">
        <div className="max-w-md w-full space-y-10 py-12">
          <div className="space-y-3">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
              <img src="/images/events/logo.png" alt="Eventify" className="h-10 w-10 rounded-lg object-cover" />
              <span className="text-xl font-[800] tracking-tight text-[#2563EB]" style={{fontFamily:'Sora'}}>Eventify<span className="text-orange-500">.</span></span>
            </Link>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 font-medium">Please enter your credentials to continue.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Official Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                    placeholder="student@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Security Code</label>
                  <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              Sign In to Eventify <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest"><span className="px-4 bg-[#f8fafc] text-slate-400">Institutional Access</span></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
            >
              <img className="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
              Sign in with Google
            </button>
          </form>

          <p className="text-center text-slate-500 font-medium">
            New to Eventify?{' '}
            <Link to="/signup" className="text-blue-600 font-bold hover:underline underline-offset-4">Create Student Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

