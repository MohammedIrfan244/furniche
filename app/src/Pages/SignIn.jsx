import axios from "axios"
import { useContext, useState } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function SignIn() {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
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
            alert("User Registered")
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
    <div className="pt-[10%]">
        <form onSubmit={handleSubmit}>
            <input required value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="username" />
            <input required value={email} type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="email"/>
            <input required value={password} type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
            <button type="submit">{loading?"Registering...":"Register"}</button>
            <Link to={'/login'}>Login</Link>
        </form>
    </div>
  )
}

export default SignIn