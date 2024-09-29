import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const ShopContext=createContext()

const ShopContextProvider=(props)=>{

    const[products,setProduct]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:3000/products')
        .then((response)=>setProduct(response.data))
        .catch((err)=>console.log(err))
    },[])
    
    const currency="$"
    const value={products,currency}
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default  ShopContextProvider