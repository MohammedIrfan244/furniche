import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function AdminOrderItemCards({ image, name, price, count, id }) {
  const { currency } = useSelector((state) => state.public);

  return (
    <div className="flex justify-between items-center bg-canvas-subtle p-3 border border-stone-200">
      <div className="flex items-center gap-3">
        <Link to={`/product/${id}`} className="shrink-0">
          <img
            className="h-12 w-14 object-cover border border-stone-200"
            src={image || "/default-product.png"}
            alt={name}
          />
        </Link>
        <div className="space-y-0.5 text-xs">
          <p className="font-serif text-obsidian line-clamp-1">{name}</p>
          <p className="font-sans font-semibold text-obsidian">
            {currency || "₹"} {price}
          </p>
        </div>
      </div>
      <div className="text-xs text-stone-500 font-medium">
        Qty: {count}
      </div>
    </div>
  );
}

export default AdminOrderItemCards;
