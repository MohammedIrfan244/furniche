import axios from "axios"
import { useContext, useState } from "react"
import { ShopContext } from "../Contexts/ShopContext"


function SignIn() {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const{products,setCartItems}=useContext(ShopContext)
    
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
        axios.get("http://localhost:3000/users")
        .then((response)=>{
          const users=response.data
          users.some(item=>item.email==email)?alert("User already exists"):name.trim()==""||password.trim()==""?alert("Name or Password cant be empty")
          :axios.post("http://localhost:3000/users",data)
          .then(()=>{
            alert("User Added")
            setCartItems(defaulCart(products))
          })
          .catch((err)=>console.log(err))
        })
        .catch((err)=>console.log(err))
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input required value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="username" />
            <input required value={email} type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="email"/>
            <input required value={password} type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
            <button type="submit">Register</button>
        </form>
    </div>
  )
}

export default SignIn