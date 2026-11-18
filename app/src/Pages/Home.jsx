import { useEffect } from "react";
import NewCollection from "../Components/NewCollection";
import OriginalProducts from "../Components/OriginalProducts";
import LookbookSection from "../Components/LookbookSection";
import ScrollTop from "../utilities/ScrollTop";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { LuArrowRight } from "react-icons/lu";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-canvas overflow-hidden">
      {/* Editorial Atelier Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Hero Imagery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/4] overflow-hidden bg-stone-200"
          >
            <img
              className="w-full h-full object-cover transition duration-1000 ease-out hover:scale-105"
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
              alt="Furniche Living Space"
            />
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>

          {/* Hero Typography & CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:pl-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block mb-3">
                Architectural Furniture & Living
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-obsidian font-normal tracking-tight leading-[1.12]">
                Quiet Luxury, <br />
                <span className="italic font-light">Honest Materials.</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed max-w-lg"
            >
              Curated furniture designed to bring enduring poise and understated balance to contemporary spaces. Handcrafted silhouettes, tactile textures, and architectural clarity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-2"
            >
              <button
                onClick={() => navigate("/collection")}
                className="group inline-flex items-center gap-3 bg-obsidian text-canvas px-7 py-3.5 text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 hover:bg-stone-800"
              >
                <span>Explore Collection</span>
                <LuArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-champagne" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Minimalist Hairline Horizon */}
        <div className="w-full h-px bg-stone-200/80 mt-16 sm:mt-24" />
      </section>

      {/* Product Showcase Sections */}
      <NewCollection />
      <OriginalProducts />

      {/* Interactive Architectural Lookbook */}
      <LookbookSection />

      <ScrollTop />
    </div>
  );
}

export default Home;
