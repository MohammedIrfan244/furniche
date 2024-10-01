import { useContext } from "react"
import { ShopContext } from "../Contexts/ShopContext"


function Cart() {
  const{removeCart,currency,cartItems}=useContext(ShopContext)
  console.log("hello world");
  
  console.log(cartItems);
  console.log(removeCart);
  console.log(currency);
  
  
  
  return (
    <div>
      <ul>
        
        </ul>      
    </div>
  )
}

export default Cart