import { useContext } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import { Link } from "react-router-dom"


// eslint-disable-next-line react/prop-types
function OrderItemCards({image,name,price,count,id}) {
    const {currency}=useContext(ShopContext)
  return (
    <div className="flex justify-between bg-[#F9FCFA] p-1 w-[100%] rounded-lg shadow-sm shadow-black items-center" >
    <div className="flex gap-4">
      <Link to={`/product/${id}`}>
      <img className="h-[60px] w-[100px] object-cover cartCard" src={image} alt="image" />
      </Link>
      <div className="flex flex-col justify-between pb-[5%] text-xs sm:text-sm md:text-[16px]" >
      <p className="whitespace-nowrap">{name}</p>
      <p className="font-bold">{currency}{price}</p>
      </div>
      </div>
      <div className="flex justify-between sm:gap-5 md:gap-7 lg:gap-10">
      <p>{count}</p>
      </div>
  </div>
  )
}

export default OrderItemCards