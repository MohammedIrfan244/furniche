import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisible = () => {
    if (window.scrollY > innerHeight * 0.5) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);
  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 hover:scale-[1.1] transition duration-200 ease-in-out right-[48.5%] opacity-80 text-[#000000] bg-[#F9FCFA] text-xs font-bold px-3 py-1 rounded-[50px] cursor-pointer z-20"
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
    </div>
  );
}

export default ScrollTop;
