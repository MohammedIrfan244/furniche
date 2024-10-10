import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ShopContext } from "../Contexts/ShopContext"


function ProductManipulation() {
  const {state}=useLocation()
  const product=state?.product
  const navigate=useNavigate()
  const {editProduct}=useContext(ShopContext)

  const[productData,setProductData]=useState({
    name:"",
      rating:"",
      price:"",
      image:"",
      description:"",
      original:"",
      category:"",
      review:""
  })
  const handleInputChange=(e)=>{
    const{name,value}=e.target
    const newValue=name=="rating"||name=="price"?Number(value):value
    setProductData((prevData)=>({...prevData,[name]:newValue}))
}

    const handleSubmit=(e)=>{
      e.preventDefault()
      editProduct(product?.id,productData)
      setProductData({
        name: "",
        rating: "",
        price: "",
        image: "",
        description: "",
        original: "",
        category: "",
        review: ""
      })
      navigate('/adminpanel')
    }
  return (
    <div className="pt-[10%]">
        <p>{product?.name}</p>
        <p><img src={product?.image} alt="image" /></p>
        <p>{product?.price}</p>
        <p>{product?.rating}</p>
        <p>{product?.description}</p>
        <p>{product?.category}</p>
        <p>{product?.review}</p>
        <form onSubmit={handleSubmit}>
        <input placeholder="Name" required name="name" value={productData.name} type="text" onChange={handleInputChange}/>
        <input placeholder="rating" required name="rating" min={1} max={5} value={productData.rating} type="number" onChange={handleInputChange}/>
        <input placeholder="price" required name="price" value={productData.price} type="number" onChange={handleInputChange}/>
        <input placeholder="image" required name="image" value={productData.image} type="text" onChange={handleInputChange}/>
        <textarea placeholder="description" required name="description" value={productData.description}  onChange={handleInputChange}/>
        <select name="original" value={productData.original} onChange={handleInputChange} required>
  <option value="">Select Original</option>
  <option value="true">True</option>
  <option value="false">False</option>
</select>

<select name="category" value={productData.category} onChange={handleInputChange} required>
  <option value="">Select category</option>
  <option value="sofas">Sofas</option>
  <option value="chairs">chairs</option>
  <option value="tables">tables</option>
  <option value="bed">bed</option>
  <option value="lamps">lamps</option>
</select>
        <textarea placeholder="review" required name="review" value={productData.review}  onChange={handleInputChange}/>
        <button type="submit">edit product</button>
        </form>
    </div>
  )
}

export default ProductManipulation