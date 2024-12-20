import { useEffect } from "react";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center pt-20 min-h-[100vh] bg-[#F9FCFA]">
      <h1 className="text-2xl sm:text-4xl font-poppins font-bold tracking-wide text-sofaBlue mb-10">
        About Us
      </h1>
      <div className="flex flex-col items-start w-full sm:w-[80%] md:w-[60%] bg-[#F9FCFA] shadow-md shadow-gray-400 p-6 ">
        <p className="text-sm sm:text-base text-gray-600">
          Welcome to Furniche, your destination for modern and stylish
          e-commerce shopping. We pride ourselves on offering a carefully
          curated selection of products from a variety of reputable brand
          companies, ensuring that you find only the best for your home. In
          addition to showcasing exceptional brands, we are excited to present
          our exclusive line of furniture and decor under our &quot;In-House
          Design&quot; label, which embodies our commitment to quality and
          design innovation.
        </p>
        <p className="text-sm sm:text-base text-gray-600 mt-4">
          At Furniche, we believe that furniture should not only be functional
          but also reflect your personal style. Our collection combines classic
          sophistication with modern trends, helping you create a space that
          feels like home. We prioritize eco-friendly materials and sustainable
          practices in both our curated brands and our In-House Design products,
          so you can shop with confidence knowing that your choices support a
          healthier planet.
        </p>
        <p className="text-sm sm:text-base text-gray-600 mt-4">
          Join us in transforming your living spaces into places of comfort and
          inspiration, and experience the perfect blend of quality, style, and
          sustainability with Furniche.
        </p>
        <p className="text-sm sm:text-base text-gray-600 mt-4">
          Thank you for choosing Furniche to furnish your homes. Your support
          means the world to us and helps promote a more sustainable future.
        </p>
      </div>
    </div>
  );
}

export default About;
