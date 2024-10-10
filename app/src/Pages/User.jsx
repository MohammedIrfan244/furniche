import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Link } from "react-router-dom";
import { ShopContext } from "../Contexts/ShopContext";
import OrderCards from "../shared/OrderCards";

function User() {
  const { currentUser, setCurrentUser ,setCartItems,isAdmin,setUserOrders,userOrders} = useContext(UserContext);
  const{ setCartCount}=useContext(ShopContext)  
  const handleLogOut = () => {
    setCurrentUser(null);
    setCartItems({});
    setCartCount(0);
    setUserOrders([])
    localStorage.removeItem("cartItems");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cartCount");
    localStorage.removeItem("userOrders");
  };


  return (
    <div className="pt-[30%] sm:pt-[10%] flex flex-col sm:flex-row">
      <div className="w-[100%] sm:w-[30%]">
      <h1 className="flex items-baseline text-l sm:text-xl">
          USER DETAILS <hr className="w-10 h-[3px] bg-[#A47C48]" />
        </h1>
        <div className="mt-[10%] flex flex-col gap-3">
      <p>Hello <span className="font-bold text-lg">{currentUser.name}</span></p>
      <p className="text-sm">{currentUser.email}</p>
      <p className="">Mob:{currentUser.mobile}</p>
      <p >role:{isAdmin?"admin":"user"}</p>
      <Link to={"/"}>
        <button
          className="bg-black text-[#F5F2E9] text-xs active:scale-95 py-1 px-5 sm:py-2 mt-[ ]"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </Link>
      </div>
      </div>
      <div>
        {
          userOrders?.map((items,index)=><OrderCards key={index} orderItems={items}/>)
        }
      </div>
    </div>
  );
}

export default User;
