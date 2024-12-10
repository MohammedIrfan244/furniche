import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { toast } from "react-toastify";


function AdminUsers() {
  const navigate = useNavigate();
  const [users,setUsers]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    setLoading(true)
axios.get('http://localhost:3001/api/admin/users',{headers:{Authorization:`Bearer ${Cookies.get('token')}`}})
.then((res)=>{
  setLoading(false)
  setUsers(res.data.data)
})
.catch((err)=>{
  toast.error(axiosErrorManager(err))
  setLoading(false)
})
  },[])

  return (
    <div className={`overflow-y-auto max-h-screen scrollbar-thin ${loading ? "h-[100vh] flex justify-center items-center" : null}`}>
      {loading && <span className="loader"></span>}
      <table className="table-auto border-collapse border bg-[#F9FCFA] border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 py-1 px-2">Id</th>
            <th className="border border-gray-300 py-1 px-2">Profile</th>
            <th className="border border-gray-300 py-1 px-2">Name</th>
            <th className="border border-gray-300 py-1 px-2">E mail</th>
            <th className="border border-gray-300 py-1 px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={index}>
              <td className="border border-gray-300 py-1 px-2">{user._id}</td>
              <td className="border border-gray-300 py-1 px-2">
                <img
                  src={user?.profile}
                  className="w-[50px] h-[50px] Logo"
                  alt="User Profile"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg";
                  }}
                />
              </td>
              <td className="border border-gray-300 py-1 px-2">{user.name}</td>
              <td className="border border-gray-300 py-1 px-2">{user.email}</td>
              <td className="border border-gray-300 py-1 px-2">
                <button
                  className="bg-blue-500 text-white py-1 px-2 text-xs rounded"
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
  );
}

export default AdminUsers;
