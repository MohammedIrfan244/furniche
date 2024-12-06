import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";

function Login() {
  const { setCurrentUser, setCartItems, setUserOrders } =
    useContext(UserContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [passToggle, setPassToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInutChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:3001/api/users/login", loginData)
      .then((response) => {
        console.log(response.data);        
        navigate('/')
      })
      .catch((err) => {
        console.log(axiosErrorManager(err));
        toast.error("Something went wrong");
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
        LOGIN
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] mt-10 bg-[#544A3E] shadow-lg shadow-[#000000] p-5 rounded-2xl"
      >
        <input
          required
          value={loginData.email}
          name="email"
          onChange={handleInutChange}
          type="email"
          placeholder="Email"
          className="focus:outline-none rounded-lg px-[3%] py-[1%] text-xs"
        />
        <div className="min-w-1 relative">
          <input
            required
            value={loginData.password}
            name="password"
            type={`${passToggle ? "text" : "password"}`}
            onChange={handleInutChange}
            placeholder="Password"
            className="w-[100%] focus:outline-none rounded-lg px-[3%] py-[1%] text-xs mt-[3%]"
          />
          <FontAwesomeIcon
            className="text-xs absolute bottom-2 right-2"
            onClick={() => setPassToggle(!passToggle)}
            icon={passToggle ? faEyeSlash : faEye}
          />
        </div>
        <Link className="text-xs block text-[#F9FCFA]" to={"/signin"}>
          Dont have an account ? Register now
        </Link>
        <div className="text-center mt-[2%]">
          <button
            type="submit"
            className="bg-[#D7D2C9] text-[#000000] font-bold rounded-lg shadow-sm shadow-black hover:scale-[1.01] hover:shadow-md hover:shadow-black transition-all duration-200 text-xs active:scale-95 py-1 px-5 sm:py-2"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
