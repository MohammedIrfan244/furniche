import { useEffect } from "react";
import CartCards from "../Components/CartCards";
import { LuShoppingCart } from "react-icons/lu";
import ScrollTop from "../utilities/ScrollTop";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userCart, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCart());
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${
        loading ? "h-[100vh] flex justify-center items-center bg-[#F9F9F9]" : "bg-[#F9F9F9] min-h-screen"
      }`}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="w-full flex flex-col sm:flex-row gap-9 px-5 pt-[26%] sm:pt-[8%]">
          {userCart.length === 0 && !loading ? (
            <div className="text-gray-500 h-[60vh] w-full flex justify-center items-center flex-col">
              <LuShoppingCart
                className="text-6xl sm:text-8xl md:text-9xl text-[#B8A78C]"
              />
              <p className="text-lg sm:text-xl text-gray-500 mt-5">Your cart is empty!</p>
            </div>
          ) : null}

          <div className={userCart.length === 0 ? "hidden" : "w-full sm:w-[65%]"}>
            <h1
              className="text-xl sm:text-2xl font-serif tracking-wide underline mb-10 text-black"
            >
              CART ITEMS
            </h1>
            <div className="flex flex-col gap-5 sm:overflow-y-auto scrollbar-thin scrollbar-thumb-[#B8A78C] scrollbar-track-transparent sm:h-[70vh]">
              {userCart.map((item, index) => (
                <CartCards
                  key={index}
                  quantity={item.quantity}
                  image={item?.productId?.image}
                  price={item?.productId?.price}
                  name={item?.productId?.name}
                  id={item?.productId?._id}
                />
              ))}
            </div>
          </div>

          <div className={userCart.length === 0 ? "hidden" : "w-full sm:w-[30%]"}>
            <div className="p-5 bg-white shadow-md rounded-lg">
              <h2 className="text-lg sm:text-xl font-semibold mb-5">Order Summary</h2>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Total Items:</strong> {userCart.length}
              </p>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Total Price:</strong>{" "}
                {userCart.reduce((total, item) => total + item.productId.price * item.quantity, 0)}{" "}
                USD
              </p>
              <button
                onClick={() => navigate(`/checkout/products/cart`)}
                className="w-full bg-[#D7D2C9] text-[#000000] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm py-2 mt-5 active:scale-95"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
      <ScrollTop />
    </div>
  );
}

export default Cart;

