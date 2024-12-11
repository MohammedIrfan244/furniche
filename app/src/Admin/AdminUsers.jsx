import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { toast } from "react-toastify";
import axiosInstance from "../utilities/axiosInstance";

function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/users");
      setUsers(response.data.data);
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
    <div className="min-h-screen bg-gray-50 p-6">
      {loading && (
        <div className="flex justify-center items-center h-screen absolute inset-0 bg-opacity-50 bg-gray-300">
          <span className="loader"></span>
        </div>
      )}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full border-collapse text-sm text-gray-700">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="border py-2 px-4 text-left">Id</th>
              <th className="border py-2 px-4 text-left">Profile</th>
              <th className="border py-2 px-4 text-left">Name</th>
              <th className="border py-2 px-4 text-left">Email</th>
              <th className="border py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="border py-2 px-4">{user._id}</td>
                <td className="border py-2 px-4">
                  <img
                    src={user?.profile}
                    alt="User Profile"
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="border py-2 px-4">{user.name}</td>
                <td className="border py-2 px-4">{user.email}</td>
                <td className="border py-2 px-4">
                  <button
                    className="bg-blue-500 text-white text-xs py-1 px-3 rounded hover:bg-blue-600 transition duration-200"
                    onClick={() =>
                      navigate(`/admin/adminpanel/useraction/${user._id}`, {
                        state: { user },
                      })
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
