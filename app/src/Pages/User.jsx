import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
// import { ShopContext } from "../Contexts/ShopContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function User() {
  const { currentUser, setCurrentUser ,setCartItems, setCartCount} = useContext(UserContext);
  const handleClick = () => {
    setCurrentUser(null);
    setCartItems({});
    setCartCount(0);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cartCount");
  };

  return (
    <div className={`${currentUser?"h-[100vh] flex justify-center items-center":null}`}>
    {currentUser?(
      <span className="loader"></span>
    ):(
    <div className="pt-[30%] sm:pt-[10%] flex flex-col items-center justify-center h-[90vh] gap-3">
      <div className="text-8xl">
        <FontAwesomeIcon icon={faUserCircle} />
      </div>
      <p className="font-bold text-xl">{currentUser.name}</p>
      <p className="font-bold text-xl">{currentUser.email}</p>
      <Link to={"/"}>
        <button
          className="bg-black text-[#F5F2E9] text-xs active:scale-95 py-1 px-5 sm:py-2 mt-[10%]"
          onClick={handleClick}
        >
          logout
        </button>
      </Link>
    </div>
    )}
    </div>
  );
}

export default User;
