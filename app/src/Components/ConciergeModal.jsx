import { useState } from "react";
import { LuX, LuShieldCheck, LuSparkles, LuPhone, LuSend, LuCheck } from "react-icons/lu";
import axios from "axios";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";

const KERALA_DISTRICTS = [
  "Ernakulam (Kochi)",
  "Thiruvananthapuram",
  "Kozhikode (Calicut)",
  "Thrissur",
  "Kottayam",
  "Wayanad",
  "Kannur",
  "Malappuram",
  "Palakkad",
  "Alappuzha",
  "Kollam",
  "Idukki",
  "Pathanamthitta",
  "Kasaragod",
];

const SPACE_TYPES = [
  "Living Room & Lounge",
  "Dining & Culinary Space",
  "Master Bedroom Sanctuary",
  "Architectural Penthouse",
  "Full Residence Interior",
  "Executive Office / Studio",
];

const MATERIAL_PREFERENCES = [
  "Nilambur Teak (Natural Oiled)",
  "Smoked Ash & Raw Linen",
  "Tactile Bouclé & Solid Oak",
  "Bleached Rosewood Finish",
  "Bespoke Material Curation",
];

export default function ConciergeModal({ isOpen, onClose, defaultProduct = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    district: "Ernakulam (Kochi)",
    spaceType: "Living Room & Lounge",
    preferredMaterial: "Nilambur Teak (Natural Oiled)",
    notes: defaultProduct ? `Inquiring regarding piece: ${defaultProduct}` : "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Please provide client name and telephone contact");
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/public/consultations`,
        formData
      );

      const ref = response.data?.data?._id || `AT-${Date.now().toString().slice(-6)}`;
      setReferenceId(ref);
      setSubmitted(true);
      toast.success("Consultation request received by Atelier Concierge");
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      district: "Ernakulam (Kochi)",
      spaceType: "Living Room & Lounge",
      preferredMaterial: "Nilambur Teak (Natural Oiled)",
      notes: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-canvas border border-stone-200 max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-stone-400 hover:text-obsidian p-1 transition-colors"
          aria-label="Close"
        >
          <LuX className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5 border-b border-stone-200 pb-4">
              <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-champagne font-semibold block">
                Bespoke Atelier Advisory
              </span>
              <h3 className="font-serif text-2xl text-obsidian font-normal">
                Request Private Consultation
              </h3>
              <p className="font-sans text-xs text-stone-600 font-light">
                Our in-house architects and timber craftsmen provide personalized advice on floor layouts, bespoke finishes, and on-site inspection across Kerala.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-medium mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ar. Rahul Menon"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white border border-stone-200 px-3 py-2.5 text-xs text-obsidian focus:outline-none focus:border-obsidian transition"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-medium mb-1">
                  Telephone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98470 XXXXX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-white border border-stone-200 px-3 py-2.5 text-xs text-obsidian focus:outline-none focus:border-obsidian transition"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-medium mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="client@residence.in"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white border border-stone-200 px-3 py-2.5 text-xs text-obsidian focus:outline-none focus:border-obsidian transition"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-medium mb-1">
                  Kerala District
                </label>
                <select
                  value={formData.district}
                  onChange={(e) =>
                    setFormData({ ...formData, district: e.target.value })
                  }
                  className="w-full bg-white border border-stone-200 px-3 py-2.5 text-xs text-obsidian focus:outline-none focus:border-obsidian transition"
                >
                  {KERALA_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-medium mb-1">
                  Space Type
                </label>
                <select
                  value={formData.spaceType}
                  onChange={(e) =>
                    setFormData({ ...formData, spaceType: e.target.value })
                  }
                  className="w-full bg-white border border-stone-200 px-3 py-2.5 text-xs text-obsidian focus:outline-none focus:border-obsidian transition"
                >
                  {SPACE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-medium mb-1">
                  Material & Grain Interest
                </label>
                <select
                  value={formData.preferredMaterial}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferredMaterial: e.target.value,
                    })
                  }
                  className="w-full bg-white border border-stone-200 px-3 py-2.5 text-xs text-obsidian focus:outline-none focus:border-obsidian transition"
                >
                  {MATERIAL_PREFERENCES.map((mat) => (
                    <option key={mat} value={mat}>
                      {mat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-medium mb-1">
                  Project Notes & Dimensions
                </label>
                <textarea
                  rows="3"
                  placeholder="Share details regarding your room layout, desired wood tone, or custom dimensions..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full bg-white border border-stone-200 px-3 py-2.5 text-xs text-obsidian focus:outline-none focus:border-obsidian transition resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-[10px] text-stone-500 uppercase tracking-widest">
                <LuShieldCheck className="w-3.5 h-3.5 text-champagne" />
                <span>Confidential Architectural Service</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="bg-obsidian text-canvas px-6 py-3 text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition disabled:opacity-50 inline-flex items-center gap-2"
              >
                {submitting ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <span>Submit Request</span>
                    <LuSend className="w-3 h-3 text-champagne" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-5 animate-fadeIn">
            <div className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center mx-auto text-champagne">
              <LuCheck className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-champagne font-semibold block">
                Consultation Confirmed
              </span>
              <h3 className="font-serif text-2xl text-obsidian font-normal">
                Atelier Concierge In Touch Shortly
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto font-light leading-relaxed">
                Thank you, {formData.name}. Your dossier has been logged under reference <strong className="text-obsidian font-mono">{referenceId}</strong>. Our senior atelier consultant will reach out via WhatsApp / phone to coordinate your timber samples and room review in {formData.district}.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={`https://wa.me/919847000000?text=Hello%20Furniche%20Atelier%2C%20I%20have%20submitted%20consultation%20reference%20${referenceId}`}
                target="_blank"
                rel="noreferrer"
                className="border border-stone-300 px-5 py-2.5 text-xs uppercase tracking-widest text-obsidian hover:bg-obsidian hover:text-canvas transition inline-flex items-center justify-center gap-2"
              >
                <LuPhone className="w-3.5 h-3.5 text-champagne" />
                <span>Instant WhatsApp Concierge</span>
              </a>

              <button
                onClick={handleReset}
                className="bg-obsidian text-canvas px-5 py-2.5 text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition"
              >
                Return to Atelier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
