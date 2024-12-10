import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Redux/userSlice";

function AdminLogin() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [passToggle, setPassToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setCurrentUser(null));
    setLoading(true);

    axios
      .post("http://localhost:3001/api/admin/login", loginData, { withCredentials: true })
      .then((response) => {
       const adminCookie=Cookies.get('admin')
       const admin=adminCookie?JSON.parse(adminCookie):null
       dispatch(setCurrentUser(admin));
        toast.success(response.data.message);
        navigate("/admin/adminpanel");
      })
      .catch((err) => {
        toast.error(axiosErrorManager(err));
        dispatch(setCurrentUser(null));
        dispatch((false))
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-[100%] flex flex-col items-center pt-[26%] sm:pt-[8%] h-[100vh]">
      <h1 className="text-xl sm:text-2xl font-serif tracking-wide underline mb-10" style={{ textShadow: "0 0 1px #000000" }}>
        Admin LOGIN
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] mt-10 bg-[#544A3E] shadow-lg shadow-[#000000] p-5 rounded-2xl"
      >
        <input
          required
          value={loginData.email}
          name="email"
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
          className="focus:outline-none rounded-lg px-[3%] py-[1%] text-xs"
        />
        <div className="min-w-1 relative">
          <input
            required
            value={loginData.password}
            name="password"
            type={`${passToggle ? "text" : "password"}`}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-[100%] focus:outline-none rounded-lg px-[3%] py-[1%] text-xs mt-[3%]"
          />
          <FontAwesomeIcon
            className="text-xs absolute bottom-2 right-2"
            onClick={() => setPassToggle(!passToggle)}
            icon={passToggle ? faEyeSlash : faEye}
          />
        </div>
        <div className="text-center mt-[2%]">
          <button
            type="submit"
            className="bg-[#D7D2C9] text-[#000000] font-bold rounded-lg shadow-sm shadow-black hover:scale-[1.01] hover:shadow-md hover:shadow-black transition-all duration-200 text-xs active:scale-95 py-1 px-5 sm:py-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;

  