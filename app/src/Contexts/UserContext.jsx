import { createContext,useContext,useEffect, useState } from "react"

export const UserContext=createContext()

function UserContextProvider({children}) {
   
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem("currentUser");
        return storedUser!=undefined ? JSON.parse(storedUser) : null
      })
    useEffect(()=>{
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
    },[currentUser])
    const value={currentUser,setCurrentUser}
  return (
   <UserContext.Provider value={value}>
    {children}
   </UserContext.Provider>
  )
}

export default UserContextProvider