import { useNavigate } from "react-router-dom"



// eslint-disable-next-line react/prop-types
function AdminUsers({users=[]}) {
  
  const navigate=useNavigate()

  
  

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
            <td><button onClick={()=>navigate(`/adminpanel/useraction/${user.id}`,{state:{user}})}>view</button></td>
          </tr>)
        }
        </tbody>
      </table>
    </div>
  )
}

export default AdminUsers