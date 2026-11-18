import { useState } from "react";
import { LuTruck, LuMapPin, LuCheck, LuArrowRight } from "react-icons/lu";
import axios from "axios";

export default function PincodeEstimator() {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [error, setError] = useState("");

  const handleCheck = async (e) => {
    e.preventDefault();
    setError("");

    const cleaned = pincode.trim();
    if (!/^\d{6}$/.test(cleaned)) {
      setError("Please enter a valid 6-digit postal code");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/public/pincode/${cleaned}`
      );
      if (res.data?.data) {
        setEstimate(res.data.data);
      }
    } catch (err) {
      // Graceful client fallback for Kerala region
      const numPin = parseInt(cleaned, 10);
      const isKerala = numPin >= 670001 && numPin <= 695615;
      const targetDate = new Date();
      const days = isKerala ? 3 : 5;
      targetDate.setDate(targetDate.getDate() + days);

      setEstimate({
        pincode: cleaned,
        isKerala,
        district: isKerala ? "Kerala Regional Zone" : "National Delivery Zone",
        hub: isKerala ? "Kochi Central Atelier Logistics" : "Pan-India Freight",
        estimatedDeliveryDate: targetDate.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
        days,
        service: "Complimentary White-Glove Installation Included",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-stone-200 bg-white p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-obsidian">
          <LuTruck className="w-4 h-4 text-champagne" />
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-obsidian">
            Kerala & Regional Logistics
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-champagne font-medium">
          White-Glove Service
        </span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-grow">
          <LuMapPin className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            maxLength={6}
            placeholder="Enter Pincode (e.g. 682001, 695001)"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value.replace(/\D/g, ""));
              if (error) setError("");
            }}
            className="w-full bg-canvas-subtle border border-stone-200 pl-8 pr-3 py-2 text-xs text-obsidian focus:outline-none focus:border-obsidian transition placeholder:text-stone-400"
          />
        </div>
        <button
          type="submit"
          disabled={loading || pincode.length !== 6}
          className="bg-obsidian text-canvas px-4 py-2 text-[11px] uppercase tracking-wider font-medium hover:bg-stone-800 transition disabled:opacity-40 shrink-0 inline-flex items-center gap-1.5"
        >
          {loading ? (
            <span>Estimating...</span>
          ) : (
            <>
              <span>Verify</span>
              <LuArrowRight className="w-3 h-3 text-champagne" />
            </>
          )}
        </button>
      </form>

      {error && <p className="text-[11px] text-red-500 font-light">{error}</p>}

      {estimate && (
        <div className="pt-2 border-t border-stone-100 space-y-1.5 animate-fadeIn">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-obsidian">
                Delivering to: <span className="font-semibold">{estimate.district}</span>
              </p>
              <p className="text-[11px] text-stone-500 font-light">
                Dispatched via {estimate.hub}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-champagne bg-stone-50 border border-stone-200 px-2 py-0.5 whitespace-nowrap">
              {estimate.estimatedDeliveryDate}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-stone-600 pt-1">
            <LuCheck className="w-3.5 h-3.5 text-champagne shrink-0" />
            <span>{estimate.service}</span>
          </div>
        </div>
      )}
    </div>
  );
}
