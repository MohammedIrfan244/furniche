import { useContext } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faChevronDown, faChevronUp, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"


// eslint-disable-next-line react/prop-types
function CartCards({image,name,price,removeCart,incCartCount,decCartCount,count,id}) {
  const{currency}=useContext(ShopContext)
  return (
    <div className="flex justify-between bg-[#F9FCFA] p-1 rounded-lg shadow-sm shadow-[#544A3E]" >
      <div className="flex gap-4">
      <Link to={`/product/${id}`}>
        <img className="h-[60px] w-[100px] rounded-lg object-cover cartCard" src={image} alt="image" />
      </Link>
        <div className="flex flex-col justify-between pb-[5%] text-xs sm:text-sm md:text-[16px]" >
        <p className="whitespace-nowrap">{name}</p>
        <p className="font-bold">{currency}{price}</p>
        </div>
        </div>
        <div className="flex justify-between sm:gap-5 md:gap-7 lg:gap-10">
        <div className="flex flex-col justify-between items-center text-xs sm:text-sm">
        <button onClick={incCartCount}><FontAwesomeIcon className="text-xs" icon={faChevronUp}/></button>
        <input className="min-w-1 bg-[#F9FCFA] w-[40px] text-center lg:ps-3 focus:outline-none " value={count}  type="number" min={1} readOnly />
        <button onClick={decCartCount}><FontAwesomeIcon className="text-xs" icon={faChevronDown}/></button>
        </div>
        <button className="flex items-center text-xs sm:text-sm md:text-[16px]" onClick={removeCart}><FontAwesomeIcon className="p-[6px]" icon={faTrash}/></button>
        </div>
    </div>
  )
}

export default CartCards