
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQty, cartTotal, clearCart } = useCart();

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.error(`${name} removed`, {
      style: { background: '#1a1a1a', color: '#fff', border: '1px solid #2a2a2a' },
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-6 animate-fade-in">
        <div className="font-display text-6xl text-gray-800 font-light">◇</div>
        <h2 className="font-display text-3xl text-gray-400 font-light">Your cart is empty</h2>
        <p className="font-body text-xs text-gray-600 tracking-widest uppercase">
          Discover our collections
        </p>
        <Link to="/products" className="btn-gold text-xs">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="section-heading">Your Cart</h1>
        <div className="gold-divider" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex gap-4 bg-luxury-card border border-luxury-border p-4">
              {/* Image */}
              <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-light text-white text-base line-clamp-1">{item.name}</h3>
                <p className="font-body text-xs text-gray-500 mt-0.5">{item.category}</p>
                <p className="font-body text-gold-400 text-sm mt-1">₹{item.price.toLocaleString('en-IN')}</p>

                {/* Qty + Remove */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center border border-luxury-border">
                    <button
                      onClick={() => updateQty(item._id, item.qty - 1)}
                      className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gold-400 transition-colors text-sm"
                    >−</button>
                    <span className="w-8 text-center font-body text-xs text-white">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item._id, item.qty + 1)}
                      className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gold-400 transition-colors text-sm"
                    >+</button>
                  </div>
                  <button
                    onClick={() => handleRemove(item._id, item.name)}
                    className="font-body text-xs text-gray-600 hover:text-red-400 transition-colors uppercase tracking-wider"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Line total */}
              <div className="text-right flex-shrink-0">
                <p className="font-body text-sm text-white">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}

          <button
            onClick={() => { clearCart(); toast.success('Cart cleared'); }}
            className="font-body text-xs text-gray-600 hover:text-red-400 transition-colors uppercase tracking-wider"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-luxury-card border border-luxury-border p-6 h-fit">
          <h3 className="font-body text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-6">Order Summary</h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between font-body text-sm text-gray-400">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-body text-sm text-gray-400">
              <span>Shipping</span>
              <span className="text-gold-400">Free</span>
            </div>
            <div className="h-px bg-luxury-border" />
            <div className="flex justify-between font-body text-base text-white">
              <span>Total</span>
              <span className="text-gold-400">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <Link to="/checkout" className="btn-gold block text-center text-xs w-full">
            Proceed to Checkout
          </Link>
          <Link to="/products" className="block text-center font-body text-xs text-gray-600 hover:text-gray-400 mt-4 transition-colors uppercase tracking-wider">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
