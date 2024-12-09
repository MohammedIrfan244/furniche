import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosErrorManager from "../utilities/axiosErrorManager";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function CheckoutSingle() {
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState("cod");
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    pincode: "",
    phone: "",
  });
  const totalAmount = product?.price * quantity || 0;

  const placeOrder = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    await axios
      .post(
        `http://localhost:3001/api/users/orders/checkout/${payment}`,
        {
          products: [
            {
              productId: product._id,
              quantity,
            },
          ],
          address: address,
          orderType: "single",
          totalAmount: totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
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
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/api/public/products/${id}`)
      .then((res) => {
        setProduct(res.data?.data);
        setLoading(false);
      })
      .catch((err) => console.log(axiosErrorManager(err)));
  }, [id]);
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div>
          <p>name:{product.name}</p>
          <p>price:{product.price}</p>
          <div>
            <button onClick={() => setQuantity(Math.min(10, quantity + 1))}>
              inc
            </button>
            <p>quantity:{quantity}</p>
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              dec
            </button>
          </div>
          <p>totalAmount:{totalAmount}</p>
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
      )}
    </div>
  );
}

export default CheckoutSingle;
