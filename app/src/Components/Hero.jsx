
 

function Hero({children,source}) {
  return (
      <div className="flex flex-col-reverse sm:flex-row w-[100%] overflow-hidden ">
    <div className="w-[100%] sm:w-[50%] overflow-hidden">
      <img className="hover:scale-[1.01] transition duration-500 ease-in-out" src={source} alt="image" />
    </div>
        {children}
    </div>
  )
}

export default Hero