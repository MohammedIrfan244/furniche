import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../Redux/userSlice";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utilities/axiosInstance";

function CheckoutCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userCart, loading } = useSelector((state) => state.user);
  const [payment, setPayment] = useState("cod");
  const totalAmount = userCart?.reduce((sum, item) => {
    return sum + item.productId.price * item.quantity;
  }, 0);
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    pincode: "",
    phone: "",
  });
  const products = userCart?.map((item) => {
    return {
      productId: item.productId?._id,
      quantity: item.quantity,
    };
  });

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `/users/orders/checkout/${payment}`,
        {
          products: products,
          address: address,
          orderType: "cart",
          totalAmount: totalAmount,
        }
      );
      setAddress({
        name: "",
        street: "",
        city: "",
        pincode: "",
        phone: "",
      });
      if (payment === "stripe") {
        window.open(response.data.stripeUrl, "_blank");
      } else {
        toast.success(response.data.message);
        navigate("/cart");
      }
    } catch (err) {
      console.log(axiosErrorManager(err));
      setAddress({
        name: "",
        street: "",
        city: "",
        pincode: "",
        phone: "",
      });
    }
  };

  useEffect(() => {
    dispatch(getCart());
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading && <p className="text-xl text-gray-700">Loading...</p>}
      <form
        onSubmit={placeOrder}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Checkout
        </h2>

        <div className="flex flex-col space-y-4">
          <input
            type="text"
            required
            value={address.name}
            placeholder="Name"
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            required
            value={address.street}
            placeholder="Street"
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            required
            value={address.city}
            placeholder="City"
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            min={5}
            required
            value={address.pincode}
            placeholder="Pincode"
            onChange={(e) =>
              setAddress({ ...address, pincode: e.target.value })
            }
            className="input-field"
          />
          <input
            type="number"
            required
            value={address.phone}
            placeholder="Phone"
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            className="input-field"
          />

          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            name="payment"
            id="payment"
            className="input-field"
          >
            <option value="cod">Cash on delivery</option>
            <option value="stripe">Online payment</option>
          </select>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="checkbox"
              required
              className="checkbox"
            />
            <label htmlFor="checkbox" className="text-sm text-gray-700">
              I agree to the terms and conditions and the details provided are
              correct
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutCart;
