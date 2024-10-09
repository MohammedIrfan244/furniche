import { useContext, useState} from "react";
import AdminProduct from "../Components/AdminProduct";
import AdminUsers from "../Components/AdminUsers";
import AdminDashboard from "../Components/AdminDashboard";
import { UserContext } from "../Contexts/UserContext";
import { Link } from "react-router-dom";

function AdminPanel() {
  const {currentUser}=useContext(UserContext)
  const[component,setComponent]=useState()
  return (
    <div>
        <div className="pt-[30%] sm:pt-[10%]">
          <div>
            <p>{currentUser?.name}</p>
            <p>{currentUser?.email}</p>
          </div>
          <p className="cursor-pointer" onClick={()=>setComponent("dashboard")}>dashboard</p>
          <p className="cursor-pointer" onClick={()=>setComponent("users")}>users</p>
          <p className="cursor-pointer" onClick={()=>setComponent("products")}>products</p>
          <div>
            {
              component==="users"?<AdminUsers/>:component==="products"?<AdminProduct/>:<AdminDashboard/>
            }
          </div>
        </div>
      <Link to={'/'}>go back</Link>
    </div>
  );
}

export default AdminPanel;
