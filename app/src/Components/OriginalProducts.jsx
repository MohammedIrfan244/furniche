import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import ProductItems from "./ProductItems"

function OriginalProducts() {
    const {products}=useContext(ShopContext)
    const[originaProduct,setOriginalProduct]=useState([])
    useEffect(()=>{
        setOriginalProduct(products.filter((items)=>items.original))
    },[])
  return (
    <div className="flex flex-col items-center w-[100%] mt-20">
        <h1 className="flex items-baseline text-xl">IN HOUSE DESIGNS<hr className="w-10 h-[3px] bg-[#D65F0D]" /></h1>
        <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-20">
           {originaProduct.map((item,index)=>(
            <ProductItems key={index} id={item.id} image={item.image} name={item.name} price={item.price}/>
           ))}
        </div>
    </div>
  )
}

export default OriginalProducts