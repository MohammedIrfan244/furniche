import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const ShopContext=createContext()

const defaulCart=(Parray)=>{
    let cart={}
    for(let i=1;i<Parray.length+1;i++){
        cart[i]=0
    }
    return cart
}

const ShopContextProvider=({children})=>{

    const[products,setProduct]=useState([])
    const[cartItems,setCartItems]=useState()

    useEffect(()=>{
        axios.get('http://localhost:3000/products')
        .then((response)=>{
            setProduct(response.data)
            setCartItems(defaulCart(response.data))
        })
        .catch((err)=>console.log(err))
    },[])

    const addCart=(Id)=>{
        setCartItems((prev)=>({...prev,[Id]:prev[Id]+1}))
    }
    const removeCart=(Id)=>{
        setCartItems((prev)=>({...prev,[Id]:prev[Id]-1}))
    }
    const currency="$"
    const value={products,currency,cartItems,addCart,removeCart}
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default  ShopContextProvider