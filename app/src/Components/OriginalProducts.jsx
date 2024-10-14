import { useContext } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import ProductItems from "../shared/ProductItems";

function OriginalProducts() {
  const { products, loading } = useContext(ShopContext);
  const originaProduct = products.filter((items) => items.original === "true");

  return (
    <div
      className={`${
        loading ? "h-[20vh] flex justify-center items-center" : null
      }`}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="flex flex-col items-center w-[100%] mt-20 px-3 lg:p-2">
          <h1
            className="text-xl sm:text-2xl font-serif tracking-wide underline"
            style={{ textShadow: "0 0 1px #000000" }}
          >
            IN HOUSE DESIGNS
          </h1>
          <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 mt-20">
            {originaProduct.map((item, index) => (
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
        </div>
      )}
    </div>
  );
}

export default OriginalProducts;
