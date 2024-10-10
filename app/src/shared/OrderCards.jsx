import { useContext} from "react"
import { ShopContext } from "../Contexts/ShopContext"
import OrderItemCards from "../Components/OrderItemCards"
import { UserContext } from "../Contexts/UserContext"
import axios from "axios"
import { toast } from "react-toastify"


// eslint-disable-next-line react/prop-types
function OrderCards({orderItems={},user={}}) {
  const{products}=useContext(ShopContext)
  const {isAdmin}=useContext(UserContext)
  const orderProducts=products.filter((items) => orderItems?.products[items.id])
  const orderAdress=orderItems?.address


  const handleStatusPatch=(key,value)=>{
    const updatedOrder=user?.orders?.map(items=>items.id==orderItems.id?{...items,[key]:value}:items)
    axios.patch(`http://localhost:3000/users/${user.id}`,{orders:updatedOrder})
    .then(()=>toast.success("Status updated successfully"))
    .catch((err)=>console.log(err.message))
  }
  return (
    <div className="border-2 border-black">
      <div>
      {
        orderProducts?.map((items,index)=><OrderItemCards key={index} count={orderItems.products[items.id]} name={items.name} image={items.image} price={items.price} />)
      }
      </div>
      <p>{orderItems.id}</p>
      <p>{orderAdress.firstName+" "+orderAdress.lastName}</p>
      <p>{orderAdress.email}</p>
      <p>{orderAdress.mobile}</p>
      <p>{orderAdress.place}</p>
      <p>{orderAdress.pin}</p>
      <p>{orderItems?.totalAmount}</p>
      <p>{orderItems?.delivaryStatus}</p>
      {
        isAdmin?(
          <>
          <button className="border-2 border-black" onClick={()=>handleStatusPatch("delivaryStatus","done")}>delivary done</button>
            <p>{orderItems.paymentStatus}</p>
            <button className="border-2 border-gray-700" onClick={()=>handleStatusPatch("paymentStatus","paid")}>payment done</button>
          </>
        ):null
      }
    </div>
  )
}

export default OrderCards