import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faCartShopping,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import Logo from "/src/assets/FinalLogo.png";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { ShopContext } from "../Contexts/ShopContext";




function NavBar() {
  const [visible, setVisible] = useState(false);
  const { currentUser,isAdmin  } = useContext(UserContext);
  const{cartCount}=useContext(ShopContext)
  return (
    <div className="fixed w-[90%] bg-[#F5F2E9] z-10 py-3 border-2 border-b-[#A47C48] border-t-0 border-l-0 border-r-0">
      <div className="flex items-center justify-between">
        <div>
          <Link to={"/"}>
            <img src={Logo} alt="logo" className="w-[90%] Logo" />
          </Link>
        </div>
        <ul className="hidden sm:flex gap-4">
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
          <NavLink to={"/about"} className="flex flex-col items-center gap-1 ">
            <p>ABOUT</p>
            <hr className="w-[4px] h-[4px] border-none  hidden " />
          </NavLink>
          <NavLink
            to={"/contact"}
            className="flex flex-col items-center gap-1 "
          >
            <p>CONTACT</p>
            <hr className="w-[4px] h-[4px] border-none  hidden " />
          </NavLink>
          <NavLink
            to={"/adminpanel"}
            className={`${isAdmin?"flex flex-col items-center gap-1":"hidden"}`}
          >
            <p>ADMIN PANEL</p>
            <hr className="w-[4px] h-[4px] border-none  hidden " />
          </NavLink>
        </ul>
        <div className="flex items-center gap-3 sm:gap-5 md:gap-7">
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
            <p className="absolute right-[-5px] bottom-[-2px]  bg-[#A47C48] text-[10px] text-center w-[15px] rounded-[100%] text-[#FAFAFA]">
              {cartCount}
            </p>
          </Link>
          <Link
            to={currentUser == null ? "/login" : "/user"}
            className=" group relative"
          >
           {currentUser==null?"Login": <FontAwesomeIcon
              className=" cursor-pointer hover:scale-110 transition duration-300"
              icon={faUser}
            />}
          </Link>
          <FontAwesomeIcon
            onClick={() => setVisible(true)}
            className="sm:hidden cursor-pointer"
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
              <NavLink onClick={() => setVisible(false)} to={"/adminpanel"} className="whitespace-nowrap">
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
