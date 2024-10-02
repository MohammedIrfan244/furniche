import { useContext } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRemove } from "@fortawesome/free-solid-svg-icons"


function CartCards({image,name,price,removeCart,incCartCount,decCartCount,count}) {
    const{currency}=useContext(ShopContext)
  return (
    <div className="flex justify-between gap-[10px] border-2 border-gray-200 shadow-lg pe-[2%] " >
        <img className="h-14 sm:h-20 md:h-24 lg:h-26" src={image} alt="image" />
        <div className="flex flex-col justify-between py-[1%] text-xs sm:text-sm md:text-[16px]" >
        <p>Product:{name}</p>
        <p>Price :{currency} {price}</p>
        </div>
        <div className="flex flex-col justify-between items-center text-xs sm:text-sm">
        <button className="w-[25%]  border shadow-md border-gray-300 px-3 sm:py-1" onClick={incCartCount}>+</button>
        <input className="w-[25%] border shadow-md text-center" value={count}  type="number" min={1} readOnly defaultValue={1}/>
        <button className="w-[25%] border shadow-md border-gray-300 px-3 sm:py-1" onClick={decCartCount}>-</button>
        </div>
        <div className="flex items-center text-xs sm:text-sm md:text-[16px]">
        <button className="border shadow-md border-gray-300 px-[5%]" onClick={removeCart}><FontAwesomeIcon className="mx-[6px]" icon={faRemove}/></button>
        </div>
    </div>
  )
}

export default CartCards