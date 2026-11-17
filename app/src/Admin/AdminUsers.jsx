import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { toast } from "react-toastify";
import axiosInstance from "../utilities/axiosInstance";
import { LuEye, LuUsers } from "react-icons/lu";

function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/users");
      setUsers(response.data?.data || []);
      setLoading(false);
    } catch (err) {
      toast.error(axiosErrorManager(err));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block mb-1">
            Client Relations
          </span>
          <h2 className="font-serif text-3xl text-obsidian font-normal">
            Registered Clients ({users?.length || 0})
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex justify-center items-center">
          <span className="loader" />
        </div>
      ) : (
        <div className="bg-white border border-stone-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-widest font-medium text-[10px]">
                <tr>
                  <th className="py-3.5 px-5">Client</th>
                  <th className="py-3.5 px-5">Email Coordinate</th>
                  <th className="py-3.5 px-5">System ID</th>
                  <th className="py-3.5 px-5 text-right">Dossier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {users?.map((user, index) => (
                  <tr key={user._id || index} className="hover:bg-canvas-subtle transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-stone-200 shrink-0">
                          <img
                            src={user?.profile || "/default-profile.png"}
                            alt={user?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium text-obsidian text-sm">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-stone-600">
                      {user.email}
                    </td>
                    <td className="py-4 px-5 font-mono text-[11px] text-stone-400">
                      {user._id}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() =>
                          navigate(`/admin/adminpanel/useraction/${user._id}`, {
                            state: { user },
                          })
                        }
                        className="inline-flex items-center gap-1.5 border border-stone-300 text-obsidian hover:border-obsidian px-3 py-1.5 text-[11px] uppercase tracking-wider transition"
                      >
                        <LuEye className="w-3 h-3 text-champagne" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
