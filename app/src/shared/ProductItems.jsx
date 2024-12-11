import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeFromWishList,
  getWishlist,
} from "../Redux/userSlice";

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
    <div className="transition w-52 duration-200 overflow-hidden relative border-none rounded-sm bg-[#F9FCFA] hover:scale-[1.03] hover:shadow-lg shadow-md ease-in-out">
      <Link to={`/product/${id}`}>
        <img
          className="hover:scale-105 transition duration-500 w-auto h-40 object-cover ease-in-out"
          src={image}
          alt="image"
          onClick={() => window.scrollTo(0, 0)}
        />
      </Link>
      <div className="px-[4%] flex justify-between items-center w-full py-[3%]">
        <div className="w-full">
          <p className="text-xs font-bold">{name}</p>
          <div className="w-full flex justify-between items-end pe-3">
            <p className="text-xs font-bold">
              {currency} {price}
            </p>
            <p className="text-[10px] flex text-[#D4AF37]">
              {Array.from({ length: rating }).map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} />
              ))}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={() => addToWishListHandler(id)}
        className={isInWishlist ? "text-red-500" : "text-black"}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
    </div>
  );
}

export default ProductItems;
