import { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast} from "react-toastify";

function Login() {
  const { setCurrentUser ,setCartItems ,setUserOrders} = useContext(UserContext);
  const[loginData,setLoginData]=useState({
    email:"",
    password:""
  })
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [passToggle, setPassToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInutChange=(e)=>{
    const {name,value}=e.target
    setLoginData((prev)=>({...prev,[name]:value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        const users = response.data;
        const inputUser = users.find(
          (items) => items.email == loginData.email && items.password == loginData.password
        );
        if (inputUser) {
          inputUser.isBlocked?toast.error("User is blocked by admin")
          :(setCurrentUser(inputUser),
          setCartItems(inputUser.cart),
          setUserOrders(inputUser.orders),
          toast.success("You have been logged in"))
          navigate("/");
        } else {
          toast.error("Invalid email or password");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="w-[100%] flex flex-col items-center pt-[30%] sm:pt-[10%]">
      <h1 className="flex items-baseline text-l sm:text-xl">
        LOGIN <hr className="w-10 h-[3px] bg-[#A47C48]" />
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] mt-[10%] sm:mt-[3%]"
      >
        <input
          required
          value={loginData.email}
          name="email"
          onChange={handleInutChange}
          type="email"
          placeholder="Email"
          className="focus:outline-none border-2 border-[#333333] px-[3%] py-[1%] text-xs"
        />
        <div className="min-w-1 relative">
          <input
            required
            value={loginData.password}
            name="password"
            type={`${passToggle ? "text" : "password"}`}
            onChange={handleInutChange}
            placeholder="Password"
            className="w-[100%] focus:outline-none border-2 border-[#333333] px-[3%] py-[1%] text-xs mt-[3%]"
          />
          <FontAwesomeIcon
            className="text-xs absolute bottom-2 right-2"
            onClick={() => setPassToggle(!passToggle)}
            icon={passToggle ? faEyeSlash : faEye}
          />
        </div>
        <Link className="text-xs block" to={"/signin"}>
          Create an account ?
        </Link>
        <div className="text-center mt-[2%]">
          <button
            type="submit"
            className="bg-black text-[#F5F2E9] text-xs active:scale-95 py-1 px-5 sm:py-2"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
