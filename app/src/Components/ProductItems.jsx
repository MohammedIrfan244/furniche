import { useContext} from "react"
import { ShopContext } from "../Contexts/ShopContext"
import { Link } from "react-router-dom"


function ProductItems({id,name,price,image}) 
{
    const{currency}=useContext(ShopContext)
  
  return (
    <div className="transition duration-300 overflow-hidden ">
          <Link to={`/product/${id}`}>
        <img onClick={window.scrollTo(0,0)} className="hover:scale-105 transition duration-500  ease-in-out" src={image}alt="image" />
    </Link>
        <div className="px-[4%] flex justify-between items-center py-[3%]">
          <div>
        <p className="text-xs">{name}</p>
        <p className="text-xs">{currency} {price}</p>
        </div>
        {/* <FontAwesomeIcon icon={faHeart}/> */}
        </div>
        </div>
  )
}

export default ProductItems