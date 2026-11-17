import { useEffect, useState } from "react";
import ProductItems from "../shared/ProductItems";
import ScrollTop from "../utilities/ScrollTop";
import { LuSearch, LuSearchX } from "react-icons/lu";
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
    if (!products) return;
    if (!search.trim()) {
      setSearchedProduct(products);
      return;
    }
    const query = search.toLowerCase();
    setSearchedProduct(
      products.filter(
        (items) =>
          items.name?.toLowerCase().includes(query) ||
          items.description?.toLowerCase().includes(query) ||
          items.category?.toLowerCase().includes(query)
      )
    );
  }, [error, products, search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-canvas text-obsidian">
      <div className="pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Search Input Bar */}
        <div className="max-w-2xl mx-auto mb-14 text-center">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block mb-3">
            Atelier Search
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-obsidian font-normal tracking-tight mb-8">
            Explore the Catalogue
          </h1>

          <div className="relative flex items-center border-b-2 border-stone-300 focus-within:border-obsidian transition-colors pb-2">
            <LuSearch className="w-5 h-5 text-stone-400 mr-3 shrink-0" strokeWidth={1.5} />
            <input
              type="text"
              value={search}
              placeholder="Search by silhouette, material, or category (e.g. Sofa, Walnut, Chair)..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-obsidian placeholder:text-stone-400 focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-xs uppercase tracking-widest text-stone-400 hover:text-obsidian ml-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Showcase */}
        {loading ? (
          <div className="h-64 flex justify-center items-center">
            <span className="loader" />
          </div>
        ) : (
          <div>
            {searchedProduct?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {searchedProduct.map((item, index) => (
                  <ProductItems
                    key={item._id || item.id || index}
                    id={item._id || item.id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    rating={item.rating || item.averageRating || 0}
                    original={item.original}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center max-w-md mx-auto space-y-4">
                <LuSearchX className="w-10 h-10 text-stone-300 mx-auto" strokeWidth={1.25} />
                <h3 className="font-serif text-xl text-obsidian">
                  No Matching Creations Found
                </h3>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  We could not find any pieces matching &quot;{search}&quot;. Try exploring categories like sofas, chairs, tables, or lamps.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <ScrollTop />
    </div>
  );
}

export default Search;
