import { useEffect, useState } from "react";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utilities/axiosInstance";
import { LuPlus, LuEye, LuX } from "react-icons/lu";

function AdminProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("all");
  const [newProduct, setNewProduct] = useState({
    name: "",
    rating: "",
    price: "",
    description: "",
    review: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const addNewProduct = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("rating", newProduct.rating);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      formData.append("review", newProduct.review);
      formData.append("category", newProduct.category);
      if (image) {
        formData.append("image", image);
      }

      const response = await axiosInstance.post(`/admin/products`, formData);

      toast.success(response.data.message || "Product published successfully");
      setLoading(false);
      handleCategory({ target: { value: "all" } });
      setNewProduct({
        name: "",
        rating: "",
        price: "",
        description: "",
        review: "",
        category: "",
      });
      setImage(null);
      setShowAddProduct(false);
    } catch (error) {
      toast.error(axiosErrorManager(error));
      setLoading(false);
    }
  };

  const handleCategory = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/admin/products/category/${selectedCategory}`
      );
      setProducts(response.data?.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(axiosErrorManager(error));
    }
  };

  useEffect(() => {
    handleCategory({ target: { value: "all" } });
  }, []);

  const categories = [
    { label: "All Items", value: "all" },
    { label: "Sofas", value: "sofas" },
    { label: "Chairs", value: "chairs" },
    { label: "Tables", value: "tables" },
    { label: "Beds", value: "bed" },
    { label: "Lamps", value: "lamps" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold block mb-1">
            Studio Portfolio
          </span>
          <h2 className="font-serif text-3xl text-obsidian font-normal">
            Catalog Management ({products?.length || 0})
          </h2>
        </div>

        <button
          onClick={() => setShowAddProduct(!showAddProduct)}
          className="inline-flex items-center gap-2 bg-obsidian text-canvas px-4 py-2.5 text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition"
        >
          {showAddProduct ? (
            <>
              <LuX className="w-3.5 h-3.5 text-champagne" />
              <span>Close Entry Form</span>
            </>
          ) : (
            <>
              <LuPlus className="w-3.5 h-3.5 text-champagne" />
              <span>Add New Creation</span>
            </>
          )}
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-3 border border-stone-200/80 shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategory({ target: { value: cat.value } })}
            className={`text-[11px] uppercase tracking-wider px-3.5 py-1.5 transition font-medium ${
              category === cat.value
                ? "bg-obsidian text-canvas"
                : "text-stone-600 hover:text-obsidian hover:bg-stone-100"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Creation Drawer / Form */}
      {showAddProduct && (
        <div className="bg-white border border-stone-200 p-6 sm:p-8 shadow-atelier space-y-4">
          <h3 className="font-serif text-xl text-obsidian font-normal border-b border-stone-100 pb-3">
            Register New Creation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                Product Title
              </label>
              <input
                type="text"
                placeholder="Title"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full bg-canvas-subtle p-2.5 border border-stone-200 text-xs focus:outline-none focus:border-obsidian"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                Rating (1 &mdash; 5)
              </label>
              <input
                type="number"
                placeholder="5"
                min={1}
                max={5}
                value={newProduct.rating}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, rating: e.target.value })
                }
                className="w-full bg-canvas-subtle p-2.5 border border-stone-200 text-xs focus:outline-none focus:border-obsidian"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                Price (INR/USD)
              </label>
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="w-full bg-canvas-subtle p-2.5 border border-stone-200 text-xs focus:outline-none focus:border-obsidian"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                Category
              </label>
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="w-full bg-canvas-subtle p-2.5 border border-stone-200 text-xs focus:outline-none focus:border-obsidian"
              >
                <option value="">Select Category</option>
                <option value="sofas">Sofas</option>
                <option value="chairs">Chairs</option>
                <option value="tables">Tables</option>
                <option value="bed">Beds</option>
                <option value="lamps">Lamps</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                Specification Notes
              </label>
              <textarea
                rows="3"
                placeholder="Architectural dimensions and materials..."
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="w-full bg-canvas-subtle p-2.5 border border-stone-200 text-xs focus:outline-none focus:border-obsidian resize-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                Client Review Snippet
              </label>
              <textarea
                rows="3"
                placeholder="Testimonial..."
                value={newProduct.review}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, review: e.target.value })
                }
                className="w-full bg-canvas-subtle p-2.5 border border-stone-200 text-xs focus:outline-none focus:border-obsidian resize-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
              Studio Image Asset
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full bg-canvas-subtle p-2 text-xs border border-stone-200"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={addNewProduct}
              disabled={loading}
              className="bg-obsidian text-canvas px-6 py-2.5 text-xs uppercase tracking-widest font-medium hover:bg-stone-800 transition"
            >
              {loading ? "Publishing..." : "Publish Creation to Catalog"}
            </button>
          </div>
        </div>
      )}

      {/* Catalog Table */}
      {loading ? (
        <div className="h-64 flex justify-center items-center">
          <span className="loader" />
        </div>
      ) : (
        <div className="bg-white border border-stone-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase tracking-widest font-medium text-[10px]">
                <tr>
                  <th className="py-3.5 px-5">Piece</th>
                  <th className="py-3.5 px-5">Category</th>
                  <th className="py-3.5 px-5">Rating</th>
                  <th className="py-3.5 px-5">Price</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products?.map((product, index) => (
                  <tr key={product._id || index} className="hover:bg-canvas-subtle transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 bg-stone-100 overflow-hidden border border-stone-200 shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-obsidian text-sm line-clamp-1">
                            {product.name}
                          </p>
                          <span className="font-mono text-[10px] text-stone-400">
                            #{product._id?.slice(-6)}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-stone-600 uppercase tracking-wider text-[11px]">
                      {product.category}
                    </td>
                    <td className="py-3 px-5 text-champagne font-semibold">
                      {product.rating}.0
                    </td>
                    <td className="py-3 px-5 font-semibold text-obsidian">
                      ${product.price}
                    </td>
                    <td className="py-3 px-5">
                      <span
                        className={`text-[10px] uppercase tracking-widest px-2 py-0.5 font-medium border ${
                          product.isDeleted
                            ? "bg-red-50 text-red-600 border-red-200"
                            : "bg-stone-100 text-stone-700 border-stone-200"
                        }`}
                      >
                        {product.isDeleted ? "Archived" : "Live"}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <button
                        onClick={() =>
                          navigate(`/admin/adminpanel/productaction/${product?._id}`)
                        }
                        className="inline-flex items-center gap-1.5 border border-stone-300 text-obsidian hover:border-obsidian px-3 py-1.5 text-[11px] uppercase tracking-wider transition"
                      >
                        <LuEye className="w-3 h-3 text-champagne" />
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProduct;
