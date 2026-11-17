import { useEffect } from "react";
import ScrollTop from "../utilities/ScrollTop";
import { LuSparkles, LuCompass, LuShield } from "react-icons/lu";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-canvas text-obsidian">
      {/* Editorial Hero Header */}
      <section className="pt-28 sm:pt-36 pb-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block">
            Atelier Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-obsidian font-normal tracking-tight leading-[1.15]">
            Crafting spaces of enduring calm and honest materiality.
          </h1>
        </div>
      </section>

      {/* Narrative & Atelier Manifesto */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-stone-200/80 pt-12">
          {/* Left Column: Mission Quote */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-obsidian font-normal leading-snug">
              &quot;We believe furniture should not merely occupy volume, but actively cultivate serenity.&quot;
            </h2>
            <div className="w-12 h-0.5 bg-champagne" />
            <p className="text-xs uppercase tracking-widest text-stone-400 font-medium">
              Furniche Design Council
            </p>
          </div>

          {/* Right Column: In-Depth Editorial Text */}
          <div className="lg:col-span-7 space-y-6 text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
            <p>
              Welcome to Furniche, an interior design atelier and curated furniture house. We pride ourselves on cultivating an uncompromising standard of modern furniture design, bringing together bespoke silhouettes from distinguished makers alongside our signature In-House Atelier collections.
            </p>
            <p>
              Every object in our collection is evaluated through three core criteria: structural honesty, sculptural proportion, and tactile nobility. By selecting sustainably harvested hardwoods, untreated textural bouclé, and solid brushed brass accents, we create pieces intended to develop character as they age.
            </p>
            <p>
              Our In-House Design line embodies our studio’s dedication to quiet luxury—stripping away visual noise and unnecessary ornamentation to reveal the intrinsic beauty of elemental geometry and refined joinery.
            </p>
          </div>
        </div>

        {/* Three Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-stone-200/80">
          <div className="bg-white p-8 border border-stone-200/70 space-y-4 shadow-sm">
            <LuSparkles className="w-5 h-5 text-champagne" strokeWidth={1.5} />
            <h3 className="font-serif text-xl text-obsidian font-normal">
              In-House Atelier Craft
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Exclusively developed within our private studio, every original piece undergoes rigorous spatial testing to ensure optimal ergonomic comfort and silhouette grace.
            </p>
          </div>

          <div className="bg-white p-8 border border-stone-200/70 space-y-4 shadow-sm">
            <LuCompass className="w-5 h-5 text-champagne" strokeWidth={1.5} />
            <h3 className="font-serif text-xl text-obsidian font-normal">
              Conscious Materiality
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              We partner solely with certified timber conservancies and responsible textile mills, upholding circular stewardship across our manufacturing lifecycle.
            </p>
          </div>

          <div className="bg-white p-8 border border-stone-200/70 space-y-4 shadow-sm">
            <LuShield className="w-5 h-5 text-champagne" strokeWidth={1.5} />
            <h3 className="font-serif text-xl text-obsidian font-normal">
              Generational Integrity
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Constructed with mortise-and-tenon craftsmanship and resilient finishes, Furniche furniture is crafted to endure generations of daily living.
            </p>
          </div>
        </div>
      </section>

      <ScrollTop />
    </div>
  );
}

export default About;
