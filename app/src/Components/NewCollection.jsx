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
        `${import.meta.env.VITE_API_URL}/public/products/collection/latest`
      );
      setNewCollection(response.data?.data || []);
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
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
      {loading ? (
        <div className="h-48 flex justify-center items-center">
          <span className="loader" />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {/* Section Header */}
          <div className="text-center max-w-xl space-y-2 mb-10 sm:mb-12">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block"
            >
              Recent Arrivals
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-obsidian font-normal tracking-tight"
            >
              New Collections
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs sm:text-sm text-stone-500 font-light"
            >
              Discover our latest range of architectural furniture, engineered for enduring comfort and aesthetic stillness.
            </motion.p>
          </div>

          {/* Product Grid */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {newCollection?.map((item, index) => (
              <ProductItems
                key={item._id || index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                rating={item.rating || item.averageRating || 0}
                original={item.original}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default NewCollection;
