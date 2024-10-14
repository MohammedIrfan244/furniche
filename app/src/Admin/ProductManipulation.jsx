import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../Contexts/ShopContext";

function ProductManipulation() {
  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();
  const { editProduct, removeProduct } = useContext(ShopContext);

  const [productData, setProductData] = useState({
    name: "",
    rating: "",
    price: "",
    image: "",
    description: "",
    original: "",
    category: "",
    review: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "rating" || name === "price" ? Number(value) : value;
    setProductData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editProduct(product?.id, productData);
    setProductData({
      name: "",
      rating: "",
      price: "",
      image: "",
      description: "",
      original: "",
      category: "",
      review: "",
    });
    navigate("/adminpanel");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-around py-10 px-5">
      {/* Product Details */}
      <div className="w-full sm:w-1/2 bg-[#F9FCFA] p-5">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
        <p>
          <strong>Name:</strong> {product?.name}
        </p>
        <p>
          <strong>Image:</strong>{" "}
          <img src={product?.image} alt="Product" className="w-32 h-auto" />
        </p>
        <p>
          <strong>Price:</strong> ${product?.price}
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
            onClick={() => removeProduct(product.id)}
            className="mt-4 px-4 py-2 rounded-md bg-red-500 text-white"
          >
            Remove
          </button>
          <button
            onClick={() => navigate("/adminpanel")}
            className="mt-4 px-4 py-2 rounded-md bg-blue-500 text-white"
          >
            Go back
          </button>
        </div>
      </div>

      {/* Edit Product Form */}
      <div className="w-full sm:w-1/2 bg-[#F9FCFA] p-5 mt-5 sm:mt-0">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            placeholder="Name"
            required
            name="name"
            value={productData.name}
            type="text"
            className="border border-gray-300 p-2 text-xs"
            onChange={handleInputChange}
          />
          <input
            placeholder="Rating"
            required
            name="rating"
            min={1}
            max={5}
            value={productData.rating}
            type="number"
            className="border border-gray-300 p-2 text-xs"
            onChange={handleInputChange}
          />
          <input
            placeholder="Price"
            required
            name="price"
            value={productData.price}
            type="number"
            className="border border-gray-300 p-2 text-xs"
            onChange={handleInputChange}
          />
          <input
            placeholder="Image URL"
            required
            name="image"
            value={productData.image}
            type="text"
            className="border border-gray-300 p-2 text-xs"
            onChange={handleInputChange}
          />
          <textarea
            placeholder="Description"
            required
            name="description"
            value={productData.description}
            className="border border-gray-300 p-2 text-xs"
            onChange={handleInputChange}
          />
          <select
            name="original"
            value={productData.original}
            onChange={handleInputChange}
            required
            className="border border-gray-300 p-2 text-xs"
          >
            <option value="">Select Original</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>

          <select
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            required
            className="border border-gray-300 p-2 text-xs"
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
            value={productData.review}
            className="border border-gray-300 p-2 text-xs"
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
