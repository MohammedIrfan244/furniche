
 

// eslint-disable-next-line react/prop-types
function Hero({children,source}) {
  return (
      <div className="flex flex-col sm:flex-row w-[100%] overflow-hidden ">
    <div className="w-[100%] sm:w-[50%] overflow-hidden">
      <img className="hover:scale-[1.01] transition duration-500 ease-in-out Logo" src={source} alt="image" />
    </div>
        {children}
    </div>
  )
}

export default Hero