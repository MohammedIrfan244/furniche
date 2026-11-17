import { useEffect } from "react";
import CartCards from "../Components/CartCards";
import { LuShoppingBag, LuArrowRight, LuShieldCheck, LuTruck } from "react-icons/lu";
import ScrollTop from "../utilities/ScrollTop";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../Redux/userSlice";
import { useNavigate, Link } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userCart, loading } = useSelector((state) => state.user);
  const { currency } = useSelector((state) => state.public);

  useEffect(() => {
    dispatch(getCart());
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subtotal = userCart?.reduce(
    (total, item) => total + (item?.productId?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="w-full min-h-screen bg-canvas text-obsidian">
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <span className="loader" />
        </div>
      ) : (
        <div className="pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-8">
          {/* Empty State */}
          {(!userCart || userCart.length === 0) && !loading ? (
            <div className="py-24 max-w-md mx-auto text-center flex flex-col items-center space-y-6">
              <div className="w-16 h-16 rounded-full border border-stone-200 flex items-center justify-center text-champagne bg-white">
                <LuShoppingBag className="w-7 h-7" strokeWidth={1.25} />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl text-obsidian font-normal">
                  Your Shopping Bag is Empty
                </h2>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  Discover handcrafted silhouettes and timeless furniture to curate your living space.
                </p>
              </div>
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 bg-obsidian text-canvas px-7 py-3 text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition duration-300"
              >
                <span>Discover Collections</span>
                <LuArrowRight className="w-3.5 h-3.5 text-champagne" />
              </Link>
            </div>
          ) : (
            <div>
              {/* Page Title */}
              <div className="border-b border-stone-200 pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block mb-2">
                    Review Selections
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl text-obsidian font-normal tracking-tight">
                    Shopping Bag ({userCart.length} {userCart.length === 1 ? "work" : "works"})
                  </h1>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-500 font-light">
                  <LuTruck className="w-4 h-4 text-champagne" />
                  <span>Complimentary White-Glove Courier Included</span>
                </div>
              </div>

              {/* Two Column Layout (Clean Flat Architectural Cards, No Heavy Shadows) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Cart Items List */}
                <div className="lg:col-span-8 space-y-4">
                  {userCart.map((item, index) => (
                    <CartCards
                      key={item?.productId?._id || index}
                      quantity={item.quantity}
                      image={item?.productId?.image}
                      price={item?.productId?.price}
                      name={item?.productId?.name}
                      id={item?.productId?._id}
                    />
                  ))}
                </div>

                {/* Flat Minimal Order Summary Panel */}
                <div className="lg:col-span-4 lg:sticky lg:top-28">
                  <div className="p-6 sm:p-8 bg-white border border-stone-200 space-y-6">
                    <h3 className="font-serif text-xl text-obsidian font-normal border-b border-stone-100 pb-4">
                      Acquisition Summary
                    </h3>

                    <div className="space-y-3 text-xs font-light">
                      <div className="flex justify-between text-stone-600">
                        <span>Curated Items</span>
                        <span className="font-medium text-obsidian">{userCart.length}</span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>Courier Transit</span>
                        <span className="text-champagne font-medium">Complimentary</span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>White Glove Setup</span>
                        <span className="text-stone-700">Included</span>
                      </div>
                    </div>

                    <div className="border-t border-stone-200 pt-4 flex justify-between items-baseline">
                      <span className="font-serif text-lg text-obsidian">Total Investment</span>
                      <span className="font-sans text-xl font-semibold text-obsidian tracking-tight">
                        {currency || "$"} {subtotal}
                      </span>
                    </div>

                    <button
                      onClick={() => navigate(`/checkout/products/cart`)}
                      className="w-full flex items-center justify-center gap-2 bg-obsidian text-canvas py-3.5 text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition duration-300"
                    >
                      <span>Proceed to Checkout</span>
                      <LuArrowRight className="w-3.5 h-3.5 text-champagne" />
                    </button>

                    <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-stone-500 uppercase tracking-widest font-medium border-t border-stone-100">
                      <LuShieldCheck className="w-3.5 h-3.5 text-champagne" />
                      <span>Encrypted Atelier Protocol</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <ScrollTop />
    </div>
  );
}

export default Cart;
