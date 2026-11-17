import { Link } from "react-router-dom";
import { LuCompass } from "react-icons/lu";

function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-canvas px-4 py-28 text-obsidian">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full border border-stone-200 bg-white flex items-center justify-center mx-auto text-champagne">
          <LuCompass className="w-7 h-7" strokeWidth={1.25} />
        </div>

        <div className="space-y-2">
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block">
            404 — Not Found
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-obsidian font-normal tracking-tight">
            The Space You Seek Does Not Exist
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
            The page or catalog reference you requested has been moved or retired from our active portfolio.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-block bg-obsidian text-canvas px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition duration-300"
          >
            Return to Atelier Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
