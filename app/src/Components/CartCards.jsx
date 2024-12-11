/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faChevronDown,
  faChevronUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
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
    <div className="flex items-center justify-between bg-white p-5 shadow-lg rounded-lg border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
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
      <div className="flex items-center gap-5">
        <div className="flex flex-col items-center">
          <button
            onClick={() => setNewQuantity(newQuantity + 1)}
            className="text-gray-600 hover:text-gray-800 transition-all"
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
          <input
            className="w-12 text-center border-2 border-gray-300 rounded-md bg-gray-50 font-semibold text-gray-700"
            value={newQuantity}
            type="number"
            min={1}
            readOnly
          />
          <button
            onClick={() => setNewQuantity(Math.max(1, newQuantity - 1))}
            className="text-gray-600 hover:text-gray-800 transition-all"
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
        <button
          onClick={() => updateCartQuantityDispatch(newQuantity)}
          className="text-sofaBlue hover:text-sofaBlue-dark transition-all"
        >
          <FontAwesomeIcon icon={faCheckCircle} />
        </button>
        <button
          onClick={removeFromCartDispatch}
          className="text-red-600 hover:text-red-800 transition-all"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}

export default CartCards;
