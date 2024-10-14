import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import ProductItems from "../shared/ProductItems";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import ScrollTop from "../shared/ScrollTop";

function Search() {
  const { products, loading } = useContext(ShopContext);
  const [search, setSearch] = useState("");
  const [searchedProduct, setSearchedProduct] = useState([]);

  useEffect(() => {
    setSearchedProduct(
      products.filter(
        (items) =>
          items.name.toLowerCase().includes(search.toLowerCase()) ||
          items.description.toLowerCase().includes(search.toLowerCase()) ||
          items.category.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [products, search]);

  return (
    <div
      className={`${
        loading ? "h-[100vh] flex justify-center items-center" : null
      }`}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="flex flex-col items-center w-[100%] pt-[30%] sm:pt-[10%]">
          <input
            type="text"
            value={search}
            placeholder="Search here..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-[90%] sm:w-[60%] text-xs rounded-md bg-[#F9FCFA] shadow-md shadow-[#544A3E] px-3 sm:py-1 focus:outline-none "
          />
          <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 mt-20">
            {searchedProduct.map((item, index) => (
              <ProductItems
                key={index}
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                rating={item.rating}
                original={item.original}
              />
            ))}
          </div>
          <div
            className={`${
              searchedProduct.length != 0 ? "hidden" : null
            } text-gray-600 text-[250%] my-[5%]`}
          >
            <FontAwesomeIcon icon={faBoxOpen} />
          </div>
        </div>
      )}
      <ScrollTop />
    </div>
  );
}

export default Search;
