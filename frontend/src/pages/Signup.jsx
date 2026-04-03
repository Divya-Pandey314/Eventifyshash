import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sparkles, Calendar, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      setLoading(true);
      await signup(email, password);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setLoading(true);
      await loginWithGoogle();
      toast.success('Signed in with Google!');
      navigate('/');
    } catch (error) {
      toast.error('Google Sign-In failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left Content Area */}
      <div className="flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-[#f8fafc]">
        <div className="max-w-md w-full space-y-10 py-12">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 group mb-4">
              <img src="/images/events/logo.png" alt="Logo" className="h-10 w-10" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 tracking-tight">Eventify</span>
            </Link>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Get Started</h2>
            <p className="text-slate-500 font-medium">Create your institutional profile and start exploring.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Academic Email</label>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
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
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Confirm</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      required
                      className="block w-full pl-12 pr-4 py-4 rounded-xl bg-white border border-slate-200 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              Initialize Profile <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
            >
              <img className="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
              Sign up with Google
            </button>
          </form>

          <p className="text-center text-slate-500 font-medium">
            Already registered?{' '}
            <Link to="/login" className="text-blue-600 font-bold hover:underline underline-offset-4">Sign in to Portal</Link>
          </p>
        </div>
      </div>

      {/* Right Branding Section */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-blue-700 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mt-32 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full -mr-48 -mb-48 blur-3xl pointer-events-none" />

        <div className="relative z-10 text-right">
          <div className="inline-flex items-center gap-3 mb-16">
            <span className="text-2xl font-bold tracking-tight">Access Excellence</span>
            <CheckCircle2 size={32} className="text-blue-300" />
          </div>

          <div className="space-y-8 max-w-md ml-auto">
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
              Bridge the Gap <br />
              <span className="text-blue-300">to Success.</span>
            </h1>
            <p className="text-blue-100/80 text-lg font-medium leading-relaxed">
              Join thousands of students who never miss an opportunity. From local workshops to global hackathons.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-xs font-bold text-blue-200 uppercase tracking-widest">Ongoing Events</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-xs font-bold text-blue-200 uppercase tracking-widest">Sources Scraped</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-12 border-t border-white/10 flex justify-between items-center">
          <p className="text-blue-200/60 text-[10px] font-black uppercase tracking-widest">
            Powered by Smart Scraper technology
          </p>
        </div>
      </div>
    </div>
  );
}

