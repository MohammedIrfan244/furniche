import {  useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faChevronDown,
  faChevronUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCartQuantity } from "../Redux/userSlice";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { toast } from "react-toastify";
import axiosInstance from "../utilities/axiosInstance";

// eslint-disable-next-line react/prop-types
function CartCards({image,name,price,quantity,id}) {
  const dispatch=useDispatch()
  const[newQuantity,setNewQuantity]=useState(quantity)

  const removeFromCartDispatch=async()=>{
    // const token=Cookies.get('token')
    // await axios.delete(`http://localhost:3001/api/users/cart/${id}`,{
    //   headers:{
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    // .then(()=>{
    //   toast.success("Product removed from cart successfully")
    //   dispatch(removeFromCart(id))
    // })
    // .catch((err)=>{
    //   console.log(axiosErrorManager(err))
    // })
    try{
      const response=await axiosInstance.get(`/users/cart/${id}`)
      dispatch(removeFromCart(id))
      toast.success(response.data.message)
    }catch(err){
        dispatch(removeFromCart(id))
        toast.success(axiosErrorManager(err.data.message))
    }
  }
  const updateCartQuantityDispatch=async(newQuantity)=>{
    // const token=Cookies.get('token')
    // await axios.post('http://localhost:3001/api/users/cart',{productId:id,quantity:newQuantity},{
    //   headers:{
    //     Authorization: `Bearer ${token}`
    //   }
    // })
    // .then(()=>{
    //   dispatch(updateCartQuantity({productId:id,quantity:newQuantity}))
    //   toast.success("Product quantity updated successfully")
    // })
    // .catch((err)=>{
    //   console.log(axiosErrorManager(err))
    // })
    try{
      const response=await axiosInstance.post('/users/cart',{productId:id,quantity:newQuantity})
      dispatch(updateCartQuantity({productId:id,quantity:newQuantity}))
      toast.success(response.data.message)
    }catch(err){
        dispatch(updateCartQuantity({productId:id,quantity:newQuantity}))
        toast.success(axiosErrorManager(err.data.message))
    }
  }

  const { currency } = useSelector((state)=>state.public)
  return (
    <div className="flex justify-between bg-[#F9FCFA] p-1 rounded-lg shadow-sm shadow-[#544A3E]">
      <div className="flex gap-4">
        <Link to={`/product/${id}`}>
          <img
            className="h-[60px] w-[100px] rounded-lg object-cover cartCard"
            src={image}
            alt="image"
          />
        </Link>
        <div className="flex flex-col justify-between pb-[5%] text-xs sm:text-sm md:text-[16px]">
          <p className="whitespace-nowrap">{name}</p>
          <p className="font-bold">
            {currency}
            {price}
          </p>
        </div>
      </div>
      <div className="flex justify-between sm:gap-5 md:gap-7 lg:gap-10 items-center">
        <div className="flex flex-col justify-between items-center text-xs sm:text-sm">
          <button >
            <FontAwesomeIcon className="text-xs" onClick={()=>setNewQuantity(newQuantity+1)} icon={faChevronUp} />
          </button>
          <input
            className="min-w-1 bg-[#F9FCFA] w-[40px] text-center lg:ps-3 focus:outline-none "
            value={newQuantity}
            type="number"
            min={1}
            readOnly
          />
          <button >
            <FontAwesomeIcon className="text-xs" onClick={()=>setNewQuantity(Math.max(1,newQuantity-1))} icon={faChevronDown} />
          </button>
        </div>
        <FontAwesomeIcon onClick={()=>updateCartQuantityDispatch(newQuantity)} className="text-xs sm:text-sm md:text-[16px] pe-2" icon={faCheckCircle}/>
        <button
        onClick={removeFromCartDispatch}
          className=" text-xs sm:text-sm md:text-[16px]"
          
        >
          <FontAwesomeIcon className="p-[6px]" icon={faTrash} />
        </button>
      </div>
    </div>
  );
}

export default CartCards;
