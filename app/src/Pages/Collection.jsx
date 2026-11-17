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
import ScrollTop from "../utilities/ScrollTop";

const CATEGORIES = [
  { label: "All Works", value: "all" },
  { label: "Sofas", value: "sofas" },
  { label: "Chairs", value: "chairs" },
  { label: "Tables", value: "tables" },
  { label: "Beds", value: "bed" },
  { label: "Lamps", value: "lamps" },
];

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
    <div className="w-full min-h-screen pt-28 sm:pt-32 pb-20 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header & Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-200/80 pb-8 mb-10 gap-6"
        >
          <div>
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block mb-2">
              Curated Catalogue
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-obsidian font-normal tracking-tight">
              All Collections
            </h1>
          </div>

          {/* Category Filter Chips / Select */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`shrink-0 text-[11px] uppercase tracking-[0.18em] px-4 py-2 transition-all duration-300 font-medium ${
                  selectedCategory === cat.value
                    ? "bg-obsidian text-canvas shadow-sm"
                    : "bg-white border border-stone-200 text-stone-600 hover:border-stone-400 hover:text-obsidian"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Display */}
        {loading ? (
          <div className="h-64 flex justify-center items-center">
            <span className="loader" />
          </div>
        ) : (
          <div>
            {selectedProducts?.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-serif text-xl text-stone-500">
                  No products currently available in this collection.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {selectedProducts.map((product, index) => (
                  <ProductItems
                    key={product._id || index}
                    id={product._id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.averageRating || product.rating || 0}
                    original={product.original}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <ScrollTop />
    </div>
  );
}

export default Collection;
