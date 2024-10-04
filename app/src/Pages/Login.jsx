import { useContext, useState } from "react"
import { UserContext } from "../Contexts/UserContext"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { ShopContext } from "../Contexts/ShopContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

function Login() {
    const{setCurrentUser}=useContext(UserContext)
    const{setCartItems}=useContext(ShopContext)
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[passToggle,setPassToggle]=useState(false)
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
            alert("You have been logged in")
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
    <div className="w-[100%] flex flex-col items-center pt-[30%] sm:pt-[10%]">
       <h1 className="flex items-baseline text-l sm:text-xl">LOGIN <hr className="w-10 h-[3px] bg-[#A47C48]"/></h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] mt-[10%] sm:mt-[3%]">
            <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" className="focus:outline-none border-2 border-[#1C1C1C] px-[3%] py-[1%] text-xs" />
            <div className="min-w-1 relative">
            <input required value={password} type={`${passToggle?"text":"password"}`} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" className="w-[100%] focus:outline-none border-2 border-[#1C1C1C] px-[3%] py-[1%] text-xs mt-[3%]"/>
            <FontAwesomeIcon className="text-xs absolute bottom-2 right-2" onClick={()=>setPassToggle(!passToggle)} icon={passToggle?faEyeSlash:faEye}/>
            </div>
        <Link className="text-xs block" to={'/signin'}>Create an account ?</Link>
        <div className="text-center mt-[2%]">
            <button type="submit" className="bg-black text-[#F5F2E9] text-xs active:scale-95 py-1 px-5 sm:py-2">{loading?"Loading...":"Login"}</button>
            </div>
        </form>
    </div>
  )
}

export default Login