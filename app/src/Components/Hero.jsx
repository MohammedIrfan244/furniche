

function Hero() {
  return (
      <div className="flex flex-col sm:flex-row w-[100%] border-2 border-gray-200 shadow-lg">
    <div className="w-[100%] sm:w-[50%]">
      <img src="https://media.istockphoto.com/id/1212526330/photo/bohemian-living-room-interior-3d-render.jpg?s=612x612&w=0&k=20&c=iIQ5wqa4NYpLn0YJvT_NAzMilwTFkTlprwbXAasOn9s=" alt="image" />
    </div>
    <div className="w-[100%] sm:w-[50%] flex items-center justify-center">
      <div className="flex flex-col gap-6 p-10">
      <p className="flex items-baseline"><hr className="bg-[#1F1F1F] h-[3px] w-[20%]"/>. Settle.com</p>
      <p className="text-3xl">Where Design Meets Comfort
      </p>
      <p className="flex items-baseline">Shop now .<hr className="bg-[#1F1F1F] h-[3px] w-[20%]"/></p>
      </div>
    </div>
    </div>
  )
}

export default Hero