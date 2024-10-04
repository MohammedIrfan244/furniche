import Hero from "../Components/Hero"

function About() {

  return (
    <div className="pt-[30%] sm:pt-[10%]">
    <Hero source={"https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-deb711d/www.decorilla.com/online-decorating/wp-content/uploads/2020/01/Calming-bohemian-interior-design-living-room.jpeg"}>
      <div className="w-[100%] sm:w-[50%] p-5 flex flex-col justify-evenly">
      <h1 className="flex items-baseline text-l sm:text-xl">ABOUT US <hr className="w-10 h-[3px] bg-[#A47C48]" /></h1>
        <br />
        <p className="text-xs sm:text-[90%] leading-relaxed">Welcome to Settle.com, your go-to destination for stylish and functional furniture that enhances your living space. As a dedicated furniture e-commerce platform, we offer a carefully curated selection of high-quality pieces designed to suit every style and budget. Our collection ranges from contemporary designs to timeless classics, ensuring that you find the perfect fit for your home. We prioritize sustainability by sourcing materials responsibly and focusing on craftsmanship, so you can enjoy beautiful furniture that stands the test of time. At Settle.com, we are committed to providing exceptional customer service and helping you create the home of your dreams. Thank you for choosing us to be a part of your journey!</p>
      </div>
    </Hero>
    </div>
  )
}

export default About