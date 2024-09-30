// import { faShop } from "@fortawesome/free-solid-svg-icons"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { Link } from "react-router-dom"
 

function Hero({children,source}) {
  return (
      <div className="flex flex-col sm:flex-row w-[100%] border-2 border-gray-200 shadow-lg overflow-hidden rounded-[5px]">
        {children}
    <div className="w-[100%] sm:w-[50%] overflow-hidden">
      <img className="hover:scale-[1.01] transition duration-500 ease-in-out" src={source} alt="image" />
    </div>
    </div>
  )
}

export default Hero