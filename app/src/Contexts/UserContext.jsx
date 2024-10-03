import axios from "axios"
import { createContext,useEffect, useState } from "react"

export const UserContext=createContext()

function UserContextProvider({children}) {
    const[users,setUsers]=useState([])
    const[currentUser,setCurrentUser]=useState(()=>{
        const storedUser=localStorage.getItem("currentUser")
        return storedUser?JSON.parse(storedUser):null
    })

    useEffect(()=>{
        axios.get("http://localhost:3000/users")
        .then((response)=>{
            setUsers(response.data)
        })
        .catch(err=>console.log(err))
    },[])
    useEffect(()=>{
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
    },[currentUser])
    const value={users,setUsers,currentUser,setCurrentUser}
  return (
   <UserContext.Provider value={value}>
    {children}
   </UserContext.Provider>
  )
}

export default UserContextProvider