import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { ShopContext } from "../Contexts/ShopContext";

function User() {
  const { currentUser, setCurrentUser ,setCartItems,isAdmin,setUserOrders} = useContext(UserContext);
  const{ setCartCount}=useContext(ShopContext)
  const handleLogOut = () => {
    setCurrentUser(null);
    setCartItems({});
    setCartCount(0);
    setUserOrders([])
    localStorage.removeItem("cartItems");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cartCount");
  };


  return (
    <div className="pt-[30%] sm:pt-[10%] flex flex-col items-center justify-center h-[90vh] gap-3">
      <div className="text-8xl">
        <FontAwesomeIcon icon={faUserCircle} />
      </div>
      <p className="font-bold text-xl">{currentUser.name}</p>
      <p className="font-bold text-xl">{currentUser.email}</p>
      <p className={isAdmin?"text-sm":"hidden"}>admin</p>
      <Link to={"/"}>
        <button
          className="bg-black text-[#F5F2E9] text-xs active:scale-95 py-1 px-5 sm:py-2 mt-[10%]"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </Link>
    </div>
  );
}

export default User;
