import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { UserContext } from "./UserContext";

export const ShopContext=createContext()

const cartUpdater=(userId,updatedCart)=>{
    axios.patch(`http://localhost:3000/users/${userId}`,{cart:updatedCart})
    .catch((err)=>console.log(err))
}

const ShopContextProvider=({children})=>{

    const[products,setProduct]=useState([])
    const{currentUser}=useContext(UserContext)
    const[cartTotal,setCartTotal]=useState(0)
    const[cartItems,setCartItems]=useState(() => {
        const storedCart=localStorage.getItem("cartItems")
        return storedCart?JSON.parse(storedCart):{};
    })
    const[cartCount,setCartCount]=useState(() => {
        const storedCartCount=localStorage.getItem("cartCount")
        return storedCartCount?JSON.parse(storedCartCount):0
    })

    useEffect(()=>{
        if(currentUser){
            cartUpdater(currentUser.id,cartItems)
        }
    },[currentUser,cartItems])
    useEffect(()=>{
        axios.get('http://localhost:3000/products')
        .then((response)=>setProduct(response.data))
        .catch((err)=>console.log(err))
    },[])

    useEffect(()=>{
        if(cartItems){
            localStorage.setItem("cartItems",JSON.stringify(cartItems))
        }
    },[cartItems])

    useEffect(()=>{
        let cartCounts=0
        for(let key in cartItems){
            cartCounts+=cartItems[key]
        }
        setCartCount(cartCounts)
        localStorage.setItem('cartCount', JSON.stringify(cartCounts))
    },[cartItems])

    const addCart=(Id)=>{
        setCartItems((prev)=>({...prev,[Id]:1}))
    }
    const currency="$"
    const value={products,currency,cartItems,addCart,cartCount,setCartItems,cartTotal,setCartTotal}
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default  ShopContextProvider