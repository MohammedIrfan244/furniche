import { useContext, useEffect } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import CartCards from "../Components/CartCards";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

function Cart() {
  const { currency, shippingFee, cartCount, products, loading } =
    useContext(ShopContext);
  const { cartItems, setCartItems, cartTotal, setCartTotal } =
    useContext(UserContext);
  const cartProducts = products.filter((items) => cartItems[items.id]);

  useEffect(() => {
    let total = 0;
    cartProducts.forEach((item) => {
      total += cartItems[item.id] * item.price;
    });
    setCartTotal(total);
  }, [cartItems, cartProducts, setCartTotal]);

  const incCart = (item) => {
    setCartItems((prev) => ({ ...prev, [item.id]: prev[item.id] + 1 }));
  };
  const decCart = (item) => {
    setCartItems((prev) => ({
      ...prev,
      [item.id]: Math.max(prev[item.id] - 1, 1),
    }));
  };
  return (
    <div
      className={`${
        loading ? "h-[100vh] flex justify-center items-center" : null
      }`}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="w-[100%] flex flex-col sm:flex-row gap-9 px-5 pt-[26%] sm:pt-[8%] ">
          {cartProducts.length == 0 && !loading ? (
            <div className="text-gray-500 h-[60vh] w-[100vw] flex justify-center items-center">
              <FontAwesomeIcon className="text-xl sm:text-3xl md:text-6xl" icon={faCartArrowDown}/>
            </div>
          ) : null}

          <div
            className={
              cartProducts.length == 0
                ? "hidden"
                : "w-[100%] sm:w-[65%]"
            }
          >
           <h1 className="text-xl sm:text-2xl font-serif tracking-wide underline mb-10" style={{textShadow:'0 0 1px #000000'}}>CART ITEMS</h1>
           <div className="flex flex-col gap-5 sm:overflow-y-auto scrollbar-none sm:h-[70vh]">
            {cartProducts.map((item, index) => (
              <CartCards
                key={index}
                count={cartItems[item.id]}
                incCartCount={() => incCart(item)}
                decCartCount={() => decCart(item)}
                removeCart={() =>
                  setCartItems((prev) => {
                    const newItems = { ...prev };
                    delete newItems[item.id];
                    return newItems;
                  })
                }
                image={item.image}
                price={item.price}
                name={item.name}
                id={item.id}
              />
            ))}
            </div>
          </div>
          <div
            className={
              cartProducts.length == 0
                ? "hidden"
                : "w-[100%] sm:w-[30%]"
            }
          >
            <h1 className="text-xl sm:text-2xl font-serif tracking-wide underline mb-10" style={{textShadow:'0 0 1px #000000'}}>CART DETAILS</h1>
            <div className="flex flex-col p-3 rounded-md shadow-md shadow-[#544A3E] gap-6 bg-[#F9FCFA] text-xs sm:text-sm">
              <div className="flex justify-between">
                Total Items :<p className="font-bold">{cartCount}</p>
              </div>
              <div className="flex justify-between">
                Subtotal :
                <p className="font-bold">
                  {currency}
                  {cartTotal}.00
                </p>
              </div>
              <div className="flex justify-between">
                Shipping fee :
                <p className="font-bold">
                  {currency}
                  {shippingFee}.00
                </p>
              </div>
              <div className="flex justify-between">
                Total :
                <p className="font-bold">
                  {currency}
                  {cartTotal + shippingFee}.00
                </p>
              </div>
            <div className="text-right bg mt-[3%]">
              <Link
                className="bg-[#544A3E] rounded-lg shadow-sm shadow-[#544A3E] text-[#F5F2E9] active:scale-75 transition duration-200 px-5 py-1 sm:py-2 w-[40%] text-xs text-center"
                to={"/placeorder"}
              >
                Proceed to payment
              </Link>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
