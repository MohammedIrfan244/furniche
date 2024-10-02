import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,faHeart,faUser,faCartShopping,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import Logo from '/src/assets/Settle.comLogo (1).png'
import { useContext, useState } from "react";
import { ShopContext } from "../Contexts/ShopContext";

function NavBar() {
  const[visible,setVisible]=useState(false)
  const{cartCount}=useContext(ShopContext)
  return (
    <div className="flex items-center justify-between py-3 m-0">
      <div>
      <Link to={'/'}><img src={Logo} alt="logo" className="w-[90%]"/></Link>
      </div>
      <ul className="hidden sm:flex gap-4">
        <NavLink
          to={"/"}
          className=" flex flex-col items-center gap-1"
        >
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
          to={"/about"}
          className="flex flex-col items-center gap-1 "
        >
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
      </ul>
      <div className="flex items-center gap-3 sm:gap-5 md:gap-7">
        <Link to={'/search'}>
        <FontAwesomeIcon
          className="cursor-pointer hover:scale-110 transition duration-300"
          icon={faSearch}
        />
        </Link>
        <Link to={'/wishlist'}>
          <FontAwesomeIcon
            className="hover:scale-110 transition duration-300"
            icon={faHeart}
          />
        </Link>
        <Link to="/cart" className="relative">
          <FontAwesomeIcon
            className="hover:scale-110 transition duration-300"
             icon={faCartShopping}
          />
          <p className="absolute right-[-5px] bottom-[-2px]  bg-[#A47C48] text-[10px] text-center w-[15px] rounded-[100%] text-[#FAFAFA]">
            {cartCount}
          </p>
        </Link>
        <div className=" group relative">
          <FontAwesomeIcon  
            className=" cursor-pointer hover:scale-110 transition duration-300"
            icon={faUser}
          />
          <div className="group-hover:block hidden absolute -right-2 text-xs">
            <div className="flex flex-col gap-2 w-20 mt-2 pl-2 bg-slate-100 rounded">
              <Link className=" hover:text-[#A47C48]">My Profile</Link>
              <Link to={'/orders'} className=" hover:text-[#A47C48]">Orders</Link>
              <Link to={'/login'} className=" hover:text-[#A47C48]">Login</Link>
            </div>
          </div>
        </div>
        <FontAwesomeIcon onClick={()=>setVisible(true)} className="sm:hidden cursor-pointer" icon={faBars}/>
      <div className={`absolute top-0  right-0 bottom-0 overflow-hidden bg-[#F5F2E9]  ${visible?'w-min':'w-0'}`}>
        <ul className="flex flex-col py-10 px-5 gap-5">
        <NavLink onClick={()=>setVisible(false)} to={'/'}>HOME</NavLink>
        <NavLink onClick={()=>setVisible(false)} to={'/collection'}>COLLECTION</NavLink>
        <NavLink onClick={()=>setVisible(false)} to={'/about'}>ABOUT</NavLink>
        <NavLink onClick={()=>setVisible(false)} to={'/contact'}>CONTACT</NavLink>
        </ul>
      </div>
      </div>
    </div>
  );
}

export default NavBar;
