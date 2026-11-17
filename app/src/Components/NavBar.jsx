import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartCount } from "../Redux/userSlice";
import { LuSearch, LuShoppingCart, LuHeart, LuMenu, LuX } from "react-icons/lu";

function NavBar() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { currentUser, userCartCount, isAdmin, userCart } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(getCartCount());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, userCart]);

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-canvas/90 backdrop-blur-md border-b border-stone-200/70 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to={"/"} className="group flex items-center gap-2">
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.16em] uppercase font-normal text-obsidian group-hover:text-champagne transition-colors duration-300">
            Furniche
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-10">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `relative py-1 font-sans text-[11px] tracking-[0.22em] uppercase font-medium transition-colors duration-300 ${
                isActive ? "text-obsidian font-semibold" : "text-obsidian-muted hover:text-obsidian"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Home</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-champagne animate-in fade-in duration-300" />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to={"/collection"}
            className={({ isActive }) =>
              `relative py-1 font-sans text-[11px] tracking-[0.22em] uppercase font-medium transition-colors duration-300 ${
                isActive ? "text-obsidian font-semibold" : "text-obsidian-muted hover:text-obsidian"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Collection</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-champagne animate-in fade-in duration-300" />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to={"/about"}
            className={({ isActive }) =>
              `relative py-1 font-sans text-[11px] tracking-[0.22em] uppercase font-medium transition-colors duration-300 ${
                isActive ? "text-obsidian font-semibold" : "text-obsidian-muted hover:text-obsidian"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>About</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-champagne animate-in fade-in duration-300" />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              `relative py-1 font-sans text-[11px] tracking-[0.22em] uppercase font-medium transition-colors duration-300 ${
                isActive ? "text-obsidian font-semibold" : "text-obsidian-muted hover:text-obsidian"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>Contact</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-champagne animate-in fade-in duration-300" />
                )}
              </>
            )}
          </NavLink>

          {isAdmin && (
            <NavLink
              to={"/admin/adminpanel"}
              className={({ isActive }) =>
                `relative py-1 font-sans text-[11px] tracking-[0.22em] uppercase font-medium transition-colors duration-300 ${
                  isActive ? "text-champagne font-semibold" : "text-obsidian-muted hover:text-champagne"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>Atelier Admin</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-champagne animate-in fade-in duration-300" />
                  )}
                </>
              )}
            </NavLink>
          )}
        </ul>

        {/* Right Icon Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to={"/search"}
            aria-label="Search"
            className="text-obsidian-muted hover:text-obsidian transition-colors duration-200"
          >
            <LuSearch className="w-[18px] h-[18px]" strokeWidth={1.5} />
          </Link>

          {currentUser && (
            <Link
              to={"/wishlist"}
              aria-label="Wishlist"
              className="text-obsidian-muted hover:text-obsidian transition-colors duration-200"
            >
              <LuHeart className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </Link>
          )}

          {currentUser && (
            <Link
              to={"/cart"}
              aria-label="Cart"
              className="relative text-obsidian-muted hover:text-obsidian transition-colors duration-200"
            >
              <LuShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.5} />
              {userCartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-champagne text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {userCartCount}
                </span>
              )}
            </Link>
          )}

          {currentUser == null ? (
            <Link
              to={"/login"}
              className="bg-obsidian text-canvas px-4 sm:px-5 py-2 text-[11px] uppercase tracking-[0.16em] font-medium hover:bg-obsidian-light transition duration-300"
            >
              Sign In
            </Link>
          ) : (
            <Link to={"/user"} className="flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden border border-stone-300 hover:border-champagne transition-colors">
                <img
                  className="h-full w-full object-cover"
                  src={currentUser?.profile}
                  alt="Account Profile"
                />
              </div>
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setVisible(!visible)}
            className="md:hidden text-obsidian-muted hover:text-obsidian p-1"
            aria-label="Toggle Menu"
          >
            {visible ? <LuX className="w-5 h-5" strokeWidth={1.5} /> : <LuMenu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {visible && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-canvas/98 backdrop-blur-xl border-b border-stone-200 shadow-atelier-lg py-8 px-6 transition-all duration-300">
          <ul className="flex flex-col gap-6 text-center">
            <NavLink
              onClick={() => setVisible(false)}
              to={"/"}
              className="font-serif text-lg tracking-[0.15em] uppercase text-obsidian hover:text-champagne transition"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to={"/collection"}
              className="font-serif text-lg tracking-[0.15em] uppercase text-obsidian hover:text-champagne transition"
            >
              Collection
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to={"/about"}
              className="font-serif text-lg tracking-[0.15em] uppercase text-obsidian hover:text-champagne transition"
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to={"/contact"}
              className="font-serif text-lg tracking-[0.15em] uppercase text-obsidian hover:text-champagne transition"
            >
              Contact
            </NavLink>
            {isAdmin && (
              <NavLink
                onClick={() => setVisible(false)}
                to={"/admin/adminpanel"}
                className="font-serif text-lg tracking-[0.15em] uppercase text-champagne"
              >
                Atelier Admin
              </NavLink>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
