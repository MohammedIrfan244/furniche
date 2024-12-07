import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToWishList, getWishlist } from "../Redux/userSlice"


function Wishlist() {
const dispatch=useDispatch()
    const {userWishlist,loading}=useSelector(state=>state.user)
useEffect(()=>{
dispatch(getWishlist())
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])
const addToWishlist=async()=>{
  await dispatch(addToWishList("67501313f7cf0572f920a21b"))
}
  return (
    <div className="w-[100%] flex flex-col sm:flex-row gap-9 px-5 pt-[26%] sm:pt-[8%] ">
      {loading&&<p>loading...</p>}
      {userWishlist?.map((items,index)=><li key={index}>{items?.name}</li>)}
      <button onClick={addToWishlist}>clidk</button>
    </div>
  )
}

export default Wishlist
