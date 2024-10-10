
import axios from 'axios'
import { useEffect, useState} from 'react'
import { useLocation,  useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function UserManipulate() {
    const {userId}=useParams()
    const {state}=useLocation()
    const [user,setUser]=useState(state?.user)
    useEffect
   
      const blockUser=(userId,blockToggle)=>{
        axios
        .patch(`http://localhost:3000/users/${userId}`, { isBlocked:blockToggle})
        .then(()=>{
          setUser((prevUser)=>({...prevUser,isBlocked:blockToggle}))
          toast.success(blockToggle?"User has been blocked":"User has been unblocked")
        })
        .catch((err) => console.log(err));
      }
      const makeAdmin=(userID,adminToggle)=>{
        axios
        .patch(`http://localhost:3000/users/${userID}`, { isAdmin:adminToggle })
        .then(()=>{
          setUser((prevUser)=>({...prevUser,isAdmin:adminToggle}))
          toast.success(adminToggle?"User status changed to admin":"User status changed into not admin")
        })
        .catch((err) => console.log(err));
      }
  return (
    <div className='pt-[10%] flex'>
        <div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <button onClick={()=>blockUser(userId,!user?.isBlocked)}>{user?.isBlocked?"unblock":"block"}</button>
            <button onClick={()=>makeAdmin(userId,!user?.isAdmin)}>{user?.isAdmin?"remove admin":"make admin"}</button>
        </div>
        <div>
          hello
        </div>
    </div>
  )
}

export default UserManipulate