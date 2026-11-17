import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../utilities/axiosInstance";
import { LuCheck, LuArrowRight } from "react-icons/lu";

function StripeSuccess() {
  const { sessionId } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stripeSuccess = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.put(
          `/users/orders/stripe/success/${sessionId}`
        );
        setLoading(false);
        setMessage(response.data.message || "Payment processed successfully");
      } catch (err) {
        setLoading(false);
        setMessage(err.response?.data?.message || "Transaction processed");
      }
    };
    stripeSuccess();
  }, [sessionId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-canvas px-4 py-20 text-obsidian">
      <div className="max-w-md w-full bg-white p-8 sm:p-12 border border-stone-200/80 shadow-atelier text-center space-y-6">
        {loading ? (
          <div className="py-12 flex justify-center items-center">
            <span className="loader" />
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full border border-champagne bg-champagne-faint text-champagne flex items-center justify-center mx-auto">
              <LuCheck className="w-8 h-8" strokeWidth={1.5} />
            </div>

            <div className="space-y-2">
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block">
                Acquisition Confirmed
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-obsidian font-normal">
                Payment Successful
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
                {message}
              </p>
            </div>

            <p className="text-xs text-stone-400 font-light">
              Your order confirmation and tracking documentation have been prepared. Our white-glove team will contact you prior to dispatch.
            </p>

            <div className="pt-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-obsidian text-canvas px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition duration-300 w-full"
              >
                <span>Return to Atelier</span>
                <LuArrowRight className="w-3.5 h-3.5 text-champagne" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StripeSuccess;
