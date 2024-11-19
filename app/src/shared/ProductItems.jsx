import { useContext } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faStar } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
function ProductItems({ id, name, price, image,rating ,original}) {
  const { currency } = useContext(ShopContext);

  return (
    <div className="transition w-52 duration-200 overflow-hidden relative border-none rounded-lg bg-[#F9FCFA] hover:scale-[1.03] hover:shadow-md ease-in-out">
      <Link to={`/product/${id}`}>
      {original==="true"?<FontAwesomeIcon title="Hand crafted by our own designers" className="absolute top-2 right-2 z-10 text-[#FFD700]" icon={faCertificate}/>:null}
        <img
          onClick={window.scrollTo(0, 0)}
          className="hover:scale-105 transition duration-500 w-full object-cover ease-in-out"
          src={image}
          alt="image"
        />
      <div className="px-[4%] flex justify-between items-center w-full py-[3%]">
        <div className="w-full">
          <p className="text-xs font-bold">{name}</p>
          <div className="w-full flex justify-between items-end pe-3">
          <p className="text-xs font-bold">
            {currency} {price}
          </p>
          <p className="text-[10px] flex text-[#D4AF37]">
              {Array.from({ length: rating }).map((_, index) => (
                  <FontAwesomeIcon key={index} icon={faStar} />
              ))}
            </p>
            </div>
        </div>
      </div>
      </Link>
    </div>
  );
}

export default ProductItems;
