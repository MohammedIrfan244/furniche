import { useEffect, useState } from "react";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utilities/axiosInstance";
import { useSelector } from "react-redux";
import { LuPackage, LuCalendar, LuCreditCard, LuTruck, LuArrowLeft } from "react-icons/lu";

function Order() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const { currency } = useSelector((state) => state.public);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/users/orders/${id}`);
        setLoading(false);
        setOrder(response.data.data);
      } catch (err) {
        toast.error(axiosErrorManager(err));
        setLoading(false);
      }
    };
    fetchOrder();
    window.scrollTo(0, 0);
  }, [id]);

  const cancelOrder = async () => {
    try {
      const response = await axiosInstance.patch(`/users/orders/cancel/${id}`);
      toast.success(response.data.message || "Order status updated");
      window.location.reload();
    } catch (err) {
      toast.error(axiosErrorManager(err));
      window.location.reload();
    }
  };

  return (
    <div className="w-full min-h-screen bg-canvas text-obsidian">
      <div className="pt-28 sm:pt-36 pb-20 max-w-3xl mx-auto px-4 sm:px-8">
        <Link
          to="/user"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 hover:text-obsidian mb-8 transition"
        >
          <LuArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Account</span>
        </Link>

        {loading ? (
          <div className="h-64 flex justify-center items-center">
            <span className="loader" />
          </div>
        ) : (
          <div className="bg-white border border-stone-200/80 p-6 sm:p-10 shadow-atelier space-y-8">
            {/* Header */}
            <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block mb-1">
                  Atelier Manifest
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl text-obsidian font-normal">
                  Order Details
                </h1>
                <p className="text-xs text-stone-500 font-mono mt-1">
                  Reference: #{id}
                </p>
              </div>

              <span className="inline-block px-3 py-1 bg-stone-100 text-stone-800 text-[11px] uppercase tracking-widest font-medium border border-stone-200 w-fit">
                {order?.shippingStatus || "Processing"}
              </span>
            </div>

            {/* Products List */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-obsidian font-normal">
                Acquired Items
              </h3>
              <div className="divide-y divide-stone-100 border-t border-b border-stone-100">
                {order?.products?.map((product) => (
                  <div key={product._id} className="py-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-serif text-base text-obsidian">
                        {product?.productId?.name}
                      </p>
                      <p className="text-xs text-stone-500">
                        Quantity: {product?.quantity}
                      </p>
                    </div>
                    <p className="font-sans text-sm font-semibold text-obsidian">
                      {currency || "$"} {product?.productId?.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Timeline Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-canvas-subtle p-5 border border-stone-200 text-xs">
              <div className="flex items-center gap-2.5 text-stone-600">
                <LuCalendar className="w-4 h-4 text-champagne shrink-0" />
                <span>Date: <strong className="text-obsidian font-medium">{order?.purchasedDate}</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-stone-600">
                <LuTruck className="w-4 h-4 text-champagne shrink-0" />
                <span>Shipping: <strong className="text-obsidian font-medium">{order?.shippingStatus}</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-stone-600">
                <LuCreditCard className="w-4 h-4 text-champagne shrink-0" />
                <span>Payment: <strong className="text-obsidian font-medium">{order?.paymentStatus}</strong></span>
              </div>
              <div className="flex items-center gap-2.5 text-stone-600">
                <LuPackage className="w-4 h-4 text-champagne shrink-0" />
                <span>Total: <strong className="text-obsidian font-semibold">{currency || "$"} {order?.totalAmount}</strong></span>
              </div>
            </div>

            {/* Cancel Order Action */}
            {order?.shippingStatus !== "Cancelled" && (
              <div className="pt-4 flex justify-end">
                <button
                  onClick={cancelOrder}
                  className="border border-stone-300 text-stone-600 hover:border-red-500 hover:text-red-600 text-xs uppercase tracking-[0.16em] px-6 py-2.5 transition duration-200"
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
