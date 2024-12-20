/* eslint-disable react/prop-types */
import { useState } from "react";
import { LuCircleChevronUp, LuCircleChevronDown, LuCircleCheck, LuTrash } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../Redux/userSlice";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { toast } from "react-toastify";
import axiosInstance from "../utilities/axiosInstance";

function CartCards({ image, name, price, quantity, id }) {
  const dispatch = useDispatch();
  const [newQuantity, setNewQuantity] = useState(quantity);

  const removeFromCartDispatch = async () => {
    try {
      const response = await axiosInstance.get(`/users/cart/${id}`);
      dispatch(removeFromCart(id));
      toast.success(response.data.message);
    } catch (err) {
      dispatch(removeFromCart(id));
      toast.error(axiosErrorManager(err.data.message));
    }
  };

  const updateCartQuantityDispatch = async (newQuantity) => {
    try {
      const response = await axiosInstance.post("/users/cart", {
        productId: id,
        quantity: newQuantity,
      });
      dispatch(updateCartQuantity({ productId: id, quantity: newQuantity }));
      toast.success(response.data.message);
    } catch (err) {
      dispatch(updateCartQuantity({ productId: id, quantity: newQuantity }));
      toast.error(axiosErrorManager(err.data.message));
    }
  };

  const { currency } = useSelector((state) => state.public);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-5 shadow-lg rounded-lg border border-gray-200">
      <div className="flex items-center gap-5">
        <Link to={`/product/${id}`}>
          <img
            className="w-20 h-20 object-cover rounded-lg transition-transform transform hover:scale-105"
            src={image || "/default-product.png"}
            alt={name}
          />
        </Link>
        <div className="flex flex-col">
          <p className="text-gray-700 font-poppins text-lg">{name}</p>
          <p className="font-poppins text-xl font-bold text-gray-800">
            {currency}
            {price}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-5 mt-5 sm:mt-0">
        <div className="flex flex-col justify-between items-center">
          <button
            onClick={() => setNewQuantity(newQuantity + 1)}
            className="text-sofaBlue text-lg transition-all"
          >
            <LuCircleChevronUp />
          </button>
          <input
            className="w-12 text-center pl-3 font-semibold text-gray-700"
            value={newQuantity}
            type="number"
            min={1}
            readOnly
          />
          <button
            onClick={() => setNewQuantity(Math.max(1, newQuantity - 1))}
            className="text-sofaBlue text-lg transition-all"
          >
            <LuCircleChevronDown />
          </button>
        </div>
        <button
          onClick={() => updateCartQuantityDispatch(newQuantity)}
          className="bg-sofaBlue text-white px-3 py-2 rounded-md hover:px-5 transition-all duration-300"
        >
          <LuCircleCheck />
        </button>
        <button
          onClick={removeFromCartDispatch}
          className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-800 transition-all duration-300"
        >
          <LuTrash />
        </button>
      </div>
    </div>
  );
}

export default CartCards;
