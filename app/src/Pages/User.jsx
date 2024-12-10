import { useNavigate } from "react-router-dom";
import ScrollTop from "../shared/ScrollTop";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setIsAdmin } from "../Redux/userSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";

function User() {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [updateForm, setUpdateForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    mobile: currentUser?.mobile || "",
    profile: currentUser?.profile || null,
    password: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(false); 
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser=async()=>{
    setLoading(true);
    const token = Cookies.get("token");
    axios
      .get("http://localhost:3001/api/users/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {
        toast.error(axiosErrorManager(err));
      })
      .finally(() => {
        setLoading(false); 
      });
  }

  useEffect(() => {
    fetchUser()
  }, []);

  const handleLogOut = () => {
    const checkLogout = confirm("Are you sure you want to logout");
    if (checkLogout) {
      setLoading(true);
      axios
        .post("http://localhost:3001/api/users/logout", {}, { withCredentials: true })
        .then((response) => {
          toast.success(response.data.message);
          dispatch(setIsAdmin(false))
          dispatch(setCurrentUser(null));
          navigate("/");
        })
        .catch((err) => {
          toast.error(axiosErrorManager(err));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const updateUser = async () => {
    setIsUpdating(true);
    setLoading(true); 
    const formData = new FormData();
    formData.append("name", updateForm.name);
    formData.append("mobile", updateForm.mobile);
    if (updateForm.password && updateForm.password.length > 0) {
      formData.append("password", updateForm.password);
    }
    if (updateForm.profile) {
      formData.append("profile", updateForm.profile);
    }
    const token = Cookies.get("token");
    await axios
      .put("http://localhost:3001/api/users/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setCurrentUser(res.data.data))
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(axiosErrorManager(err));
      })
      .finally(() => {
        setIsUpdating(false);
        setLoading(false); 
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setUpdateForm((prev) => ({ ...prev, profile: e.target.files[0] }));
  };

  return (
    <div className="w-[100%] flex flex-col sm:flex-row justify-between pt-[26%] sm:pt-[8%] px-5 gap-5 sm:gap-32">
      <div className="w-[100%] sm:w-[40%]">
        <h1
          className="text-xl sm:text-2xl font-serif tracking-wide underline ms-3 mb-10"
          style={{ textShadow: "0 0 1px #000000" }}
        >
          USER DETAILS
        </h1>
        <div className="mt-10 bg-[#F9FCFA] rounded-2xl shadow-sm shadow-[#544A3E] p-3 flex flex-col gap-3">
          <div className="flex justify-center">
            <div className="h-36 flex justify-center items-center rounded-full mb-5 overflow-hidden w-36">
              <img src={currentUser?.profile} alt="User Profile" />
            </div>
          </div>
          <div className="flex justify-start gap-14">
            <p className="font-bold flex w-[60%]">{currentUser.name}</p>
          </div>
          <div className="flex justify-start gap-14">
            <p className="w-[20%]">Email</p>
            <p className="flex w-[60%]">{currentUser.email}</p>
          </div>
          <div className="flex justify-start gap-14">
            <p className="w-[20%]">Mobile</p>
            <p className="flex w-[60%]">{currentUser.mobile}</p>
          </div>
          <div className="w-[100%] flex justify-end gap-3">
            <button
              className="bg-[#544A3E] rounded-lg shadow-md shadow-black text-[#F5F2E9] text-xs active:scale-95 py-1 px-5 sm:py-2 mt-[2%]"
              onClick={() => setIsUpdating(true)}
            >
              Edit
            </button>
            <button
              className="bg-[#544A3E] rounded-lg shadow-md shadow-black text-[#F5F2E9] text-xs active:scale-95 py-1 px-5 sm:py-2 mt-[2%]"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {isUpdating && (
        <div className="bg-[#F9FCFA] rounded-2xl shadow-sm shadow-[#544A3E] p-3 flex flex-col gap-3">
          <h2 className="text-lg font-bold">Update Your Details</h2>
          <input
            type="text"
            name="name"
            value={updateForm.name}
            placeholder="Name"
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="mobile"
            value={updateForm.mobile}
            placeholder="Mobile"
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            name="profile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <input
            type="password"
            name="password"
            value={updateForm.password}
            placeholder="New Password (optional)"
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <div className="flex justify-end gap-3">
            <button
              className="bg-[#544A3E] rounded-lg shadow-md shadow-black text-[#F5F2E9] text-xs active:scale-95 py-1 px-5 sm:py-2"
              onClick={updateUser}
            >
              Update
            </button>
            <button
              className="bg-gray-400 rounded-lg text-xs active:scale-95 py-1 px-5 sm:py-2"
              onClick={() => setIsUpdating(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="w-[100%] sm:w-[70%]">
        <h1
          className="text-xl sm:text-2xl font-serif tracking-wide underline ms-3 mb-10"
          style={{ textShadow: "0 0 1px #000000" }}
        >
          ORDERS
        </h1>
        {loading && <p>Loading...</p>}
        {orders.length > 0 &&
          orders.map((order) => {
            return (
              <div
                key={order._id}
                className="border-2"
                onClick={() => navigate(`/orders/${order._id}`)}
              >
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
              </div>
            );
          })}
      </div>
      <ScrollTop />
    </div>
  );
}

export default User;
