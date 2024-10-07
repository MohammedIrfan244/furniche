
import Logo from "/src/assets/FinalLogo.png";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <>
    <div className="my-20 flex justify-between pt-5 border-t-2 border-[#a47c48]">
      <div className="w-[40%] text-left">
        <img className="w-[60%] sm:w-[30%] Logo" src={Logo} alt="logo" />
        <p className="text-[3%] sm:text-[5%] md:text-xs px-[1%]">
          At Settle.com, we believe in delivering quality furniture that brings
          style and comfort to your home. With a commitment to exceptional
          craftsmanship and customer satisfaction, we make it easy to find
          pieces you’ll love for years to come.
        </p>
      </div>
      <div>
        <h1 className="text-[50%] sm:text-[80%] md:text-[80%]">CHECKOUT</h1>
        <ul className="flex flex-col mt-[5%] gap-1">
        <li className="text-[3%] sm:text-[5%] md:text-[60%]"><Link to={'/'}>HOME</Link></li>
        <li className="text-[3%] sm:text-[5%] md:text-[60%]"><Link to={'/collection'}>COLLECTION</Link></li>
        <li className="text-[3%] sm:text-[5%] md:text-[60%]"><Link to={'/contact'}>CONTACT</Link></li>
        <li className="text-[3%] sm:text-[5%] md:text-[60%]"><Link to={'/about'}>ABOUT</Link></li>
        </ul>
      </div>
      <div>
        <h1 className="text-[50%] sm:text-[80%] md:text-[80%]">GET IN TOUCH</h1>
        <ul className="flex flex-col mt-[5%] gap-1">
        <li className="text-[3%] sm:text-[5%] md:text-xs">+91 88915 55811</li>
        <li className="text-[3%] sm:text-[5%] md:text-xs"><Link to={'/contact'}>settlecom@gmail.com</Link></li>
        </ul>
      </div>
    </div>
    <p className="text-center text-xs mb-2">&copy; 2024 Settle.com . All Rights Reserved</p>
    </>
  );
}

export default Footer;
