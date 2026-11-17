import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { toast } from "react-toastify";
import axiosInstance from "../utilities/axiosInstance";
import { useSelector } from "react-redux";
import { LuShieldCheck, LuMinus, LuPlus, LuLock } from "react-icons/lu";

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
  const totalAmount = (product?.price || 0) * quantity;

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
        toast.success(response.data.message || "Order placed successfully");
        navigate("/cart");
      }
    } catch (err) {
      console.error(axiosErrorManager(err));
      toast.error(axiosErrorManager(err));
      setAddress({
        name: "",
        street: "",
        city: "",
        pincode: "",
        phone: "",
      });
    }
  };

  const fetchProduct = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/public/products/${productId}`
      );
      setProduct(response.data?.data || {});
      setLoading(false);
    } catch (err) {
      console.error(axiosErrorManager(err));
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
    <div className="w-full min-h-screen bg-canvas text-obsidian">
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <span className="loader" />
        </div>
      ) : (
        <div className="pt-28 sm:pt-36 pb-20 max-w-4xl mx-auto px-4 sm:px-8">
          <div className="border-b border-stone-200/80 pb-6 mb-10 text-center sm:text-left">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block mb-2">
              Bespoke Acquisition
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-obsidian font-normal tracking-tight">
              Checkout & Delivery
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Form Column */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-stone-200/80 shadow-atelier">
              <h3 className="font-serif text-xl text-obsidian font-normal mb-6">
                Delivery Details
              </h3>

              <form onSubmit={placeOrder} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={address.name}
                    placeholder="Recipient Name"
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    className="w-full bg-canvas-subtle p-3 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
                    Street Address & Suite
                  </label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    placeholder="Apartment, Street, Locality"
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full bg-canvas-subtle p-3 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      placeholder="City"
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full bg-canvas-subtle p-3 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
                      Postal Code
                    </label>
                    <input
                      type="number"
                      min={10000}
                      required
                      value={address.pincode}
                      placeholder="Postal Code"
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      className="w-full bg-canvas-subtle p-3 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    placeholder="Mobile number for delivery updates"
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full bg-canvas-subtle p-3 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
                    Payment Preference
                  </label>
                  <select
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    className="w-full bg-canvas-subtle p-3 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors"
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="stripe">Online Payment via Stripe</option>
                  </select>
                </div>

                <div className="flex items-start gap-2.5 pt-2">
                  <input
                    type="checkbox"
                    id="checkbox-single"
                    required
                    className="mt-1 accent-obsidian"
                  />
                  <label htmlFor="checkbox-single" className="text-xs text-stone-600 font-light leading-relaxed">
                    I confirm the delivery coordinates provided above are accurate and accept the Furniche Atelier delivery terms.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-obsidian text-canvas py-3.5 text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition duration-300 mt-6"
                >
                  <LuLock className="w-3.5 h-3.5 text-champagne" />
                  <span>Confirm Acquisition</span>
                </button>
              </form>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-stone-200/80 shadow-atelier space-y-6">
              <h3 className="font-serif text-xl text-obsidian font-normal border-b border-stone-100 pb-4">
                Selected Work
              </h3>

              <div className="flex items-center gap-4">
                <div className="aspect-[4/5] w-20 overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                  <img
                    src={product?.image || "/default-product.png"}
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base text-obsidian font-normal">
                    {product?.name}
                  </h4>
                  <p className="font-sans text-xs text-stone-500">
                    Unit: {currency || "$"} {product?.price}
                  </p>
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center justify-between border-y border-stone-100 py-3">
                <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                  Quantity
                </span>
                <div className="flex items-center border border-stone-300 bg-canvas-subtle">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-obsidian"
                  >
                    <LuMinus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-obsidian">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-obsidian"
                  >
                    <LuPlus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-xs text-stone-600 font-light">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-champagne font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>White Glove Inspection</span>
                  <span className="text-stone-700">Included</span>
                </div>
              </div>

              <div className="border-t border-stone-200 pt-4 flex justify-between items-baseline">
                <span className="font-serif text-lg text-obsidian">Total Investment</span>
                <span className="font-sans text-xl font-semibold text-obsidian tracking-tight">
                  {currency || "$"} {totalAmount}
                </span>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-stone-500 uppercase tracking-widest">
                <LuShieldCheck className="w-3.5 h-3.5 text-champagne" />
                <span>Verified Atelier Transaction</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutSingle;
