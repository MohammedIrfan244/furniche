import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ShopContext = createContext();



// eslint-disable-next-line react/prop-types
const ShopContextProvider = ({ children }) => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const addProduct=(data)=>{
    axios.post("http://localhost:3000/products",data)
    .then(()=>toast.success("Product added successfully"))
    .catch((err)=>console.log(err))
  }
  const removeProduct=(id)=>{
    axios.delete(`http://localhost:3000/products/${id}`)
    .then(()=>toast.success("Product deleted successfully"))
    .catch((err)=>console.log(err))
  }
  const editProduct=(id,editedProduct)=>{
    axios.put(`http://localhost:3000/products/${id}`,editedProduct)
    .then(()=>toast.success("Product updated successfully"))
    .catch((err)=>console.log(err))
  }
 
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
    loading,
    setLoading,
    addProduct,editProduct,removeProduct
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
