import { useState } from "react";
import { Link } from "react-router-dom";
import { LuPlus, LuArrowRight, LuEye } from "react-icons/lu";

const LOOKBOOK_SCENES = [
  {
    id: "calicut-courtyard",
    title: "The Malabar Courtyard Living",
    location: "Nadakkavu, Calicut",
    architecture: "Traditional-Modern Courtyard Residence",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    description:
      "Designed around open-to-sky light wells and natural sea breezes. Low-slung silhouettes allow uninterrupted views across the inner court.",
    hotspots: [
      {
        id: "hs-1",
        top: "62%",
        left: "38%",
        name: "Minimalist Lounge Chair",
        material: "Nilambur Teak & Bouclé",
        price: "28,500",
        link: "/collection",
      },
      {
        id: "hs-2",
        top: "70%",
        left: "68%",
        name: "Solid Ash Low Table",
        material: "Hand-Rubbed Natural Oil",
        price: "19,200",
        link: "/collection",
      },
    ],
  },
  {
    id: "kochi-waterfront",
    title: "The Waterfront Solarium",
    location: "Marine Drive, Kochi",
    architecture: "Contemporary Penthouse Sanctuary",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
    description:
      "Framing panoramic backwater horizons with muted tactile bouclé, fluted timber partitions, and architectural restraint.",
    hotspots: [
      {
        id: "hs-3",
        top: "58%",
        left: "48%",
        name: "Atelier Modular Sectional",
        material: "Breathable Organic Weave",
        price: "64,000",
        link: "/collection",
      },
      {
        id: "hs-4",
        top: "42%",
        left: "82%",
        name: "Architectural Console",
        material: "Smoked Ash & Teak",
        price: "32,000",
        link: "/collection",
      },
    ],
  },
  {
    id: "trivandrum-heritage",
    title: "The Kowdiar Heritage Verandah",
    location: "Kowdiar, Thiruvananthapuram",
    architecture: "Restored Travancore Villa",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
    description:
      "A dialogue between classical Kerala red oxide masonry and pared-down modern furniture. Serene stillness in every corner.",
    hotspots: [
      {
        id: "hs-5",
        top: "65%",
        left: "30%",
        name: "Sculpted Timber Bench",
        material: "Nilambur Oiled Teak",
        price: "24,800",
        link: "/collection",
      },
      {
        id: "hs-6",
        top: "50%",
        left: "72%",
        name: "Curator Accent Lamp & Table",
        material: "Bleached Rosewood",
        price: "16,500",
        link: "/collection",
      },
    ],
  },
];

export default function LookbookSection() {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const scene = LOOKBOOK_SCENES[activeSceneIndex];

  return (
    <section className="w-full py-24 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-xl">
            <span className="font-sans text-[11px] uppercase tracking-[0.24em] text-champagne font-semibold block">
              Spaces & Atmosphere
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-obsidian font-normal tracking-tight">
              The Atelier Lookbook
            </h2>
            <p className="font-sans text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              Explore Furniche craftsmanship in real Kerala architectural homes. Tap the markers to inspect individual pieces and materials.
            </p>
          </div>

          {/* Scene Switcher Tabs */}
          <div className="flex flex-wrap gap-2 border border-stone-200 p-1 bg-canvas-subtle">
            {LOOKBOOK_SCENES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setActiveHotspot(null);
                }}
                className={`px-3.5 py-2 text-[11px] uppercase tracking-wider font-medium transition ${
                  activeSceneIndex === idx
                    ? "bg-obsidian text-canvas shadow-sm"
                    : "text-stone-600 hover:text-obsidian"
                }`}
              >
                {s.location.split(",")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Stage with Hotspots */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full border border-stone-200 overflow-hidden bg-stone-100">
          <img
            src={scene.image}
            alt={scene.title}
            className="w-full h-full object-cover transition-opacity duration-700"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent pointer-events-none" />

          {/* Scene Title in corner */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-canvas pointer-events-auto">
            <div className="space-y-1">
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-champagne font-medium block">
                {scene.location} &bull; {scene.architecture}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal">
                {scene.title}
              </h3>
              <p className="text-xs text-stone-300 font-light max-w-md hidden sm:block">
                {scene.description}
              </p>
            </div>

            <Link
              to="/collection"
              className="inline-flex items-center gap-2 bg-canvas/90 backdrop-blur-sm text-obsidian px-4 py-2 text-[11px] uppercase tracking-widest font-medium hover:bg-canvas transition w-fit"
            >
              <span>Explore Collection</span>
              <LuArrowRight className="w-3.5 h-3.5 text-champagne" />
            </Link>
          </div>

          {/* Interactive Hotspot Pins */}
          {scene.hotspots.map((hs, index) => {
            const isOpened = activeHotspot?.id === hs.id;
            return (
              <div
                key={hs.id}
                style={{ top: hs.top, left: hs.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button
                  type="button"
                  onClick={() => setActiveHotspot(isOpened ? null : hs)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-sans text-xs font-semibold transition-all duration-300 shadow-md ${
                    isOpened
                      ? "bg-champagne text-obsidian scale-110"
                      : "bg-white/90 backdrop-blur-sm text-obsidian hover:bg-white hover:scale-110"
                  }`}
                  aria-label={`Inspect ${hs.name}`}
                >
                  {isOpened ? <LuEye className="w-3.5 h-3.5" /> : index + 1}
                </button>

                {/* Hotspot Floating Popover */}
                {isOpened && (
                  <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-56 bg-white border border-stone-200 p-3.5 shadow-lg space-y-2 animate-fadeIn z-30">
                    <div className="space-y-0.5">
                      <span className="font-sans text-[9px] uppercase tracking-widest text-champagne font-semibold block">
                        Featured Piece
                      </span>
                      <h4 className="font-serif text-sm text-obsidian font-normal">
                        {hs.name}
                      </h4>
                      <p className="font-sans text-[10px] text-stone-500">
                        {hs.material}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                      <span className="font-sans text-xs font-semibold text-obsidian">
                        ₹ {hs.price}
                      </span>
                      <Link
                        to={hs.link}
                        className="text-[10px] uppercase tracking-wider text-champagne hover:text-obsidian font-semibold transition inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <LuArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
