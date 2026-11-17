import { useNavigate, Link } from "react-router-dom";
import { LuX, LuArrowLeft } from "react-icons/lu";

function StripeCancel() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-canvas px-4 py-20 text-obsidian">
      <div className="max-w-md w-full bg-white p-8 sm:p-12 border border-stone-200/80 shadow-atelier text-center space-y-6">
        <div className="w-16 h-16 rounded-full border border-stone-300 bg-stone-50 text-stone-500 flex items-center justify-center mx-auto">
          <LuX className="w-8 h-8" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-stone-500 font-semibold block">
            Transaction Interrupted
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-obsidian font-normal">
            Payment Not Completed
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
            Your transaction was cancelled or timed out. No funds have been debited from your account.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/cart")}
            className="flex-1 bg-obsidian text-canvas px-6 py-3.5 text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition duration-300"
          >
            Review Bag
          </button>
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center gap-2 border border-stone-300 text-stone-700 px-6 py-3.5 text-xs uppercase tracking-[0.18em] font-medium hover:border-obsidian hover:text-obsidian transition duration-300"
          >
            <LuArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StripeCancel;
