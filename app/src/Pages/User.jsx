import { useNavigate } from "react-router-dom";
import ScrollTop from "../utilities/ScrollTop";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setIsAdmin } from "../Redux/userSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import axiosInstance from "../utilities/axiosInstance";
import { LuPackage, LuLogOut, LuPen, LuChevronRight } from "react-icons/lu";

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
      setLoading(true);
      const response = await axiosInstance.get("/users/orders");
      setOrders(response.data.data || []);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    window.scrollTo(0, 0);
  }, []);

  const handleLogOut = () => {
    const checkLogout = confirm("Are you sure you wish to sign out?");
    if (checkLogout) {
      setLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/users/logout`,
          {},
          { withCredentials: true }
        )
        .then((response) => {
          toast.success(response.data.message || "Signed out");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
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

    axiosInstance
      .put("/users/update", formData)
      .then((res) => {
        dispatch(setCurrentUser(res.data.data));
        toast.success(res.data.message || "Profile updated");
        setIsUpdating(false);
      })
      .catch((err) => {
        toast.error(axiosErrorManager(err));
      })
      .finally(() => {
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
    <div className="w-full min-h-screen bg-canvas text-obsidian">
      <div className="pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="border-b border-stone-200/80 pb-6 mb-10">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block mb-2">
            Client Dossier
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-obsidian font-normal tracking-tight">
            Account & Acquisitions
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Profile Overview Card (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-stone-200/80 p-6 sm:p-8 shadow-atelier space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-stone-200 p-1">
                <img
                  src={currentUser?.profile || "/default-profile.png"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div>
                <h3 className="font-serif text-xl text-obsidian font-normal">
                  {currentUser?.name}
                </h3>
                <p className="text-xs text-stone-500 font-light">
                  {currentUser?.email}
                </p>
                {currentUser?.mobile && (
                  <p className="text-xs text-stone-400 mt-0.5">
                    {currentUser.mobile}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-stone-100 pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => setIsUpdating(!isUpdating)}
                className="w-full inline-flex items-center justify-center gap-2 border border-stone-300 text-obsidian py-2.5 text-xs uppercase tracking-[0.16em] font-medium hover:border-obsidian transition"
              >
                <LuPen className="w-3.5 h-3.5 text-champagne" />
                <span>{isUpdating ? "Close Editor" : "Edit Profile"}</span>
              </button>

              <button
                onClick={handleLogOut}
                className="w-full inline-flex items-center justify-center gap-2 text-stone-500 hover:text-red-600 py-2 text-xs uppercase tracking-[0.16em] font-medium transition"
              >
                <LuLogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Profile Update Form Drawer */}
            {isUpdating && (
              <div className="border-t border-stone-200 pt-6 space-y-4">
                <h4 className="font-serif text-base text-obsidian font-normal">
                  Update Account Details
                </h4>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={updateForm.name}
                      onChange={handleInputChange}
                      className="w-full bg-canvas-subtle p-2.5 border border-stone-200 text-xs focus:outline-none focus:border-obsidian"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      value={updateForm.mobile}
                      onChange={handleInputChange}
                      className="w-full bg-canvas-subtle p-2.5 border border-stone-200 text-xs focus:outline-none focus:border-obsidian"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                      Avatar Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full bg-canvas-subtle p-2 text-xs text-stone-500 border border-stone-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                      New Password (Optional)
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Leave blank to retain"
                      value={updateForm.password}
                      onChange={handleInputChange}
                      className="w-full bg-canvas-subtle p-2.5 border border-stone-200 text-xs focus:outline-none focus:border-obsidian"
                    />
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={updateUser}
                      disabled={loading}
                      className="flex-1 bg-obsidian text-canvas py-2.5 text-[11px] uppercase tracking-[0.16em] font-medium hover:bg-stone-800 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsUpdating(false)}
                      className="px-4 border border-stone-200 text-stone-600 text-[11px] uppercase tracking-wider hover:bg-stone-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Orders History Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-serif text-2xl text-obsidian font-normal">
              Order History
            </h3>

            {loading ? (
              <div className="h-48 flex justify-center items-center">
                <span className="loader" />
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    onClick={() => navigate(`/orders/${order._id}`)}
                    className="group bg-white border border-stone-200/80 p-5 sm:p-6 shadow-sm hover:border-stone-400 hover:shadow-atelier transition-all cursor-pointer flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <LuPackage className="w-4 h-4 text-champagne" />
                        <span className="font-mono text-xs text-stone-500">
                          #{order._id?.slice(-8)}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 bg-stone-100 text-stone-700 border border-stone-200">
                          {order?.shippingStatus || "Ordered"}
                        </span>
                      </div>

                      <div className="text-xs text-stone-600 space-y-0.5">
                        {order?.products?.map((item) => (
                          <div key={item?.productId?._id || Math.random()} className="line-clamp-1">
                            {item?.productId?.name} &times; {item?.quantity}
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] text-stone-400">
                        Date: {order?.purchasedDate}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-100">
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 block">
                          Total
                        </span>
                        <span className="font-sans text-base font-semibold text-obsidian">
                          ${order?.totalAmount}
                        </span>
                      </div>
                      <LuChevronRight className="w-4 h-4 text-stone-400 group-hover:text-obsidian group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-white border border-stone-200/80 p-8">
                <LuPackage className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <p className="font-serif text-lg text-stone-600">
                  No previous acquisitions recorded.
                </p>
                <p className="text-xs text-stone-400 font-light mt-1">
                  When you acquire pieces from our atelier, your order history will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ScrollTop />
    </div>
  );
}

export default User;
