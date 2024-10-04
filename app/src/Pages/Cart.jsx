import { useContext, useEffect,useState } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import CartCards from "../Components/CartCards"
import { Link } from "react-router-dom"

function Cart() {
  const{currency,cartItems,products,setCartItems,cartCount,cartTotal,setCartTotal}=useContext(ShopContext)
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
    <div className="w-[100%] flex flex-col sm:flex-row gap-9 pt-[10%]">
       <div className={`${cartProducts.length!=0?'hidden':null} w-[100%] text-center text-gray-600 text-[250%] my-[5%]`}>Your cart is empty :(</div>
       <div className="w-[100%] sm:w-[65%] flex flex-col gap-5">
    {
      cartProducts.map((item,index)=>(
        <CartCards key={index} count={cartItemCounts[item.id]} incCartCount={()=>incCart(item)} decCartCount={()=>decCart(item)} removeCart={()=>setCartItems((prev)=>({...prev,[item.id]:0}))} image={item.image} price={item.price} name={item.name} />
      ))
    }
    </div>
    <div className={`${cartProducts.length==0?'hidden':null} flex flex-col justify-between w-[100%] sm:w-[30%] border-2 border-gray-200 shadow-lg p-[1%] `}>
      <p className="text-center">CART DETAILS</p>
      <div className="mt-[5%] flex flex-col gap-5">
      <p>Total products : {cartCount}</p>
      <p>Produts :</p>
      <ul>
        {cartProducts?.map((items,index)=><li key={index}>{items.name} : {cartItemCounts[items.id]}</li>)}
      </ul>
    <p>Total : {currency} {cartTotal}</p>
    <Link className="shadow-md border border-gray-300 px-3  sm:py-1" to={'/placeorder'}>Proceed to payment</Link>
    </div>
    </div>
    </div>
  )
}

export default Cart