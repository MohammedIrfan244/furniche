// import {  useState } from "react";
import AdminOrderItemCards from "./AdminOrderItemsCard";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import axiosInstance from "../utilities/axiosInstance";

// eslint-disable-next-line react/prop-types
function AdminOrderCards({ orderItems = {}, user = {},userId ,fetchingOrder}) {

  // const [paymentStatus, setPaymentStatus] = useState(orderItems?.paymentStatus);
  // const [shippingStatus, setShippingStatus] = useState(orderItems?.shippingStatus);



  
  const updatePaymentStatus = async () => {
    try{
      const response=await axiosInstance.patch(
        `/admin/orders/payment/${orderItems._id}`
      );
      // setPaymentStatus("Done");
      fetchingOrder(userId)
      toast.success(response.data.message);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
    // await axios
    //   .patch(
    //     `http://localhost:3001/api/admin/orders/payment/${orderItems._id}`,
    //     {},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     setPaymentStatus("Done");
    //     toast.success(res.data.message);
    //   })
    //   .catch((err) => {
    //     toast.error(axiosErrorManager(err));
    //   });
  };
  const updateShippingStatus = async () => {
    // const token = Cookies.get("token");
    // await axios
    //   .patch(
    //     `http://localhost:3001/api/admin/orders/shipping/${orderItems._id}`,
    //     {},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     setShippingStatus("Delivered");
    //     toast.success(res.data.message);
    //   })
    //   .catch((err) => {
    //     toast.error(axiosErrorManager(err));
    //   });
    try{
      const response=await axiosInstance.patch(
        `/admin/orders/shipping/${orderItems._id}`
      );
      // setShippingStatus("Delivered");
      fetchingOrder(userId)
      toast.success(response.data.message);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };
  return (
    <div className=" bg-white w-full flex flex-col gap-3 p-3">
      <div className="flex flex-col gap-3">
        {orderItems.products?.map((items, index) => (
          <AdminOrderItemCards
            key={index}
            id={items?.productId._id}
            count={items?.quantity}
            name={items?.productId?.name}
            image={items?.productId?.image}
            price={items?.productId?.price}
          />
        ))}
      </div>
      <div className="text-xs flex flex-col gap-1">
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Order Id</p>
          <p>{orderItems?._id}</p>
        </div>
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Name</p>
          <p>{orderItems?.address?.name}</p>
        </div>
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Email</p>
          <p>{user.email}</p>
        </div>
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Mobile</p>
          <p>{orderItems?.address?.phone}</p>
        </div>
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Place</p>
          <p>{orderItems?.address?.street + " " + orderItems?.address?.city}</p>
        </div>
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Pin Code</p>
          <p>{orderItems?.address?.pincode}</p>
        </div>
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Total</p>
          <p>{orderItems?.totalAmount}</p>
        </div>
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Delivery</p>
          <p className="w-[20%]">{orderItems?.shippingStatus}</p>

          <button
            className="bg-blue-500 rounded-md py-2 px-3"
           onClick={updateShippingStatus}
          >
            Delivery done
          </button>
        </div>

        <div className="flex justify-start gap-10 mt-2">
          <p className="w-[20%]">Payment</p>
          <p className="w-[20%]">{orderItems?.paymentStatus}</p>
          <button
            className="bg-blue-500 rounded-md py-2 px-3"
            onClick={updatePaymentStatus}
          >
            Payment done
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderCards;
