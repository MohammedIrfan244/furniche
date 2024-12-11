import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist, removeFromWishList } from "../Redux/userSlice";

function Wishlist() {
  const dispatch = useDispatch();
  const { userWishlist, loading } = useSelector((state) => state.user);

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
    <div className="w-full flex flex-col items-center sm:items-start sm:flex-row gap-9 px-5 pt-[26%] sm:pt-[8%]">
      {loading && <p className="text-gray-500">Loading...</p>}
      {!loading && userWishlist?.length === 0 && (
        <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
      )}
      <ul className="w-full flex flex-col gap-4">
        {userWishlist?.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between w-full sm:w-[50%] bg-white p-4 shadow rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <img
                src={item?.image || "/default-product.png"}
                alt={item?.name}
                className="w-16 h-16 object-cover rounded"
              />
              <span className="text-gray-700 font-medium">{item?.name}</span>
            </div>
            <button
              onClick={() => removeFromWishlist(item?._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wishlist;
