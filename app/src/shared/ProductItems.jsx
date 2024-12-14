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
function ProductItems({ id, name, price, image, rating }) {
  const { currency } = useSelector((state) => state.public);
  const { userWishlist, currentUser } = useSelector((state) => state.user);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToWishListHandler = (id) => {
    if (!currentUser) {
      return navigate("/login");
    }
    if (isInWishlist) {
      dispatch(removeFromWishList(id));
    } else {
      dispatch(addToWishList(id));
    }
  };

  useEffect(() => {
    setIsInWishlist(userWishlist.some((item) => item._id === id));
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
      transition={{ duration: 0.3 }}
      className="transition w-48 sm:w-56 md:w-64 hover:shadow-2xl shadow-gray-600 overflow-hidden relative bg-white ease-in-out"
    >
      <Link to={`/product/${id}`}>
        <img
          className="hover:scale-105 transition duration-500 w-full h-52 object-cover ease-in-out"
          src={image}
          alt="image"
          onClick={() => window.scrollTo(0, 0)}
          />
      </Link>
      <div className="px-3 h-32 py-5 gap-6 justify-end flex flex-col">
        <p className="text-sm font-poppins font-semibold text-gray-800 truncate">
          {name}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-sofaBlue">
            {currency} {price}
          </p>
          <p className="text-xs flex text-[#D4AF37]">
            {Array.from({ length: rating }).map((_, index) => (
              <IoMdStar key={index} />
            ))}
          </p>
        </div>
      </div>
      <button
        onClick={() => addToWishListHandler(id)}
        className={`absolute top-2 right-2 p-1 rounded-full transition-colors duration-200 ${
          isInWishlist ? "text-red-500" : "text-gray-400"
        } hover:text-red-500`}
        >
       <FaHeart />
      </button>
    </motion.div>
  );
}

export default ProductItems;