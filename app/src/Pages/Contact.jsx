import Hero from "../Components/Hero"


function Contact() {
  return (
    <div className="mt-[5%]">
    <Hero source={"https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-deb711d/www.decorilla.com/online-decorating/wp-content/uploads/2022/07/bohemian-interior-design-feature-2-1536x861.jpeg"}>
    <div className="w-[100%] sm:w-[50%] flex flex-col justify-evenly gap-[30px] items-center py-[5%] sm:py-2">
      <input className="w-[90%] text-xs border shadow-md border-gray-300 rounded-md px-3 sm:py-1 focus:outline-none" type="text" placeholder="Username" />
      <input className="w-[90%] text-xs border shadow-md border-gray-300 rounded-md px-3 sm:py-1 focus:outline-none" type="email" placeholder="Email" />
      <textarea className="w-[90%] text-xs border shadow-md border-gray-300 rounded-md px-3 sm:py-1 focus:outline-none"></textarea>
      <button className="border shadow-md border-gray-300 rounded-md px-3 sm:py-1">Submit</button>
    </div>
    </Hero>
    </div>
  )
}

export default Contact