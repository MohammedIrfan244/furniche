import { useContext } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"

function ProductItems({id,name,price,image}) 
{
    const{currency}=useContext(ShopContext)
  return (
    <Link className="transition duration-300 p-[2%]" to={`/collection/${id}`}>
        <div className="overflow-hidden border-2 border-gray-200 shadow-lg rounded-[5px]">
        <img className="hover:scale-105 transition duration-500  ease-in-out" src={image} alt="image" />
        <div className="px-[4%] flex justify-between items-center py-[3%]">
          <div>
        <p className="text-xs">{name}</p>
        <p className="text-xs">{currency} {price}</p>
        </div>
        <FontAwesomeIcon icon={faHeart}/>
        </div>
        </div>
    </Link>
  )
}

export default ProductItems