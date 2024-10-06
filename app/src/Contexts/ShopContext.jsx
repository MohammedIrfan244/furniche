import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext();



// eslint-disable-next-line react/prop-types
const ShopContextProvider = ({ children }) => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/products")
      .then((response) => setProduct(response.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  
  const currency = "₹";
  const shippingFee = 50;
  const value = {
    products,
    currency,
    shippingFee,
    
    loading
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
