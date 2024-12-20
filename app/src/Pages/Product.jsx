import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuBadgeCheck, LuHeart } from "react-icons/lu";
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
  const { currentUser, userCart, userWishlist } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currency } = useSelector((state) => state.user);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [interestedProduct, setInterestedProduct] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const addToCartDispatch = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    if (!userCart.find((item) => item.productId._id === Id)) {
      try {
        await axiosInstance.post("/users/cart", {
          productId: Id,
          quantity: 1,
        });
        dispatch(addToCart(Id));
        dispatch(getCart());
      } catch (err) {
        toast.error(axiosErrorManager(err));
      }
    }
  };

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
    setIsInWishlist(userWishlist.some((item) => item._id === Id));
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
        const interestedResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/public/products/category/${response.data.data.category}`
        );
        setInterestedProduct(interestedResponse.data.data);
      } catch (err) {
        console.log("Error:", axiosErrorManager(err));
      } finally {
        setLoading(false);
      }
    };
    fetching();
  }, [Id, currentUser, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`${
        loading ? "h-[100vh] flex justify-center items-center" : null
      }`}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="pt-[26%] sm:pt-[10%] flex flex-col items-center">
          <div className="flex flex-col sm:flex-row w-[90%] sm:w-[87%] p-2 bg-white border border-gray-300 shadow-md">
            <div className="w-[100%] sm:w-[50%] flex justify-center overflow-hidden items-center">
              <img
                className="hover:scale-[1.01] transition duration-500 ease-in-out w-[400px] h-[200px] sm:w-[610px] sm:h-[410px] object-cover"
                src={product?.image}
                alt="image"
              />
            </div>
            <div className="mt-[3%] sm:mt-0 w-[100%] sm:w-[50%] flex flex-col justify-between min-h-[50vh] sm:px-[3%] sm:gap-0">
              <div className="flex flex-col gap-[20px]">
                <div className="flex justify-between">
                  <div>
                    <h1 className="font-bold text-xl">
                      {product?.name}
                      {product?.original !== "false" && (
                        <LuBadgeCheck className="text-gold" />
                      )}
                    </h1>
                    {product?.original !== "false" && (
                      <p className="text-xs">(In house design)</p>
                    )}
                  </div>
                  <LuHeart
                    onClick={() => addToWishListHandler(Id)}
                    className={`${
                      isInWishlist ? "text-red-500" : "text-gray-500"
                    } cursor-pointer hover:text-red-500`}
                  />
                </div>
                <p className="text-xs flex text-[#FFD700]">
                  {Array.from({ length: product?.rating }).map((_, index) => (
                    <IoMdStar key={index} />
                  ))}
                </p>
                <p className="text-xl font-bold">
                  {currency} {product?.price}
                </p>
                <p className="text-xs">{product?.description}</p>
              </div>
              <div>
                <p className="text-sm">Review :</p>
                <p className="text-xs">{product?.review}</p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => navigate(`/checkout/product/${Id}`)}
                  className="bg-sofaBlue text-white text-xs py-2 rounded-md mt-5 w-20"
                >
                  Buy Now
                </button>
                <button
                  onClick={
                    userCart?.some((item) => item.productId?._id === Id)
                      ? () => navigate("/cart")
                      : addToCartDispatch
                  }
                  className="bg-sofaBlue text-white rounded-md text-xs py-2 mt-5 px-4"
                >
                  {userCart.some((item) => item.productId?._id === Id)
                    ? "Go to Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-[100%] mt-20 px-3 lg:p-2">
            <h1 className="text-xl sm:text-2xl font-poppins tracking-wide underline decoration-sofaBlue underline-offset-4">
              YOU MAY ALSO LIKE
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {interestedProduct.map((item, index) => (
                <ProductItems
                  key={index}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  original={item.original}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <ScrollTop />
    </div>
  );
}

export default Product;
