import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ScrollTop from "../shared/ScrollTop";
import AdminOrderCards from "./AdminOrderCards";
import Cookies from "js-cookie";
import axiosErrorManager from "../utilities/axiosErrorManager";

function UserManipulate() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [useOrders, setUseOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blocked, setBlocked]=useState(false)

  const blockUser = async () => {
    setLoading(true)
    const token = Cookies.get("token");
    await axios
      .patch(
        `http://localhost:3001/api/admin/users/block/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setBlocked(res.data.data)
        setLoading(true)
      })
      .catch((err) => {
        toast.error(axiosErrorManager(err));
      })
      .finally(() => {
        setLoading(false)
      });
  };


  useEffect(()=>{
    setLoading(true)
    axios
    .get(`http://localhost:3001/api/admin/users/${userId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .then((res) => {
      setUser(res.data.data);
    })
    .catch((err) => {
      console.log(axiosErrorManager(err));
    })
    .finally(()=>setLoading(false))
  },[userId])

  useEffect(()=>{
    setLoading(true)
axios
    .get(`http://localhost:3001/api/admin/orders/user/${userId}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
    .then((res) => {
      setUseOrders(res.data.data);
    })
    .catch((err) => {
      console.log(axiosErrorManager(err));
})
.finally(()=>setLoading(false))
  },[userId])
  return (
    <div className="flex flex-row justify-between w-full bg-gray-100">
      {loading&&<div className="loader h-[100vh] w-[100%] flex justify-center items-center"></div>}
      <div className="w-1/4 bg-white border-r-2 border-gray-300 p-5 space-y-5 pt-10">
        <div className="h-36 flex justify-center items-center rounded-full mb-5 overflow-hidden w-36 border-2 border-gray-300">
          <img
            src={user.profile}
            alt="User Profile"
          />
        </div>
        <div className="flex justify-start gap-14">
          <p className="w-1/3 font-semibold">User:</p>
          <p className="font-bold w-2/3">{user.name}</p>
        </div>
        <div className="flex justify-start gap-14">
          <p className="w-1/3 font-semibold">Email:</p>
          <p className="w-2/3">{user.email}</p>
        </div>
        <div className="flex justify-start gap-14">
          <p className="w-1/3 font-semibold">Mobile:</p>
          <p className="w-2/3">{user.mobile}</p>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-xs rounded-md"
            onClick={() => blockUser()}
          >
            {blocked? "Unblock" : "Block"}
          </button>
          <Link
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-xs rounded-md"
            to="/admin/adminpanel"
          >
            Go back
          </Link>
        </div>
      </div>
      <div className="w-3/4 p-5">
        <h1 className="mt-5 text-3xl mb-5 font-semibold">ORDERS</h1>
        <div className="flex flex-col gap-5 w-full overflow-y-auto scrollbar-thin h-[90vh]">
          {useOrders === 0
            ? "Order is empty"
            : useOrders?.map((items, index) => (
                <AdminOrderCards key={index} user={user} orderItems={items} />
              ))}
        </div>
      </div>
      <ScrollTop />
    </div>
  );
}

export default UserManipulate;
