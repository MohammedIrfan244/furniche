import { useContext } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import { Link } from "react-router-dom"

function ProductItems({id,name,price,image}) 
{
    const{currency}=useContext(ShopContext)
  return (
    <Link className="transition duration-300 hover:text-[#D65F0D]" to={`/product/${id}`}>
        <div className="overflow-hidden border-2 border-gray-200 shadow-lg rounded-[5px]">
        <img className="hover:scale-105 transition duration-500  ease-in-out" src={image} alt="image" />
        </div>
        <p className="text-xs">{name}</p>
        <p className="text-xs">{currency} {price}</p>
    </Link>
  )
}

export default ProductItems