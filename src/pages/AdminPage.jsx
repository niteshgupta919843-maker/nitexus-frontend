
import { useState, useEffect } from 'react';
import { getProducts, deleteProduct, createProduct, updateProduct } from '../services/productService';
import { getAllOrders, updateOrderStatus } from '../services/orderService';
import { getAllUsers } from '../services/userService';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';

const CATEGORIES = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants', 'Sets'];
const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const EMPTY_FORM = { name: '', price: '', image: '', description: '', category: 'Rings', stock: 10, isFeatured: false };

const AdminPage = () => {
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    loadData();
  }, [tab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (tab === 'products') {
        const { data } = await getProducts();
        setProducts(data.data);
      } else if (tab === 'orders') {
        const { data } = await getAllOrders();
        setOrders(data.data);
      } else if (tab === 'users') {
        const { data } = await getAllUsers();
        setUsers(data.data);
      }
    } catch (err) {
      toast.error('Failed to load data. Are you logged in as admin?');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
      toast.success('Product deleted');
    } catch {
      toast.error('Failed to delete product');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProduct) {
        await updateProduct(editProduct._id, { ...form, price: Number(form.price) });
        toast.success('Product updated!');
      } else {
        await createProduct({ ...form, price: Number(form.price) });
        toast.success('Product created!');
      }
      setShowForm(false);
      setEditProduct(null);
      setForm(EMPTY_FORM);
      loadData();
    } catch {
      toast.error('Failed to save product');
    }
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setForm({ ...product, price: String(product.price) });
    setShowForm(true);
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const tabs = [
    { key: 'products', label: 'Products' },
    { key: 'orders', label: 'Orders' },
    { key: 'users', label: 'Users' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <p className="font-body text-[10px] tracking-[0.4em] text-gold-500/60 uppercase mb-2">Dashboard</p>
        <h1 className="font-display text-4xl font-light text-white">Admin Panel</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-8 border-b border-luxury-border">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`font-body text-[10px] tracking-[0.25em] uppercase px-6 py-3 border-b-2 -mb-px transition-all
              ${tab === t.key ? 'border-gold-500 text-gold-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Products Tab ──────────────────────────────────── */}
      {tab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="font-body text-xs text-gray-500">{products.length} products</p>
            <button
              onClick={() => { setShowForm(true); setEditProduct(null); setForm(EMPTY_FORM); }}
              className="btn-gold text-[10px] py-2"
            >
              + Add Product
            </button>
          </div>

          {/* Product Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="bg-luxury-card border border-luxury-border p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <h3 className="font-display text-xl font-light text-white mb-4">
                  {editProduct ? 'Edit Product' : 'Add Product'}
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  {[
                    { name: 'name', label: 'Product Name', type: 'text' },
                    { name: 'price', label: 'Price (₹)', type: 'number' },
                    { name: 'image', label: 'Image URL', type: 'url' },
                    { name: 'stock', label: 'Stock', type: 'number' },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="block font-body text-[10px] tracking-widest text-gray-500 uppercase mb-1">{field.label}</label>
                      <input
                        name={field.name}
                        type={field.type}
                        value={form[field.name]}
                        onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                        className="input-luxury"
                        required
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block font-body text-[10px] tracking-widest text-gray-500 uppercase mb-1">Category</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      className="input-luxury"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-widest text-gray-500 uppercase mb-1">Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      className="input-luxury h-20 resize-none"
                      required
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isFeatured}
                      onChange={e => setForm({ ...form, isFeatured: e.target.checked })}
                      className="accent-gold-500"
                    />
                    <span className="font-body text-xs text-gray-400">Featured on homepage</span>
                  </label>

                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="btn-gold flex-1 text-xs">Save</button>
                    <button type="button" onClick={() => setShowForm(false)} className="btn-outline flex-1 text-xs">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {loading ? <Spinner /> : (
            <div className="overflow-x-auto">
              <table className="w-full font-body text-xs">
                <thead>
                  <tr className="border-b border-luxury-border text-gray-500 uppercase tracking-wider text-[10px]">
                    <th className="text-left py-3 pr-4">Product</th>
                    <th className="text-left py-3 pr-4">Category</th>
                    <th className="text-left py-3 pr-4">Price</th>
                    <th className="text-left py-3 pr-4">Stock</th>
                    <th className="text-left py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-luxury-border">
                  {products.map(p => (
                    <tr key={p._id} className="hover:bg-luxury-card transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 object-cover" />
                          <span className="text-gray-300 line-clamp-1">{p.name}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-gray-500">{p.category}</td>
                      <td className="py-3 pr-4 text-gold-400">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="py-3 pr-4 text-gray-400">{p.stock}</td>
                      <td className="py-3">
                        <div className="flex gap-3">
                          <button onClick={() => openEdit(p)} className="text-blue-400 hover:text-blue-300 transition-colors">Edit</button>
                          <button onClick={() => handleDelete(p._id)} className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Orders Tab ────────────────────────────────────── */}
      {tab === 'orders' && (
        <div>
          {loading ? <Spinner /> : (
            <div className="space-y-3">
              {orders.map(order => (
                <div key={order._id} className="bg-luxury-card border border-luxury-border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="font-body text-[10px] text-gray-500 font-mono">{order._id}</p>
                      <p className="font-body text-sm text-gray-300 mt-0.5">{order.user?.name || 'N/A'} · {order.user?.email}</p>
                      <p className="font-body text-gold-400 text-sm">₹{order.totalPrice.toLocaleString('en-IN')}</p>
                      <p className="font-body text-[10px] text-gray-500 mt-1">
                        {new Date(order.createdAt).toLocaleDateString('en-IN')} · {order.items.length} items
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <select
                        value={order.status}
                        onChange={e => handleStatusUpdate(order._id, e.target.value)}
                        className="input-luxury text-xs py-2 w-auto"
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Users Tab ─────────────────────────────────────── */}
      {tab === 'users' && (
        <div>
          {loading ? <Spinner /> : (
            <div className="overflow-x-auto">
              <table className="w-full font-body text-xs">
                <thead>
                  <tr className="border-b border-luxury-border text-gray-500 uppercase tracking-wider text-[10px]">
                    <th className="text-left py-3 pr-4">Name</th>
                    <th className="text-left py-3 pr-4">Email</th>
                    <th className="text-left py-3 pr-4">Role</th>
                    <th className="text-left py-3">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-luxury-border">
                  {users.map(u => (
                    <tr key={u._id} className="hover:bg-luxury-card transition-colors">
                      <td className="py-3 pr-4 text-gray-300">{u.name}</td>
                      <td className="py-3 pr-4 text-gray-500">{u.email}</td>
                      <td className="py-3 pr-4">
                        <span className={`text-[10px] uppercase tracking-wider ${u.isAdmin ? 'text-gold-400' : 'text-gray-500'}`}>
                          {u.isAdmin ? '◆ Admin' : 'User'}
                        </span>
                      </td>
                      <td className="py-3 text-gray-600">
                        {new Date(u.createdAt).toLocaleDateString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
