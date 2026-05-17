
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute, { AdminRoute } from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';
import Chatbot from "./components/Chatbot";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* Toast notifications */}
          <Toaster position="top-right" />

          {/* Fixed navbar */}
          <Navbar />

          {/* Main content */}
          <main>
            <Routes>
              {/* Public routes */}
             
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected routes (must be logged in) */}
              <Route path="/checkout" element={
                <ProtectedRoute><CheckoutPage /></ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute><OrdersPage /></ProtectedRoute>
              } />

              {/* Admin-only routes */}
              <Route path="/admin" element={
                <AdminRoute><AdminPage /></AdminRoute>
              } />

              {/* 404 fallback */}
              <Route path="*" element={
                <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
                  <div className="font-display text-8xl text-gray-800 font-light">404</div>
                  <p className="font-display text-2xl text-gray-500 font-light">Page not found</p>
                </div>
              } />
            </Routes>
             <WhatsAppButton />
             <Chatbot />

          </main>

          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
console.log(Chatbot);
export default App;
