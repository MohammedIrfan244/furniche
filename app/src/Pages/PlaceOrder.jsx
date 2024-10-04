import { useContext } from "react"
import { ShopContext } from "../Contexts/ShopContext"


function PlaceOrder() {
  const{cartTotal,setCartItems,setCartTotal}=useContext(ShopContext)
  
  const handleClick=(e)=>{
    e.preventDefault()
    setCartItems((prevCart) => {
      const clearedCart={}
      for (let key in prevCart) {
        clearedCart[key]=0
      }
      return clearedCart
    })
    setCartTotal(0)

    setTimeout(()=>{
      alert("Payment Success")
     },1000)
  }
  

  return (
    <div className="pt-[10%]">
      <div>
        <form className="flex flex-col">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
          <input type="number" minLength={10} placeholder="Mobile Number" />
          <input type="text" placeholder="Place" />
          <input type="number" minLength={6} placeholder="Pin" />
        </form>
      </div>
      <div>
        <p>{cartTotal}</p>
        <form onSubmit={handleClick}>
        <input type="radio" required name="payment"/>
        razor
        <input name="payment" type="radio"/>
        another
        <input type="radio" name="payment"/>
        pay on delivary
        <button type="submit" className="border border-black" >Order</button>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrder