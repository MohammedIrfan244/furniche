import axios from "axios"
import { useContext, useState } from "react"
import { UserContext } from "../Contexts/UserContext"


function SignIn() {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const{users}=useContext(UserContext)
    const data={
        name: name,
        email: email,
        password: password,
        cart: {}
      }

    const handleSubmit=(e)=>{
        e.preventDefault()
        users.some(item=>item.email==email)?alert("User already exists")
        :axios.post("http://localhost:3000/users",data)
        .then(alert("User Added"))
        .catch((err)=>console.log(err))
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="username" />
            <input value={email} type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="email"/>
            <input value={password} type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
            <button type="submit">click</button>
        </form>
    </div>
  )
}

export default SignIn