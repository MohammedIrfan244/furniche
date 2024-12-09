import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCart } from "../Redux/userSlice"
import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "react-toastify"
import axiosErrorManager from "../utilities/axiosErrorManager"
import { useNavigate } from "react-router-dom"


function CheckoutCart() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {userCart,loading}=useSelector((state)=>state.user)
    const [payment,setPayment]=useState('cod')
    const totalAmount=userCart?.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);
    const [address,setAddress]=useState({
      name: "",
      street: "",
      city: "",
      pincode: "",
      phone: "",
    })
    const products=userCart?.map((item)=>{
        return {
            productId:item.productId?._id,
            quantity:item.quantity
        }
    })
    const placeOrder = async (e) => {
      e.preventDefault();
      const token = Cookies.get("token");
      await axios
        .post(
          `http://localhost:3001/api/users/orders/checkout/${payment}`,
          {
            products: products,
            address: address,
            orderType: "cart",
            totalAmount: totalAmount,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setAddress({
            name: "",
            street: "",
            city: "",
            pincode: "",
            phone: "",
          });
          if(payment==="stripe"){
            window.open(res.data.stripeUrl,"_blank")
          }else{
            toast.success(res.data.message);
            navigate('/cart')
          }
        })
        .catch((err) => {
          console.log(axiosErrorManager(err));
          setAddress({
            name: "",
            street: "",
            city: "",
            pincode: "",
            phone: "",
          });
        });
    };
    useEffect(()=>{
dispatch(getCart())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div className="flex justify-center flex-col items-center h-[100vh]">
      {loading&&<p>loading...</p>}
      <form onSubmit={placeOrder}>
            <input
              type="text"
              required
              value={address.name}
              placeholder="name"
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
            />
            <input
              type="text"
              required
              value={address.street}
              placeholder="street"
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
            />
            <input
              type="text"
              required
              value={address.city}
              placeholder="city"
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <input
              type="number"
              min={3}
              required
              value={address.pincode}
              placeholder="pincode"
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />
            <input
              type="number"
              required
              value={address.phone}
              placeholder="phone"
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
            />
            <select value={payment} onChange={(e) => setPayment(e.target.value)} name="payment" id="payment">
              <option value="cod">Cash on delivery</option>
              <option value="stripe">Online payment</option>
            </select>
            <input type="checkbox" id="checkbox" required />
            <label htmlFor="checkbox">
              {" "}
              I agree to the terms and conditions and the details provided are
              correct
            </label>
            <br />
            <button type="submit">submit</button>
          </form>
    </div>
  )
}

export default CheckoutCart
