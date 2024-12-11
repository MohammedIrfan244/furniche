import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utilities/axiosInstance";

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
        setMessage(response.data.message);
      } catch (err) {
        setLoading(false);
        setMessage(err.response?.data?.message || "Something went wrong");
      }
    };
    stripeSuccess();
  }, [sessionId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-11/12 sm:w-3/4 md:w-1/2">
        {loading ? (
          <div className="text-center text-xl text-gray-700">Loading...</div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-center text-green-500 mb-4">
              Payment Success
            </h1>
            <p className="text-lg text-center text-gray-600 mb-4">{message}</p>
            <div className="text-center">
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
              >
                Go to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StripeSuccess;
