import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShopContext } from "../Contexts/ShopContext"
import { UserContext } from "../Contexts/UserContext"
import { toast } from "react-toastify"



function AdminUsers() {
  const [users,setUsers]=useState([])
  const{setLoading}=useContext(ShopContext)
  const {currentUser}=useContext(UserContext)
  const navigate=useNavigate()

  const removeUser=(userId)=>{
    axios.delete(`http://localhost:3000/users/${userId}`)
    .then(()=>{
      toast.success("User has been removed")
    })
    .catch((err)=>console.log(err))
  }
  useEffect(()=>{
    axios.get("http://localhost:3000/users")
    .then((response)=>{
      setLoading(true)
      const exceptCurrentUser=response.data.filter(items=>items.id!==currentUser.id)
      setUsers(exceptCurrentUser)
    })
    .catch((err)=>console.log(err))
    .finally(()=>setLoading(false))
  },[users, setLoading, currentUser.id])

  return (
    <div>
      <table>
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>E mail</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {
          users.map((user,index)=><tr key={index}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td><button onClick={()=>removeUser(user.id)}>delete</button></td>
            <td><button onClick={()=>navigate(`/adminpanel/useraction/${user.id}`,{state:{user}})}>view</button></td>
          </tr>)
        }
        </tbody>
      </table>
    </div>
  )
}

export default AdminUsers