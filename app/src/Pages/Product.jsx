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
  const{products,addCart,cartItems}=useContext(ShopContext)
  const product=products.find((items)=>items.id===Id)
  const interestedProduct=products.filter(items=>items.category==product.category&&items.id!=product.id)

 
  return (
    <div className="flex flex-col items-center">
      <h1 className="flex items-baseline text-xl mt-[2%]">Product Details<hr className="w-10 h-[3px] bg-[#A47C48]" /></h1>
   <div className="flex flex-col sm:flex-row w-[100%] border-2 border-gray-200 shadow-lg rounded-[5px] mt-[3%]">
    <div className="w-[100%] sm:w-[70%] overflow-hidden">
      <img className="hover:scale-[1.01] transition duration-500 ease-in-out" src={product?.image} alt="image"/>
    </div>
    <div className="w-[100%] sm:w-[50%] flex flex-col justify-around p-[3%] gap-[10px] sm:gap-0">
      <h1 className="">Name : {product?.name}{product?.original?"(house)":null}</h1>
      <p>Category : {product?.category}</p>
      <p>Rating : {`${product?.rating}/5 `}<FontAwesomeIcon className="scale-75" icon={faStar}/></p>
      <p>Price : {product?.price}</p>
      <p>{product?.description}</p>
      <div className="w-[90%] mt-4 flex justify-between">
        <Link to={currentUser==null?'/login':'#'}><button onClick={currentUser!=null?()=>addCart(Id):null} className="border active:scale-95 shadow-md border-gray-300 px-3 sm:py-1">{`${cartItems[Id]>0?"Added":"Add to Cart"}`}</button></Link>
       
      </div>
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