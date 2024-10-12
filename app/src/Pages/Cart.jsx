import { useContext, useEffect } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import CartCards from "../Components/CartCards";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

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
        <div className="w-[100%] flex flex-col sm:flex-row gap-9 pt-[30%] sm:pt-[10%]">
          {cartProducts.length == 0 && !loading ? (
            <div className="text-lg sm:text-xl md:text-3xl text-gray-500 h-[60vh] w-[90vw] flex justify-center items-center">
              Your cart is empty :(
            </div>
          ) : null}

          <div
            className={
              cartProducts.length == 0
                ? "hidden"
                : "w-[100%] sm:w-[65%] flex flex-col gap-5 sm:overflow-y-auto scrollbar-none sm:h-[70vh]"
            }
          >
            <h1 className="flex items-baseline mb-[5%] text-[100%] sm:text-lg">
              CART ITEMS
              <hr className="w-10 h-[3px] bg-[#A47C48]" />
            </h1>
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
              />
            ))}
          </div>
          <div
            className={
              cartProducts.length == 0
                ? "hidden"
                : "flex flex-col justify-between w-[100%] sm:w-[30%] p-[1%]"
            }
          >
            <div className="mt-[5%] flex flex-col gap-3 text-xs sm:text-sm">
              <h1 className="flex items-baseline mb-[5%] text-[100%] sm:text-lg">
                CART TOTALS
                <hr className="w-10 h-[3px] bg-[#A47C48]" />
              </h1>
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
            </div>
            <div className="text-right bg mt-[3%]">
              <Link
                className="bg-black text-[#F5F2E9] active:scale-95 px-5 py-1 sm:py-2 w-[40%] text-xs text-center"
                to={"/placeorder"}
              >
                Proceed to payment
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
