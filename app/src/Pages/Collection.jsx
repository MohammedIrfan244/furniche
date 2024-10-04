import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import ProductItems from "../Components/ProductItems"

function Collection() {
   const {products,loading}=useContext(ShopContext)
   const [filteredProducts,setFilteredProducts]=useState([])
   const [categories,setCategories]=useState([])
  

  
   const checkCategory=(e)=>{
    if(categories.includes(e.target.value)){
      setCategories(prev=>prev.filter(item=>item!==e.target.value))
    }else{
      setCategories(prev=>[...prev,e.target.value])
    }
   }
   useEffect(()=>{
    if(categories.length===0){
      setFilteredProducts(products)
    }else{
      setFilteredProducts(products.filter(items=>categories.includes(items.category)))
    }
   },[categories,products])


   
  return (
    <div className="w-[100%] flex flex-col items-center pt-[30%] sm:pt-[10%]">
      <div className="flex justify-between sm:w-[60%] w-[95%] border-b-2 border-gray-300 p-5">
        <p className="text-nowrap text-xs sm:text-[100%]"><input type="checkbox" onChange={checkCategory} value={"bed"}/> BEDS</p>
        <p className="text-nowrap text-xs sm:text-[100%]"><input type="checkbox" onChange={checkCategory} value={"lamps"}/> LAMPS</p>
        <p className="text-nowrap text-xs sm:text-[100%]"><input type="checkbox" onChange={checkCategory} value={"tables"}/> TABLES</p>
        <p className="text-nowrap text-xs sm:text-[100%]"><input type="checkbox" onChange={checkCategory} value={"chairs"}/> CHAIRS</p>
        <p className="text-nowrap text-xs sm:text-[100%]"><input type="checkbox" onChange={checkCategory} value={"sofas"}/> SOFAS</p>
      </div>
        <p>{loading?"Loading...":null}</p>
      <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-[3%]">
        {
          filteredProducts.map((item,index)=>(
            <ProductItems key={index} id={item.id} name={item.name} price={item.price} image={item.image}/>
          ))
        }
      </div>
    </div>
  )
}

export default Collection