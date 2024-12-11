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
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-2xl font-serif mb-6 text-gray-800">REGISTER</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-lg w-96"
      >
        <div className="flex space-x-4 mb-4">
          <input
            required
            value={inputData.name}
            name="name"
            onChange={handleInputChange}
            type="text"
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <input
            value={inputData.mobile}
            name="mobile"
            type="text"
            onChange={handleInputChange}
            placeholder="Mobile (Optional)"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <input
          required
          value={inputData.email}
          name="email"
          type="email"
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none"
        />

        <input
          name="profile"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <FontAwesomeIcon
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <FontAwesomeIcon
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPassToggle(!passToggle)}
              icon={passToggle ? faEyeSlash : faEye}
            />
          </div>
        </div>

        <Link className="text-xs text-blue-500 hover:underline" to="/login">
          Already have an account?
        </Link>

        <div className="mt-4 text-center">
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
