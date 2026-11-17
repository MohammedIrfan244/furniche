import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ScrollTop from "../utilities/ScrollTop";
import AdminOrderCards from "./AdminOrderCards";
import axiosErrorManager from "../utilities/axiosErrorManager";
import axiosInstance from "../utilities/axiosInstance";
import { LuArrowLeft, LuShieldAlert, LuShieldCheck } from "react-icons/lu";

function UserManipulate() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [useOrders, setUseOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const blockUser = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.patch(`/admin/users/block/${userId}`);
      toast.success(response.data.message || "User status updated");
      fetchUser(userId);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/admin/users/${id}`);
      setUser(response.data.data || {});
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  const fetchUserOrders = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/admin/orders/user/${id}`);
      setUseOrders(response.data.data || []);
    } catch (err) {
      if (err.response?.status === 404) {
        setUseOrders([]);
      } else {
        toast.error(axiosErrorManager(err));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(userId);
    fetchUserOrders(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div className="w-full min-h-screen bg-canvas text-obsidian p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link
          to="/admin/adminpanel"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 hover:text-obsidian transition"
        >
          <LuArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Console</span>
        </Link>

        {loading && (
          <div className="h-48 flex justify-center items-center">
            <span className="loader" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Client Dossier Profile (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-stone-200/80 p-6 sm:p-8 shadow-atelier space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-stone-200">
                <img
                  src={user?.profile || "/default-profile.png"}
                  alt={user?.name || "Client"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 border text-stone-600 bg-stone-50">
                  {user?.isBlocked ? "Account Restricted" : "Verified Client"}
                </span>
                <h3 className="font-serif text-2xl text-obsidian font-normal mt-2">
                  {user?.name}
                </h3>
                <p className="text-xs text-stone-500 font-mono mt-0.5">
                  ID: #{userId}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs border-t border-stone-100 pt-4 text-stone-600">
              <p><span className="text-stone-400 uppercase tracking-widest text-[10px] block">Email Coordinate:</span> {user?.email}</p>
              <p><span className="text-stone-400 uppercase tracking-widest text-[10px] block">Contact Telephone:</span> {user?.mobile || "Not specified"}</p>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <button
                onClick={blockUser}
                className={`w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-widest font-medium transition border ${
                  user?.isBlocked
                    ? "border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                    : "border-red-300 text-red-600 hover:bg-red-50"
                }`}
              >
                {user?.isBlocked ? (
                  <>
                    <LuShieldCheck className="w-3.5 h-3.5" />
                    <span>Restore Client Access</span>
                  </>
                ) : (
                  <>
                    <LuShieldAlert className="w-3.5 h-3.5" />
                    <span>Restrict Account</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Orders Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-serif text-2xl text-obsidian font-normal">
              Order Portfolio ({useOrders?.length || 0})
            </h3>

            {useOrders?.length === 0 ? (
              <div className="bg-white border border-stone-200/80 p-8 text-center text-xs text-stone-500">
                No orders registered under this client profile.
              </div>
            ) : (
              <div className="space-y-4">
                {useOrders.map((items, index) => (
                  <AdminOrderCards
                    key={items._id || index}
                    userId={userId}
                    fetchingOrder={fetchUserOrders}
                    user={user}
                    orderItems={items}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ScrollTop />
    </div>
  );
}

export default UserManipulate;
