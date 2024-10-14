import { useContext } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faStar } from "@fortawesome/free-solid-svg-icons";
import ProductItems from "../shared/ProductItems";
import { UserContext } from "../Contexts/UserContext";
import { Link } from "react-router-dom";
import ScrollTop from "../shared/ScrollTop";

function Product() {
  const { Id } = useParams();
  const { currentUser, addCart, cartItems } = useContext(UserContext);
  const { products, currency, loading } = useContext(ShopContext);
  const product = products.find((items) => items.id === Id);
  const interestedProduct = products.filter(
    (items) => items.category == product.category && items.id != product.id
  );

  return (
    <div
      className={`${
        loading ? "h-[100vh] flex justify-center items-center" : null
      }`}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="pt-[26%] sm:pt-[10%] flex flex-col items-center">
          <div className="flex flex-col sm:flex-row w-[90%] sm:w-[87%] p-2 bg-[#F9FCFA] rounded-3xl shadow-md shadow-[#544A3E]">
            <div className="w-[100%] sm:w-[50%] flex justify-center rounded-2xl overflow-hidden items-center">
              <img
                className="hover:scale-[1.01] transition duration-500 ease-in-out ProductPage w-[400px] h-[200px] sm:w-[610px] sm:h-[410px] object-cover"
                src={product?.image}
                alt="image"
              />
            </div>
            <div className="mt-[3%] sm:mt-0 w-[100%] sm:w-[50%] flex flex-col justify-between min-h-[50vh] sm:px-[3%] sm:gap-0">
              <div className="flex flex-col justify-beteween gap-[20px]">
                <div>
                  <h1 className="font-bold text-xl">
                    {product?.name}
                    <span>
                      {" "}
                      {product?.original === "false" ? null : (
                        <FontAwesomeIcon
                          className="text-base text-[#FFD700]"
                          icon={faCertificate}
                        />
                      )}
                    </span>
                  </h1>
                  <p className="text-xs">
                    {product?.original === "false" ? null : "(In house design)"}
                  </p>
                </div>
                <p className="text-xs flex text-[#FFD700]">
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
              <div className="flex justify-end">
                <Link to={currentUser == null ? "/login" : "#"}>
                  <button
                    onClick={currentUser != null ? () => addCart(Id) : null}
                    className="active:scale-95 bg-[#544A3E] hover:scale-[1.01] shadow-md shadow-[#544A3E] text-xs text-[#F5F2E9] px-5 py-2 rounded-xl sm:py-3"
                  >{`${cartItems[Id] > 0 ? "Added" : "Add to Cart"}`}</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-[100%] mt-20 px-3 lg:p-2">
            <h1
              className="text-xl sm:text-2xl font-serif tracking-wide underline"
              style={{ textShadow: "0 0 1px #000000" }}
            >
              YOU MAY ALSO INTERESTED IN
            </h1>
            <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 mt-20">
              {interestedProduct.map((item, index) => (
                <ProductItems
                  key={index}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  original={item.original}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <ScrollTop />
    </div>
  );
}

export default Product;
