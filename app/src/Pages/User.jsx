import { useNavigate } from "react-router-dom";
import ScrollTop from "../utilities/ScrollTop";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setIsAdmin } from "../Redux/userSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import axiosInstance from "../utilities/axiosInstance";

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

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/users/orders");
      setLoading(true);
      setOrders(response.data.data);
    } catch (err) {
      toast.error(axiosErrorManager(err));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    window.scrollTo(0, 0);
  }, []);

  const handleLogOut = () => {
    const checkLogout = confirm("Are you sure you want to logout");
    if (checkLogout) {
      setLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/users/logout`,
          {},
          { withCredentials: true }
        )
        .then((response) => {
          toast.success(response.data.message);
          dispatch(setIsAdmin(false));
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
    
    axiosInstance.put("/users/update", formData)
      .then((res) => {
        dispatch(setCurrentUser(res.data.data));
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
    <div className="w-full flex flex-col sm:flex-row justify-between pt-[26%] sm:pt-[8%] px-5 gap-5 sm:gap-10">
     
      <div className="w-full sm:w-[40%] bg-white rounded-lg shadow-md p-6">
        <h1 className="text-lg sm:text-xl font-semibold">
          User Details
        </h1>
        <div className="flex flex-col items-center gap-6">
          <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src={currentUser?.profile || "/default-profile.png"}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center text-gray-600 mb-4">
              <span className="font-semibold">Name:</span>
              <span>{currentUser?.name}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600 mb-4">
              <span className="font-semibold">Email:</span>
              <span>{currentUser?.email}</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span className="font-semibold">Mobile:</span>
              <span>{currentUser?.mobile}</span>
            </div>
          </div>
          <div className="flex gap-4 w-full mt-4">
            <button
              className="flex-1 bg-sofaBlue hover:scale-105 text-white py-2 rounded-lg transition duration-300"
              onClick={() => setIsUpdating(true)}
            >
              Edit
            </button>
            <button
              className="flex-1 bg-sofaBlue hover:scale-105 text-white py-2 rounded-lg transition duration-300"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {isUpdating && (
        <div className="w-full sm:w-[40%] bg-gray-50 rounded-lg shadow-md p-6">
          <h2  className="text-lg sm:text-xl font-semibold">
            Update Your Details
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={updateForm.name}
              placeholder="Name"
              onChange={handleInputChange}
              className="border p-3 rounded w-full"
            />
            <input
              type="number"
              name="mobile"
              value={updateForm.mobile}
              placeholder="Mobile"
              onChange={handleInputChange}
              className="border p-3 rounded w-full"
            />
            <input
              name="profile"
              type="file"
              accept="image/jpeg, image/png, image/jpeg"
              onChange={handleFileChange}
              className="border p-3 rounded w-full"
            />
            <input
              type="password"
              name="password"
              value={updateForm.password}
              placeholder="New Password (optional)"
              onChange={handleInputChange}
              className="border p-3 rounded w-full"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-300"
              onClick={updateUser}
            >
              Update
            </button>
            <button
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg transition duration-300"
              onClick={() => setIsUpdating(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="w-full sm:w-[60%]">
        <h1  className="text-lg sm:text-xl font-semibold">
          Orders
        </h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border rounded-lg p-4 shadow-md hover:shadow-lg cursor-pointer transition duration-300"
                onClick={() => navigate(`/orders/${order._id}`)}
              >
                <h3 className="text-lg font-bold text-gray-800">
                  Order ID: {order._id}
                </h3>
                <div className="mt-2 space-y-2">
                  {order?.products?.map((product) => (
                    <div
                      key={product.productId?._id}
                      className="flex justify-between items-center text-gray-600"
                    >
                      <span>{product?.productId?.name}</span>
                      <span>x{product?.quantity}</span>
                      <span>${product?.productId?.price}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-gray-500">
                  <p>Purchased Date: {order?.purchasedDate}</p>
                  <p>Shipping Status: {order?.shippingStatus}</p>
                  <p>Payment Status: {order?.paymentStatus}</p>
                  <p>Total Amount: ${order?.totalAmount}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>

      <ScrollTop />
    </div>
  );
}

export default User;

