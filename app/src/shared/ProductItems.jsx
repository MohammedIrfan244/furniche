import {  useEffect,  useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList,removeFromWishList, getWishlist } from "../Redux/userSlice";

// eslint-disable-next-line react/prop-types
function ProductItems({ id, name, price, image,rating ,original}) {
  const { currency } = useSelector((state)=>state.public)
  const {userWishlist,currentUser,loading}=useSelector(state=>state.user)
  const [isInWishlist, setIsInWishlist] = useState(false);
  const dispatch=useDispatch()
  

  useEffect(()=>{
setIsInWishlist(userWishlist.some(item=>item._id===id))
  },[id, userWishlist,currentUser])

useEffect(()=>{
  if(currentUser){
dispatch(getWishlist())
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[currentUser])
  return (
    <div className="transition w-52 duration-200 overflow-hidden relative border-none rounded-lg bg-[#F9FCFA] hover:scale-[1.03] hover:shadow-md ease-in-out">
      <Link to={`/product/${id}`}>
      {original==="true"?<FontAwesomeIcon title="Hand crafted by our own designers" className="absolute top-2 right-2 z-10 text-[#FFD700]" icon={faCertificate}/>:null}
        <img
          className="hover:scale-105 transition duration-500 w-full object-cover ease-in-out"
          src={image}
          alt="image"
          />
          </Link>
      <div className="px-[4%] flex justify-between items-center w-full py-[3%]">
        <div className="w-full">
          <p className="text-xs font-bold">{name}</p>
          <div className="w-full flex justify-between items-end pe-3">
          <p className="text-xs font-bold">
            {currency} {price}
          </p>
          <p className="text-[10px] flex text-[#D4AF37]">
              {Array.from({ length: rating }).map((_, index) => (
                  <FontAwesomeIcon key={index} icon={faStar} />
              ))}
            </p>
            </div>
        </div>
      </div>
      <button onClick={isInWishlist?()=>dispatch(removeFromWishList(id)):()=>dispatch(addToWishList(id))} className={isInWishlist?"text-red-500":"text-black"}>{loading?"loading":isInWishlist?"Remove from wishlist":"Add to wishlist"}</button>
    </div>
  );
}

export default ProductItems;
