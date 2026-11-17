import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LuEye, LuEyeClosed, LuLock } from "react-icons/lu";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Redux/userSlice";

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
      const currentUser = response.data.user;
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(currentUser));
      dispatch(setCurrentUser(currentUser));
      toast.success(response.data.message || "Signed in successfully");
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
    <div className="w-full min-h-screen flex items-center justify-center bg-canvas px-4 py-28 text-obsidian">
      <div className="w-full max-w-md bg-white border border-stone-200 p-8 sm:p-10">
        <div className="text-center space-y-2 mb-8">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block">
            Atelier Access
          </span>
          <h1 className="font-serif text-3xl text-obsidian font-normal tracking-tight">
            Client Sign In
          </h1>
          <p className="text-xs text-stone-500 font-light">
            Welcome back to your curated Furniche portfolio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
              Email Address
            </label>
            <input
              required
              value={loginData.email}
              name="email"
              onChange={handleInputChange}
              type="email"
              placeholder="name@example.com"
              className="w-full bg-canvas-subtle p-3.5 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors"
            />
          </div>

          <div className="relative">
            <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
              Password
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
              <span>{loading ? "Authenticating..." : "Sign In"}</span>
            </button>
          </div>

          <div className="text-center pt-4 border-t border-stone-100">
            <Link
              to="/register"
              className="text-xs text-stone-500 hover:text-obsidian transition-colors font-light"
            >
              Do not possess an account? <span className="underline decoration-stone-300 underline-offset-4 text-obsidian font-normal">Register here</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
