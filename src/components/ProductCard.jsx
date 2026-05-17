
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Don't navigate to product page
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`, {
      style: { background: '#1a1a1a', color: '#fff', border: '1px solid #2a2a2a' },
      iconTheme: { primary: '#c9941c', secondary: '#000' },
    });
  };

  return (
    <Link to={`/products/${product._id}`} className="product-card block">
      {/* Image container */}
      <div className="relative overflow-hidden aspect-square bg-luxury-dark">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            className="btn-gold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-[10px]"
          >
            Add to Cart
          </button>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-luxury-black/80 backdrop-blur-sm text-gold-400 text-[9px] tracking-widest uppercase px-2 py-1 font-body">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        <h3 className="font-display text-base font-light text-white group-hover:text-gold-400 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="font-body text-gold-400 text-sm mt-1 tracking-wider">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
