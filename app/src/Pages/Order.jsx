import { useEffect, useState } from "react";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utilities/axiosInstance";

function Order() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //         setLoading(true)
    //         const token=Cookies.get('token')
    // axios.get(`http://localhost:3001/api/users/orders/${id}`,{
    //     headers:{
    //         Authorization:`Bearer ${token}`
    //     }
    // }).then((res)=>{
    //     setLoading(false)
    //     setOrder(res.data.data)
    // }).catch((err)=>{
    //     console.log(axiosErrorManager(err))
    //     setLoading(false)
    // })
    const fetchOrder = async () => {
      try {
        const response = await axiosInstance.get(`/users/orders/${id}`);
        setLoading(false);
        setOrder(response.data.data);
      } catch (err) {
        toast.error(axiosErrorManager(err));
        setLoading(false);
      }
    };
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cancelOrder = async () => {
    // const token=Cookies.get('token')
    // await axios.patch(`http://localhost:3001/api/users/orders/cancel/${id}`,{},{
    //     headers:{
    //         Authorization:`Bearer ${token}`
    //     }
    // }).then((res)=>{
    //     toast.success(res.data.message)
    // }).catch((err)=>{
    //     toast.error(axiosErrorManager(err))
    // })
    // window.location.reload()
    try {
      const response = await axiosInstance.patch(`/users/orders/cancel/${id}`);
      toast.success(response.data.message);
      window.location.reload();
    } catch (err) {
      toast.error(axiosErrorManager(err));
      window.location.reload();
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh]">
      {loading && <p>loading...</p>}

      {order?.products?.map((product) => {
        return (
          <div key={product._id}>
            <p>{product?.productId?.name}</p>
            <p>{product?.quantity}</p>
            <p>{product?.productId?.price}</p>
          </div>
        );
      })}
      <p>{order?.purchasedDate}</p>
      <p>{order?.shippingStatus}</p>
      <p>{order?.paymentStatus}</p>
      <p>{order?.totalAmount}</p>
      <button onClick={cancelOrder}>Cancel</button>
    </div>
  );
}

export default Order;
