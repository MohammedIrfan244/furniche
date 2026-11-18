import { useEffect, useState } from "react";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utilities/axiosInstance";
import { useSelector } from "react-redux";
import {
  LuPackage,
  LuCalendar,
  LuCreditCard,
  LuTruck,
  LuArrowLeft,
  LuX,
  LuCircleAlert,
  LuFileText,
} from "react-icons/lu";

const CANCELLATION_REASONS = [
  "Delivery timeline no longer aligns with project schedule",
  "Placed order in error or duplicate acquisition",
  "Wish to change finish, fabric, or dimensions",
  "Selected an alternative piece within the Furniche collection",
  "Other personal or logistical reason",
];

function Order() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState(CANCELLATION_REASONS[0]);
  const [cancellationNotes, setCancellationNotes] = useState("");
  const [cancelling, setCancelling] = useState(false);
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

  const confirmCancellation = async () => {
    try {
      setCancelling(true);
      const response = await axiosInstance.patch(`/users/orders/cancel/${id}`);
      toast.success(response.data.message || "Order cancellation recorded");
      setShowCancelModal(false);
      window.location.reload();
    } catch (err) {
      toast.error(axiosErrorManager(err));
      setShowCancelModal(false);
      window.location.reload();
    } finally {
      setCancelling(false);
    }
  };

  const isCancelled = order?.shippingStatus === "Cancelled";

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
          <div className="bg-white border border-stone-200 p-6 sm:p-10 space-y-8">
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

              <span
                className={`inline-block px-3 py-1 text-[11px] uppercase tracking-widest font-medium border w-fit ${
                  isCancelled
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-stone-100 text-stone-800 border-stone-200"
                }`}
              >
                {order?.shippingStatus || "Processing"}
              </span>
            </div>

            {/* Cancelled Notice Banner if cancelled */}
            {isCancelled && (
              <div className="p-4 bg-stone-50 border border-stone-200 flex items-start gap-3">
                <LuCircleAlert className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-600 space-y-0.5">
                  <p className="font-medium text-obsidian">This acquisition has been cancelled.</p>
                  <p className="font-light text-stone-500">
                    No payment will be captured. If you have any inquiries regarding this reference, please contact client concierge.
                  </p>
                </div>
              </div>
            )}

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
                      {currency || "₹"} {product?.productId?.price}
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
                <span>Total: <strong className="text-obsidian font-semibold">{currency || "₹"} {order?.totalAmount}</strong></span>
              </div>
            </div>

            {/* Cancel Order Trigger */}
            {!isCancelled && (
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <p className="text-xs text-stone-400 font-light">
                  Orders may be cancelled prior to dispatch.
                </p>
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="border border-stone-300 text-stone-600 hover:border-red-500 hover:text-red-600 text-xs uppercase tracking-[0.16em] px-5 py-2.5 transition duration-200"
                >
                  Cancel Acquisition
                </button>
              </div>
            )}
          </div>
        )}

        {/* Structured Cancellation Dialogue Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border border-stone-200 max-w-lg w-full p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between border-b border-stone-100 pb-4">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-champagne font-semibold block mb-1">
                    Atelier Concierge
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-obsidian font-normal">
                    Cancel Acquisition Request
                  </h3>
                </div>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="text-stone-400 hover:text-obsidian p-1"
                >
                  <LuX className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <p className="text-stone-600 font-light">
                  Please select your primary reason for cancelling order <span className="font-mono text-obsidian">#{id}</span>:
                </p>

                <div className="space-y-2.5">
                  {CANCELLATION_REASONS.map((reason, index) => (
                    <label
                      key={index}
                      className={`flex items-start gap-3 p-3 border cursor-pointer transition ${
                        selectedReason === reason
                          ? "border-obsidian bg-canvas-subtle"
                          : "border-stone-200 hover:bg-stone-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="cancellationReason"
                        checked={selectedReason === reason}
                        onChange={() => setSelectedReason(reason)}
                        className="mt-0.5 accent-obsidian"
                      />
                      <span className="text-stone-700 leading-snug">{reason}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                    Additional notes for concierge (optional)
                  </label>
                  <textarea
                    rows="3"
                    value={cancellationNotes}
                    onChange={(e) => setCancellationNotes(e.target.value)}
                    placeholder="Provide any context for our client advisors..."
                    className="w-full bg-canvas-subtle p-2.5 border border-stone-200 text-xs text-obsidian focus:outline-none focus:border-obsidian resize-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 border border-stone-300 text-stone-700 py-3 text-xs uppercase tracking-widest hover:border-obsidian hover:text-obsidian transition"
                >
                  Keep Order
                </button>

                <button
                  type="button"
                  onClick={confirmCancellation}
                  disabled={cancelling}
                  className="flex-1 bg-red-600 text-white py-3 text-xs uppercase tracking-widest font-medium hover:bg-red-700 transition disabled:opacity-70"
                >
                  {cancelling ? "Processing..." : "Confirm Cancellation"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
