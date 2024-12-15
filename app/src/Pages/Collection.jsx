import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  fetchProductsByCategory,
} from "../Redux/PublicSlice";
import ProductItems from "../shared/ProductItems";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { motion } from "framer-motion";

function Collection() {
  const { products, productsByCategory, loading } = useSelector(
    (state) => state.public
  );
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    try {
      if (selectedCategory === "all") {
        dispatch(fetchAllProducts());
      } else {
        dispatch(fetchProductsByCategory(selectedCategory));
      }
    } catch (error) {
      toast.error(axiosErrorManager(error));
    }
  }, [selectedCategory, dispatch]);

  const selectedProducts =
    selectedCategory === "all" ? products : productsByCategory;

  return (
    <div className="w-full pt-28 flex flex-col items-center">
      {loading ? (
        <div className="h-[20vh] flex justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-between items-center px-4 sm:px-10 mb-6"
          >
            <div className="flex flex-grow justify-center">
              <h1 className="text-xl sm:text-2xl font-poppins tracking-wide underline decoration-sofaBlue underline-offset-4">
                COLLECTIONS
              </h1>
            </div>

            <div className="flex justify-end">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sofaBlue"
              >
                <option value="all">All</option>
                <option value="sofas">Sofas</option>
                <option value="chairs">Chairs</option>
                <option value="tables">Tables</option>
                <option value="bed">Beds</option>
                <option value="lamps">Lamps</option>
              </select>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 place-items-center gap-3 sm:gap-4 mt-10 md:gap-6">
            {selectedProducts.map((product, index) => (
              <ProductItems
                key={index}
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.averageRating || 0}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Collection;
