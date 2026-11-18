import { LuCheck } from "react-icons/lu";

export const ATELIER_MATERIALS = [
  {
    id: "nilambur-teak",
    name: "Nilambur Teak",
    finish: "Natural Hand-Rubbed Oil",
    colorHex: "#B88448",
    accentBg: "bg-[#B88448]",
    description:
      "Harvested from seasoned Nilambur plantations. High natural oil content prevents moisture absorption in Kerala monsoons.",
  },
  {
    id: "smoked-ash",
    name: "Smoked Ash",
    finish: "Matte Architectural Pore",
    colorHex: "#3A3530",
    accentBg: "bg-[#3A3530]",
    description:
      "Deep espresso tone created through natural fuming. Pronounced straight grain with an ultra-matte architectural finish.",
  },
  {
    id: "boucle-timber",
    name: "Natural Bouclé",
    finish: "Heavyweight Tactile Loop",
    colorHex: "#E5DDD0",
    accentBg: "bg-[#E5DDD0]",
    description:
      "Unbleached textured loops woven from organic cotton and wool blends. Superior breathability and structural cushion resilience.",
  },
  {
    id: "bleached-rosewood",
    name: "Bleached Rosewood",
    finish: "Satin Organic Contour",
    colorHex: "#8A5A44",
    accentBg: "bg-[#8A5A44]",
    description:
      "Artisanal low-sheen contour revealing the intricate swirling grain of indigenous rosewood with zero yellowing.",
  },
];

export default function MaterialSelector({ selectedMaterial, onSelectMaterial }) {
  return (
    <div className="border-t border-stone-200 pt-6 space-y-4">
      <div className="flex items-baseline justify-between">
        <h4 className="font-sans text-[11px] uppercase tracking-[0.2em] text-stone-500 font-semibold">
          Artisanal Material Selection
        </h4>
        <span className="text-[11px] font-medium text-obsidian">
          {selectedMaterial?.name} &bull;{" "}
          <span className="text-stone-500 font-light">
            {selectedMaterial?.finish}
          </span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {ATELIER_MATERIALS.map((mat) => {
          const isSelected = selectedMaterial?.id === mat.id;
          return (
            <button
              key={mat.id}
              type="button"
              onClick={() => onSelectMaterial(mat)}
              className={`p-3 text-left border transition-all duration-300 relative ${
                isSelected
                  ? "border-obsidian bg-white"
                  : "border-stone-200 bg-canvas-subtle hover:border-stone-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-5 h-5 rounded-full border border-stone-300 ${mat.accentBg}`}
                />
                {isSelected && (
                  <LuCheck className="w-3.5 h-3.5 text-obsidian" />
                )}
              </div>
              <p className="font-serif text-xs text-obsidian font-normal line-clamp-1">
                {mat.name}
              </p>
              <p className="font-sans text-[10px] text-stone-500 uppercase tracking-wider line-clamp-1 mt-0.5">
                {mat.finish.split(" ")[0]}
              </p>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-stone-500 font-light leading-relaxed italic bg-canvas-subtle p-3 border border-stone-100">
        &quot;{selectedMaterial?.description}&quot;
      </p>
    </div>
  );
}
