import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartCount } from "../Redux/userSlice";
import { LuSearch,LuShoppingCart,LuHeart,LuChartBarStacked } from "react-icons/lu";
import axios from "axios";
import Cookies from 'js-cookie'

function NavBar() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const { currentUser, userCartCount, isAdmin, userCart } = useSelector(
    (state) => state.user
  );
  
  useEffect(() => {
    if (currentUser) {
      dispatch(getCartCount());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, userCart]);
useEffect(() => {
  axios.get("https://furniche.onrender.com/api/public/products/collection/cookie").then(()=>console.log(Cookies.get("pub"))).catch((err)=>console.log(err));
},[])
  return (
    <div className="fixed w-[100%] pt-8 px-1 bg-white sm:px-5 py-5 z-20">
      <div className="flex items-center justify-between">
        <div>
          <Link to={"/"}>
            <h2 className="text-xl sm:text-2xl font-poppins font-bold text-sofaBlue">
              Furniche
            </h2>
          </Link>
        </div>
        <ul className="hidden sm:flex gap-10 text-xs font-bold font-poppins">
          <NavLink to={"/"} className=" flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-[4px] h-[4px] border-none  hidden " />
          </NavLink>
          <NavLink
            to={"/collection"}
            className="flex flex-col items-center gap-1 "
          >
            <p>COLLECTION</p>
            <hr className="w-[4px] h-[4px] border-none  hidden " />
          </NavLink>
          <NavLink
            to={"/contact"}
            className="flex flex-col items-center gap-1 "
          >
            <p>CONTACT</p>
            <hr className="w-[4px] h-[4px] border-none  hidden " />
          </NavLink>
          <NavLink to={"/about"} className="flex flex-col items-center gap-1 ">
            <p>ABOUT</p>
            <hr className="w-[4px] h-[4px] border-none  hidden " />
          </NavLink>
          {isAdmin && (
            <NavLink
              to={"/admin/adminPanel"}
              className="flex flex-col items-center gap-1"
            >
              <p>ADMIN</p>
              <hr className="w-[4px] h-[4px] border-none  hidden " />
            </NavLink>
          )}
        </ul>
        <div className="flex items-center gap-5 sm:gap-6 md:gap-8 lg:gap-10">
          <Link className="flex items-center gap-2" to={"/search"}>
            <LuSearch
              className="hover:scale-110 text-lg hover:text-sofaBlue transition duration-300"
            />
          <p className="hidden sm:block text-xs font-bold">SEARCH</p>
          </Link>
          <Link
            to={"/cart"}
            className={`${currentUser ? "relative flex items-center gap-2" : "hidden"}`}
          >
            <LuShoppingCart
              className="hover:scale-110 text-lg hover:text-sofaBlue transition duration-300"
              
            />
          <p className="hidden sm:block text-xs font-bold">CART</p>
            <p className="absolute bottom-3 right-8 text-sofaBlue h-[15px] text-[10px] font-bold text-center w-[15px] rounded-[100%] bg-gray-300">
              {userCartCount}
            </p>
          </Link>
          <Link
            to={"/wishlist"}
            className={`${currentUser ? "   flex items-center gap-2" : "hidden"}`}
          >
            <LuHeart
              className="hover:scale-110 text-lg hover:text-sofaBlue transition duration-300"
            />
            <p className="hidden sm:block text-xs font-bold">WISHLIST</p> 
          </Link>
          <Link
            to={currentUser ? "/user" : "/login"}
            className=" group relative"
          >
            {currentUser == null ? (
              <p onClick={()=>{
                Cookies.set("test","test")
                console.log("user",Cookies.get("user")) 
                console.log("pub",Cookies.get("pub")) 
                console.log("test",Cookies.get("test"))

              }} className="bg-sofaBlue text-white text-xs px-5 py-1 rounded-[50px] hover:scale-105 transition duration-200 ease-in-out mx-2">
                Login
              </p>
            ) : (
              <div>
                <div className="h-6 flex justify-center items-center rounded-full overflow-hidden w-6">
                  <img
                    className="h-full w-full object-cover"
                    src={currentUser?.profile}
                    alt="User Profile"
                  />
                </div>
              </div>
            )}
          </Link>
          <LuChartBarStacked
            onClick={() => setVisible(true)}
            className="sm:hidden cursor-pointer me-3"
            
          />
          <div
            className={`absolute top-0  right-0 bottom-0 ${
              visible ? "w-min" : "hidden"
            }`}
          >
            <ul className="flex flex-col py-10 px-5 gap-5 bg-[#F5F2E9] ">
              <NavLink onClick={() => setVisible(false)} to={"/"}>
                HOME
              </NavLink>
              <NavLink onClick={() => setVisible(false)} to={"/collection"}>
                COLLECTION
              </NavLink>
              <NavLink onClick={() => setVisible(false)} to={"/about"}>
                ABOUT
              </NavLink>
              <NavLink onClick={() => setVisible(false)} to={"/contact"}>
                CONTACT
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                to={"/adminpanel"}
                className={`${!isAdmin ? "hidden" : null} whitespace-nowrap`}
              >
                ADMIN PANEL
              </NavLink>
              <Link onClick={() => setVisible(false)}>CLOSE</Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
