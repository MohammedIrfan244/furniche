import { Link } from "react-router-dom";
import Hero from "../shared/Hero";
import NewCollection from "../Components/NewCollection";
import OriginalProducts from "../Components/OriginalProducts";
import OurPolicy from "../Components/OurPolicy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import HomeImage from '../assets/LandingPageBackground.jpg'

function Home() {
  const { currentUser } = useContext(UserContext);
  return (
    <div>
      {/* <Hero
        source={HomeImage}
      >
        <div className="w-[100%] sm:w-[50%] flex items-center justify-center">
          <div className="flex flex-col gap-9 p-10">
            <div className="flex items-baseline">
              <hr className="bg-[#A47C48] h-[3px] w-[20%]" />
              <p className=" text-xl">. Settle.com .</p>
            </div>
            <p className="text-2xl sm:text-3xl font-serif">
              Where Design Meets Comfort
            </p>
            <Link
              to={`${currentUser ? "/collection" : "/login"}`}
              className=" flex items-baseline"
            >
              <FontAwesomeIcon className="text-[#A47C48]" icon={faShop} />. Shop
              now .<hr className="bg-[#A47C48] h-[3px] w-[15%]" />
            </Link>
          </div>
        </div>
      </Hero> */}
      <div className="w-[100%] h-[120vh] bg-cover bg-slate-200" style={{backgroundImage:`url(${HomeImage})`}}>
      </div>
      <NewCollection />
      <OriginalProducts />
      <OurPolicy />
    </div>
  );
}

export default Home;
