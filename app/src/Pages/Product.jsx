import { useContext} from "react"
import { ShopContext } from "../Contexts/ShopContext"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import ProductItems from "../Components/ProductItems"
import { UserContext } from "../Contexts/UserContext"
import { Link } from "react-router-dom"

function Product() {
  const {Id}=useParams()
  const{currentUser}=useContext(UserContext)
  const{products,addCart,cartItems,currency}=useContext(ShopContext)
  const product=products.find((items)=>items.id===Id)
  const interestedProduct=products.filter(items=>items.category==product.category&&items.id!=product.id)

 
  return (
    <div className="flex flex-col items-center pt-[7%]">
   <div className="flex flex-col sm:flex-row w-[100%]  mt-[3%]">
    <div className="w-[100%] sm:w-[50%] overflow-hidden">
      <img className="hover:scale-[1.01] transition duration-500 ease-in-out" src={product?.image} alt="image"/>
    </div>
    <div className="w-[100%] sm:w-[50%] flex flex-col justify-between p-[3%] sm:gap-0">
      <div className="flex flex-col justify-beteween gap">
      <h1 className="font-bold text-xl">{product?.name} <p className="text-xs font-normal">{product?.original=="false"?null:"(In house design)"}</p></h1>
      <p className="text-xs flex text-[#A47C48]">{Array.from({length:product?.rating}).map((_,index)=><p key={index}><FontAwesomeIcon icon={faStar}/></p>)}</p>
      <p className="text-xl font-bold">{currency} {product?.price}</p>
      <p className="text-xs">{product?.description}</p>
      </div>
        <Link to={currentUser==null?'/login':'#'}><button onClick={currentUser!=null?()=>addCart(Id):null} className="border active:scale-95 shadow-md border-gray-300 px-3 sm:py-1">{`${cartItems[Id]>0?"Added":"Add to Cart"}`}</button></Link>
    </div>
   </div>
   <h1 className="flex items-baseline text-xl my-20">You may also interested in<hr className="w-10 h-[3px] bg-[#A47C48]" /></h1>
   <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
    {
      interestedProduct?.map((items,index)=>(
        <ProductItems key={index} id={items.id} name={items.name} image={items.image} price={items.price}/>
      ))
    }
   </div>
   </div>
  )
}

export default Product