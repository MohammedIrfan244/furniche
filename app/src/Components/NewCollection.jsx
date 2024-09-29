import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import ProductItems from "./ProductItems"


function NewCollection() {
    const{products}=useContext(ShopContext)
    const [newProducts,setNewProduct]=useState([])
    useEffect(()=>{
        setNewProduct(products.slice(-10))
    },[products])
  return (
    <div className="flex flex-col items-center w-[100%] mt-20">
        <h1 className="flex items-baseline text-xl">NEW COLLECTIONS <hr className="w-10 h-[3px] bg-[#D65F0D]" /></h1>
        <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-20">
            {newProducts.map((item,index)=>(
                <ProductItems key={index} id={item.id} image={item.image} name={item.name} price={item.price}/>
            ))}
        </div>
    </div>
  )
}

export default NewCollection