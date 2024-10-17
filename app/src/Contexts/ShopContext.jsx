import { createContext,useContext,useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { fallbackData } from "../data";



export const ShopContext = createContext();



// eslint-disable-next-line react/prop-types
const ShopContextProvider = ({ children }) => {
  const {cartItems}=useContext(UserContext)
  const navigate=useNavigate()
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  // the nav count
  const [cartCount, setCartCount] = useState(() => {
    const storedCartCount = localStorage.getItem("cartCount");
    return storedCartCount ? JSON.parse(storedCartCount) : 0;
  });

  const addProduct=(data)=>{
    setLoading(true)
    axios.post("http://localhost:3000/products",data)
    .then((response) => {
      setProduct((prevProducts) => [...prevProducts, response.data])
      toast.success("Product added successfully")
    })
    .catch((err)=>console.log(err))
    .finally(()=>setLoading(false))
  }
  const removeProduct=(id)=>{
    const checkDelete=confirm("Are you sure you want to delete the product ?")
    if(checkDelete){
      setLoading(true)
    axios.delete(`http://localhost:3000/products/${id}`)
    .then(()=>{
      setProduct((prevProducts)=>prevProducts.filter((items)=>items.id!==id))
      navigate('/adminpanel')
      toast.success("Product removed")
    })
    .catch((err)=>console.log(err))
    .finally(()=>setLoading(false))
    }
  }
  const editProduct=(id,editedProduct)=>{
    setLoading(true)
    axios.put(`http://localhost:3000/products/${id}`,editedProduct)
    .then((response)=>{
      setProduct((prevProducts)=>prevProducts.map((items)=>items.id==id?response.data:items))
      toast.success("Product updated")
    })
    .catch((err)=>console.log(err))
    .finally(false)
  }
 
  useEffect(()=>{
    
    let cartCounts = 0;
    for (let key in cartItems) {
      products.forEach(items=>{
        items.id==key?cartCounts += cartItems[key]:null
      })
      
    }
    setCartCount(cartCounts);
    localStorage.setItem("cartCount", JSON.stringify(cartCounts));
  },[cartItems, products])

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/products")
      .then((response) => setProduct(response.data))
      .catch((err) => {
        console.log(err)
        setProduct(fallbackData.products)
      })
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
    cartCount,
    setCartCount,
    addProduct,editProduct,removeProduct
  };
  
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
