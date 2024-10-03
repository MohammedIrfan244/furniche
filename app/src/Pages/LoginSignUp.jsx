import { useContext } from "react"
import { UserContext } from "../Contexts/UserContext"


function LoginSignUp() {
  const{isLoggedIn,setIsLoggedIn}=useContext(UserContext)
  return (
    <div>
      <form action="">
      <input type="text" placeholder="username" className="" />
      <input type="email" placeholder="emal"/>
      <input type="password" placeholder="password"/>
      </form>
    </div>
  )
}

export default LoginSignUp