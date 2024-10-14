import { useContext } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import AdminOrderItemCards from "./AdminOrderItemsCard";

// eslint-disable-next-line react/prop-types
function AdminOrderCards({ orderItems = {}, user = {} }) {
  const { products } = useContext(ShopContext);
  const orderProducts = products.filter(
    (items) => orderItems?.products[items.id]
  );
  const orderAddress = orderItems?.address;

  const handleStatusPatch = (key, value) => {
    const updatedOrder = user?.orders?.map((items) =>
      items.id === orderItems.id ? { ...items, [key]: value } : items
    );
    axios
      .patch(`http://localhost:3000/users/${user.id}`, { orders: updatedOrder })
      .then(() => toast.success("Status updated successfully"))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className=" bg-white w-full flex flex-col gap-3 p-3">
      <div className="flex flex-col gap-3">
        {orderProducts?.map((items, index) => (
          <AdminOrderItemCards
            key={index}
            id={items.id}
            count={orderItems.products[items.id]}
            name={items.name}
            image={items.image}
            price={items.price}
          />
        ))}
      </div>
      <div className="text-xs flex flex-col gap-1">
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Order Id</p>
          <p>{orderItems.id}</p>
        </div>
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Name</p>
          <p>{orderAddress.firstName + " " + orderAddress.lastName}</p>
        </div>
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Email</p>
          <p>{orderAddress.email}</p>
        </div>
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Mobile</p>
          <p>{orderAddress.mobile}</p>
        </div>
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Place</p>
          <p>{orderAddress.place}</p>
        </div>
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Pin Code</p>
          <p>{orderAddress.pin}</p>
        </div>
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Total</p>
          <p>{orderItems?.totalAmount}</p>
        </div>
        <div className="flex justify-start gap-10">
          <p className="w-[20%]">Delivery</p>
          <p className="w-[20%]">{orderItems?.delivaryStatus}</p>

          <button
            className="bg-blue-500 rounded-md py-1 px-2"
            onClick={() => handleStatusPatch("delivaryStatus", "done")}
          >
            Delivery done
          </button>
        </div>

        <div className="flex justify-start gap-10 mt-2">
          <p className="w-[20%]">Payment</p>
          <p className="w-[20%]">{orderItems.paymentStatus}</p>
          <button
            className="bg-blue-500 rounded-md py-1 px-2"
            onClick={() => handleStatusPatch("paymentStatus", "paid")}
          >
            Payment done
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderCards;
