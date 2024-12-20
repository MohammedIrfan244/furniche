import { useEffect, useState } from "react";
import ProductItems from "../shared/ProductItems";
import axios from "axios";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { toast } from "react-toastify";
import { motion } from "motion/react";

function OriginalProducts() {
  const [loading, setLoading] = useState(true);
  const [originalProduct, setOriginalProduct] = useState([]);

  const fetchOriginalProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/public/products/collection/original`
      );
      setOriginalProduct(response.data?.data);
      setLoading(false);
    } catch (error) {
      toast.error(axiosErrorManager(error));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOriginalProduct();
  }, []);

  return (
    <div className="w-full mt-20">
      {loading ? (
        <div className="h-[20vh] flex justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div
          className="flex flex-col items-center w-full justify-around"
        >
          <motion.h1
           initial={{ opacity: 0, y: -50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="text-xl sm:text-2xl font-poppins tracking-wide underline decoration-sofaBlue underline-offset-4">
            IN HOUSE DESIGNS
          </motion.h1>
          <motion.p
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
           className="text-xs sm:text-sm md:text-base text-gray-500 mt-5 font-poppins">
            Explore our exclusive designs, showcasing elegance and craftsmanship.
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-10">
            {originalProduct.map((item, index) => (
              <ProductItems
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                rating={item.rating}
                original={item.original}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OriginalProducts;
