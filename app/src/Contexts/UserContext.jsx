import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const cartUpdater = (userId, updatedCart) => {
  axios
    .patch(`http://localhost:3000/users/${userId}`, { cart: updatedCart })
    .catch((err) => console.log(err));
};
const orderUpdater=(userId,updatedOrder)=>{
  axios.patch(`http://localhost:3000/users/${userId}`,{orders:updatedOrder})
  .catch((err)=>console.log(err))
}
// eslint-disable-next-line react/prop-types
function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser!=null? JSON.parse(storedUser) : null;
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
  useEffect(() => {
    if (cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);
  useEffect(() => {
    if (userOrders) {
      localStorage.setItem("userOrders", JSON.stringify(userOrders));
    }
  }, [userOrders]);

  const addCart = (Id) => {
    setCartItems((prev) => ({ ...prev, [Id]: 1 }));
  };
  useEffect(() => {
    if (currentUser) {
      cartUpdater(currentUser.id, cartItems)
      orderUpdater(currentUser.id,userOrders)
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
