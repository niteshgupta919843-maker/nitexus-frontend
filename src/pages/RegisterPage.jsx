
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/userService';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    setLoading(true);
    try {
      const { data } = await registerUser({ name: form.name, email: form.email, password: form.password });
      login(data.data);
      toast.success('Account created! Welcome to Nitexus 🎉', {
        style: { background: '#1a1a1a', color: '#fff', border: '1px solid #c9941c' },
      });
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-4 animate-fade-in">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="font-display text-3xl text-gold-400 tracking-[0.2em] mb-1">NITEXUS</div>
          <div className="w-8 h-px bg-gold-500/40 mx-auto mb-6" />
          <h1 className="font-display text-2xl font-light text-white">Create Account</h1>
          <p className="font-body text-xs text-gray-500 mt-2 tracking-wider">Join our exclusive collection</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-body text-[10px] tracking-widest text-gray-500 uppercase mb-2">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="input-luxury" required />
          </div>
          <div>
            <label className="block font-body text-[10px] tracking-widest text-gray-500 uppercase mb-2">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="input-luxury" required />
          </div>
          <div>
            <label className="block font-body text-[10px] tracking-widest text-gray-500 uppercase mb-2">Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" className="input-luxury" required />
          </div>
          <div>
            <label className="block font-body text-[10px] tracking-widest text-gray-500 uppercase mb-2">Confirm Password</label>
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" className="input-luxury" required />
          </div>

          <button type="submit" disabled={loading} className={`btn-gold w-full text-xs mt-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="font-body text-xs text-gray-600 text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-gold-400 hover:text-gold-300 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
