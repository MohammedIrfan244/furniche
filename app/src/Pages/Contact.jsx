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
    <form onSubmit={sendMail} className="pt-[10%]">
    <Hero source={"https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-deb711d/www.decorilla.com/online-decorating/wp-content/uploads/2022/07/bohemian-interior-design-feature-2-1536x861.jpeg"}>
    <div className="w-[100%] sm:w-[50%] flex flex-col justify-evenly gap-[30px] items-center py-[5%] sm:py-2">
      <input name="name" value={formData.name} required onChange={(e)=>setFormData({...formData,["name"]:e.target.value})} className="w-[90%] text-xs border-2 border-[#3B3A36] px-3 sm:py-1 focus:outline-none" type="text" placeholder="Username" />
      <input name="email" value={formData.email} required  onChange={(e)=>setFormData({...formData,["email"]:e.target.value})} className="w-[90%] text-xs border-2 border-[#3B3A36] px-3 sm:py-1 focus:outline-none" type="email" placeholder="Email" />
      <textarea placeholder="Your message..." name="message" value={formData.message} required onChange={(e)=>setFormData({...formData,["message"]:e.target.value})} className="w-[90%] text-xs border-2 border-[#3B3A36] px-3 sm:py-1 focus:outline-none"></textarea>
      <button type="submit" className="border shadow-md border-gray-300 active:scale-95 px-3 sm:py-1">Submit</button>
    </div>
    </Hero>
    </form>
  )
}

export default Contact