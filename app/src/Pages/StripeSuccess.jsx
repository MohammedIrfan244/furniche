import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Cookies from "js-cookie"

function StripeSuccess() {
    const {sessionId}=useParams()

    const [message,setMessage]=useState("")
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        setLoading(true)
        const token=Cookies.get('token')
    axios.put(`http://localhost:3001/api/users/orders/stripe/success/${sessionId}`,{},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res)=>{
        setLoading(false)
        setMessage(res.data.message)
    })
    .catch((err)=>{
        setLoading(false)
        setMessage(err.response.data.message)
    })
    },[sessionId])
  return (
    <div className="flex h-[100vh] justify-center items-center">
        <p>hello world</p>
        {loading?"loading...":<h1>Success {sessionId}</h1>}
        <p>{message}</p>
      
    </div>
  )
}

export default StripeSuccess
