import { useEffect } from "react";
import NewCollection from "../Components/NewCollection";
import OriginalProducts from "../Components/OriginalProducts";
import ScrollTop from "../utilities/ScrollTop";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react"
import { LuArrowRight } from "react-icons/lu";

function Home() {
  const navigate=useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
        <div>
    <div className="w-full flex flex-col-reverse sm:flex-row bg-cover bg-center relative">
        <div className="w-full h-auto sm:h-[100vh] sm:w-1/2 flex justify-center items-center overflow-hidden">
          <img
            className="max-w-[400px] sm:maxw-[500px] h-auto object-cover transition duration-500 ease-in-out hover:scale-105"
            src="https://i.pinimg.com/736x/4e/f8/4a/4ef84a7dfd2eb7ac62339fdd0f9668f3.jpg"
            alt="hero"
          />
        </div>
        <div className="w-full h-auto pt-32 sm:pt-0 sm:h-[100vh] sm:w-1/2 flex flex-col justify-end sm:justify-end px-5 sm:px-10 font-semibold ">
          <motion.p
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-3xl lg:text-4xl font-poppins mb-3">
            Welcome to <span className="text-sofaBlue">Furniche</span>
          </motion.p>
          <motion.p
           initial={{ opacity: 0, y: -50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="text-2xl md:text-3xl lg:text-4xl font-poppins mb-3 font-semibold">Collections</motion.p>
          <div className="text-sm mt-3 space-y-1 text-gray-600">
          <motion.p 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          >Your One-Stop Solution for Elegant Furniture, </motion.p>
          <motion.p 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          > Timeless Style, and Everyday Comfort — </motion.p>
          <motion.p
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.8 }}
           > Designed to Transform Your Space.</motion.p>
          </div>
          <button onClick={() => navigate("/collection")} className="bg-sofaBlue rounded-md text-white text-xs py-2 mt-5 w-20 hover:px-20 hover:w-72 transition-all duration-300">
            Shop Now
          </button>
          <div className="flex items-center mt-28 mb-20 gap-0">
          <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.5 , delay: 0.2,ease:"easeOut"}}
          className="w-full h-[2px] bg-sofaBlue"
          />
          <LuArrowRight className="text-sofaBlue text-xl"/>
          </div>
        </div>
      </div>
      <ScrollTop />
      <NewCollection />
      <OriginalProducts />
    </div>
  );
}

export default Home;
