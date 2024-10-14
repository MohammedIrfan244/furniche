import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function AdminUsers({ users = [] }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-y-auto max-h-screen scrollbar-thin">
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
              <td className="border border-gray-300 py-1 px-2">{user.id}</td>
              <td className="border border-gray-300 py-1 px-2">
                <img
                  src={user.avatar}
                  className="w-[50px] h-[50px] Logo"
                  alt="User avatar"
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
                    navigate(`/adminpanel/useraction/${user.id}`, {
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
