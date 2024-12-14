import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosErrorManager from "../utilities/axiosErrorManager";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axiosInstance from "../utilities/axiosInstance";
import { useSelector } from "react-redux";

function CheckoutSingle() {
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState("cod");
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { currency } = useSelector((state) => state.public);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    pincode: "",
    phone: "",
  });
  const totalAmount = product?.price * quantity || 0;

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `/users/orders/checkout/${payment}`,
        {
          products: [
            {
              productId: product._id,
              quantity,
            },
          ],
          address: address,
          orderType: "single",
          totalAmount: totalAmount,
        }
      );
      if (payment === "stripe") {
        window.open(response.data.stripeUrl, "_self");
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

  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3001/api/public/products/${id}`
      );
      setProduct(response.data?.data);
      setLoading(false);
    } catch (err) {
      console.log(axiosErrorManager(err));
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-full flex flex-col justify-center items-center bg-gray-100 py-8">
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="max-w-lg bg-white p-8 mt-5 rounded-lg shadow-lg w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Checkout
          </h2>

          <div className="mb-6">
            <p className="text-lg text-gray-700 font-semibold">
              Product: {product.name}
            </p>
            <p className="text-lg text-gray-700">Price: ${product.price}</p>
          </div>

          <div className="flex justify-center items-center mb-6">
            <button
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-blue-600"
            >
              +
            </button>
            <p className="text-xl">{quantity}</p>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4 hover:bg-blue-600"
            >
              -
            </button>
          </div>

          <p className="text-lg text-gray-700 font-semibold mb-6">
            Total Amount: {currency} {totalAmount}
          </p>

          <form onSubmit={placeOrder} className="space-y-4">
            <input
              type="text"
              required
              value={address.name}
              placeholder="Name"
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              required
              value={address.street}
              placeholder="Street"
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              required
              value={address.city}
              placeholder="City"
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              required
              value={address.phone}
              placeholder="Phone"
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              name="payment"
              id="payment"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="cod">Cash on delivery</option>
              <option value="stripe">Online payment</option>
            </select>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="checkbox"
                required
                className="h-4 w-4 text-blue-500"
              />
              <label htmlFor="checkbox" className="text-sm text-gray-700">
                I agree to the terms and conditions and the details provided are
                correct.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CheckoutSingle;
