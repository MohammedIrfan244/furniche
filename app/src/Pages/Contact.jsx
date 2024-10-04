import Hero from "../Components/Hero"
import { useState } from "react";
import emailjs from 'emailjs-com' 


function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const sendMail=(e)=>{
    e.preventDefault()

    emailjs.send('service_5mpp4sr', 'template_pv9suw1', formData, '_VNHLR1ntbZuSJLEc')
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text)
      alert('Message sent successfully!')
    }, (err) => {
      console.log('FAILED...', err)
      alert('Failed to send message. Please try again.')
    })
    setFormData({
      name: '',
      email: '',
      message: ''
    })
  }
 
  return (
    <form onSubmit={sendMail} className="pt-[30%] sm:pt-[10%]">
    <Hero source={"https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-deb711d/www.decorilla.com/online-decorating/wp-content/uploads/2022/07/bohemian-interior-design-feature-2-1536x861.jpeg"}>
    <div className="w-[100%] sm:w-[50%] flex flex-col justify-evenly gap-[30px] items-center py-[5%] sm:py-2">
    <h1 className="flex items-baseline text-l sm:text-xl">CONTACT US <hr className="w-10 h-[3px] bg-[#A47C48]" /></h1>
      <input name="name" value={formData.name} required onChange={(e)=>setFormData({...formData,["name"]:e.target.value})} className="w-[90%] text-xs border-2 border-[#1C1C1C] px-3 sm:py-1 focus:outline-none" type="text" placeholder="Username" />
      <input name="email" value={formData.email} required  onChange={(e)=>setFormData({...formData,["email"]:e.target.value})} className="w-[90%] text-xs border-2 border-[#1C1C1C] px-3 sm:py-1 focus:outline-none" type="email" placeholder="Email" />
      <textarea placeholder="Your message..." name="message" value={formData.message} required onChange={(e)=>setFormData({...formData,["message"]:e.target.value})} className="w-[90%] text-xs border-2 border-[#1C1C1C] px-3 sm:py-1 focus:outline-none"></textarea>
      <button type="submit" className="bg-black text-[#F5F2E9] text-xs active:scale-95 px-5 py-1 sm:py-2">Send</button>
    </div>
    </Hero>
    </form>
  )
}

export default Contact