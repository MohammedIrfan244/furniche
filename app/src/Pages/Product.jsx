import { useContext } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import ProductItems from "../Components/ProductItems";
import { UserContext } from "../Contexts/UserContext";
import { Link } from "react-router-dom";

function Product() {
  const { Id } = useParams();
  const { currentUser ,addCart,cartItems} = useContext(UserContext);
  const { products, currency ,loading} = useContext(ShopContext);
  const product = products.find((items) => items.id === Id);
  const interestedProduct = products.filter(
    (items) => items.category == product.category && items.id != product.id
  );

  return (
    <div className={`${loading?"h-[100vh] flex justify-center items-center":null}`}>
      {loading?(
        <span className="loader"></span>
      ):(
    <div className="flex flex-col items-center pt-[27%] sm:pt-[7%]">
      <div className="flex flex-col sm:flex-row w-[100%]  mt-[3%]">
        <div className="w-[100%] sm:w-[50%] overflow-hidden">
          <img
            className="hover:scale-[1.01] transition duration-500 ease-in-out ProductPage w-[400px] h-[200px] sm:w-[600px] sm:h-[400px] object-cover"
            src={product?.image}
            alt="image"
          />
        </div>
        <div className="mt-[3%] sm:mt-0 w-[100%] sm:w-[50%] flex flex-col justify-between min-h-[50vh] sm:px-[3%] sm:gap-0">
          <div className="flex flex-col justify-beteween gap-[20px]">
            <div>
            <h1 className="font-bold text-xl">
              {product?.name}
            </h1>
              <p className="text-xs font-normal">
                {product?.original == false ? null : "(In house design)"}
              </p>
              </div>
            <p className="text-xs flex text-[#A47C48]">
              {Array.from({ length: product?.rating }).map((_, index) => (
                  <FontAwesomeIcon key={index} icon={faStar} />
              ))}
            </p>
            <p className="text-xl font-bold">
              {currency} {product?.price}
            </p>
            <p className="text-xs">{product?.description}</p>
          </div>
          <div>
            <p className="text-sm">Review :</p>
            <p className="text-xs">{product?.review}</p>
          </div>
          <Link to={currentUser == null ? "/login" : "#"}>
            <button
              onClick={currentUser != null ? () => addCart(Id) : null}
              className="border active:scale-95 bg-black text-xs text-[#F5F2E9] px-5 py-1 sm:py-2"
            >{`${cartItems[Id] > 0 ? "Added" : "Add to Cart"}`}</button>
          </Link>
        </div>
      </div>
      <div className="flex items-baseline ">
      <h1 className="text-xl my-20">
        You may also interested in
      </h1>
        <hr className="w-10 h-[3px] bg-[#A47C48]" />
      </div>
      <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
        {interestedProduct?.map((items, index) => (
          <ProductItems
            key={index}
            id={items.id}
            name={items.name}
            image={items.image}
            price={items.price}
          />
        ))}
      </div>
    </div>
      )}
    </div>
  );
}

export default Product;
