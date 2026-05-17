
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t border-luxury-border mt-24 py-12 bg-luxury-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

        {/* Brand */}
        <div>
          <div className="font-display text-2xl font-light text-gold-400 tracking-[0.2em] mb-1">NITEXUS</div>
          <div className="font-body text-[10px] tracking-[0.35em] text-gray-500 uppercase mb-4">Jewellery</div>
          <p className="font-body text-xs text-gray-500 leading-relaxed max-w-xs">
            Crafting timeless elegance for generations. Every piece tells a story of artisanship and luxury.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-body text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-4">Explore</h4>
          <div className="space-y-2">
            {['Collections', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'].map(link => (
              <Link key={link} to="/products" className="block font-body text-xs text-gray-500 hover:text-gold-400 transition-colors">
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-body text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-4">Contact</h4>
          <div className="space-y-2 font-body text-xs text-gray-500">
            <p>niteshgupta919843@gmaoiol.com</p>
            <p>+91 9198437621</p>
            <p>Mon – Sat, 10am – 7pm IST</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-luxury-border pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="font-body text-[11px] text-gray-600">© 2025 Nitexus Jewellery. All rights reserved.</p>
        <p className="font-body text-[11px] text-gray-600">Made with ♦ for luxury</p>
      </div>
    </div>
  </footer>
);

export default Footer;
