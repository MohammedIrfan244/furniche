import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCartShopping,
  faBars,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartCount } from "../Redux/userSlice";

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

  return (
    <div className="fixed w-[100%] py-5 px-1 sm:px-5 bg-gray-100 z-20">
      <div className="flex items-center justify-between">
        <div>
          <Link to={"/"}>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-goldenWood">
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
              {userCartCount}
            </p>
          </Link>
          <Link
            to={"/wishlist"}
            className={`${currentUser ? "relative" : "hidden"}`}
          >
            <FontAwesomeIcon
              className="hover:scale-110 transition duration-300"
              icon={faHeart}
            />
          </Link>
          <Link
            to={currentUser ? "/user" : "/login"}
            className=" group relative"
          >
            {currentUser == null ? (
              <p className="bg-goldenWood text-white text-xs px-5 py-1 rounded-[50px] hover:scale-105 transition duration-200 ease-in-out mx-2">
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
