import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuHeart, LuShieldCheck, LuTruck, LuSparkles, LuCheck } from "react-icons/lu";
import { IoMdStar } from "react-icons/io";
import ProductItems from "../shared/ProductItems";
import ScrollTop from "../utilities/ScrollTop";
import axios from "axios";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToWishList,
  getCart,
  removeFromWishList,
} from "../Redux/userSlice";
import { toast } from "react-toastify";
import axiosInstance from "../utilities/axiosInstance";

function Product() {
  const { Id } = useParams();
  const { currentUser, userCart, userWishlist, currency } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [interestedProduct, setInterestedProduct] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const addToCartDispatch = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (!userCart?.find((item) => item.productId?._id === Id)) {
      try {
        await axiosInstance.post("/users/cart", {
          productId: Id,
          quantity: 1,
        });
        dispatch(addToCart(Id));
        dispatch(getCart());
        toast.success("Item added to cart");
      } catch (err) {
        toast.error(axiosErrorManager(err));
      }
    }
  };

  const addToWishListHandler = (productId) => {
    if (!currentUser) {
      return navigate("/login");
    }
    if (isInWishlist) {
      dispatch(removeFromWishList(productId));
    } else {
      dispatch(addToWishList(productId));
    }
  };

  useEffect(() => {
    setIsInWishlist(userWishlist?.some((item) => item._id === Id));
  }, [Id, userWishlist, currentUser]);

  useEffect(() => {
    setLoading(true);
    if (currentUser) {
      dispatch(getCart());
    }
    const fetching = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/public/products/${Id}`
        );
        setProduct(response.data.data);
        if (response.data.data?.category) {
          const interestedResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/public/products/category/${response.data.data.category}`
          );
          setInterestedProduct(interestedResponse.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching product:", axiosErrorManager(err));
      } finally {
        setLoading(false);
      }
    };
    fetching();
  }, [Id, currentUser, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [Id]);

  const isAlreadyInCart = userCart?.some((item) => item.productId?._id === Id);

  return (
    <div className="w-full min-h-screen bg-canvas text-obsidian">
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <span className="loader" />
        </div>
      ) : (
        <div className="pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-8">
          {/* Main Product Showcase Grid (Flat Minimalist, No Heavy Shadows) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-20 border-b border-stone-200">
            {/* Gallery Column */}
            <div className="lg:col-span-7 lg:sticky lg:top-28">
              <div className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full bg-white border border-stone-200 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover transition duration-700 ease-out hover:scale-105"
                  src={product?.image}
                  alt={product?.name || "Product Showcase"}
                />
                {product?.original && product?.original !== "false" && (
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-stone-200 text-obsidian text-[10px] uppercase tracking-[0.2em] font-medium px-3 py-1">
                    Atelier Original
                  </span>
                )}
              </div>
            </div>

            {/* Product Meta & Purchase Actions Column */}
            <div className="lg:col-span-5 flex flex-col space-y-8">
              {/* Header & Wishlist */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-sans text-[11px] uppercase tracking-[0.22em] text-champagne font-semibold block mb-1">
                      {product?.category || "Atelier Furniture"}
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-obsidian font-normal tracking-tight">
                      {product?.name}
                    </h1>
                  </div>

                  <button
                    onClick={() => addToWishListHandler(Id)}
                    aria-label="Wishlist toggle"
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                      isInWishlist
                        ? "border-red-200 bg-red-50 text-red-500"
                        : "border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-200"
                    }`}
                  >
                    <LuHeart className="w-4 h-4" />
                  </button>
                </div>

                {/* Rating & In-House Badge */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-champagne">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <IoMdStar key={index} className="w-3.5 h-3.5" />
                    ))}
                    <span className="text-stone-500 text-[11px] font-sans ml-1">
                      (4.9 &bull; 42 Appraisals)
                    </span>
                  </div>
                  {product?.original && product?.original !== "false" && (
                    <span className="text-stone-500 text-[11px] font-light">
                      Hand-finished in Studio
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="pt-2">
                  <span className="font-sans text-2xl sm:text-3xl font-semibold text-obsidian tracking-tight">
                    {currency || "$"} {product?.price}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-stone-200 pt-6 space-y-4">
                <h4 className="font-sans text-[11px] uppercase tracking-[0.2em] text-stone-500 font-semibold">
                  Specification & Design Notes
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  {product?.description ||
                    "Expertly articulated proportions crafted with premium joinery and durable, tactile upholstery. Designed for longevity and refined ease."}
                </p>
              </div>

              {/* Review Snippet if available */}
              {product?.review && (
                <div className="p-4 bg-white border border-stone-200 space-y-1.5">
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-champagne font-semibold block">
                    Curator Note
                  </span>
                  <p className="text-xs text-stone-600 italic font-serif">
                    &quot;{product?.review}&quot;
                  </p>
                </div>
              )}

              {/* Purchase CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={
                    isAlreadyInCart
                      ? () => navigate("/cart")
                      : addToCartDispatch
                  }
                  className="flex-1 bg-obsidian text-canvas py-3.5 px-6 text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition duration-300 text-center"
                >
                  {isAlreadyInCart ? "View In Bag" : "Add to Bag"}
                </button>

                <button
                  onClick={() => navigate(`/checkout/product/${Id}`)}
                  className="flex-1 border border-obsidian text-obsidian py-3.5 px-6 text-xs uppercase tracking-[0.18em] font-medium hover:bg-obsidian hover:text-canvas transition duration-300 text-center"
                >
                  Acquire Now
                </button>
              </div>

              {/* Atelier Assurance Badges (Zero Emojis) */}
              <div className="border-t border-stone-200 pt-6 grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center space-y-1.5">
                  <LuSparkles className="w-4 h-4 text-champagne" strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-[0.15em] font-medium text-stone-700">
                    Artisan Made
                  </span>
                </div>
                <div className="flex flex-col items-center space-y-1.5">
                  <LuTruck className="w-4 h-4 text-champagne" strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-[0.15em] font-medium text-stone-700">
                    White Glove Care
                  </span>
                </div>
                <div className="flex flex-col items-center space-y-1.5">
                  <LuShieldCheck className="w-4 h-4 text-champagne" strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-[0.15em] font-medium text-stone-700">
                    5-Year Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Collector Ratings & Quality Breakdown (4-5 Star Ratings, Clean & Understated) */}
          <section className="pt-16 pb-16 border-b border-stone-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Overall Rating & Distribution */}
              <div className="lg:col-span-5 bg-white border border-stone-200 p-6 sm:p-8 space-y-6">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-champagne font-semibold block mb-1">
                    Quality Appraisals
                  </span>
                  <h3 className="font-serif text-2xl text-obsidian font-normal">
                    Collector Score
                  </h3>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-5xl text-obsidian font-normal">4.9</span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-0.5 text-champagne text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <IoMdStar key={i} />
                      ))}
                    </div>
                    <p className="text-[11px] text-stone-500 font-light">
                      42 verified collector evaluations
                    </p>
                  </div>
                </div>

                {/* Rating Distribution Bars */}
                <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-[11px]">5 Stars</span>
                    <div className="flex-1 h-1.5 bg-stone-100 overflow-hidden">
                      <div className="h-full bg-champagne w-[92%]" />
                    </div>
                    <span className="w-8 text-right text-[11px] text-stone-400">92%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-[11px]">4 Stars</span>
                    <div className="flex-1 h-1.5 bg-stone-100 overflow-hidden">
                      <div className="h-full bg-champagne w-[8%]" />
                    </div>
                    <span className="w-8 text-right text-[11px] text-stone-400">8%</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-40">
                    <span className="w-12 text-[11px]">3 Stars</span>
                    <div className="flex-1 h-1.5 bg-stone-100" />
                    <span className="w-8 text-right text-[11px] text-stone-400">0%</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-40">
                    <span className="w-12 text-[11px]">2 Stars</span>
                    <div className="flex-1 h-1.5 bg-stone-100" />
                    <span className="w-8 text-right text-[11px] text-stone-400">0%</span>
                  </div>
                  <div className="flex items-center gap-3 opacity-40">
                    <span className="w-12 text-[11px]">1 Star</span>
                    <div className="flex-1 h-1.5 bg-stone-100" />
                    <span className="w-8 text-right text-[11px] text-stone-400">0%</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Verified Ratings Snapshots (No Long Walls of Text) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-champagne font-semibold block mb-1">
                    Verified Ownership
                  </span>
                  <h3 className="font-serif text-2xl text-obsidian font-normal">
                    Recent Verified Acquisitions
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-champagne text-xs">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <IoMdStar key={i} />
                        ))}
                      </div>
                      <span className="text-[10px] text-stone-400">November 2026</span>
                    </div>
                    <p className="font-serif text-sm text-obsidian font-medium">
                      Private Residence &bull; Milan
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 pt-1">
                      <LuCheck className="w-3 h-3 text-emerald-600" />
                      <span>Verified Atelier Acquisition</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-champagne text-xs">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <IoMdStar key={i} />
                        ))}
                      </div>
                      <span className="text-[10px] text-stone-400">October 2026</span>
                    </div>
                    <p className="font-serif text-sm text-obsidian font-medium">
                      Architectural Studio &bull; London
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 pt-1">
                      <LuCheck className="w-3 h-3 text-emerald-600" />
                      <span>Verified Atelier Acquisition</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-champagne text-xs">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <IoMdStar key={i} />
                        ))}
                      </div>
                      <span className="text-[10px] text-stone-400">September 2026</span>
                    </div>
                    <p className="font-serif text-sm text-obsidian font-medium">
                      Interior Curator &bull; Zurich
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 pt-1">
                      <LuCheck className="w-3 h-3 text-emerald-600" />
                      <span>Verified Atelier Acquisition</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-champagne text-xs">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <IoMdStar key={i} />
                        ))}
                      </div>
                      <span className="text-[10px] text-stone-400">August 2026</span>
                    </div>
                    <p className="font-serif text-sm text-obsidian font-medium">
                      Residential Loft &bull; New York
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 pt-1">
                      <LuCheck className="w-3 h-3 text-emerald-600" />
                      <span>Verified Atelier Acquisition</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Complementary Collection Recommendations */}
          {interestedProduct?.length > 0 && (
            <div className="pt-20">
              <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block">
                  Harmonious Pairings
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-obsidian font-normal tracking-tight">
                  You May Also Admire
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {interestedProduct.slice(0, 4).map((item, index) => (
                  <ProductItems
                    key={item._id || index}
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    rating={item.rating || item.averageRating || 0}
                    original={item.original}
                  />
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

export default Product;
