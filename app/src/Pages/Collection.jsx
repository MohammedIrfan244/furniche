import { useEffect, useState, useMemo } from "react";
import ProductItems from "../shared/ProductItems";
import ScrollTop from "../shared/ScrollTop";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../Redux/PublicSlice";
import { motion } from "motion/react"; 

function Collection() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.public);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const checkCategory = (e) => {
    const value = e.target.value;
    setCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const memoizedFilteredProducts = useMemo(() => {
    if (categories.length === 0) {
      return products;
    }
    return products.filter((item) => categories.includes(item.category));
  }, [categories, products]);

  useEffect(() => {
    setFilteredProducts(memoizedFilteredProducts);
    if (error) console.log(error);
  }, [memoizedFilteredProducts, error]);

  return (
    <div
      className={`${
        loading ? "h-[100vh] flex justify-center items-center" : ""
      }`}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-[26%] sm:pt-[8%] flex flex-col items-center"
        >
          <h1 className="text-xl sm:text-2xl font-poppins tracking-wide underline decoration-sofaBlue underline-offset-4 mb-10 sm:mb-16">
            SHOP COLLECTIONS
          </h1>
          <div className="w-full px-2">
            
            <div className="bg-white flex items-center justify-between h-10 mb-5 p-3 rounded-md">
              {["bed", "lamps", "tables", "chairs", "sofas"].map(
                (category) => (
                  <label
                    key={category}
                    className="text-nowrap text-xs sm:text-[100%]"
                  >
                    <input
                      type="checkbox"
                      onChange={checkCategory}
                      value={category}
                      checked={categories.includes(category)}
                    />{" "}
                    {category.toUpperCase()}
                  </label>
                )
              )}
            </div>

            
            <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 w-full">
              {filteredProducts.map((item, index) => (
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
          <ScrollTop />
        </motion.div>
      )}
    </div>
  );
}

export default Collection;
