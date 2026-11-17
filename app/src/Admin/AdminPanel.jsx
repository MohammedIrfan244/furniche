import { useState } from "react";
import AdminProduct from "./AdminProduct";
import AdminUsers from "./AdminUsers";
import AdminDashboard from "./AdminDashboard";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuUserRound, LuTag, LuLogOut, LuArrowLeft, LuChevronRight } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setIsAdmin } from "../Redux/userSlice";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";

function AdminPanel() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [loading2, setLoading2] = useState(false);
  const dispatch = useDispatch();
  const [component, setComponent] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      setLoading2(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/logout`,
        {},
        { withCredentials: true }
      );
      toast.success(response.data.message || "Signed out");
      dispatch(setCurrentUser(null));
      dispatch(setIsAdmin(false));
      navigate("/");
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-canvas text-obsidian">
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <span className="loader" />
        </div>
      ) : (
        <div className="w-full">
          {/* Top Admin Bar */}
          <header className="bg-white h-20 border-b border-stone-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
            <div className="flex items-center gap-3">
              <Link to="/">
                <span className="font-serif text-2xl tracking-[0.16em] uppercase text-obsidian">
                  Furniche
                </span>
              </Link>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium bg-stone-100 text-stone-600 border border-stone-200 px-2 py-0.5 ml-2">
                Atelier Console
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-4 py-2 text-xs uppercase tracking-widest hover:border-obsidian hover:text-obsidian transition"
              >
                <LuArrowLeft className="w-3.5 h-3.5" />
                <span>Storefront</span>
              </Link>

              <button
                onClick={handleLogOut}
                disabled={loading2}
                className="inline-flex items-center gap-2 bg-obsidian text-canvas px-4 py-2 text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition"
              >
                <LuLogOut className="w-3.5 h-3.5 text-champagne" />
                <span>{loading2 ? "Exiting..." : "Sign Out"}</span>
              </button>
            </div>
          </header>

          <div className="flex flex-col lg:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-stone-200/80 bg-white p-6 space-y-8 shrink-0">
              {/* Admin Identity */}
              <div className="flex items-center gap-4 pb-6 border-b border-stone-100">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-stone-200 shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={currentUser?.profile || "/default-profile.png"}
                    alt="Admin Avatar"
                  />
                </div>
                <div className="space-y-0.5">
                  <p className="font-serif text-sm font-medium text-obsidian line-clamp-1">
                    {currentUser?.name || "Curator"}
                  </p>
                  <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold block">
                    Chief Administrator
                  </span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-1.5">
                <button
                  onClick={() => setComponent("dashboard")}
                  className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-[0.16em] font-medium transition ${
                    component === "dashboard"
                      ? "bg-obsidian text-canvas shadow-sm"
                      : "text-stone-600 hover:bg-canvas-subtle hover:text-obsidian"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <MdOutlineSpaceDashboard className="w-4 h-4 text-champagne" />
                    <span>Dashboard</span>
                  </span>
                  {component === "dashboard" && <LuChevronRight className="w-3.5 h-3.5 text-champagne" />}
                </button>

                <button
                  onClick={() => setComponent("products")}
                  className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-[0.16em] font-medium transition ${
                    component === "products"
                      ? "bg-obsidian text-canvas shadow-sm"
                      : "text-stone-600 hover:bg-canvas-subtle hover:text-obsidian"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <LuTag className="w-4 h-4 text-champagne" />
                    <span>Catalog Items</span>
                  </span>
                  {component === "products" && <LuChevronRight className="w-3.5 h-3.5 text-champagne" />}
                </button>

                <button
                  onClick={() => setComponent("users")}
                  className={`w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-[0.16em] font-medium transition ${
                    component === "users"
                      ? "bg-obsidian text-canvas shadow-sm"
                      : "text-stone-600 hover:bg-canvas-subtle hover:text-obsidian"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <LuUserRound className="w-4 h-4 text-champagne" />
                    <span>Client Accounts</span>
                  </span>
                  {component === "users" && <LuChevronRight className="w-3.5 h-3.5 text-champagne" />}
                </button>
              </nav>

              <div className="pt-8 border-t border-stone-100">
                <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                  Modifications enacted via this portal instantly alter published catalog status and order fulfilment state.
                </p>
              </div>
            </aside>

            {/* Main Stage Display Area */}
            <main className="flex-1 p-6 sm:p-10 bg-canvas overflow-y-auto">
              {component === "users" ? (
                <AdminUsers />
              ) : component === "products" ? (
                <AdminProduct />
              ) : (
                <AdminDashboard />
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
