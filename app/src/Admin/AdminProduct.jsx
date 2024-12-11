import { useEffect, useState } from "react";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utilities/axiosInstance";

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
      formData.append("image", image);

      const response = await axiosInstance.post(`/admin/products`, formData);

      toast.success(response.data.message);
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
      const response = await axiosInstance.get(`/admin/products/category/${selectedCategory}`);
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(axiosErrorManager(error));
    }
  };

  useEffect(() => {
    handleCategory({ target: { value: "all" } });
  }, []);

  return (
    <div className={`w-[100%] min-h-[100vh] ${loading && "flex justify-center items-center"}`}>
      {loading && <div className="loader h-[100vh] w-[100%]"></div>}
      {!loading && (
        <div className="flex flex-col space-y-4 p-4">
          <div className="flex justify-between items-center bg-[#F9FCFA] shadow-sm p-4 rounded-md">
            <h1 className="text-xl font-semibold">Categories</h1>
            <div className="flex space-x-4">
              <label className="text-xs">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={category === "all"}
                  onChange={handleCategory}
                />
                ALL
              </label>
              <label className="text-xs">
                <input
                  type="radio"
                  name="category"
                  value="bed"
                  checked={category === "bed"}
                  onChange={handleCategory}
                />
                BEDS
              </label>
              <label className="text-xs">
                <input
                  type="radio"
                  name="category"
                  value="lamps"
                  checked={category === "lamps"}
                  onChange={handleCategory}
                />
                LAMPS
              </label>
              <label className="text-xs">
                <input
                  type="radio"
                  name="category"
                  value="tables"
                  checked={category === "tables"}
                  onChange={handleCategory}
                />
                TABLES
              </label>
              <label className="text-xs">
                <input
                  type="radio"
                  name="category"
                  value="chairs"
                  checked={category === "chairs"}
                  onChange={handleCategory}
                />
                CHAIRS
              </label>
              <label className="text-xs">
                <input
                  type="radio"
                  name="category"
                  value="sofas"
                  checked={category === "sofas"}
                  onChange={handleCategory}
                />
                SOFAS
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center bg-[#F9FCFA] shadow-sm p-4 rounded-md">
            <h1 className="text-xl font-semibold">Add Product</h1>
            <button
              onClick={() => setShowAddProduct(!showAddProduct)} // Toggle the Add Product form
              className="bg-blue-500 text-white text-xs px-4 py-2 rounded-md"
            >
              {showAddProduct ? "Hide Form" : "Show Form"}
            </button>
          </div>

          {showAddProduct && (
    <div className="bg-[#F9FCFA] shadow-md p-4 rounded-lg max-w-4xl mx-auto space-y-3">
  
  
  <div className="grid grid-cols-2 gap-4">
    <div>
      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) =>
          setNewProduct({ ...newProduct, name: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
      />
    </div>

    <div>
      <input
        type="number"
        placeholder="Rating (1-5)"
        value={newProduct.rating}
        min={1}
        max={5}
        onChange={(e) =>
          setNewProduct({ ...newProduct, rating: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
      />
    </div>
  </div>

  
  <div className="grid grid-cols-2 gap-4">
    <div>
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
      />
    </div>

    <div>
      <select
        value={newProduct.category}
        onChange={(e) =>
          setNewProduct({ ...newProduct, category: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
      >
        <option value="">Select Category</option>
        <option value="bed">Beds</option>
        <option value="lamps">Lamps</option>
        <option value="tables">Tables</option>
        <option value="chairs">Chairs</option>
        <option value="sofas">Sofas</option>
      </select>
    </div>
  </div>

  
  <div className="grid grid-cols-2 gap-4">
    <div>
      <textarea
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) =>
          setNewProduct({ ...newProduct, description: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
      ></textarea>
    </div>

    <div>
      <textarea
        placeholder="Review"
        value={newProduct.review}
        onChange={(e) =>
          setNewProduct({ ...newProduct, review: e.target.value })
        }
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
      ></textarea>
    </div>
  </div>

  
  <div>
    <input
      type="file"
      onChange={(e) => setImage(e.target.files[0])}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-10"
    />
  </div>

  
  <div>
    <button
      onClick={addNewProduct}
      className="w-full bg-blue-500 text-white text-lg font-semibold py-3 rounded-md hover:bg-blue-600 transition"
    >
      {loading ? "Adding..." : "Add Product"}
    </button>
  </div>
</div>

    )}

          <div className="overflow-x-auto max-h-screen scrollbar-thin w-full text-sm">
            <table className="table-auto border-collapse border bg-[#F9FCFA] border-gray-300 w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Id</th>
                  <th className="border border-gray-300 p-2">Image</th>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Category</th>
                  <th className="border border-gray-300 p-2">Rating</th>
                  <th className="border border-gray-300 p-2">Price</th>
                  <th className="border border-gray-300 p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{product._id}</td>
                    <td className="border border-gray-300 p-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-[70px] h-[50px] object-cover"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">{product.name}</td>
                    <td className="border border-gray-300 p-2">{product.category}</td>
                    <td className="border border-gray-300 p-2">{product.rating}</td>
                    <td className="border border-gray-300 p-2">{product.price}</td>
                    <td className="border border-gray-300 p-2"> 
                      <button className="bg-blue-500 text-white text-xs px-4 py-2 rounded-md" onClick={() => navigate(`/admin/adminpanel/productaction/${product?._id}`)}>View</button>
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
