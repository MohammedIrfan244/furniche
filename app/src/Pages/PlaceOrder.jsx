import { useContext } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import { useNavigate } from "react-router-dom"


function PlaceOrder() {
  const{cartTotal,setCartItems,setCartTotal,shippingFee,currency}=useContext(ShopContext)
  const navigate=useNavigate()
  
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
     navigate('/')
  }
  

  return (
    <div className="pt-[30%] sm:pt-[10%] flex flex-col sm:flex-row justify-between gap-5 sm:gap-3 w-[100%]">
      <div className="w-[100%] sm:w-[40%]">
      <h1 className="flex items-baseline text-l sm:text-xl">DELIVARY DETAILS <hr className="w-10 h-[3px] bg-[#A47C48]" /></h1>
        <form className="flex flex-col gap-3 mt-[10%]">
          <div className="flex gap-3 w-[100%] justify-between">
          <input required type="text" placeholder="First name" className="focus:outline-none border border-gray-500 rounded-md text-xs py-1 px-2 w-[50%]" />
          <input required type="text" placeholder="Last name" className="focus:outline-none border border-gray-500 rounded-md text-xs py-1 px-2 w-[50%]"/>
          </div>
          <input required type="email" placeholder="Email" className="focus:outline-none border border-gray-500 rounded-md text-xs py-1 px-2"/>
          <input required type="text" placeholder="Place" className="focus:outline-none border border-gray-500 rounded-md text-xs py-1 px-2"/>
          <div className="flex w-[100%] gap-3 justify-between">
          <input required type="number" minLength={10} placeholder="Mobile Number" className="focus:outline-none border border-gray-500 rounded-md text-xs py-1 px-2 w-[50%]"/>
          <input required type="number" minLength={6} placeholder="Pincode" className="focus:outline-none border border-gray-500 rounded-md text-xs py-1 px-2 w-[50%]"/>
          </div>
        </form>
      </div>
      <div className="w-[100%] sm:w-[50%] mt-[10%] sm:mt-0">
      <h1 className="flex items-baseline text-l sm:text-xl">PAYMENT DETAILS <hr className="w-10 h-[3px] bg-[#A47C48]" /></h1>
      <div className="mt-[10%] flex flex-col gap-3">
        <div className="flex justify-between">
    Total :
    <p className="font-bold">{currency}{cartTotal}.00</p>
    </div>
    <div className="flex justify-between">
      Shipping fee :
      <p className="font-bold">{currency}{shippingFee}.00</p>
    </div>
    <div className="flex justify-between">
      Total payment :
      <p className="font-bold">{currency}{cartTotal+shippingFee}.00</p>
    </div>
        <form onSubmit={handleClick}>
          <div className="flex justify-start gap-5">
            <div>
        <input type="radio" required name="payment"/>
        Razorpay
        </div>
        <div>
        <input type="radio" name="payment"/>
        Cash on delivary
        </div>
        </div>
        <div className="text-right mt-[5%]">
        <button type="submit"  className="bg-black text-[#F5F2E9] text-xs active:scale-95 px-5 py-1 sm:py-2 " >Place order</button>
        </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder