import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../Contexts/ShopContext"

function Collection() {
   const {products}=useContext(ShopContext)
   const [filteredProducts,setFilteredProducts]=useState([])
   const [categories,setCategories]=useState([])
   console.log(categories);
   
   useEffect(()=>{
    setFilteredProducts(products)
   },[])
  return (
    <div>
      <div>
        <p><input type="checkbox" onChange={(e)=>setCategories(prev=>[...prev,e.target.value])} value={"bed"}/>Beds</p>
        <p><input type="checkbox" onChange={(e)=>setCategories(prev=>[...prev,e.target.value])} value={"lamps"}/>Lamps</p>
        <p><input type="checkbox" onChange={(e)=>setCategories(prev=>[...prev,e.target.value])} value={"tables"}/>Tables</p>
        <p><input type="checkbox" onChange={(e)=>setCategories(prev=>[...prev,e.target.value])} value={"chairs"}/>Chairs</p>
        <p><input type="checkbox" onChange={(e)=>setCategories(prev=>[...prev,e.target.value])} value={"sofas"}/>Sofas</p>
      </div>
    </div>
  )
}

export default Collection