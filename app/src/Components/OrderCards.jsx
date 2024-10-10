import { useContext } from "react"
import { ShopContext } from "../Contexts/ShopContext"


// eslint-disable-next-line react/prop-types
function OrderCards({orderItems={}}) {
  const{products}=useContext(ShopContext)
  // an array
  const orderProducts=products.filter((items) => orderItems?.products[items.id]) 
  // an object
  const orderAdress=orderItems?.address
  // "totalAmount": 39050,
  //         "paymentStatus": "paid"
  return (
    <div>
      <div>
      {
        orderProducts?.map((items,index)=><li key={index}>{items.name}</li>)
      }
      </div>
      <p>{orderAdress.mobile}</p>
      <p>{orderItems?.totalAmount}</p>
      <p>{orderItems?.paymentStatus}</p>
    </div>
  )
}

export default OrderCards