import { useContext } from "react";
import { ShopContext } from "../Contexts/ShopContext";
import ProductItems from "./ProductItems";

function NewCollection() {
  const { products, loading } = useContext(ShopContext);
  const newProducts = products.slice(-10);
  return (
    <div className={`${loading?"h-[20vh] flex justify-center items-center":null}`}>
      {loading?(
        <span className="loader"></span>
      ):(
    <div className="flex flex-col items-center justify w-[100%] mt-20">
      <h1 className="flex items-baseline text-l sm:text-xl">
        NEW COLLECTIONS <hr className="w-10 h-[3px] bg-[#A47C48]" />
      </h1>
      <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 mt-20">
        {newProducts.map((item, index) => (
          <ProductItems
            key={index}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
     )}
    </div>
  );
}

export default NewCollection;
