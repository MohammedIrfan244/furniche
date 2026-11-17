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
                  Save pieces that resonate with your space and revisit them when you are ready to acquire.
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
              <div className="border-b border-stone-200 pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block mb-2">
                    Personal Portfolio
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl text-obsidian font-normal tracking-tight">
                    Saved Works ({userWishlist.length})
                  </h1>
                </div>
                <p className="text-xs text-stone-500 font-light">
                  Pieces reserved for your architectural interior review.
                </p>
              </div>

              {/* Gallery Grid (No Heavy Shadows, Flat Clean Luxury Framing) */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {userWishlist.map((item, index) => (
                  <div
                    key={item?._id || index}
                    className="group flex flex-col bg-white border border-stone-200 transition-colors hover:border-stone-400"
                  >
                    {/* Portrait Image Container */}
                    <div className="aspect-[4/5] w-full overflow-hidden bg-stone-100 relative">
                      <Link to={`/product/${item?._id}`}>
                        <img
                          src={item?.image || "/default-product.png"}
                          alt={item?.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </Link>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromWishlist(item?._id)}
                        aria-label="Remove from Wishlist"
                        className="absolute top-3 right-3 w-8 h-8 rounded-full border border-stone-200 bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-400 hover:text-red-500 hover:border-red-200 transition-colors"
                      >
                        <LuTrash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Metadata & Direct Link */}
                    <div className="p-4 flex flex-col justify-between flex-grow gap-3">
                      <div>
                        <Link to={`/product/${item?._id}`}>
                          <h4 className="font-serif text-sm sm:text-base text-obsidian line-clamp-1 group-hover:text-champagne transition-colors font-normal">
                            {item?.name}
                          </h4>
                        </Link>
                        <p className="font-sans text-xs sm:text-sm font-semibold text-obsidian tracking-tight mt-1">
                          {currency || "$"} {item?.price}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                        <Link
                          to={`/product/${item?._id}`}
                          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-obsidian font-semibold hover:text-champagne transition-colors"
                        >
                          <span>Acquire Work</span>
                          <LuArrowRight className="w-3 h-3 text-champagne" />
                        </Link>
                      </div>
                    </div>
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
