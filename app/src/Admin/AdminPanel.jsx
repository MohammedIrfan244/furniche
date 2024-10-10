import { useContext, useEffect, useState} from "react";
import AdminProduct from "./AdminProduct";
import AdminUsers from "./AdminUsers";
import AdminDashboard from "./AdminDashboard";
import { UserContext } from "../Contexts/UserContext";
import { Link } from "react-router-dom";
import { ShopContext } from "../Contexts/ShopContext";
import axios from "axios";

function AdminPanel() {
  const {currentUser}=useContext(UserContext)
  const [users,setUsers]=useState([])
  const{loading,setLoading,products}=useContext(ShopContext)
  const[component,setComponent]=useState()
  useEffect(()=>{
    setLoading(true)
    axios.get("http://localhost:3000/users")
    .then((response)=>{
      const exceptCurrentUser=response.data.filter(items=>items.id!==currentUser.id)
      setUsers(exceptCurrentUser)
    })
    .catch((err)=>console.log(err))
    .finally(()=>setLoading(false))
  },[currentUser.id, setLoading])
  return (
    <div className={`${loading?"h-[100vh] flex justify-center items-center":null}`}>
    {loading?(
      <span className="loader"></span>
    ):(
        <div className="pt-[30%] sm:pt-[10%] flex w-[100%]">
          <div className="w-[20%] bg-slate-400">
            <p>{currentUser?.name}</p>
            <p>{currentUser?.email}</p>
          <p className="cursor-pointer" onClick={()=>setComponent("dashboard")}>dashboard</p>
          <p className="cursor-pointer" onClick={()=>setComponent("users")}>users</p>
          <p className="cursor-pointer" onClick={()=>setComponent("products")}>products</p>
            <Link to={'/'}>go back</Link>
          </div>
          <div className="w-[70%] bg-slate-300">
            {
              component==="users"?<AdminUsers users={users}/>:component==="products"?<AdminProduct products={products}/>:<AdminDashboard/>
            }
          </div>
        </div>
    )}
    </div>
    
  );
}

export default AdminPanel;
