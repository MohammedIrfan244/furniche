import { useContext } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function AdminOrderItemCards({ image, name, price, count, id }) {
  const { currency } = useContext(ShopContext);
  
  return (
    <div className="flex justify-between bg-white p-1 w-full items-center">
      <div className="flex gap-4">
        <Link to={`/product/${id}`}>
          <img
            className="h-[60px] w-[100px] object-cover cartCard"
            src={image}
            alt="image"
          />
        </Link>
        <div className="flex flex-col justify-between pb-[5%] text-xs">
          <p className="whitespace-nowrap">{name}</p>
          <p className="font-bold">
            {currency}
            {price}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-xs">{count}</p>
      </div>
    </div>
  );
}

export default AdminOrderItemCards;
