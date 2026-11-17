import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../Redux/userSlice";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utilities/axiosInstance";
import { LuShieldCheck, LuLock } from "react-icons/lu";

function CheckoutCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userCart, loading } = useSelector((state) => state.user);
  const { currency } = useSelector((state) => state.public);
  const [payment, setPayment] = useState("cod");

  const totalAmount = userCart?.reduce((sum, item) => {
    return sum + (item.productId?.price || 0) * item.quantity;
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

  useEffect(() => {
    dispatch(getCart());
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              Bag Acquisition
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-obsidian font-normal tracking-tight">
              Checkout & Delivery
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Delivery Address Form Column */}
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
                    placeholder="Mobile number for delivery coordination"
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
                    id="checkbox-cart"
                    required
                    className="mt-1 accent-obsidian"
                  />
                  <label htmlFor="checkbox-cart" className="text-xs text-stone-600 font-light leading-relaxed">
                    I confirm the delivery coordinates provided above are accurate and accept the Furniche Atelier delivery terms.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-obsidian text-canvas py-3.5 text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition duration-300 mt-6"
                >
                  <LuLock className="w-3.5 h-3.5 text-champagne" />
                  <span>Complete Acquisition</span>
                </button>
              </form>
            </div>

            {/* Right Summary Column */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-stone-200/80 shadow-atelier space-y-6">
              <h3 className="font-serif text-xl text-obsidian font-normal border-b border-stone-100 pb-4">
                Selected Works ({userCart?.length || 0})
              </h3>

              <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                {userCart?.map((item, index) => (
                  <div key={item?.productId?._id || index} className="flex items-center gap-3">
                    <div className="aspect-[4/5] w-14 overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                      <img
                        src={item?.productId?.image || "/default-product.png"}
                        alt={item?.productId?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow space-y-0.5">
                      <h4 className="font-serif text-xs text-obsidian font-normal line-clamp-1">
                        {item?.productId?.name}
                      </h4>
                      <p className="font-sans text-[11px] text-stone-500">
                        Qty: {item.quantity} &times; {currency || "$"} {item?.productId?.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-stone-600 font-light border-t border-stone-100 pt-4">
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

export default CheckoutCart;
