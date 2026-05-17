
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { getProducts } from '../services/productService';
import { dummyProducts } from '../data/dummyProducts';

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await getProducts({ featured: true });
        setFeatured(data.data);
      } catch {
        // Use dummy data if backend is not running
        setFeatured(dummyProducts.filter(p => p.isFeatured));
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* ─── Hero Section ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-dark to-luxury-black" />
        
        {/* Decorative gold lines */}
        <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-gold-500/30 to-transparent" />
        <div className="absolute top-1/3 right-8 w-px h-48 bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Eyebrow text */}
          <p className="font-body text-[10px] tracking-[0.5em] text-gold-500/70 uppercase mb-8 animate-slide-up">
            Est. 2020 · Premium Jewellery
          </p>

          {/* Main heading */}
          <h1 className="font-display font-light text-white mb-4" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            Timeless<br />
            <span className="italic text-gold-400">Elegance</span>
          </h1>

          {/* Gold divider */}
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-16 h-px bg-gold-500/40" />
            <div className="w-1.5 h-1.5 bg-gold-500 rotate-45" />
            <div className="w-16 h-px bg-gold-500/40" />
          </div>

          {/* Tagline */}
          <p className="font-body font-light text-gray-400 text-sm md:text-base tracking-wider max-w-lg mx-auto mb-10 leading-relaxed">
            Handcrafted jewellery that celebrates life's most precious moments. Each piece, a masterwork.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-gold text-xs">
              Explore Collection
            </Link>
            <Link to="/products?category=Sets" className="btn-outline text-xs">
              Bridal Sets
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-gold-500/50 to-transparent" />
          <div className="w-1 h-1 bg-gold-500/50 rounded-full" />
        </div>
      </section>

      {/* ─── Categories Section ────────────────────────────── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-[10px] tracking-[0.4em] text-gold-500/60 uppercase mb-3">Discover</p>
          <h2 className="section-heading">Our Collections</h2>
          <div className="gold-divider" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants', 'Sets'].map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${cat}`}
              className="group border border-luxury-border hover:border-gold-500/40 p-4 text-center transition-all duration-300 hover:bg-luxury-card"
            >
              <div className="w-8 h-px bg-gold-500/30 mx-auto mb-3 group-hover:w-12 transition-all duration-300" />
              <span className="font-body text-xs tracking-[0.2em] text-gray-400 group-hover:text-gold-400 uppercase transition-colors">
                {cat}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Featured Products ─────────────────────────────── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-body text-[10px] tracking-[0.4em] text-gold-500/60 uppercase mb-3">Curated for you</p>
          <h2 className="section-heading">Featured Pieces</h2>
          <div className="gold-divider" />
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featured.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/products" className="btn-outline text-xs">
            View All Pieces
          </Link>
        </div>
      </section>

      {/* ─── Brand Promise Section ─────────────────────────── */}
      <section className="py-20 bg-luxury-dark border-y border-luxury-border">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: '◆', title: 'BIS Hallmarked', desc: 'All gold jewellery certified for purity and quality' },
            { icon: '◇', title: 'Free Shipping', desc: 'Complimentary insured shipping across India' },
            { icon: '◈', title: 'Lifetime Care', desc: 'Free cleaning and maintenance for all our pieces' },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-3">
              <span className="text-gold-400 text-lg">{item.icon}</span>
              <h3 className="font-body text-xs tracking-[0.25em] text-white uppercase">{item.title}</h3>
              <p className="font-body text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
