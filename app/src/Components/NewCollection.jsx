import { useEffect, useState } from "react";
import ProductItems from "../shared/ProductItems";
import axios from "axios";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { toast } from "react-toastify";
import { motion } from "motion/react";

function NewCollection() {
  const [newCollection, setNewCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewCollection = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/public/products/collection/new`
      );
      setNewCollection(response.data?.data);
      setLoading(false);
    } catch (error) {
      toast.error(axiosErrorManager(error));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewCollection();
  }, []);

  return (
    <div className="w-full flex flex-col mt-10 items-center">
      {loading ? (
        <div className="h-[20vh] flex justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div
          className="flex flex-col w-full justify-around items-center"
        >
          <motion.h1
           initial={{ opacity: 0, y: -50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="text-xl sm:text-2xl font-poppins tracking-wide underline decoration-sofaBlue underline-offset-4">
            NEW COLLECTIONS
          </motion.h1>
          <motion.p 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs sm:text-sm md:text-base text-gray-500 mt-5 font-poppins">
            Discover our latest range of premium furniture, crafted to elevate your space.
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-10">
            {newCollection?.map((item, index) => (
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

export default NewCollection;
