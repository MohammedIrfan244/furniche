import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LuEye ,LuEyeClosed} from "react-icons/lu";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Redux/userSlice";
import Cookies from "js-cookie";

function Login() {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [passToggle, setPassToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setCurrentUser(null));
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        loginData,
        { withCredentials: true }
      );
      const userCookie = Cookies.get("user");
      const currentUser = userCookie ? JSON.parse(userCookie) : null;
      dispatch(setCurrentUser(currentUser));
      toast.success(response.data.message);
      setLoading(false);
      navigate("/");
    } catch (err) {
      toast.error(axiosErrorManager(err));
      dispatch(setCurrentUser(null));
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[90%] sm:w-1/3 md:w-1/4 lg:w-1/4 bg-white border-2 border-sofaBlue p-8 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              required
              value={loginData.email}
              name="email"
              onChange={handleInputChange}
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <input
              required
              value={loginData.password}
              name="password"
              type={passToggle ? "text" : "password"}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {
              passToggle ? (
                <LuEyeClosed
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setPassToggle(!passToggle)}
                />
              ) : (
                <LuEye
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setPassToggle(!passToggle)}
                />
              )
            }
          </div>
          <div className="text-center mb-4">
            <Link
              className="text-xs text-sofaBlue hover:underline"
              to="/register"
            >
              Don&apos;t have an account? Register now
            </Link>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-sofaBlue text-white font-bold py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
