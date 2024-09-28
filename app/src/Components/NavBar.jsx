import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,faHeart,faUser,faCartShopping,
  faBars,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import Logo from '/src/assets/Settle.comLogo (1).png'
import LogoTwo from '/src/assets/Settle.comLogo (2).png'
import { useState } from "react";

function NavBar() {
  const[visible,setVisible]=useState(false)
  return (
    <div className="flex items-center justify-between py-3 px-[5%] m-0">
      <img src={Logo} alt="logo" className="hidden sm:block"/>
      <img src={LogoTwo} alt="logo" className="sm:hidden"/>

      <ul className="hidden sm:flex gap-4">
        <NavLink
          to={"/"}
          className="hover:scale-105 transition duration-300 flex flex-col items-center gap-1"
        >
          <p>HOME</p>
          <hr className="w-[4px] h-[4px] border-none  hidden " />
        </NavLink>
        <NavLink
          to={"/collection"}
          className="flex flex-col items-center gap-1 hover:scale-105 transition duration-300"
        >
          <p>COLLECTION</p>
          <hr className="w-[4px] h-[4px] border-none  hidden " />
        </NavLink>
        <NavLink
          to={"/about"}
          className="flex flex-col items-center gap-1 hover:scale-105 transition duration-300"
        >
          <p>ABOUT</p>
          <hr className="w-[4px] h-[4px] border-none  hidden " />
        </NavLink>
        <NavLink
          to={"/contact"}
          className="flex flex-col items-center gap-1 hover:scale-105 transition duration-300"
        >
          <p>CONTACT</p>
          <hr className="w-[4px] h-[4px] border-none  hidden " />
        </NavLink>
      </ul>
      <div className="flex items-center gap-7">
        <FontAwesomeIcon
          className="cursor-pointer hover:scale-110 transition duration-300"
          icon={faSearch}
        />
        
       
        <Link to={'/wishlist'} className=" relative">
          <FontAwesomeIcon
            className="hover:scale-110 transition duration-300"
            icon={faHeart}
          />
        </Link>
        <Link className=" relative" to="/cart">
          <FontAwesomeIcon
            className="hover:scale-110 transition duration-300"
             icon={faCartShopping}
          />
          <p className="absolute right-[-5px] bottom-[-2px]  bg-[#D65F0D] text-[10px] px-[2px] rounded-[100%] text-[#FAFAFA]">
            10
          </p>
        </Link>
        <div className=" group relative">
          <FontAwesomeIcon
            className=" cursor-pointer hover:scale-110 transition duration-300"
            icon={faUser}
          />
          <div className="group-hover:block hidden absolute -right-2 text-xs">
            <div className="flex flex-col gap-2 w-20 mt-2 pl-2 bg-slate-100 rounded">
              <p className="cursor-pointer hover:text-[#D65F0D]">My Profile</p>
              <p className="cursor-pointer hover:text-[#D65F0D]">Orders</p>
              <p className="cursor-pointer hover:text-[#D65F0D]">Logout</p>
            </div>
          </div>
        </div>
        <FontAwesomeIcon onClick={()=>setVisible(true)} className="sm:hidden cursor-pointer" icon={faBars}/>
      <div className={`absolute top-0  right-0 bottom-0 overflow-hidden bg-[#FAFAFA] transition-all ${visible?'w-min':'w-0'}`}>
        <ul className="flex flex-col py-10 px-5 gap-5">
        <NavLink to={'/'}>HOME</NavLink>
        <NavLink to={'/collection'}>COLLECTION</NavLink>
        <NavLink to={'/about'}>ABOUT</NavLink>
        <NavLink to={'/contact'}>CONTACT</NavLink>
        <li onClick={()=>setVisible(false)}><FontAwesomeIcon icon={faArrowLeft}/> BACK
        </li>
        </ul>
      </div>
      </div>
    </div>
  );
}

export default NavBar;
