
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-luxury-black/95 backdrop-blur-sm border-b border-luxury-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className="font-display text-xl font-light text-gold-400 tracking-[0.2em] group-hover:text-gold-300 transition-colors">
              NITEXUS
            </span>
            <span className="font-body text-[9px] tracking-[0.35em] text-gray-500 uppercase">
              Jewellery
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/products" className="nav-link">Collections</Link>
            {user && <Link to="/orders" className="nav-link">My Orders</Link>}
            {user?.isAdmin && <Link to="/admin" className="nav-link text-gold-400">Admin</Link>}
          </div>

          {/* Right side: auth + cart */}
          <div className="flex items-center gap-4">
            {/* Cart icon */}
            <Link to="/cart" className="relative group">
              <svg className="w-5 h-5 text-gray-300 group-hover:text-gold-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-xs text-gray-400 font-body">Hi, {user.name.split(' ')[0]}</span>
                <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-red-400 transition-colors font-body uppercase tracking-wider">
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login" className="text-xs text-gray-300 hover:text-gold-400 transition-colors font-body uppercase tracking-wider">Login</Link>
                <Link to="/register" className="btn-gold text-[10px] py-2 px-4">Register</Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-300 hover:text-gold-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-luxury-border py-4 space-y-3 animate-slide-up">
            <Link to="/products" className="block text-sm text-gray-300 hover:text-gold-400 py-2 font-body uppercase tracking-wider" onClick={() => setMenuOpen(false)}>Collections</Link>
            {user && <Link to="/orders" className="block text-sm text-gray-300 hover:text-gold-400 py-2 font-body uppercase tracking-wider" onClick={() => setMenuOpen(false)}>My Orders</Link>}
            {user?.isAdmin && <Link to="/admin" className="block text-sm text-gold-400 py-2 font-body uppercase tracking-wider" onClick={() => setMenuOpen(false)}>Admin</Link>}
            {user ? (
              <button onClick={handleLogout} className="block text-sm text-red-400 py-2 font-body uppercase tracking-wider">Logout</button>
            ) : (
              <>
                <Link to="/login" className="block text-sm text-gray-300 hover:text-gold-400 py-2 font-body uppercase tracking-wider" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="block text-sm text-gray-300 hover:text-gold-400 py-2 font-body uppercase tracking-wider" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        .nav-link {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9ca3af;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #c9941c; }
      `}</style>
    </nav>
  );
};

export default Navbar;
