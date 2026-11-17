import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#141312] text-[#FAF9F6] border-t border-stone-800 pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-stone-800/80">
          {/* Atelier Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="font-serif text-2xl tracking-[0.16em] uppercase text-white font-normal">
              Furniche
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Crafting living spaces through timeless furniture, architectural purity, and honest materials. Designed for enduring elegance and everyday serenity.
            </p>
          </div>

          {/* Curated Navigation */}
          <div className="space-y-4">
            <h4 className="font-sans text-[11px] uppercase tracking-[0.22em] text-champagne font-medium">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li>
                <Link to={"/"} className="hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/collection"} className="hover:text-white transition-colors duration-200">
                  Collections
                </Link>
              </li>
              <li>
                <Link to={"/about"} className="hover:text-white transition-colors duration-200">
                  About Atelier
                </Link>
              </li>
              <li>
                <Link to={"/contact"} className="hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Contact */}
          <div className="space-y-4">
            <h4 className="font-sans text-[11px] uppercase tracking-[0.22em] text-champagne font-medium">
              Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li className="text-stone-300">
                +91 88915 55811
              </li>
              <li>
                <a href="mailto:furniche@gmail.com" className="hover:text-white transition-colors duration-200">
                  furniche@gmail.com
                </a>
              </li>
              <li className="text-stone-500 pt-1">
                Mon - Sat, 9:00 AM - 7:00 PM IST
              </li>
            </ul>
          </div>

          {/* Newsletter / Bespoke Updates */}
          <div className="space-y-4">
            <h4 className="font-sans text-[11px] uppercase tracking-[0.22em] text-champagne font-medium">
              Private Previews
            </h4>
            <p className="text-xs text-stone-400 font-light">
              Receive exclusive invitations to new collection releases and design monographs.
            </p>
            <div className="flex items-center border-b border-stone-700 py-1.5 focus-within:border-champagne transition-colors">
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-transparent w-full text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none"
              />
              <button
                type="button"
                className="text-[10px] tracking-[0.2em] uppercase font-semibold text-champagne hover:text-white transition-colors pl-2 shrink-0"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-light gap-4">
          <p>&copy; {new Date().getFullYear()} Furniche Atelier. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-stone-300 transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-300 transition cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-300 transition cursor-pointer">Craftsmanship Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
