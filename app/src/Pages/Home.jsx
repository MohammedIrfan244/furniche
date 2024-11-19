import { Link } from "react-router-dom";
import NewCollection from "../Components/NewCollection";
import OriginalProducts from "../Components/OriginalProducts";
import OurPolicy from "../Components/OurPolicy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import Hero from "../assets/Hero.jpg";
import ScrollTop from "../shared/ScrollTop";

function Home() {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      <div
        className="w-[100%] h-[110vh] pt-32 sm:pt-36 lg:pt-20 bg-center bg-cover "
        style={{ backgroundImage: `url(${Hero})` }}
      >
        <div className="text-center flex flex-col items-center">
          <h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl tracking-wide"
            style={{ textShadow: "0 0 15px rgba(255, 255, 255,0.5)" }}
          >
            Furniche
          </h1>
          <div className="text-xs sm:text-[10px] font-bold mt-3 md:mt-2 lg:mt-1">
            <p>A place where craft meets comforts, blending timeless</p>
            <p> with modern elegance for your perfect home.</p>
          </div>
          <div className="text-xs text-center gap-16 flex mt-6">
            <Link
              to={currentUser ? "/collection" : "/login"}
              className="bg-[#F9FCFA] shadow-sm shadow-[#544A3E] text-[#000000] w-24 md:w-36 border-none rounded-[50px] hover:scale-[1.02] transition duration-100 ease-in-out py-1 font-bold"
            >
              Dive in <FontAwesomeIcon className="text-[10px]" icon={faShop} />
            </Link>
            <Link
              to={"/signin"}
              className="bg-[#000000] text-[#F9FCFA] shadow-md shadow-[#544A3E] border-none w-24 md:w-36 rounded-[50px] hover:scale-[1.02] transition duration-100 ease-in-out py-1"
            >
              Sign up now
            </Link>
          </div>
        </div>
      </div>
      <ScrollTop />
      <NewCollection />
      <OriginalProducts />
      <OurPolicy />
    </div>
  );
}

export default Home;
