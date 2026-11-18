import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdStar } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeFromWishList,
  getWishlist,
} from "../Redux/userSlice";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
function ProductItems({ id, name, price, image, rating, original }) {
  const { currency } = useSelector((state) => state.public);
  const { userWishlist, currentUser } = useSelector((state) => state.user);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (!currentUser) {
      setIsInWishlist(false);
    } else {
      setIsInWishlist(userWishlist?.some((item) => item._id === id));
    }
  }, [id, userWishlist, currentUser]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getWishlist());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative flex flex-col bg-white border border-stone-200 overflow-hidden transition-colors duration-300 hover:border-stone-500"
    >
      {/* Image Showcase Container */}
      <Link
        to={`/product/${id}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="aspect-[4/5] w-full overflow-hidden bg-stone-100 relative block"
      >
        <img
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          src={image}
          alt={name}
          loading="lazy"
        />

        {/* In-House / Atelier Badge */}
        {original && original !== "false" && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-stone-200 text-obsidian text-[9px] uppercase tracking-[0.2em] font-medium px-2 py-0.5">
            Atelier Edition
          </span>
        )}
      </Link>

      {/* Wishlist Action Button */}
      <button
        onClick={() => addToWishListHandler(id)}
        aria-label="Save to Wishlist"
        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
          isInWishlist
            ? "bg-white text-red-500 shadow-sm"
            : "bg-white/80 text-stone-400 hover:text-red-500 hover:bg-white"
        }`}
      >
        <FaHeart className="w-3.5 h-3.5" />
      </button>

      {/* Card Content & Details */}
      <div className="p-4 flex flex-col justify-between flex-grow gap-3 bg-white">
        <Link
          to={`/product/${id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <h3 className="font-sans text-xs sm:text-sm font-medium text-obsidian tracking-normal line-clamp-1 group-hover:text-champagne transition-colors duration-200">
            {name}
          </h3>
        </Link>

        <div className="flex items-center justify-between pt-1 border-t border-stone-100">
          <p className="font-sans text-xs sm:text-sm font-semibold text-obsidian tracking-tight">
            {currency || "₹"} {price}
          </p>

          {rating > 0 && (
            <div className="flex items-center gap-0.5 text-champagne text-[11px]">
              {Array.from({ length: Math.min(rating, 5) }).map((_, index) => (
                <IoMdStar key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProductItems;
