import { useEffect } from "react";
import CartCards from "../Components/CartCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import ScrollTop from "../shared/ScrollTop";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
const navigate=useNavigate()
  const dispatch=useDispatch()
const {userCart,loading}=useSelector((state)=>state.user)
useEffect(()=>{
dispatch(getCart())
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
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
          {userCart.length == 0 && !loading ? (
            <div className="text-gray-500 h-[60vh] w-[100vw] flex justify-center items-center">
              <FontAwesomeIcon
                className="text-xl sm:text-3xl md:text-6xl"
                icon={faCartArrowDown}
              />
            </div>
          ) : null}

          <div
            className={
              userCart.length == 0 ? "hidden" : "w-[100%] sm:w-[65%]"
            }
          >
            <h1
              className="text-xl sm:text-2xl font-serif tracking-wide underline mb-10"
              style={{ textShadow: "0 0 1px #000000" }}
            >
              CART ITEMS
            </h1>
            <div className="flex flex-col gap-5 sm:overflow-y-auto scrollbar-thin sm:h-[70vh]">
              {userCart.map((item, index) => (
                <CartCards
                  key={index}
                  quantity={item.quantity}
                  image={item?.productId?.image}
                  price={item?.productId?.price}
                  name={item?.productId?.name}
                  id={item?.productId?._id}
                />
              ))}
            </div>
          </div>
          <div
            className={
              userCart.length == 0 ? "hidden" : "w-[100%] sm:w-[30%]"
            }
          >
          </div>
          <button onClick={()=>navigate(`/checkout/products/cart`)}>checkout</button>
        </div>
      )}
      <ScrollTop />
    </div>
  );
}

export default Cart;
