import AdminOrderItemCards from "./AdminOrderItemsCard";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import axiosInstance from "../utilities/axiosInstance";
import { LuCheck, LuTruck } from "react-icons/lu";

// eslint-disable-next-line react/prop-types
function AdminOrderCards({ orderItems = {}, user = {}, userId, fetchingOrder }) {
  const updatePaymentStatus = async () => {
    try {
      const response = await axiosInstance.patch(
        `/admin/orders/payment/${orderItems._id}`
      );
      fetchingOrder(userId);
      toast.success(response.data.message || "Payment status updated");
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };

  const updateShippingStatus = async () => {
    try {
      const response = await axiosInstance.patch(
        `/admin/orders/shipping/${orderItems._id}`
      );
      fetchingOrder(userId);
      toast.success(response.data.message || "Shipping status updated");
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };

  return (
    <div className="bg-white border border-stone-200/80 p-5 shadow-sm space-y-4">
      {/* Items in this order */}
      <div className="space-y-2">
        {orderItems.products?.map((items, index) => (
          <AdminOrderItemCards
            key={index}
            id={items?.productId?._id}
            count={items?.quantity}
            name={items?.productId?.name}
            image={items?.productId?.image}
            price={items?.productId?.price}
          />
        ))}
      </div>

      {/* Order coordinates metadata */}
      <div className="text-xs space-y-2 border-t border-stone-100 pt-3 text-stone-600">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <p><span className="text-stone-400 uppercase tracking-widest text-[10px] block">Order Ref:</span> {orderItems?._id}</p>
          <p><span className="text-stone-400 uppercase tracking-widest text-[10px] block">Client:</span> {orderItems?.address?.name || user?.name}</p>
          <p><span className="text-stone-400 uppercase tracking-widest text-[10px] block">Email:</span> {user?.email}</p>
          <p><span className="text-stone-400 uppercase tracking-widest text-[10px] block">Telephone:</span> {orderItems?.address?.phone}</p>
          <p className="sm:col-span-2"><span className="text-stone-400 uppercase tracking-widest text-[10px] block">Destination:</span> {orderItems?.address?.street} {orderItems?.address?.city} &mdash; {orderItems?.address?.pincode}</p>
          <p className="sm:col-span-2 font-semibold text-obsidian text-sm pt-1"><span className="text-stone-400 uppercase tracking-widest text-[10px] block font-normal">Total Amount:</span> ${orderItems?.totalAmount}</p>
        </div>

        {/* Status Actions */}
        <div className="pt-3 border-t border-stone-100 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest text-stone-500">
              Delivery: <strong className="text-obsidian">{orderItems?.shippingStatus}</strong>
            </span>
            {orderItems?.shippingStatus !== "Delivered" && (
              <button
                onClick={updateShippingStatus}
                className="inline-flex items-center gap-1.5 border border-stone-300 hover:border-obsidian px-3 py-1 text-[10px] uppercase tracking-wider text-obsidian transition"
              >
                <LuTruck className="w-3 h-3 text-champagne" />
                <span>Mark Delivered</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest text-stone-500">
              Payment: <strong className="text-obsidian">{orderItems?.paymentStatus}</strong>
            </span>
            {orderItems?.paymentStatus !== "Done" && (
              <button
                onClick={updatePaymentStatus}
                className="inline-flex items-center gap-1.5 bg-obsidian text-canvas px-3 py-1 text-[10px] uppercase tracking-wider font-medium hover:bg-stone-800 transition"
              >
                <LuCheck className="w-3 h-3 text-champagne" />
                <span>Confirm Paid</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderCards;
