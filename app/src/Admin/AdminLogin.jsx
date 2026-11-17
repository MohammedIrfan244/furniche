import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LuEye, LuEyeClosed, LuLock } from "react-icons/lu";
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
      .post(`${import.meta.env.VITE_API_URL}/admin/login`, loginData, { withCredentials: true })
      .then((response) => {
        const adminCookie = Cookies.get('user');
        const admin = adminCookie ? JSON.parse(adminCookie) : null;
        dispatch(setCurrentUser(admin));
        dispatch(setIsAdmin(true));
        toast.success(response.data.message || "Authorized admin session");
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
    <div className="w-full min-h-screen flex items-center justify-center bg-canvas px-4 py-20 text-obsidian">
      <div className="w-full max-w-md bg-white border border-stone-200/80 p-8 sm:p-10 shadow-atelier">
        <div className="text-center space-y-2 mb-8">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block">
            Atelier Management
          </span>
          <h1 className="font-serif text-3xl text-obsidian font-normal tracking-tight">
            Furniche Admin Portal
          </h1>
          <p className="text-xs text-stone-500 font-light">
            Authorized studio and catalog administration credentials required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
              Admin Email
            </label>
            <input
              required
              value={loginData.email}
              name="email"
              onChange={handleInputChange}
              type="email"
              placeholder="admin@furniche.com"
              className="w-full bg-canvas-subtle p-3.5 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors"
            />
          </div>

          <div className="relative">
            <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
              Secure Key
            </label>
            <div className="relative">
              <input
                required
                value={loginData.password}
                name="password"
                type={passToggle ? "text" : "password"}
                onChange={handleInputChange}
                placeholder="Enter password"
                className="w-full bg-canvas-subtle p-3.5 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setPassToggle(!passToggle)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-obsidian transition"
              >
                {passToggle ? (
                  <LuEyeClosed className="w-4 h-4" />
                ) : (
                  <LuEye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-obsidian text-canvas py-3.5 text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition duration-300 disabled:opacity-70"
            >
              <LuLock className="w-3.5 h-3.5 text-champagne" />
              <span>{loading ? "Authenticating..." : "Enter Admin Panel"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
