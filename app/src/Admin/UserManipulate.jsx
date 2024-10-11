
import axios from 'axios'
import { useState} from 'react'
import { useLocation,  useNavigate,  useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import OrderCards from '../shared/OrderCards'

function UserManipulate() {
    const {userId}=useParams()
    const {state}=useLocation()
    const [user,setUser]=useState(state?.user)
    const navigate=useNavigate()
    
    const removeUser=(userId)=>{
      axios.delete(`http://localhost:3000/users/${userId}`)
      .then(()=>{
        navigate('/adminpanel')
        toast.success("User has been removed")
      })
      .catch((err)=>console.log(err))
    }
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
            <button onClick={()=>removeUser(user.id)}>delete</button>
        </div>
        <div className='h-[80vh] overflow-y-auto scrollbar-none'>
          {user?.orders.length===0?"order is empty":user?.orders.map((items,index)=><OrderCards user={user} key={index} orderItems={items}/>)}
          
        </div>
    </div>
  )
}

export default UserManipulate