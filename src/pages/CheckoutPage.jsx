
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';
import toast from 'react-hot-toast';

      const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!form.name || !form.address || !form.city || !form.pincode || !form.phone) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      // Format cart items for API
      const items = cartItems.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        qty: item.qty || 1,
        image: item.image,
      }));


     // 🔥 Razorpay load
const res = await loadRazorpay();
if (!res) {
  alert("Razorpay failed");
  return;
}

// 🔥 backend call
const response = await fetch("/api/payment/create-order", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  body: JSON.stringify({
    amount: cartTotal,
  }),
});
if (!response.ok) {
  throw new Error("Order creation failed");
}

const order = await response.json();

// 💳 Razorpay popup
const options = {
  key: "rzp_test_Sl1atvEW0z0jdd",
  amount: order.amount,
  currency: "INR",
  name: "Nitexus Jewellery",
  order_id: order.id,

  handler: async function () {
  

    await createOrder({
      items,
      totalPrice: cartTotal,
      shippingAddress: form,
      paymentMethod: "ONLINE",
    });

    clearCart();
    toast.success("Payment Successful 🎉");
    navigate('/orders');
  },
};

const paymentObject = new window.Razorpay(options);
paymentObject.open();
    } catch (error) {
         toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="section-heading">Checkout</h1>
        <div className="gold-divider" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Shipping Form */}
        <div>
          <h3 className="font-body text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-6">Shipping Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-body text-[10px] tracking-widest text-gray-500 uppercase mb-2">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="input-luxury"
                required
              />
            </div>
            <div>
              <label className="block font-body text-[10px] tracking-widest text-gray-500 uppercase mb-2">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street address, apartment, etc."
                className="input-luxury"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-body text-[10px] tracking-widest text-gray-500 uppercase mb-2">City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="input-luxury"
                  required
                />
              </div>
              <div>
                <label className="block font-body text-[10px] tracking-widest text-gray-500 uppercase mb-2">Pincode</label>
                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="110001"
                  className="input-luxury"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-body text-[10px] tracking-widest text-gray-500 uppercase mb-2">Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="input-luxury"
                required
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block font-body text-[10px] tracking-widest text-gray-500 uppercase mb-3">Payment</label>
              <div className="border border-gold-500/30 bg-gold-500/5 p-4 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-gold-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gold-500" />
                </div>
              <span className="font-body text-sm text-gray-300">
  Secure Payment via Razorpay (UPI / Card / Net Banking)
</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn-gold w-full text-xs mt-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-luxury-card border border-luxury-border p-6 h-fit">
          <h3 className="font-body text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-6">Order Summary</h3>
          
          <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-1">
            {cartItems.map(item => (
              <div key={item._id} className="flex gap-3 items-center">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-body text-xs text-gray-300 line-clamp-1">{item.name}</p>
                  <p className="font-body text-[11px] text-gray-500">Qty: {item.qty || 1}</p>
                </div>
                <p className="font-body text-xs text-white">₹{((item.price || 0) * (item.qty || 1)).toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-luxury-border pt-4 space-y-2">
            <div className="flex justify-between font-body text-xs text-gray-400">
              <span>Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-body text-xs text-gray-400">
              <span>Shipping</span><span className="text-gold-400">Free</span>
            </div>
            <div className="flex justify-between font-body text-base text-white pt-2 border-t border-luxury-border">
              <span>Total</span>
              <span className="text-gold-400 font-medium">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
