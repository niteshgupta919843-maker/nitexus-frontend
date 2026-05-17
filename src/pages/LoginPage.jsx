
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/userService';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser(form);
      login(data.data); // Save user to context + localStorage
      toast.success(`Welcome back, ${data.data.name.split(' ')[0]}!`, {
        style: { background: '#1a1a1a', color: '#fff', border: '1px solid #c9941c' },
      });
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Check your credentials.', {
        style: { background: '#1a1a1a', color: '#fff', border: '1px solid #2a2a2a' },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="font-display text-3xl text-gold-400 tracking-[0.2em] mb-1">NITEXUS</div>
          <div className="w-8 h-px bg-gold-500/40 mx-auto mb-6" />
          <h1 className="font-display text-2xl font-light text-white">Welcome Back</h1>
          <p className="font-body text-xs text-gray-500 mt-2 tracking-wider">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-body text-[10px] tracking-widest text-gray-500 uppercase mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="input-luxury"
              required
            />
          </div>
          <div>
            <label className="block font-body text-[10px] tracking-widest text-gray-500 uppercase mb-2">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input-luxury"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn-gold w-full text-xs mt-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Test credentials hint */}
        <div className="mt-4 p-3 border border-gold-500/20 bg-gold-500/5">
          <p className="font-body text-[10px] text-gray-600 text-center">
            Admin demo: <span className="text-gold-500">admin@nitexus.com</span> / admin123
          </p>
        </div>

        <p className="font-body text-xs text-gray-600 text-center mt-6">
          New to Nitexus?{' '}
          <Link to="/register" className="text-gold-400 hover:text-gold-300 transition-colors">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
