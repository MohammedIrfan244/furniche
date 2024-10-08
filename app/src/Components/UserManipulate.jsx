
import axios from 'axios'
import { useEffect} from 'react'
import { useLocation, useParams } from 'react-router-dom'

function UserManipulate() {
    const {userId}=useParams()
    const {state}=useLocation()
    const user=state?.user
    useEffect
    const removeUser=(userId)=>{
        axios.delete(`http://localhost:3000/users/${userId}`)
        .catch((err)=>console.log(err))
      }
      const blockUser=(userId,blockToggle)=>{
        axios
        .patch(`http://localhost:3000/users/${userId}`, { isBlocked:blockToggle})
        .catch((err) => console.log(err));
      }
      const makeAdmin=(userID,adminToggle)=>{
        axios
        .patch(`http://localhost:3000/users/${userID}`, { isAdmin:adminToggle })
        .catch((err) => console.log(err));
      }
  return (
    <div className='pt-[10%]'>
        <div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <button onClick={()=>removeUser(userId)}>delete</button>
            <button onClick={()=>blockUser(userId,!user?.isBlocked)}>block</button>
            <button onClick={()=>makeAdmin(userId,!user?.isAdmin)}>make admin</button>
        </div>
    </div>
  )
}

export default UserManipulate