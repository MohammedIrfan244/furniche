import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useEffect, useState } from "react";

function SignIn() {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    profile: null,
  });
  const [conformPassword, setConformPassword] = useState("");
  const [passToggle, setPassToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setInputData((prev) => ({ ...prev, profile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputData.password !== conformPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("email", inputData.email);
    formData.append("password", inputData.password);
    formData.append("mobile", inputData.mobile || "Not Provided");
    if (inputData.profile) {
      formData.append("profile", inputData.profile);
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(axiosErrorManager(err));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full sm:w-2/3 md:w-2/5  bg-white border-2 border-sofaBlue p-8 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4 mb-4">
            <input
              required
              value={inputData.name}
              name="name"
              onChange={handleInputChange}
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={inputData.mobile}
              name="mobile"
              type="number"
              onChange={handleInputChange}
              placeholder="Mobile (Optional)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            required
            value={inputData.email}
            name="email"
            type="email"
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="profile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex space-x-4 mb-4">
            <div className="relative w-full">
              <input
                required
                value={inputData.password}
                name="password"
                type={passToggle ? "text" : "password"}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FontAwesomeIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setPassToggle(!passToggle)}
                icon={passToggle ? faEyeSlash : faEye}
              />
            </div>

            <div className="relative w-full">
              <input
                required
                value={conformPassword}
                type={passToggle ? "text" : "password"}
                onChange={(e) => setConformPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FontAwesomeIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setPassToggle(!passToggle)}
                icon={passToggle ? faEyeSlash : faEye}
              />
            </div>
          </div>

          <div className="text-center mb-4">
            <Link
              className="text-xs text-sofaBlue hover:underline"
              to="/login"
            >
              Already have an account? Login now
            </Link>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-sofaBlue text-white font-bold py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
