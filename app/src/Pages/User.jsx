import { useContext } from "react"
import { UserContext } from "../Contexts/UserContext"
import { ShopContext } from "../Contexts/ShopContext"
import { Link,} from "react-router-dom"


function User() {
    const{currentUser,setCurrentUser}=useContext(UserContext)
    const{setCartItems,setCartCount}=useContext(ShopContext)
    const handleClick=()=>{
      setCurrentUser(null)
      setCartItems({})
      setCartCount(0)
      localStorage.removeItem("cartItems")
      localStorage.removeItem("currentUser")
      localStorage.removeItem("cartCount")
    }
 
  return (
    <div className="pt-[30%] sm:pt-[10%] flex flex-col items-center justify-center h-[90vh] gap-3">
      <div className="w-[30%] sm:w-[10%] overflow-hidden rounded-full">
      <img className="" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="image" />
      </div>
      <p className="font-bold text-xl">{currentUser.name}</p>
      <p className="font-bold text-xl">{currentUser.email}</p>
    <Link to={'/'}><button className="bg-black text-[#F5F2E9] text-xs active:scale-95 py-1 px-5 sm:py-2 mt-[10%]" onClick={handleClick}>logout</button></Link>
    </div>
  )
}

export default User