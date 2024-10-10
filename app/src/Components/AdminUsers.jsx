import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"



// eslint-disable-next-line react/prop-types
function AdminUsers({users=[]}) {
  
  const navigate=useNavigate()

  const removeUser=(userId)=>{
    axios.delete(`http://localhost:3000/users/${userId}`)
    .then(()=>{
      toast.success("User has been removed")
    })
    .catch((err)=>console.log(err))
  }
  

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
          users?.map((user,index)=><tr key={index}>
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