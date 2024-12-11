import { useEffect } from "react";
import NewCollection from "../Components/NewCollection";
import OriginalProducts from "../Components/OriginalProducts";
import OurPolicy from "../Components/OurPolicy";
import ScrollTop from "../shared/ScrollTop";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="w-[100%] h-[100vh] flex flex-col sm:flex-row bg-cover bg-center relative">
        <div className="w-full h-full sm:w-1/2 flex justify-center items-center overflow-hidden">
          <img
            className="max-w-[500px] h-auto object-cover transition duration-500 ease-in-out hover:scale-105"
            src="https://i.pinimg.com/736x/4e/f8/4a/4ef84a7dfd2eb7ac62339fdd0f9668f3.jpg"
            alt="hero"
          />
        </div>
        <div className="w-full h-full sm:w-1/2 flex flex-col justify-center px-5 sm:px-10 ">
          <p className="text-xl md:text-2xl lg:text-3xl font-serif tracking-wide mb-3">
            Welcome to
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-goldenWood drop-shadow-md">
            Furniche
          </h1>
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
