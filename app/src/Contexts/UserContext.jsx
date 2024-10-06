import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const cartUpdater = (userId, updatedCart) => {
  axios
    .patch(`http://localhost:3000/users/${userId}`, { cart: updatedCart })
    .catch((err) => console.log(err));
};
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
  const [cartCount, setCartCount] = useState(() => {
    const storedCartCount = localStorage.getItem("cartCount");
    return storedCartCount ? JSON.parse(storedCartCount) : 0;
  });

  useEffect(() => {
    if (cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    let cartCounts = 0;
    for (let key in cartItems) {
      cartCounts += cartItems[key];
    }
    setCartCount(cartCounts);
    localStorage.setItem("cartCount", JSON.stringify(cartCounts));
  }, [cartItems]);

  const addCart = (Id) => {
    setCartItems((prev) => ({ ...prev, [Id]: 1 }));
  };
  useEffect(() => {
    if (currentUser) {
      cartUpdater(currentUser.id, cartItems);
    }
  }, [currentUser, cartItems]);
  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser?currentUser:null));
  }, [currentUser]);

  
  const value = { currentUser, setCurrentUser, cartItems,addCart,
    cartCount,
    setCartCount,
    setCartItems,
    cartTotal,
    setCartTotal};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
