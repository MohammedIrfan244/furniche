import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Link } from "react-router-dom";
import { ShopContext } from "../Contexts/ShopContext";
import OrderCards from "../shared/OrderCards";

function User() {
  const { currentUser, setCurrentUser ,setCartItems,setUserOrders,userOrders} = useContext(UserContext);
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
    <div className="w-[100%] flex flex-col sm:flex-row pt-[26%] sm:pt-[8%] px-5 gap-5 sm:gap-32">
      <div className="w-[100%] sm:w-[20%]">
      <h1 className="text-xl sm:text-2xl font-serif tracking-wide underline ms-3 mb-10" style={{textShadow:'0 0 1px #000000'}}>USER DETAILS</h1>
        <div className="mt-10 bg-[#F9FCFA] rounded-2xl shadow-md shadow-[#544A3E] p-3 flex flex-col gap-3">
          <div className="flex justify-center">
          <div className="h-36 flex justify-center items-center rounded-full mb-5 overflow-hidden w-36">
          <img src={currentUser.avatar} alt="User avatar" onError={(e)=>{
            e.target.onerror=null
            e.target.src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
          }} />
          </div>
          </div>
          <div className="flex justify-start gap-14">
            <p className="w-[20%]">User</p>
      <p>{currentUser.name}</p>
      </div>
      <div className="flex justify-start gap-14">
        <p className="w-[20%]">Email</p>
      <p>{currentUser.email}</p>
      </div>
      <div className="flex justify-start gap-14">
        <p className="w-[20%]">Mobile</p>
      <p>{currentUser.mobile}</p>
      </div>
      <Link className="w-[100%] flex justify-end" to={"/"}>
        <button
          className="bg-[#544A3E] rounded-lg shadow-md shadow-black text-[#F5F2E9] text-xs active:scale-95 py-1 px-5 sm:py-2 mt-[2%]"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </Link>
      </div>
      </div>
      <div className="flex flex-col gap-5 overflow-y-auto scrollbar-none h-[60vh]">
        {userOrders.length===0?"order is empty":
          userOrders?.map((items,index)=><OrderCards key={index} orderItems={items}/>)
        }
      </div>
    </div>
  );
}

export default User;
