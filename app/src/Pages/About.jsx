import AboutBackGround from "../assets/AboutPage.png";

function About() {
  return (
    <div
      className="w-[100%] h-[100vh] pt-[26%] sm:pt-[8%] bg-center bg-cover flex flex-col items-center shadow-md shadow-[#000000]"
      style={{ backgroundImage: `url(${AboutBackGround})` }}
    >
      <div className="flex flex-col w-full sm:w-[70%] md:[60%] items-start px-5">
        <h1
          className="text-xl sm:text-2xl font-serif tracking-wide underline ps-5"
          style={{ textShadow: "0 0 1px #000000" }}
        >
          ABOUT US
        </h1>
        <div className="mt-3 md:mt-5 text-xs sm:text-sm md:text-base lg:mt-10 bg-[rgba(215,210,201,0.5)] backdrop-blur-sm p-5 rounded-lg">
          <p>
            Welcome to Settle.com, your destination for modern and stylish
            e-commerce shopping. We pride ourselves on offering a carefully
            curated selection of products from a variety of reputable brand
            companies, ensuring that you find only the best for your home. In
            addition to showcasing exceptional brands, we are excited to present
            our exclusive line of furniture and decor under our &quot;In-House
            Design&quot; label, which embodies our commitment to quality and
            design innovation. At Settle, we believe that furniture should not
            only be functional but also reflect your personal style. Our
            collection combines classic sophistication with modern trends,
            helping you create a space that feels like home. We prioritize
            eco-friendly materials and sustainable practices in both our curated
            brands and our In-House Design products, so you can shop with
            confidence knowing that your choices support a healthier planet.
            Join us in transforming your living spaces into places of comfort
            and inspiration, and experience the perfect blend of quality, style,
            and sustainability with Settle.com.
          </p>
          <p className="mt-4">
            Thank you for choosing Settle.com to furnish your homes. Your
            support means the world to us and helps promote a more sustainable
            future.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
