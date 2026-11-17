/* eslint-disable react/prop-types */
import { useState } from "react";
import { LuPlus, LuMinus, LuCheck, LuTrash2 } from "react-icons/lu";
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
      const response = await axiosInstance.delete(`/users/cart/${id}`);
      dispatch(removeFromCart(id));
      toast.success(response.data.message || "Removed from cart");
    } catch (err) {
      dispatch(removeFromCart(id));
      toast.error(axiosErrorManager(err.data?.message || err.message));
    }
  };

  const updateCartQuantityDispatch = async (qty) => {
    try {
      const response = await axiosInstance.post("/users/cart", {
        productId: id,
        quantity: qty,
      });
      dispatch(updateCartQuantity({ productId: id, quantity: qty }));
      toast.success(response.data.message || "Quantity updated");
    } catch (err) {
      dispatch(updateCartQuantity({ productId: id, quantity: qty }));
      toast.error(axiosErrorManager(err.data?.message || err.message));
    }
  };

  const { currency } = useSelector((state) => state.public);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-5 border border-stone-200/80 transition-all duration-300 hover:border-stone-300">
      {/* Product Image & Title */}
      <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
        <Link to={`/product/${id}`} className="shrink-0 aspect-[4/5] w-20 sm:w-24 overflow-hidden bg-stone-100 border border-stone-100">
          <img
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            src={image || "/default-product.png"}
            alt={name}
          />
        </Link>
        <div className="flex flex-col space-y-1">
          <Link to={`/product/${id}`}>
            <h4 className="font-serif text-base sm:text-lg text-obsidian hover:text-champagne transition-colors line-clamp-1 font-normal">
              {name}
            </h4>
          </Link>
          <span className="font-sans text-xs text-stone-500 uppercase tracking-widest">
            Unit Price
          </span>
          <p className="font-sans text-sm sm:text-base font-semibold text-obsidian tracking-tight">
            {currency || "$"} {price}
          </p>
        </div>
      </div>

      {/* Stepper & Action Controls */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-100">
        {/* Quantity Stepper */}
        <div className="flex items-center border border-stone-300 bg-canvas-subtle">
          <button
            onClick={() => setNewQuantity(Math.max(1, newQuantity - 1))}
            aria-label="Decrease quantity"
            className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-obsidian hover:bg-stone-200 transition"
          >
            <LuMinus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-sans text-xs font-semibold text-obsidian">
            {newQuantity}
          </span>
          <button
            onClick={() => setNewQuantity(newQuantity + 1)}
            aria-label="Increase quantity"
            className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-obsidian hover:bg-stone-200 transition"
          >
            <LuPlus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Update Quantity Confirmation if changed */}
        {newQuantity !== quantity && (
          <button
            onClick={() => updateCartQuantityDispatch(newQuantity)}
            title="Confirm Quantity"
            className="w-8 h-8 bg-obsidian text-canvas flex items-center justify-center hover:bg-champagne transition-colors"
          >
            <LuCheck className="w-4 h-4" />
          </button>
        )}

        {/* Remove Button */}
        <button
          onClick={removeFromCartDispatch}
          aria-label="Remove item"
          title="Remove from Bag"
          className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-red-500 transition-colors"
        >
          <LuTrash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default CartCards;
