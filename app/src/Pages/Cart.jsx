import { useContext } from "react"
import { ShopContext } from "../Contexts/ShopContext"


function Cart() {
  const{removeCart,currency,cartItems}=useContext(ShopContext)
  console.log("hello");
  
  console.log(cartItems);
  
  return (
    <div>
      <ul>
        
        </ul>      
    </div>
  )
}

export default Cart