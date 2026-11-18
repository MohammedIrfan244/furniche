import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useSelector } from "react-redux";
import axiosInstance from "../utilities/axiosInstance";
import { LuArrowLeft, LuTrash2, LuRotateCcw, LuSave } from "react-icons/lu";

function ProductManipulation() {
  const { productId } = useParams();
  const { currency } = useSelector((state) => state.public);
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
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

  const fetchProduct = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/public/products/${id}`
      );
      const data = response.data?.data;
      setProduct(data || {});
      setIsDeleted(data?.isDeleted || false);
      setFormValues({
        name: data?.name || "",
        rating: data?.rating || "",
        price: data?.price || "",
        image: null,
        description: data?.description || "",
        original: data?.original ? "true" : "false",
        category: data?.category || "",
        review: data?.review || "",
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
      const response = await axiosInstance.delete(`/admin/products/${productId}`);
      toast.success(response.data.message || "Product status updated");
      setIsDeleted(!isDeleted);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("rating", formValues.rating);
    formData.append("price", formValues.price);
    formData.append("description", formValues.description);
    formData.append("original", formValues.original);
    formData.append("category", formValues.category);
    formData.append("review", formValues.review);

    if (formValues.image) {
      formData.append("image", formValues.image);
    }

    try {
      setLoading(true);
      const response = await axiosInstance.put(
        `/admin/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message || "Product updated successfully");
      fetchProduct(productId);
    } catch (err) {
      toast.error(axiosErrorManager(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-canvas text-obsidian p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link
          to="/admin/adminpanel"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 hover:text-obsidian transition"
        >
          <LuArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Console</span>
        </Link>

        {loading ? (
          <div className="h-64 flex justify-center items-center">
            <span className="loader" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Product Overview Dossier */}
            <div className="lg:col-span-5 bg-white border border-stone-200/80 p-6 sm:p-8 shadow-atelier space-y-6">
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block">
                Current Asset
              </span>
              <h2 className="font-serif text-2xl text-obsidian font-normal">
                {product?.name}
              </h2>

              <div className="aspect-[4/3] w-full bg-stone-100 overflow-hidden border border-stone-200">
                <img
                  src={product?.image || "/default-product.png"}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 text-xs border-t border-stone-100 pt-4 text-stone-600">
                <p><span className="text-stone-400 uppercase tracking-widest text-[10px] block">Price:</span> {currency || "₹"} {product?.price}</p>
                <p><span className="text-stone-400 uppercase tracking-widest text-[10px] block">Category:</span> {product?.category}</p>
                <p><span className="text-stone-400 uppercase tracking-widest text-[10px] block">Rating:</span> {product?.rating}.0</p>
                <p><span className="text-stone-400 uppercase tracking-widest text-[10px] block">Edition:</span> {product?.original ? "Atelier In-House Original" : "Curated Standard"}</p>
                <p><span className="text-stone-400 uppercase tracking-widest text-[10px] block">Description:</span> {product?.description}</p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex gap-3">
                <button
                  onClick={removeProduct}
                  className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 text-xs uppercase tracking-widest font-medium transition border ${
                    isDeleted
                      ? "border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                      : "border-red-300 text-red-600 hover:bg-red-50"
                  }`}
                >
                  {isDeleted ? (
                    <>
                      <LuRotateCcw className="w-3.5 h-3.5" />
                      <span>Restore to Live</span>
                    </>
                  ) : (
                    <>
                      <LuTrash2 className="w-3.5 h-3.5" />
                      <span>Archive Product</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Edit Form */}
            <div className="lg:col-span-7 bg-white border border-stone-200/80 p-6 sm:p-8 shadow-atelier space-y-6">
              <h3 className="font-serif text-xl text-obsidian font-normal border-b border-stone-100 pb-4">
                Update Specifications
              </h3>

              <form onSubmit={updateProduct} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                    Product Title
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={formValues.name}
                    onChange={handleInputChange}
                    className="w-full bg-canvas-subtle p-3 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                      Rating (1 &mdash; 5)
                    </label>
                    <input
                      name="rating"
                      type="number"
                      min={1}
                      max={5}
                      required
                      value={formValues.rating}
                      onChange={handleInputChange}
                      className="w-full bg-canvas-subtle p-3 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                      Price
                    </label>
                    <input
                      name="price"
                      type="number"
                      required
                      value={formValues.price}
                      onChange={handleInputChange}
                      className="w-full bg-canvas-subtle p-3 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                      In-House Original
                    </label>
                    <select
                      name="original"
                      required
                      value={formValues.original}
                      onChange={handleInputChange}
                      className="w-full bg-canvas-subtle p-3 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian"
                    >
                      <option value="true">True (Atelier Craft)</option>
                      <option value="false">False (Standard)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      required
                      value={formValues.category}
                      onChange={handleInputChange}
                      className="w-full bg-canvas-subtle p-3 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian"
                    >
                      <option value="sofas">Sofas</option>
                      <option value="chairs">Chairs</option>
                      <option value="tables">Tables</option>
                      <option value="bed">Beds</option>
                      <option value="lamps">Lamps</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                    Replace Asset Image (Optional)
                  </label>
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full bg-canvas-subtle p-2 text-xs border border-stone-200"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                    Specification Details
                  </label>
                  <textarea
                    rows="3"
                    name="description"
                    required
                    value={formValues.description}
                    onChange={handleInputChange}
                    className="w-full bg-canvas-subtle p-3 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                    Client Review Excerpt
                  </label>
                  <textarea
                    rows="2"
                    name="review"
                    required
                    value={formValues.review}
                    onChange={handleInputChange}
                    className="w-full bg-canvas-subtle p-3 border border-stone-200 text-xs sm:text-sm text-obsidian focus:outline-none focus:border-obsidian resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-obsidian text-canvas py-3.5 text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition"
                  >
                    <LuSave className="w-3.5 h-3.5 text-champagne" />
                    <span>Save Specification Updates</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductManipulation;
