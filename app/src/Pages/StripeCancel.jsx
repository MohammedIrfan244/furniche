import { useNavigate } from "react-router-dom";

function StripeCancel() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-11/12 sm:w-3/4 md:w-1/2 text-center">
        <h1 className="text-2xl font-semibold text-red-500 mb-4">
          Payment Canceled
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Unfortunately, your payment has been canceled. Please try again.
        </p>
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default StripeCancel;
