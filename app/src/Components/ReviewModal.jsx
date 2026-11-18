import { useState } from "react";
import { LuX, LuSend, LuShieldCheck } from "react-icons/lu";
import { IoMdStar } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";

export default function ReviewModal({
  isOpen,
  onClose,
  productId,
  productName,
  currentUser,
  onReviewAdded,
}) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState(currentUser?.name || "");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim()) {
      toast.error("Please provide both an appraisal title and review comments");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        rating,
        title: title.trim(),
        comment: comment.trim(),
        author: author.trim() || "Atelier Patron",
        location: location.trim() || "Verified Patron",
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/public/products/${productId}/reviews`,
        payload
      );

      toast.success("Your review has been recorded in the Atelier database");
      if (onReviewAdded) {
        onReviewAdded(res.data?.data);
      }
      onClose();
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-canvas border border-stone-200 max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-obsidian p-1 transition-colors"
          aria-label="Close"
        >
          <LuX className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="border-b border-stone-200 pb-3 space-y-1">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-champagne font-semibold block">
              Patron Feedback
            </span>
            <h3 className="font-serif text-2xl text-obsidian font-normal">
              Write a Review
            </h3>
            <p className="font-sans text-xs text-stone-500 font-light truncate">
              {productName}
            </p>
          </div>

          {/* Star Selection */}
          <div className="space-y-1.5">
            <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-medium">
              Rating *
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 text-champagne focus:outline-none transition-transform hover:scale-110"
                    aria-label={`Rate ${star} stars`}
                  >
                    <IoMdStar
                      className={`w-6 h-6 ${
                        active ? "text-champagne" : "text-stone-300"
                      }`}
                    />
                  </button>
                );
              })}
              <span className="text-xs text-stone-600 font-medium ml-2">
                {rating === 5
                  ? "5.0 - Exceptional Quality"
                  : rating === 4
                  ? "4.0 - Highly Recommended"
                  : rating === 3
                  ? "3.0 - Good"
                  : `${rating}.0 - Needs Improvement`}
              </span>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="space-y-3.5">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-medium mb-1">
                Review Headline *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Stunning craftsmanship and perfect proportions"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white border border-stone-200 px-3 py-2 text-xs text-obsidian focus:outline-none focus:border-obsidian transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-medium mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Menon"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-white border border-stone-200 px-3 py-2 text-xs text-obsidian focus:outline-none focus:border-obsidian transition"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-medium mb-1">
                  Location (Anywhere)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kochi, Bengaluru, London, Dubai"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-white border border-stone-200 px-3 py-2 text-xs text-obsidian focus:outline-none focus:border-obsidian transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-medium mb-1">
                Review Comments *
              </label>
              <textarea
                rows="4"
                required
                placeholder="Share your thoughts on build quality, timber texture, comfort, delivery, and aesthetics..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-white border border-stone-200 px-3 py-2 text-xs text-obsidian focus:outline-none focus:border-obsidian transition resize-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] text-stone-500 uppercase tracking-widest">
              <LuShieldCheck className="w-3.5 h-3.5 text-champagne" />
              <span>Verified Patron Feedback</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="bg-obsidian text-canvas px-6 py-2.5 text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition disabled:opacity-50 inline-flex items-center gap-2"
            >
              {submitting ? (
                <span>Publishing...</span>
              ) : (
                <>
                  <span>Publish Review</span>
                  <LuSend className="w-3 h-3 text-champagne" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
