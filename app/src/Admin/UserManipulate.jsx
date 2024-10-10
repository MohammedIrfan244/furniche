
import axios from 'axios'
import { useEffect, useState} from 'react'
import { useLocation,  useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import OrderCards from '../shared/OrderCards'

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
  return (
    <div className='pt-[10%] flex'>
        <div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <p>{user?.mobile}</p>
            <button onClick={()=>blockUser(userId,!user?.isBlocked)}>{user?.isBlocked?"unblock":"block"}</button>
        </div>
        <div className='h-[80vh] overflow-y-auto scrollbar-none'>
          {user?.orders.length===0?"order is empty":user?.orders.map((items,index)=><OrderCards user={user} key={index} orderItems={items}/>)}
          
        </div>
    </div>
  )
}

export default UserManipulate