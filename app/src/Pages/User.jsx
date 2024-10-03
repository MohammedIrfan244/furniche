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
    <div>hello{currentUser.name}
    <Link to={'/'}><button onClick={handleClick}>logout</button></Link>
    </div>
  )
}

export default User