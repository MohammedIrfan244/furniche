import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { UserContext } from "../Contexts/UserContext";

function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword,setConformPassword]=useState("")
  const [errorMessage,setErrorMessage]=useState("") 
  const [passToggle, setPassToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setCurrentUser,setCartItems } = useContext(UserContext);
  // const {  } = useContext(ShopContext);
  const navigate = useNavigate();

  const data = {
    name: name,
    email: email,
    password: password,
    cart: {},
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const users = response.data;
        users.some((item) => item.email == email)
          ? setErrorMessage("User already registered")
          :password!==conformPassword?setErrorMessage("Passwords do not match")
          : axios
              .post("http://localhost:3000/users", data)
              .then(() => {
                axios.get("http://localhost:3000/users")
                .then((getResp)=>{
                  const datas=getResp.data
                  const inputUser=datas.find(items=>items.email==email&&password==items.password)
                  setCurrentUser(inputUser)
                  setCartItems(inputUser.cart)
                  toast.success("You have been registered")
                })
              })
              .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
            .finally(() => {
              setLoading(false);
              navigate('/')
      });
  };
  return (
    <div className="w-[100%] flex flex-col items-center pt-[30%] sm:pt-[10%]">
      <h1 className="flex items-baseline text-l sm:text-xl">
        SIGN UP <hr className="w-10 h-[3px] bg-[#A47C48]" />
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] mt-[10%] sm:mt-[3%]"
      >
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Username"
          className="focus:outline-none border-2 border-[#1C1C1C] px-[3%] py-[2%] text-xs"
        />
        <input
          required
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="focus:outline-none border-2 border-[#1C1C1C] px-[3%] py-[2%] text-xs mt-[3%]"
        />
        <div className="min-w-1 relative">
          <input
            required
            value={password}
            type={`${passToggle ? "text" : "password"}`}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="focus:outline-none border-2 border-[#1C1C1C] px-[3%] py-[2%] text-xs mt-[3%] w-[100%]"
          />
          <FontAwesomeIcon
            className="text-xs absolute bottom-2 right-2"
            onClick={() => setPassToggle(!passToggle)}
            icon={passToggle ? faEyeSlash : faEye}
          />
        </div>
        <div className="min-w-1 relative">
          <input
            required
            value={conformPassword}
            type={`${passToggle ? "text" : "password"}`}
            onChange={(e) => setConformPassword(e.target.value)}
            placeholder="Conform password"
            className="focus:outline-none border-2 border-[#1C1C1C] px-[3%] py-[2%] text-xs mt-[3%] w-[100%]"
          />
          <FontAwesomeIcon
            className="text-xs absolute bottom-2 right-2"
            onClick={() => setPassToggle(!passToggle)}
            icon={passToggle ? faEyeSlash : faEye}
          />
        </div>
        <p className={`${errorMessage===""?"hidden":"block"} text-xs text-red-600`}>{errorMessage}</p>
        <Link className="text-xs block" to={"/login"}>
          Already have an account?
        </Link>
        <div className="text-center mt-[2%]">
          <button
            type="submit"
            className="bg-black text-[#F5F2E9] text-xs active:scale-95 py-1 px-5 sm:py-2"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
