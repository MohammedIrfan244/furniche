import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useState } from "react";

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

  const handleSubmit = (e) => {
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
    axios
      .post("http://localhost:3001/api/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(axiosErrorManager(err));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-[100%] flex flex-col items-center pt-[26%] sm:pt-[8%] h-[100vh]">
      <h1
        className="text-xl sm:text-2xl font-serif tracking-wide underline mb-10"
        style={{ textShadow: "0 0 1px #000000" }}
      >
        REGISTER
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] mt-10 bg-[#544A3E] shadow-lg shadow-[#000000] p-5 rounded-2xl"
      >
        <div className="flex w-[100%] gap-2 justify-between">
          <input
            required
            value={inputData.name}
            name="name"
            onChange={handleInputChange}
            type="text"
            placeholder="Username"
            className="focus:outline-none w-[50%] rounded-lg px-3 py-1 text-xs"
          />
          <input
            value={inputData.mobile}
            name="mobile"
            type="text"
            onChange={handleInputChange}
            placeholder="Mobile (Optional)"
            className="focus:outline-none w-[50%] rounded-lg px-3 py-1 text-xs"
          />
        </div>
        <input
          required
          value={inputData.email}
          name="email"
          type="email"
          onChange={handleInputChange}
          placeholder="Email"
          className="focus:outline-none rounded-lg px-3 py-1 text-xs"
        />
        <input
          name="profile"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="focus:outline-none rounded-lg px-3 py-1 text-xs"
        />
        <div className="flex justify-between gap-2 w-[100%]">
          <div className="relative w-[50%]">
            <input
              required
              value={inputData.password}
              name="password"
              type={passToggle ? "text" : "password"}
              onChange={handleInputChange}
              placeholder="Password"
              className="focus:outline-none rounded-lg px-3 py-1 text-xs w-[100%]"
            />
            <FontAwesomeIcon
              className="text-xs absolute bottom-2 right-2 cursor-pointer"
              onClick={() => setPassToggle(!passToggle)}
              icon={passToggle ? faEyeSlash : faEye}
            />
          </div>
          <div className="relative w-[50%]">
            <input
              required
              value={conformPassword}
              type={passToggle ? "text" : "password"}
              onChange={(e) => setConformPassword(e.target.value)}
              placeholder="Confirm Password"
              className="focus:outline-none rounded-lg px-3 py-1 text-xs w-[100%]"
            />
            <FontAwesomeIcon
              className="text-xs absolute bottom-2 right-2 cursor-pointer"
              onClick={() => setPassToggle(!passToggle)}
              icon={passToggle ? faEyeSlash : faEye}
            />
          </div>
        </div>
        <Link className="text-xs block text-[#F9FCFA]" to={"/login"}>
          Already have an account?
        </Link>
        <div className="text-center mt-2">
          <button
            type="submit"
            className="bg-[#D7D2C9] text-[#000000] font-bold rounded-lg shadow-sm shadow-black border-none hover:scale-[1.01] hover:shadow-md hover:shadow-black transition-all duration-200 text-xs active:scale-95 py-1 px-5 sm:py-2"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
