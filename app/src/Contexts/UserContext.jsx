import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const UserContext=createContext()

function UserContextProvider({children}) {
    const[isLoggedIn,setIsLoggedIn]=useState(false)
    const[users,setUsers]=useState([])

    useEffect(()=>{
        axios.get("http://localhost:3000/users")
        .then((response)=>{
            setUsers(response.data)
        })
        .catch(err=>console.log(err))
    },[])
    const value={isLoggedIn,setIsLoggedIn,users,setUsers}
  return (
   <UserContext.Provider value={value}>
    {children}
   </UserContext.Provider>
  )
}

export default UserContextProvider