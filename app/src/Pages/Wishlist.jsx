import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWishlist, removeFromWishList } from "../Redux/userSlice"


function Wishlist() {
const dispatch=useDispatch()
    const {userWishlist,loading}=useSelector(state=>state.user)
useEffect(()=>{
dispatch(getWishlist())
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
const removeFromWishlist=async(_id)=>{
  await dispatch(removeFromWishList(_id))   
}
  return (
    <div className="w-[100%] flex flex-col sm:flex-row gap-9 px-5 pt-[26%] sm:pt-[8%] ">
      {loading&&<p>loading...</p>}
      {userWishlist?.map((items,index)=><li key={index}>{items?.name}{items?._id} <button onClick={()=>removeFromWishlist(items?._id)}>remove</button></li>)}
    </div>
  )
}

export default Wishlist
