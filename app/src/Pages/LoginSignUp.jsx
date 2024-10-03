import { useContext } from "react"
import { UserContext } from "../Contexts/UserContext"
import { Link } from "react-router-dom"


function LoginSignUp() {
  const{isLoggedIn,setIsLoggedIn}=useContext(UserContext)
  return (
    <div>
      <form >
      <input type="text" required placeholder="username" className={`${isLoggedIn==false?'hidden':null}`} />
      <input type="email" required placeholder="emal"/>
      <input type="password" required placeholder="password"/>
      <Link onClick={()=>setIsLoggedIn(!isLoggedIn)} className={`${isLoggedIn?'hidden':null}`}>dont have an account ?</Link>
      <Link onClick={()=>setIsLoggedIn(!isLoggedIn)} className={`${isLoggedIn==false?'hidden':null}`}>already have an account ?</Link>
      <button type="submit" className={`${isLoggedIn?'hidden':null}`}>Sign in</button>
      <button type="submit" className={`${isLoggedIn==false?'hidden':null}`}>Sign up</button>
      </form>
    </div>
  )
}

export default LoginSignUp