import { useContext, useEffect,useState } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import CartCards from "../Components/CartCards"
import { Link } from "react-router-dom"

function Cart() {
  const{currency,shippingFee,cartItems,products,setCartItems,cartCount,cartTotal,setCartTotal}=useContext(ShopContext)
  const cartProducts=products.filter(items=>cartItems[items.id]>0)
  const [cartItemCounts, setCartItemCounts] = useState(() => {
    const counts = {}
    cartProducts?.forEach(item=>{
      counts[item.id]=cartItems[item.id]||1
    })
    return counts
  })
  
  useEffect(()=>{
    let total=0
  cartProducts.forEach((item)=>{
    total+=cartItems[item.id]*item.price
  })
  setCartTotal(total)
},[cartProducts])

const incCart=(item)=>{
  setCartItemCounts(prev=>({...prev,[item.id]:prev[item.id]+1}))

  setCartItems(prev=>({...prev,[item.id]:prev[item.id]+1}))
}
const decCart=(item)=>{
  setCartItemCounts(prev=>({...prev,[item.id]:Math.max(prev[item.id] - 1, 1)}))

  setCartItems(prev=>({...prev,[item.id]:Math.max(prev[item.id] - 1, 1)}))
}
  return (
    <div className="w-[100%] flex flex-col sm:flex-row gap-9 pt-[30%] sm:pt-[10%]">
       <div className={`${cartProducts.length!=0?'hidden':null} w-[100%] text-center text-gray-600 text-[250%] my-[5%]`}>Your cart is empty :(</div>
       <div className="w-[100%] sm:w-[65%] flex flex-col gap-5">
    {
      cartProducts.map((item,index)=>(
        <CartCards key={index} count={cartItemCounts[item.id]} incCartCount={()=>incCart(item)} decCartCount={()=>decCart(item)} removeCart={()=>setCartItems((prev)=>({...prev,[item.id]:0}))} image={item.image} price={item.price} name={item.name} />
      ))
    }
    </div>
    <div className={`${cartProducts.length==0?'hidden':null} flex flex-col justify-between w-[100%] sm:w-[30%] p-[1%] `}>
    <h1 className="flex items-baseline text-[100%] sm:text-lg">CART TOTALS<hr className="w-10 h-[3px] bg-[#A47C48]" /></h1>
      <div className="mt-[5%] flex flex-col gap-3 text-xs sm:text-sm">
        <div className="flex justify-between">
          Total Items :
          <p className="font-bold">{cartCount}</p>
        </div>
        <div className="flex justify-between">
    Subtotal :
    <p className="font-bold">{currency}{cartTotal}.00</p>
    </div>
    <div className="flex justify-between">
      Shipping fee :
      <p className="font-bold">{currency}{shippingFee}.00</p>
    </div>
    <div className="flex justify-between">
      Total :
      <p className="font-bold">{currency}{cartTotal+shippingFee}.00</p>
    </div>
    <div className="text-right mt-[3%]">
    <Link className="bg-black text-[#F5F2E9] active:scale-95 px-5 py-1 sm:py-2 w-[40%] text-xs text-center" to={'/placeorder'}>Proceed to payment</Link>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Cart