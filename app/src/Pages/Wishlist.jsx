import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist, removeFromWishList } from "../Redux/userSlice";
import { LuHeart, LuTrash2, LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import ScrollTop from "../utilities/ScrollTop";

function Wishlist() {
  const dispatch = useDispatch();
  const { userWishlist, loading } = useSelector((state) => state.user);
  const { currency } = useSelector((state) => state.public);

  useEffect(() => {
    dispatch(getWishlist());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFromWishlist = async (_id) => {
    await dispatch(removeFromWishList(_id));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-canvas text-obsidian">
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <span className="loader" />
        </div>
      ) : (
        <div className="pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-8">
          {(!userWishlist || userWishlist.length === 0) && !loading ? (
            <div className="py-24 max-w-md mx-auto text-center flex flex-col items-center space-y-6">
              <div className="w-16 h-16 rounded-full border border-stone-200 flex items-center justify-center text-champagne bg-white">
                <LuHeart className="w-7 h-7" strokeWidth={1.25} />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl text-obsidian font-normal">
                  Your Wishlist is Empty
                </h2>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  Keep track of pieces that resonate with your space and revisit them when you are ready to acquire.
                </p>
              </div>
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 bg-obsidian text-canvas px-7 py-3 text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition duration-300"
              >
                <span>Browse Catalogue</span>
                <LuArrowRight className="w-3.5 h-3.5 text-champagne" />
              </Link>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="border-b border-stone-200/80 pb-6 mb-10">
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block mb-2">
                  Saved Portfolio
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-obsidian font-normal tracking-tight">
                  Curated Wishlist ({userWishlist.length})
                </h1>
              </div>

              {/* Items List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userWishlist.map((item, index) => (
                  <div
                    key={item?._id || index}
                    className="flex items-center justify-between bg-white p-5 border border-stone-200/80 transition-all hover:border-stone-400 hover:shadow-atelier"
                  >
                    <Link
                      to={`/product/${item?._id}`}
                      className="flex items-center gap-4 sm:gap-6 flex-grow"
                    >
                      <div className="aspect-[4/5] w-20 overflow-hidden bg-stone-100 shrink-0">
                        <img
                          src={item?.image || "/default-product.png"}
                          alt={item?.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-base text-obsidian hover:text-champagne transition-colors line-clamp-1 font-normal">
                          {item?.name}
                        </h4>
                        <p className="font-sans text-xs sm:text-sm font-semibold text-obsidian tracking-tight">
                          {currency || "$"} {item?.price}
                        </p>
                      </div>
                    </Link>

                    <button
                      onClick={() => removeFromWishlist(item?._id)}
                      title="Remove from Wishlist"
                      className="p-2 text-stone-400 hover:text-red-500 transition-colors ml-4"
                    >
                      <LuTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <ScrollTop />
    </div>
  );
}

export default Wishlist;
