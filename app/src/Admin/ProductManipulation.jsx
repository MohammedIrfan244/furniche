import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useSelector } from "react-redux";
import axiosInstance from "../utilities/axiosInstance";

function ProductManipulation() {
  const { productId } = useParams();
  const { currency } = useSelector((state) => state.public);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(product?.isDeleted);
  const [formValues, setFormValues] = useState({
    name: "",
    rating: "",
    price: "",
    image: null,
    description: "",
    original: "",
    category: "",
    review: "",
  });

  const fetchProduct = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/public/products/${productId}`);
      setProduct(response.data?.data);
      setFormValues({
        name: response.data?.data.name || "",
        rating: response.data?.data.rating || "",
        price: response.data?.data.price || "",
        image: null,
        description: response.data?.data.description || "",
        original: response.data?.data.original ? "true" : "false",
        category: response.data?.data.category || "",
        review: response.data?.data.review || "",
      });
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      image: e.target.files[0],
    }));
  };

  const removeProduct = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete('/admin/products/' + productId);
      toast.success(response.data.message);
      setIsDeleted(!isDeleted);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.put('/admin/products/' + productId, formValues);
      toast.success(response.data.message);
      fetchProduct(productId);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-around min-h-screen">
      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <span className="loader"></span>
        </div>
      )}

      <div className="w-full sm:w-1/2 bg-[#F9FCFA] p-5 space-y-3">
        <h2 className="text-xl font-semibold space-y-5">Product Details</h2>
        <p>
          <strong>Name:</strong> {product?.name}
        </p>
        <p>
          <strong>Image:</strong>{" "}
          <img src={product?.image} alt="Product" className="w-32 h-auto" />
        </p>
        <p>
          <strong>Price:</strong> {currency} {product?.price}
        </p>
        <p>
          <strong>Rating:</strong> {product?.rating}
        </p>
        <p>
          <strong>Description:</strong> {product?.description}
        </p>
        <p>
          <strong>Category:</strong> {product?.category}
        </p>
        <p>
          <strong>Review:</strong> {product?.review}
        </p>
        <div className="flex justify-between">
          <button
            onClick={removeProduct}
            className="mt-4 px-4 py-2 rounded-md bg-red-500 text-white"
          >
            {isDeleted ? "Restore" : "Remove"}
          </button>
          <button
            onClick={() => navigate("/admin/adminpanel")}
            className="mt-4 px-4 py-2 rounded-md bg-blue-500 text-white"
          >
            Go back
          </button>
        </div>
      </div>

      <div className="w-full sm:w-1/2 bg-[#F9FCFA] p-5 space-y-7 mt-5 sm:mt-0">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={updateProduct} className="flex flex-col gap-6">
          <input
            placeholder="Name"
            required
            name="name"
            type="text"
            className="border border-gray-300 p-2 text-xs"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <input
            placeholder="Rating"
            required
            name="rating"
            min={1}
            max={5}
            type="text"
            className="border border-gray-300 p-2 text-xs"
            value={formValues.rating}
            onChange={handleInputChange}
          />
          <input
            placeholder="Price"
            required
            name="price"
            type="text"
            className="border border-gray-300 p-2 text-xs"
            value={formValues.price}
            onChange={handleInputChange}
          />
          <input
            placeholder="Image"
            name="image"
            type="file"
            accept="image/*"
            className="border border-gray-300 p-2 text-xs"
            onChange={handleFileChange}
          />
          <textarea
            placeholder="Description"
            required
            name="description"
            className="border border-gray-300 p-2 text-xs"
            value={formValues.description}
            onChange={handleInputChange}
          />
          <select
            name="original"
            required
            className="border border-gray-300 p-2 text-xs"
            value={formValues.original}
            onChange={handleInputChange}
          >
            <option value="">Select Original</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>

          <select
            name="category"
            required
            className="border border-gray-300 p-2 text-xs"
            value={formValues.category}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="sofas">Sofas</option>
            <option value="chairs">Chairs</option>
            <option value="tables">Tables</option>
            <option value="bed">Bed</option>
            <option value="lamps">Lamps</option>
          </select>

          <textarea
            placeholder="Review"
            required
            name="review"
            className="border border-gray-300 p-2 text-xs"
            value={formValues.review}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="px-4 rounded-md py-2 bg-blue-500 text-white"
          >
            Edit Product
          </button>
        </form>
      </div>
    </div>
  );
}


export default ProductManipulation;
