import { useEffect, useState } from "react";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utilities/axiosInstance";
import { useSelector } from "react-redux";

function Order() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const {currency}=useSelector((state)=>state.public)

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
      toast.success(response.data.message);
      window.location.reload();
    } catch (err) {
      toast.error(axiosErrorManager(err));
      window.location.reload();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 pt-20">
      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {!loading && (
        <div className="space-y-8">
          <h1 className="text-2xl font-semibold text-gray-800">Order Details</h1>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Products</h2>
            {order?.products?.map((product) => (
              <div key={product._id} className="flex justify-between items-center border-b py-4">
                <div>
                  <p className="text-lg font-medium text-gray-800">{product?.productId?.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {product?.quantity}</p>
                </div>
                <p className="text-lg text-gray-700">{currency}{product?.productId?.price}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-700">Purchased Date:</p>
              <p className="text-gray-600">{order?.purchasedDate}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-700">Shipping Status:</p>
              <p className="text-gray-600">{order?.shippingStatus}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-700">Payment Status:</p>
              <p className="text-gray-600">{order?.paymentStatus}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-700">Total Amount:</p>
              <p className="text-gray-600">{currency} {order?.totalAmount}</p>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={cancelOrder}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition duration-300"
            >
              Cancel Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;
