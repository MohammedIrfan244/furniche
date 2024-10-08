import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShopContext } from "../Contexts/ShopContext"



function AdminUsers() {
  const [users,setUsers]=useState([])
  const{setLoading}=useContext(ShopContext)
  const navigate=useNavigate()
  useEffect(()=>{
    axios.get("http://localhost:3000/users")
    .then((response)=>{
      setLoading(true)
      setUsers(response.data)
    })
    .catch((err)=>console.log(err))
    .finally(()=>setLoading(false))
  },[users,setLoading])

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
            <td><button onClick={()=>navigate(`/adminpanel/${user.id}`,{state:{user}})}>view</button></td>
          </tr>)
        }
        </tbody>
      </table>
    </div>
  )
}

export default AdminUsers