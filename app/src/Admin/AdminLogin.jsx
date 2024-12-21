import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LuEye,LuEyeClosed } from "react-icons/lu";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setCurrentUser, setIsAdmin } from "../Redux/userSlice";

function AdminLogin() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [passToggle, setPassToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCurrentUser(null));
    dispatch(setIsAdmin(false));
    setLoading(true);

    axios
      .post(`${import.meta.env.VITE_API_URL}/admin/login`,loginData, { withCredentials: true })
      .then((response) => {
        const adminCookie = Cookies.get('user');
        const admin = adminCookie ? JSON.parse(adminCookie) : null;
        dispatch(setCurrentUser(admin));
        dispatch(setIsAdmin(true));
        toast.success(response.data.message);
        navigate("/admin/adminpanel");
      })
      .catch((err) => {
        toast.error(axiosErrorManager(err));
        dispatch(setCurrentUser(null));
        dispatch(setIsAdmin(false));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%]">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Admin Login
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <input
            required
            value={loginData.email}
            name="email"
            onChange={handleInputChange}
            type="email"
            placeholder="Email Address"
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <div className="relative">
            <input
              required
              value={loginData.password}
              name="password"
              type={`${passToggle ? "text" : "password"}`}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {passToggle? (
              <LuEyeClosed
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setPassToggle(!passToggle)}
              />
            ) : (
              
              <LuEye
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setPassToggle(!passToggle)}
              />
            )
            }
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-all duration-200"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;



  