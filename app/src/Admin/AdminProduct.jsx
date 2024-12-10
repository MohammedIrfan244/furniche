import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function AdminProduct() {
  const navigate=useNavigate()
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

  const addNewProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("rating", newProduct.rating);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      formData.append("review", newProduct.review);
      formData.append("category", newProduct.category);
      formData.append("image", image);

      const resopnse =await axios.post("http://localhost:3001/api/admin/products", formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        },
      });

      toast.success(resopnse.data.message);
      handleCategory({ target: { value: "all" } });
    } catch (error) {
      toast.error(axiosErrorManager(error));
    }
  };

  const handleCategory = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3001/api/admin/products/category/${selectedCategory}`,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
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
    <div
      className={`w-[100%] min-h-[100vh] ${
        loading && "flex justify-center items-center"
      }`}
    >
      {loading && <div className="loader h-[100vh] w-[100%]"></div>}
      {!loading && (
        <div className="flex">
          <div className="overflow-y-auto max-h-screen scrollbar-thin w-[69%]">
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
                        className="cartCard w-[70px] h-[50px] object-cover"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.category.toUpperCase()}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.rating}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {product.price}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                      onClick={()=>{navigate(`/admin/adminpanel/productaction/${product._id}`)}}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center">
            <h1>CATEGORIES</h1>
            <div className="bg-[#F9FCFA] shadow-sm flex text-xs py-5 px-2 rounded-md w-[320px] ms-2 mb-3 justify-between">
              <label className="text-nowrap text-xs sm:text-[100%]">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={category === "all"}
                  onChange={handleCategory}
                />
                ALL
              </label>
              <label className="text-nowrap text-xs sm:text-[100%]">
                <input
                  type="radio"
                  name="category"
                  value="bed"
                  checked={category === "bed"}
                  onChange={handleCategory}
                />
                BEDS
              </label>
              <label className="text-nowrap text-xs sm:text-[100%]">
                <input
                  type="radio"
                  name="category"
                  value="lamps"
                  checked={category === "lamps"}
                  onChange={handleCategory}
                />
                LAMPS
              </label>
              <label className="text-nowrap text-xs sm:text-[100%]">
                <input
                  type="radio"
                  name="category"
                  value="tables"
                  checked={category === "tables"}
                  onChange={handleCategory}
                />
                TABLES
              </label>
              <label className="text-nowrap text-xs sm:text-[100%]">
                <input
                  type="radio"
                  name="category"
                  value="chairs"
                  checked={category === "chairs"}
                  onChange={handleCategory}
                />
                CHAIRS
              </label>
              <label className="text-nowrap text-xs sm:text-[100%]">
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
            <h1>ADD PRODUCT</h1>
            <div className="bg-[#F9FCFA] shadow-sm flex flex-col py-5 px-2 rounded-md w-[320px] ms-2 mb-3">
              <input
                type="text"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="mb-2 p-2 border"
              />
              <input
                type="number"
                placeholder="Rating"
                value={newProduct.rating}
                min={1}
                max={5}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, rating: e.target.value })
                }
                className="mb-2 p-2 border"
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="mb-2 p-2 border"
              />
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="mb-2 p-2 border"
              ></textarea>
              <textarea
                placeholder="Review"
                value={newProduct.review}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, review: e.target.value })
                }
                className="mb-2 p-2 border"
              ></textarea>
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="mb-2 p-2 border"
              >
                <option value="">Select Category</option>
                <option value="bed">Beds</option>
                <option value="lamps">Lamps</option>
                <option value="tables">Tables</option>
                <option value="chairs">Chairs</option>
                <option value="sofas">Sofas</option>
              </select>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="mb-2 p-2 border"
              />
              <button
                onClick={addNewProduct}
                className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProduct;
