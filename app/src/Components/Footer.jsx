import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-blue-100 h-52">
      <div className="my-20 flex justify-between pt-5 px-3">
        <div className="w-[40%] text-left">
          <h1 className="font-poppins text-sm sm:text-md md:text-lg text-[#112558]">
            Furniche
          </h1>
          <p className="text-[3%] sm:text-[5%] md:text-xs text-[#333]">
            At Furniche, we believe in delivering quality furniture that brings
            style and comfort to your home. With a commitment to exceptional
            craftsmanship and customer satisfaction, we make it easy to find
            pieces you’ll love for years to come.
          </p>
        </div>
        <div>
          <h1 className="text-[50%] sm:text-[80%] font-bold text-[#112558]">
            CHECKOUT
          </h1>
          <ul className="flex flex-col mt-[5%]">
            <li className="text-[3%] sm:text-[5%] md:text-[60%] text-[#333]">
              <Link to={"/"}>HOME</Link>
            </li>
            <li className="text-[3%] sm:text-[5%] md:text-[60%] text-[#333]">
              <Link to={"/collection"}>COLLECTION</Link>
            </li>
            <li className="text-[3%] sm:text-[5%] md:text-[60%] text-[#333]">
              <Link to={"/contact"}>CONTACT</Link>
            </li>
            <li className="text-[3%] sm:text-[5%] md:text-[60%] text-[#333]">
              <Link to={"/about"}>ABOUT</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-[50%] sm:text-[80%] font-bold text-[#112558]">
            GET IN TOUCH
          </h1>
          <ul className="flex flex-col mt-[5%]">
            <li className="text-[3%] sm:text-[5%] md:text-xs text-[#333]">
              +91 88915 55811
            </li>
            <li className="text-[3%] sm:text-[5%] md:text-xs text-[#333]">
              <Link to={"/contact"}>furniche@gmail.com</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center text-xs mb-2 font-poppins font-semibold text-[#112558]">
        &copy; 2024 Furniche . All Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
