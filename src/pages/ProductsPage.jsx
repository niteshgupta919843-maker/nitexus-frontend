
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { getProducts } from '../services/productService';
import { dummyProducts } from '../data/dummyProducts';

const CATEGORIES = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants', 'Sets'];

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = activeCategory !== 'All' ? { category: activeCategory } : {};
    const res = await getProducts(params);
console.log(res.data); // DEBUG

setProducts(res.data.data || res.data || []);
      } catch {
        // Fallback to dummy data
        const filtered = activeCategory === 'All'
          ? dummyProducts
          : dummyProducts.filter(p => p.category === activeCategory);
        setProducts(filtered);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory]);

  const handleCategory = (cat) => {
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-7xl mx-auto animate-fade-in">
      {/* Page Header */}
      <div className="text-center mb-12">
        <p className="font-body text-[10px] tracking-[0.4em] text-gold-500/60 uppercase mb-3">Browse</p>
        <h1 className="section-heading">
          {activeCategory === 'All' ? 'All Collections' : activeCategory}
        </h1>
        <div className="gold-divider" />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`font-body text-[10px] tracking-[0.25em] uppercase px-4 py-2 border transition-all duration-200
              ${activeCategory === cat
                ? 'border-gold-500 text-gold-400 bg-gold-500/10'
                : 'border-luxury-border text-gray-500 hover:border-gold-500/40 hover:text-gray-300'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <Spinner />
      ) : products.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-display text-2xl text-gray-600 font-light">No pieces found</p>
          <p className="font-body text-xs text-gray-600 mt-2">Try a different category</p>
        </div>
      ) : (
        <>
          <p className="font-body text-xs text-gray-600 mb-6 tracking-widest uppercase">
            {products.length} piece{products.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
