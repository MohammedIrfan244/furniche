import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate, faStar } from "@fortawesome/free-solid-svg-icons";
import ProductItems from "../shared/ProductItems";
import ScrollTop from "../shared/ScrollTop";
import axios from "axios";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart } from "../Redux/userSlice";
import { toast } from "react-toastify";
import axiosInstance from "../utilities/axiosInstance";

function Product() {
  const { Id } = useParams();
  const {currentUser,userCart}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const  {currency}  = useSelector((state)=>state.user)
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [interestedProduct, setInterestedProduct] = useState([]);

  
  const addToCartDispatch = async () => {
    if(!currentUser){
      navigate('/login')
      return
    }
    if (!userCart.find(item => item.productId._id === Id)) {
    //   const token = Cookies.get('token');
    //   try {
    //     await axios.post(
    //       `http://localhost:3001/api/users/cart`,
    //       { productId: Id, quantity: 1 },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     dispatch(addToCart(Id));
    //     dispatch(getCart());
    //     toast.success("Product added to cart successfully");
    //   } catch (err) {
    //     console.error(err);
    //     toast.error(axiosErrorManager(err));
    //   }
    // } else {
    //   navigate("/cart");
    //   toast.error("Product already in cart");
    // }
    try{
      const response=await axiosInstance.post('/users/cart',{productId:Id,quantity:1})
      dispatch(addToCart(Id));
      dispatch(getCart());
      toast.success(response.data.message)
    }catch(err){
      toast.error(axiosErrorManager(err))
    }}
  };
  

  useEffect(()=>{
setLoading(true)
if(currentUser){
  dispatch(getCart())
}
axios.get(`http://localhost:3001/api/public/products/${Id}`)
.then((response)=>{
  setProduct(response.data.data)
})
.catch((err)=>console.log("Error from id in params",axiosErrorManager(err)))
axios.get(`http://localhost:3001/api/public/products/category/${product?.category}`)
.then((response)=>{
  setInterestedProduct(response.data.data)
})
.catch((err)=>console.log("Error from interested product",axiosErrorManager(err)))
.finally(()=>setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[Id, product?.category, currentUser])

  return (
    <div
      className={`${
        loading ? "h-[100vh] flex justify-center items-center" : null
      }`}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="pt-[26%] sm:pt-[10%] flex flex-col items-center">
          <div className="flex flex-col sm:flex-row w-[90%] sm:w-[87%] p-2 bg-[#F9FCFA] rounded-lg shadow-md">
            <div className="w-[100%] sm:w-[50%] flex justify-center rounded-lg overflow-hidden items-center">
              <img
                className="hover:scale-[1.01] transition duration-500 ease-in-out ProductPage w-[400px] h-[200px] sm:w-[610px] sm:h-[410px] object-cover"
                src={product?.image}
                alt="image"
              />
            </div>
            <div className="mt-[3%] sm:mt-0 w-[100%] sm:w-[50%] flex flex-col justify-between min-h-[50vh] sm:px-[3%] sm:gap-0">
              <div className="flex flex-col justify-beteween gap-[20px]">
                <div>
                  <h1 className="font-bold text-xl">
                    {product?.name}
                    <span>
                      {" "}
                      {product?.original === "false" ? null : (
                        <FontAwesomeIcon
                          className="text-base text-[#FFD700]"
                          icon={faCertificate}
                        />
                      )}
                    </span>
                  </h1>
                  <p className="text-xs">
                    {product?.original === "false" ? null : "(In house design)"}
                  </p>
                </div>
                <p className="text-xs flex text-[#FFD700]">
                  {Array.from({ length: product?.rating }).map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} />
                  ))}
                </p>
                <p className="text-xl font-bold">
                  {currency} {product?.price}
                </p>
                <p className="text-xs">{product?.description}</p>
              </div>
              <div>
                <p className="text-sm">Review :</p>
                <p className="text-xs">{product?.review}</p>
              </div>
              <div className="flex justify-between">
                <button onClick={() => navigate(`/checkout/product/${Id}`)} className="active:scale-95 bg-[#544A3E] hover:scale-[1.01] shadow-md shadow-[#544A3E] text-xs text-[#F5F2E9] px-5 py-2 rounded-xl sm:py-3">
                  Buy Now
                </button>
                  <button
                    onClick={userCart?.some(item=>item.productId?._id===Id)?()=>navigate("/cart"):addToCartDispatch}
                    className="active:scale-95 bg-[#544A3E] hover:scale-[1.01] shadow-md shadow-[#544A3E] text-xs text-[#F5F2E9] px-5 py-2 rounded-xl sm:py-3"
                  >{`${userCart.some(item=>item.productId?._id===Id) ? "Go to cart" : "Add to Cart"}`}</button>
                
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-[100%] mt-20 px-3 lg:p-2">
            <h1
              className="text-xl sm:text-2xl font-serif tracking-wide underline"
              style={{ textShadow: "0 0 1px #000000" }}
            >
              YOU MAY ALSO INTERESTED IN
            </h1>
            <div className="grid grid-cols-2 ms:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12 mt-20">
              {interestedProduct.map((item, index) => (
                <ProductItems
                  key={index}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                  original={item.original}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <ScrollTop />
    </div>
  );
}

export default Product;
