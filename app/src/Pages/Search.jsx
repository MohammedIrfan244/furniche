import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import ProductItems from "../Components/ProductItems";

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
  }, [search]);

  return (
    <div className="flex flex-col items-center w-[100%] pt-[30%] sm:pt-[10%]">
      <input
        type="text"
        value={search}
        placeholder="Search here..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-[60%] text-xs border shadow-md border-gray-300 rounded-md px-3 sm:py-1 focus:outline-none "
      />
      <p>{loading ? "Loading..." : null}</p>
      <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-[3%]">
        {searchedProduct.map((item, index) => (
          <ProductItems
            key={index}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
      <div
        className={`${
          searchedProduct.length != 0 ? "hidden" : null
        } text-gray-600 text-[250%] my-[5%]`}
      >
        Not found :(
      </div>
    </div>
  );
}

export default Search;
