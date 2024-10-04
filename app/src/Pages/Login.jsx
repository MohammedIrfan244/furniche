import { useContext, useState } from "react"
import { UserContext } from "../Contexts/UserContext"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { ShopContext } from "../Contexts/ShopContext"

function Login() {
    const{setCurrentUser}=useContext(UserContext)
    const{setCartItems}=useContext(ShopContext)
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[loading,setLoading]=useState(false)
    const navigate=useNavigate()
    

    const handleSubmit=(e)=>{
        e.preventDefault()
        setLoading(true)
        axios.get("http://localhost:3000/users")
        .then((response)=>{
           const users= (response.data)
            const inputUser=users.find(items=>items.email==email&&items.password==password)
           if(inputUser){
            setCurrentUser(inputUser)
            setCartItems(inputUser.cart)
           }else{
            alert("You dont have an account")
           }
        })
        .catch(err=>console.log(err))
        .finally(()=>{
          setLoading(false)
          navigate('/')
        })
    }
  return (
    <div className="w-[100%] flex flex-col items-center pt-[10%]">
        <form onSubmit={handleSubmit} className="shadow-md border border-gray-300 w-[90%] sm:w-[70%] md:w-[60%]">
            <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="E mail" />
            <input required value={password} type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">{loading?"loading...":"login"}</button>
        <Link to={'/signin'}>register</Link>
        </form>
    </div>
  )
}

export default Login