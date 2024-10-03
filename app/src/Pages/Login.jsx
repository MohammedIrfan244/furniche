import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Contexts/UserContext"
import { Link } from "react-router-dom"
import axios from "axios"

function Login() {
    const{setCurrentUser}=useContext(UserContext)
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[loading,setLoading]=useState(false)


    const handleSubmit=(e)=>{
        e.preventDefault()
        setLoading(true)
        axios.get("http://localhost:3000/users")
        .then((response)=>{
           const users= (response.data)
            const inputUser=users.find(items=>items.email==email)
           inputUser?setCurrentUser(inputUser):alert("You dont have an account")
        })
        .catch(err=>console.log(err))
        .finally(setLoading(false))
    }
  return (
    <div>
        <form>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="E mail" />
            <input value={password} type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Username" />
            <button onClick={handleSubmit}>{loading?"loading...":"login"}</button>
        </form>
        <Link to={'/signin'}>register</Link>
    </div>
  )
}

export default Login