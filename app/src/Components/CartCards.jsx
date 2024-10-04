import { useContext } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faChevronDown, faChevronUp, faTrash } from "@fortawesome/free-solid-svg-icons"


function CartCards({image,name,price,removeCart,incCartCount,decCartCount,count}) {
    const{currency}=useContext(ShopContext)
  return (
    <div className="flex justify-between gap-[10px] border-b-2 border-gray-300 pe-[2%] pb-[1%]" >
      <div className="flex gap-4">
        <img className="h-12 sm:h-16 md:h-20 lg:h-20" src={image} alt="image" />
        <div className="flex flex-col justify-between pb-[15%] text-xs sm:text-sm md:text-[16px]" >
        <p className="font-bold">{name}</p>
        <p>{currency}{price}</p>
        </div>
        </div>
        <div className="flex flex-col justify-between items-center text-xs sm:text-sm">
        <button onClick={incCartCount}><FontAwesomeIcon className="text-xs" icon={faChevronUp}/></button>
        <input className="min-w-1 bg-[#F5F2E9] text-center lg:ps-3" value={count}  type="number" min={1} readOnly defaultValue={1}/>
        <button onClick={decCartCount}><FontAwesomeIcon className="text-xs" icon={faChevronDown}/></button>
        </div>
        <div className="flex items-center text-xs sm:text-sm md:text-[16px]">
        <button onClick={removeCart}><FontAwesomeIcon className="p-[6px]" icon={faTrash}/></button>
        </div>
    </div>
  )
}

export default CartCards