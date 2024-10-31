import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCartShopping,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { ShopContext } from "../Contexts/ShopContext";
import AdminProfile from '../assets/Me.jpeg'

function NavBar() {
  const [visible, setVisible] = useState(false);
  const { currentUser, isAdmin } = useContext(UserContext);
  const { cartCount } = useContext(ShopContext);
  return (
    <div className="fixed w-[100%] py-5 sm:py-0 sm:pt-4 px-1 sm:px-5 bg-[#D7D2C9] z-20 border-b-2 border-[#544A3E]">
      <div className="flex items-center justify-between">
        <div>
          <Link to={"/"}>
            <h2
              className="font-serif text-2xl sm:text-3xl font-medium"
              style={{ textShadow: "0 0 1px #000000" }}
            >
              Furniche
            </h2>
          </Link>
        </div>
        <ul className="hidden sm:flex gap-4 text-sm font-bold">
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
          <NavLink
            to={"/adminpanel"}
            className={`${
              isAdmin ? "flex flex-col items-center gap-1" : "hidden"
            }`}
          >
            <p>ADMIN PANEL</p>
            <hr className="w-[4px] h-[4px] border-none  hidden " />
          </NavLink>
        </ul>
        <div className="flex items-center gap-5 sm:gap-6 md:gap-7">
          <Link to={"/search"}>
            <FontAwesomeIcon
              className="cursor-pointer hover:scale-110 transition duration-300"
              icon={faSearch}
            />
          </Link>
          <Link
            to={"/cart"}
            className={`${currentUser ? "relative" : "hidden"}`}
          >
            <FontAwesomeIcon
              className="hover:scale-110 transition duration-300"
              icon={faCartShopping}
            />
            <p className="absolute right-[-5px] bottom-[-2px]  bg-[#544A3E] text-[10px] text-center w-[15px] rounded-[100%] text-[#FAFAFA]">
              {cartCount}
            </p>
          </Link>
          <Link
            to={currentUser == null ? "/login" : "/user"}
            className=" group relative"
          >
            {currentUser == null ? (
              <p className="bg-[#000000] text-[#F9FCFA] text-xs px-5 py-1 rounded-[50px] hover:scale-105 transition duration-200 ease-in-out mx-2 shadow-md">
                Login
              </p>
            ) : (
              <div>
                <div className="h-6 flex justify-center items-center rounded-full overflow-hidden w-6">
              <img
              className="Logo"
                src={currentUser.isAdmin ? AdminProfile : currentUser.avatar}
                alt="User avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg";
                }}
              />
            </div>
              </div>
            )}
          </Link>
          <FontAwesomeIcon
            onClick={() => setVisible(true)}
            className="sm:hidden cursor-pointer me-3"
            icon={faBars}
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
                className={`${!isAdmin?"hidden":null} whitespace-nowrap`}
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
