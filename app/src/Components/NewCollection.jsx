import { useDispatch, useSelector } from "react-redux";
import ProductItems from "../shared/ProductItems";
import { fetchNewCollection } from "../Redux/PublicSlice";
import { useEffect } from "react";


function NewCollection() {
const dispatch=useDispatch()
  const {newCollection,loading,error} = useSelector((state) => state.public);
useEffect(()=>{
dispatch(fetchNewCollection())
},[])
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
            NEW COLLECTIONS
          </h1>
          <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 mt-20">
            {newCollection?.map((item, index) => (
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
      )}
    </div>
  );
}

export default NewCollection;
