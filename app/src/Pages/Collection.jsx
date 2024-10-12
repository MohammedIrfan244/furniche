import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import ProductItems from "../shared/ProductItems";
import ScrollTop from "../shared/ScrollTop";

function Collection() {
  const { products, loading } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const checkCategory = (e) => {
    if (categories.includes(e.target.value)) {
      setCategories((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategories((prev) => [...prev, e.target.value]);
    }
  };
  useEffect(() => {
    if (categories.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((items) => categories.includes(items.category))
      );
    }
  }, [categories, products]);

  return (
    <div className={`${loading?"h-[100vh] flex justify-center items-center":null}`}>
      {loading?(
        <span className="loader"></span>
      ):(
        <div className="pt-[26%] sm:pt-[8%] flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl font-serif tracking-wide underline mb-10" style={{textShadow:'0 0 10px #000000'}}>SHOP COLLECTIONS</h1>
    <div className="flex flex-col sm:flex-row justify-between w-full px-1 sm:px-2">
      <div className="bg-[#F9FCFA] sm:w-[25%] md:w-[20%] lg:w-[10%] sm:h-36 sm:ps-3 hover:scale-[1.02] transition duration-200 flex sm:flex-col justify-evenly py-3 mb-3 rounded-md shadow-md shadow-[#544A3E]">
        <p className="text-nowrap text-xs sm:text-[100%]">
          <input type="checkbox" onChange={checkCategory} value={"bed"} /> BEDS
        </p>
        <p className="text-nowrap text-xs sm:text-[100%]">
          <input type="checkbox" onChange={checkCategory} value={"lamps"} /> LAMPS
        </p>
        <p className="text-nowrap text-xs sm:text-[100%]">
          <input type="checkbox" onChange={checkCategory} value={"tables"} /> TABLES
        </p>
        <p className="text-nowrap text-xs sm:text-[100%]">
          <input type="checkbox" onChange={checkCategory} value={"chairs"} /> CHAIRS
        </p>
        <p className="text-nowrap text-xs sm:text-[100%]">
          <input type="checkbox" onChange={checkCategory} value={"sofas"} /> SOFAS
        </p>
      </div>
      <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12">
          {filteredProducts.map((item, index) => (
            <ProductItems
              key={index}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <ScrollTop/>
      </div>
      )}
    </div>
  );
}

export default Collection;
