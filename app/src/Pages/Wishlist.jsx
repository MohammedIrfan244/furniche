import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist, removeFromWishList } from "../Redux/userSlice";
import { LuShoppingCart } from "react-icons/lu"; // Optional, for icon use

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
    <div
      className={`${
        loading ? "h-[100vh] flex justify-center items-center bg-[#F9F9F9]" : "bg-[#F9F9F9] min-h-screen"
      }`}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="w-full flex flex-col sm:flex-row gap-9 px-5 pt-[26%] sm:pt-[8%]">
          {userWishlist.length === 0 && !loading ? (
            <div className="text-gray-500 h-[60vh] w-full flex justify-center items-center flex-col">
              <LuShoppingCart className="text-6xl sm:text-8xl md:text-9xl text-[#B8A78C]" />
              <p className="text-lg sm:text-xl text-gray-500 mt-5">Your wishlist is empty!</p>
            </div>
          ) : null}

          <div className={userWishlist.length === 0 ? "hidden" : "w-full sm:w-[65%]"}>
            <h1 className="text-lg sm:text-xl font-semibold">Wishlist Items</h1>
            <div className="flex flex-col gap-5 sm:overflow-y-auto scrollbar-thin scrollbar-thumb-[#B8A78C] scrollbar-track-transparent sm:h-[70vh]">
              {userWishlist.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-5 shadow-lg rounded-lg border border-gray-200 "
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={item?.image || "/default-product.png"}
                      alt={item?.name}
                      className="w-20 h-20 object-cover rounded-lg transition-transform transform hover:scale-105"
                    />
                    <div className="flex flex-col">
                      <p className="text-gray-700 font-poppins text-lg">{item?.name}</p>
                      <p className="font-poppins text-xl font-bold text-gray-800">
                        {currency}
                        {item?.price}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromWishlist(item?._id)}
                    className="text-red-600 hover:text-red-800 transition-all"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
