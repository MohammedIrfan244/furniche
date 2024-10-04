import axios from "axios"
import { useContext, useState } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

function SignIn() {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[passToggle,setPassToggle]=useState(false)
    const{products}=useContext(ShopContext)
    const navigate=useNavigate()
    const[loading,setLoading]=useState(false)
    
    const defaulCart=(Parray)=>{
      let cart={}
      Parray.forEach(item=>{
          cart[item.id]=0
      })
      return cart
  }

    const data={
        name: name,
        email: email,
        password: password,
        cart:defaulCart(products)
      }
      

    const handleSubmit=(e)=>{
        e.preventDefault()
        setLoading(true)
        axios.get("http://localhost:3000/users")
        .then((response)=>{
          const users=response.data
          users.some(item=>item.email==email)?alert("User already exists"):name.trim()==""||password.trim()==""?alert("Name or Password can't be empty")
          :axios.post("http://localhost:3000/users",data)
          .then(()=>{
            alert("You have been registered")
          })
          .catch((err)=>console.log(err))
        })
        .catch((err)=>console.log(err))
        .finally(()=>{
          navigate('/login')
          setLoading(false)
        })
    }
  return (
    <div className="w-[100%] flex flex-col items-center pt-[30%] sm:pt-[10%]">
      <h1 className="flex items-baseline text-l sm:text-xl">SIGN UP <hr className="w-10 h-[3px] bg-[#A47C48]" /></h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] mt-[10%] sm:mt-[3%]">
            <input required value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="username" className="focus:outline-none border-2 border-[#1C1C1C] px-[3%] py-[2%] text-xs"/>
            <input required value={email} type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="email" className="focus:outline-none border-2 border-[#1C1C1C] px-[3%] py-[2%] text-xs mt-[3%]"/>
            <div className="min-w-1 relative">
            <input required value={password} type={`${passToggle?"text":"password"}`} onChange={(e)=>setPassword(e.target.value)} placeholder="password" className="focus:outline-none border-2 border-[#1C1C1C] px-[3%] py-[2%] text-xs mt-[3%] w-[100%]"/>
            <FontAwesomeIcon className="text-xs absolute bottom-2 right-2" onClick={()=>setPassToggle(!passToggle)} icon={passToggle?faEyeSlash:faEye}/>
            </div>
            <Link className="text-xs block" to={'/login'}>Already have an account?</Link>
            <div className="text-center mt-[2%]">
            <button type="submit" className="bg-black text-[#F5F2E9] text-xs active:scale-95 py-1 px-5 sm:py-2">{loading?"Registering...":"Register"}</button>
            </div>
        </form>
    </div>
  )
}

export default SignIn