import { useContext, useState } from "react"
import { useLocation } from "react-router-dom"
import { ShopContext } from "../Contexts/ShopContext"


function ProductManipulation() {
  const {state}=useLocation()
  const {editProduct}=useContext(ShopContext)
    const product=state?.product
    const[name,setName]=useState("")
    const[rating,setRating]=useState()
    const[price,setPrice]=useState()
    const[image,setImage]=useState("")
    const[description,setDescription]=useState("")
    const[original,setOriginal]=useState("")
    const[category,setCategory]=useState("")
    const[review,setReview]=useState("")
    const productData={
      name:name,
      rating:rating,
      price:price,
      image:image,
      description:description,
      original:original,
      category:category,
      review:review
  }
    const handleSubmit=(e)=>{
      e.preventDefault()
      editProduct(product?.id,productData)
      setName("");
        setRating();
        setPrice();
        setImage("");
        setDescription("");
        setOriginal("");
        setCategory("");
        setReview("");
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
        <input placeholder="name" required value={name} type="text" onChange={(e)=>setName(e.target.value)}/>
        <input placeholder="rating" required value={rating} type="number" onChange={(e)=>setRating(Number(e.target.value))}/>
        <input placeholder="price" required value={price} type="number" onChange={(e)=>setPrice(Number(e.target.value))}/>
        <input placeholder="image" required value={image} type="text" onChange={(e)=>setImage(e.target.value)}/>
        <input placeholder="description" required value={description} type="text" onChange={(e)=>setDescription(e.target.value)}/>
        <input placeholder="original" required value={original} type="text" onChange={(e)=>setOriginal(e.target.value)}/>
        <input placeholder="category" required value={category} type="text" onChange={(e)=>setCategory(e.target.value)}/>
        <input placeholder="review" required value={review} type="text" onChange={(e)=>setReview(e.target.value)}/>
        <button type="submit">edit product</button>
        </form>
    </div>
  )
}

export default ProductManipulation