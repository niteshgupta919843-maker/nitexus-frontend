
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Spinner from '../components/Spinner';
import { getProductById } from '../services/productService';
import { dummyProducts } from '../data/dummyProducts';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getProductById(id);
        setProduct(data.data);
      } catch {
        // Fallback
        const found = dummyProducts.find(p => p._id === id);
        setProduct(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success('Added to cart!', {
      style: { background: '#1a1a1a', color: '#fff', border: '1px solid #2a2a2a' },
      iconTheme: { primary: '#c9941c', secondary: '#000' },
    });
  };

  if (loading) return <div className="pt-24"><Spinner /></div>;
  if (!product) return (
    <div className="pt-24 text-center py-24">
      <p className="font-display text-3xl text-gray-500 font-light">Product not found</p>
      <Link to="/products" className="btn-outline mt-8 inline-block text-xs">Back to Collections</Link>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-6xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 font-body text-xs text-gray-600 uppercase tracking-wider">
        <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-gold-400 transition-colors">Collections</Link>
        <span>/</span>
        <span className="text-gray-400">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-luxury-card border border-luxury-border aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {/* Category tag */}
          <div className="absolute top-4 left-4">
            <span className="bg-luxury-black/80 text-gold-400 text-[9px] tracking-widest uppercase px-2 py-1 font-body">
              {product.category}
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="font-display font-light text-3xl md:text-4xl text-white mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 my-4">
            <div className="w-8 h-px bg-gold-500/40" />
            <span className="font-body text-[10px] tracking-[0.3em] text-gray-500 uppercase">{product.category}</span>
          </div>

          <p className="font-display text-3xl text-gold-400 font-light mb-6">
         ₹{(product.price * qty).toLocaleString('en-IN')}
          </p>

          <p className="font-body text-sm text-gray-400 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Quantity selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-body text-[10px] tracking-[0.25em] text-gray-500 uppercase">Quantity</span>
            <div className="flex items-center border border-luxury-border">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:bg-luxury-card transition-colors font-body"
              >
                −
              </button>
              <span className="w-10 text-center font-body text-sm text-white">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:bg-luxury-card transition-colors font-body"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button onClick={handleAddToCart} className="btn-gold w-full mb-3 text-xs">
            Add to Cart
          </button>
          <Link to="/cart" className="btn-outline block text-center text-xs">
            View Cart
          </Link>

          {/* Assurance */}
          <div className="mt-8 pt-6 border-t border-luxury-border space-y-2">
            {['BIS Hallmarked & Certified', 'Free insured shipping in India', '30-day easy returns'].map(item => (
              <div key={item} className="flex items-center gap-2 font-body text-xs text-gray-500">
                <span className="text-gold-400 text-[10px]">◆</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
