import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ScrollTop from "../shared/ScrollTop";
import AdminOrderCards from "./AdminOrderCards";

function UserManipulate() {
  const { userId } = useParams();
  const { state } = useLocation();
  const [user, setUser] = useState(state?.user);
  const navigate = useNavigate();

  const removeUser = (userId) => {
    const checkDelete=confirm("Are you sure you want to delete ?")
    if(checkDelete){
        axios
      .delete(`http://localhost:3000/users/${userId}`)
      .then(() => {
        navigate("/adminpanel");
        toast.success("User has been removed");
      })
      .catch((err) => console.log(err));    
    }
  };

  const blockUser = (userId, blockToggle) => {
    axios
      .patch(`http://localhost:3000/users/${userId}`, {
        isBlocked: blockToggle,
      })
      .then(() => {
        setUser((prevUser) => ({ ...prevUser, isBlocked: blockToggle }));
        toast.success(
          blockToggle ? "User has been blocked" : "User has been unblocked"
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-row justify-between w-full bg-gray-100">
      <div className="w-1/4 bg-white border-r-2 border-gray-300 p-5 space-y-5 pt-10">
        <div className="h-36 flex justify-center items-center rounded-full mb-5 overflow-hidden w-36 border-2 border-gray-300">
          <img
            src={user.avatar}
            alt="User avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg";
            }}
          />
        </div>
        <div className="flex justify-start gap-14">
          <p className="w-1/3 font-semibold">User:</p>
          <p className="font-bold w-2/3">{user.name}</p>
        </div>
        <div className="flex justify-start gap-14">
          <p className="w-1/3 font-semibold">Email:</p>
          <p className="w-2/3">{user.email}</p>
        </div>
        <div className="flex justify-start gap-14">
          <p className="w-1/3 font-semibold">Mobile:</p>
          <p className="w-2/3">{user.mobile}</p>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs rounded-lg"
            onClick={() => blockUser(userId, !user?.isBlocked)}
          >
            {user?.isBlocked ? "Unblock" : "Block"}
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs rounded-lg"
            onClick={() => removeUser(user.id)}
          >
            Delete
          </button>
          <Link
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-xs rounded-lg"
            to={"/adminpanel"}
          >
            Go back
          </Link>
        </div>
      </div>
      <div className="w-3/4 p-5">
        <h1 className="mt-5 text-3xl mb-5 font-semibold">ORDERS</h1>
        <div className="flex flex-col gap-5 w-full overflow-y-auto scrollbar-thin h-[90vh]">
          {user.orders.length === 0
            ? "Order is empty"
            : user.orders?.map((items, index) => (
                <AdminOrderCards key={index} user={user} orderItems={items} />
              ))}
        </div>
      </div>
      <ScrollTop />
    </div>
  );
}

export default UserManipulate;
