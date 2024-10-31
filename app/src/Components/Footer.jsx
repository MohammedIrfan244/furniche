import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <div className="my-20 flex justify-between pt-5 border-t-2 border-[#544A3E] px-3">
        <div className="w-[40%] text-left">
          <h1
            className="font-serif text-sm sm:text-md md:text-lg"
            style={{ textShadow: "0 0 1px #000000" }}
          >
            Furniche
          </h1>
          <p className="text-[3%] sm:text-[5%] md:text-xs">
            At Furniche, we believe in delivering quality furniture that
            brings style and comfort to your home. With a commitment to
            exceptional craftsmanship and customer satisfaction, we make it easy
            to find pieces you’ll love for years to come.
          </p>
        </div>
        <div>
          <h1 className="text-[50%] sm:text-[80%] font-bold">CHECKOUT</h1>
          <ul className="flex flex-col mt-[5%]">
            <li className="text-[3%] sm:text-[5%] md:text-[60%]">
              <Link to={"/"}>HOME</Link>
            </li>
            <li className="text-[3%] sm:text-[5%] md:text-[60%]">
              <Link to={"/collection"}>COLLECTION</Link>
            </li>
            <li className="text-[3%] sm:text-[5%] md:text-[60%]">
              <Link to={"/contact"}>CONTACT</Link>
            </li>
            <li className="text-[3%] sm:text-[5%] md:text-[60%]">
              <Link to={"/about"}>ABOUT</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-[50%] sm:text-[80%] font-bold">GET IN TOUCH</h1>
          <ul className="flex flex-col mt-[5%]">
            <li className="text-[3%] sm:text-[5%] md:text-xs">
              +91 88915 55811
            </li>
            <li className="text-[3%] sm:text-[5%] md:text-xs">
              <Link to={"/contact"}>furniche@gmail.com</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center text-xs mb-2 font-bold">
        &copy; 2024 Furniche . All Rights Reserved
      </p>
    </>
  );
}

export default Footer;
