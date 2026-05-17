
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage on app start
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('nitexus_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nitexus_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart (or increase quantity if already exists)
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  // Remove item from cart completely
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  // Update quantity of a specific item
  const updateQty = (productId, qty) => {
    if (qty < 1) return removeFromCart(productId);
    setCartItems((prev) =>
      prev.map((item) => (item._id === productId ? { ...item, qty } : item))
    );
  };

  // Clear the entire cart
  const clearCart = () => setCartItems([]);

  // Total number of items (sum of quantities)
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // Total price
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
