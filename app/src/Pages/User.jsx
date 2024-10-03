import { useContext } from "react"
import { UserContext } from "../Contexts/UserContext"
import { Link } from "react-router-dom"


function User() {
    const{currentUser,setCurrentUser}=useContext(UserContext)
  return (
    <div>hello{currentUser.name}
    <Link to={'/login'} onClick={()=>setCurrentUser(null)}>Logout</Link>
    </div>
  )
}

export default User