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
    <div className="flex items-center justify-between bg-white p-4 shadow rounded-lg border border-gray-200">
      <div className="flex items-center gap-4">
        <Link to={`/product/${id}`}>
          <img
            className="w-16 h-16 object-cover rounded"
            src={image || "/default-product.png"}
            alt={name}
          />
        </Link>
        <div className="flex flex-col">
          <p className="text-gray-700 font-medium">{name}</p>
          <p className="font-bold text-gray-800">
            {currency}
            {price}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <button
            onClick={() => setNewQuantity(newQuantity + 1)}
            className="text-gray-600 hover:text-gray-800"
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
          <input
            className="w-10 text-center border border-gray-300 rounded bg-gray-50"
            value={newQuantity}
            type="number"
            min={1}
            readOnly
          />
          <button
            onClick={() => setNewQuantity(Math.max(1, newQuantity - 1))}
            className="text-gray-600 hover:text-gray-800"
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
        <button
          onClick={() => updateCartQuantityDispatch(newQuantity)}
          className="text-green-600 hover:text-green-800"
        >
          <FontAwesomeIcon icon={faCheckCircle} />
        </button>
        <button
          onClick={removeFromCartDispatch}
          className="text-red-600 hover:text-red-800"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}

export default CartCards;
