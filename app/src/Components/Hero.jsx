import { faShop } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
 

function Hero() {
  return (
      <div className="flex flex-col sm:flex-row w-[100%] border-2 border-gray-200 shadow-lg overflow-hidden rounded-[5px]">
    <div className="w-[100%] sm:w-[50%] flex items-center justify-center">
      <div className="flex flex-col gap-9 p-10">
      <p className="flex items-baseline text-xl"><hr className="bg-[#D65F0D] h-[3px] w-[20%]"/>. Settle.com .</p>
      <p className="text-3xl">Where Design Meets Comfort
      </p>
      <Link to={'/login'} className=" flex items-baseline"><FontAwesomeIcon className="text-[#D65F0D]" icon={faShop}/>. Shop now .<hr className="bg-[#D65F0D] h-[3px] w-[15%]"/></Link>
      </div>
    </div>
    <div className="w-[100%] sm:w-[50%] overflow-hidden">
      <img className="hover:scale-[1.01] transition duration-500 ease-in-out" src="https://media.istockphoto.com/id/1212526330/photo/bohemian-living-room-interior-3d-render.jpg?s=612x612&w=0&k=20&c=iIQ5wqa4NYpLn0YJvT_NAzMilwTFkTlprwbXAasOn9s=" alt="image" />
    </div>
    </div>
  )
}

export default Hero