
import { useState, useEffect } from 'react';
import { getMyOrders } from '../services/orderService';
import Spinner from '../components/Spinner';

const STATUS_COLORS = {
  Pending: 'text-yellow-500',
  Processing: 'text-blue-400',
  Shipped: 'text-purple-400',
  Delivered: 'text-green-400',
  Cancelled: 'text-red-400',
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getMyOrders();
        setOrders(data.data);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-10">
        <p className="font-body text-[10px] tracking-[0.4em] text-gold-500/60 uppercase mb-3">History</p>
        <h1 className="section-heading">My Orders</h1>
        <div className="gold-divider" />
      </div>

      {loading ? (
        <Spinner />
      ) : orders.length === 0 ? (
        <div className="text-center py-24">
          <div className="font-display text-5xl text-gray-800 mb-4">◇</div>
          <p className="font-display text-2xl text-gray-500 font-light">No orders yet</p>
          <p className="font-body text-xs text-gray-600 mt-2 mb-6 tracking-wider">Start shopping to see your orders here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-luxury-card border border-luxury-border p-5">
              {/* Order header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-luxury-border">
                <div>
                  <p className="font-body text-[10px] tracking-wider text-gray-500 uppercase">Order ID</p>
                  <p className="font-body text-xs text-gray-400 font-mono">{order._id}</p>
                </div>
                <div className="text-right">
                  <p className={`font-body text-xs uppercase tracking-wider ${STATUS_COLORS[order.status] || 'text-gray-400'}`}>
                    ◆ {order.status}
                  </p>
                  <p className="font-body text-[10px] text-gray-600 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Order items */}
              <div className="space-y-2 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-body text-sm text-gray-300">{item.name}</p>
                      <p className="font-body text-xs text-gray-500">Qty: {item.qty} × ₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order footer */}
              <div className="flex justify-between items-center pt-3 border-t border-luxury-border">
                <div className="font-body text-[10px] text-gray-500 uppercase tracking-wider">
                  {order.paymentMethod} · {order.shippingAddress?.city}
                </div>
                <div className="font-body text-base text-gold-400">
                  ₹{order.totalPrice.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
