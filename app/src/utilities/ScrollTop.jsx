import { LuArrowUp } from "react-icons/lu";
import { useEffect, useState } from "react";

function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisible = () => {
    if (window.scrollY > window.innerHeight * 0.4) {
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

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-6 sm:right-8 z-30 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 text-obsidian flex items-center justify-center shadow-atelier hover:border-obsidian hover:shadow-atelier-hover hover:scale-105 transition-all duration-300"
    >
      <LuArrowUp className="w-4 h-4 text-obsidian" strokeWidth={1.5} />
    </button>
  );
}

export default ScrollTop;
