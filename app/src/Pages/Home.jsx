import Hero from "../Components/Hero"
import NewCollection from "../Components/NewCollection"
import OriginalProducts from "../Components/OriginalProducts"
import OurPolicy from "../Components/OurPolicy"


function Home() {
  return (
    <div className=" pt-[5%]">
    <Hero/>
    <NewCollection/>
    <OriginalProducts/>
    <OurPolicy/>
    </div>
  )
}

export default Home