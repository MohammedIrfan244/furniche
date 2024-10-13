import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const UserContext = createContext();

const dataUpdater = (userId,key, updatedValue) => {
  axios
    .patch(`http://localhost:3000/users/${userId}`, { [key]: updatedValue })
    .catch((err) => console.log(err));
};
// eslint-disable-next-line react/prop-types
function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser? JSON.parse(storedUser) : null;
  });
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};
  });
  const [userOrders, setUserOrders] = useState(() => {
    const storedOrders = localStorage.getItem("userOrders");
    return storedOrders ? JSON.parse(storedOrders) : [];
  });
 
  const isAdmin=currentUser!=null&&currentUser.isAdmin?true:false
  const updateLocalStorage=(key,value)=>{
    localStorage.setItem(key,JSON.stringify(value))
  }
  useEffect(() => {
    if (cartItems) {
      updateLocalStorage("cartItems",cartItems)
    }
  }, [cartItems]);
  useEffect(() => {
    if (userOrders) {
      updateLocalStorage("userOrders",userOrders)
    }
  }, [userOrders]);

  const addCart = (Id) => {
    setCartItems((prev) => ({ ...prev, [Id]: 1 }));
    toast.success("Item added to cart")
  };
  useEffect(() => {
    if (currentUser) {
      dataUpdater(currentUser.id,"cart", cartItems)
      dataUpdater(currentUser.id,"orders",userOrders)
    }
  }, [currentUser, cartItems, userOrders]);
  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser?currentUser:null));
  }, [currentUser]);

  const value = { currentUser, setCurrentUser, cartItems,addCart,
    setCartItems,
    cartTotal,
    isAdmin,
    userOrders,setUserOrders,
    setCartTotal};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
