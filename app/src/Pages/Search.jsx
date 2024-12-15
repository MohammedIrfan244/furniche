import { useEffect, useState } from "react";
import ProductItems from "../shared/ProductItems";
import ScrollTop from "../utilities/ScrollTop";
import { LuSearchX } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../Redux/PublicSlice";

function Search() {
  const { products, loading, error } = useSelector((state) => state.public);
  const [search, setSearch] = useState("");
  const [searchedProduct, setSearchedProduct] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchedProduct(
      products?.filter(
        (items) =>
          items.name.toLowerCase().includes(search.toLowerCase()) ||
          items.description.toLowerCase().includes(search.toLowerCase()) ||
          items.category.toLowerCase().includes(search.toLowerCase())
      )
    );
    
  }, [error, products, search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={`${
        loading ? "h-[100vh] flex justify-center items-center" : null
      }`}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="flex flex-col items-center h-auto w-[100%] pt-[30%] sm:pt-[10%]">
          <input
            type="text"
            value={search}
            placeholder="Search here..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-[90%] sm:w-[60%] text-xs  border-b-2 border-sofaBlue px-3 py-2 sm:py-1 focus:outline-none"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 place-items-center gap-3 sm:gap-4 mt-10 md:gap-6">
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
              searchedProduct.length !== 0 ? "hidden" : null
            } text-gray-600 text-[250%] my-[5%]`}
          >
            < LuSearchX />
          </div>
        </div>
      )}
      <ScrollTop />
    </div>
  );
}

export default Search;
