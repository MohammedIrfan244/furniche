import { useContext} from "react"
import { ShopContext } from "../Contexts/ShopContext"
import OrderItemCards from "../Components/OrderItemCards"
// import { UserContext } from "../Contexts/UserContext"
// import axios from "axios"
// import { toast } from "react-toastify"


// eslint-disable-next-line react/prop-types
function OrderCards({orderItems={}}) {
  const{products}=useContext(ShopContext)
  // const {isAdmin}=useContext(UserContext)
  const orderProducts=products.filter((items) => orderItems?.products[items.id])
  const orderAdress=orderItems?.address


  // const handleStatusPatch=(key,value)=>{
  //   const updatedOrder=user?.orders?.map(items=>items.id==orderItems.id?{...items,[key]:value}:items)
  //   axios.patch(`http://localhost:3000/users/${user.id}`,{orders:updatedOrder})
  //   .then(()=>toast.success("Status updated successfully"))
  //   .catch((err)=>console.log(err.message))
  // }
  
  return (
    <div className="border-2 border-[#F9FCFA] bg-[#F9FCFA] w-[100%] flex flex-col gap-3 bg-opacity-75 rounded-lg p-5 shadow-md shadow-[#544A3E]">
      <div className="flex flex-col gap-3">
      {
        orderProducts?.map((items,index)=><OrderItemCards key={index} id={items.id} count={orderItems.products[items.id]} name={items.name} image={items.image} price={items.price} />)
      }
      </div>
      <div className="text-xs flex flex-col gap-1">
        <div className="flex justify-start gap-10">
           <p className="w-[20%]">Order Id</p>
      <p>{orderItems.id}</p>
      </div>
      <div className="flex justify-start gap-10">
        <p className="w-[20%]">Name</p>
      <p>{orderAdress.firstName+" "+orderAdress.lastName}</p>
      </div>
      <div className="flex justify-start gap-10">
        <p className="w-[20%]">Email</p>
      <p>{orderAdress.email}</p>
      </div>
      <div className="flex justify-start gap-10">
        <p className="w-[20%]">Mobile</p>
      <p>{orderAdress.mobile}</p>
      </div>
      <div className="flex justify-start gap-10">
        <p className="w-[20%]">Place</p>
      <p>{orderAdress.place}</p>
      </div>
      <div className="flex justify-start gap-10">
        <p className="w-[20%]">Pinconde</p>
      <p>{orderAdress.pin}</p>
      </div>
      <div className="flex justify-start gap-10">
        <p className="w-[20%]">Total</p>
      <p>{orderItems?.totalAmount}</p>
      </div>
      <div className="flex justify-start gap-10">
        <p className="w-[20%]">Delivary</p>
      <p className="w-[20%]">{orderItems?.delivaryStatus}</p>
        {/* {isAdmin?<button className="bg-[#F9FCFA] shadow-sm shadow-black rounded-md py-1 px-2" onClick={()=>handleStatusPatch("delivaryStatus","done")}>Delivary done</button>:null} */}
      </div>
      {/* {
        isAdmin?(
          <div className="flex justify-start gap-10 mt-2">
            <p className="w-[20%]">Payment</p>
            <p className="w-[20%]">{orderItems.paymentStatus}</p>
            <button className="bg-[#F9FCFA] shadow-sm shadow-black rounded-md py-1 px-2" onClick={()=>handleStatusPatch("paymentStatus","paid")}>Payment done</button>
          </div>
        ):null
      } */}
      </div>
    </div>
  )
}

export default OrderCards