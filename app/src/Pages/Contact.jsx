import { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { LuPhone, LuMail, LuMapPin, LuClock, LuSend } from "react-icons/lu";
import ScrollTop from "../utilities/ScrollTop";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const sendMail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .send(
        "service_5mpp4sr",
        "template_pv9suw1",
        formData,
        "_VNHLR1ntbZuSJLEc"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          toast.success("Message dispatched to client concierge");
          setSending(false);
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        },
        (err) => {
          console.error("FAILED...", err);
          toast.error("Failed to send message. Please reach us directly via telephone.");
          setSending(false);
        }
      );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen bg-canvas text-obsidian">
      <div className="pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="border-b border-stone-200/80 pb-6 mb-12">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block mb-2">
            Client Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-obsidian font-normal tracking-tight">
            Consultations & Inquiries
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Atelier Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h3 className="font-serif text-2xl text-obsidian font-normal">
                Direct Dialogue
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
                Whether inquiring about bespoke finishes, commercial interior projects, or order tracking, our concierge advisors are at your service.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-stone-200/80 text-xs">
              <div className="flex items-start gap-4">
                <LuPhone className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium block mb-0.5">
                    Telephone Concierge
                  </span>
                  <p className="text-stone-800 font-medium">+91 88915 55811</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <LuMail className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium block mb-0.5">
                    Written Inquiries
                  </span>
                  <a href="mailto:furniche@gmail.com" className="text-stone-800 font-medium hover:text-champagne transition">
                    furniche@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <LuClock className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium block mb-0.5">
                    Operating Hours
                  </span>
                  <p className="text-stone-600">Monday &mdash; Saturday, 09:00 &mdash; 19:00 IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <LuMapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium block mb-0.5">
                    Studio & Archive
                  </span>
                  <p className="text-stone-600">Furniche Design District, Atelier 14, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-stone-200/80 shadow-atelier">
            <h3 className="font-serif text-xl text-obsidian font-normal mb-6">
              Send an Inquiry
            </h3>

            <form onSubmit={sendMail} className="space-y-5">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
                  Your Full Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  type="text"
                  placeholder="Enter name"
                  className="w-full bg-canvas-subtle p-3.5 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
                  Email Address
                </label>
                <input
                  name="email"
                  value={formData.email}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  type="email"
                  placeholder="Enter email address"
                  className="w-full bg-canvas-subtle p-3.5 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.15em] text-stone-500 font-medium mb-1.5">
                  Message / Project Brief
                </label>
                <textarea
                  rows="5"
                  placeholder="Detail your request or inquiry..."
                  name="message"
                  value={formData.message}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-canvas-subtle p-3.5 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 bg-obsidian text-canvas py-3.5 text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition duration-300 disabled:opacity-70"
                >
                  <LuSend className="w-3.5 h-3.5 text-champagne" />
                  <span>{sending ? "Transmitting..." : "Dispatch Message"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ScrollTop />
    </div>
  );
}

export default Contact;
