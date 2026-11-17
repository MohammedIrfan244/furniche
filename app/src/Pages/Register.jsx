import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { LuEye, LuEyeClosed, LuUserPlus } from "react-icons/lu";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useEffect, useState } from "react";

function SignIn() {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    profile: null,
  });
  const [conformPassword, setConformPassword] = useState("");
  const [passToggle, setPassToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setInputData((prev) => ({ ...prev, profile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputData.password !== conformPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("email", inputData.email);
    formData.append("password", inputData.password);
    formData.append("mobile", inputData.mobile || "Not Provided");
    if (inputData.profile) {
      formData.append("profile", inputData.profile);
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message || "Registration completed successfully");
      navigate("/login");
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-canvas px-4 py-28 text-obsidian">
      <div className="w-full max-w-lg bg-white border border-stone-200 p-8 sm:p-10">
        <div className="text-center space-y-2 mb-8">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block">
            Atelier Membership
          </span>
          <h1 className="font-serif text-3xl text-obsidian font-normal tracking-tight">
            Create Client Account
          </h1>
          <p className="text-xs text-stone-500 font-light">
            Join Furniche to save curated pieces and receive personalized concierge service.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
                Full Name
              </label>
              <input
                required
                value={inputData.name}
                name="name"
                onChange={handleInputChange}
                type="text"
                placeholder="Full Name"
                className="w-full bg-canvas-subtle p-3.5 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
                Phone (Optional)
              </label>
              <input
                value={inputData.mobile}
                name="mobile"
                type="tel"
                onChange={handleInputChange}
                placeholder="Mobile Number"
                className="w-full bg-canvas-subtle p-3.5 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
              Email Address
            </label>
            <input
              required
              value={inputData.email}
              name="email"
              type="email"
              onChange={handleInputChange}
              placeholder="name@example.com"
              className="w-full bg-canvas-subtle p-3.5 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
              Avatar Image (Optional)
            </label>
            <input
              name="profile"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full bg-canvas-subtle p-2.5 border border-stone-200 text-xs text-stone-600 focus:outline-none focus:border-obsidian transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  required
                  value={inputData.password}
                  name="password"
                  type={passToggle ? "text" : "password"}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full bg-canvas-subtle p-3.5 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setPassToggle(!passToggle)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-obsidian"
                >
                  {passToggle ? (
                    <LuEyeClosed className="w-4 h-4" />
                  ) : (
                    <LuEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="relative">
              <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
                Confirm
              </label>
              <div className="relative">
                <input
                  required
                  value={conformPassword}
                  type={passToggle ? "text" : "password"}
                  onChange={(e) => setConformPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full bg-canvas-subtle p-3.5 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors pr-10"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-obsidian text-canvas py-3.5 text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition duration-300 disabled:opacity-70"
            >
              <LuUserPlus className="w-3.5 h-3.5 text-champagne" />
              <span>{loading ? "Registering..." : "Create Account"}</span>
            </button>
          </div>

          <div className="text-center pt-4 border-t border-stone-100">
            <Link
              to="/login"
              className="text-xs text-stone-500 hover:text-obsidian transition-colors font-light"
            >
              Already possess an account? <span className="underline decoration-stone-300 underline-offset-4 text-obsidian font-normal">Sign In</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
