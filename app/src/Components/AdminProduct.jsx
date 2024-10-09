import { useContext, useState } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import { useNavigate } from "react-router-dom"


function AdminProduct() {
    const[name,setName]=useState("")
    const[rating,setRating]=useState("")
    const[price,setPrice]=useState("")
    const[image,setImage]=useState("")
    const[description,setDescription]=useState("")
    const[original,setOriginal]=useState("")
    const[category,setCategory]=useState("")
    const[review,setReview]=useState("")
    const {products,addProduct,removeProduct}=useContext(ShopContext)
    const navigate=useNavigate()
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
    const formSubmit=(e)=>{
        e.preventDefault();
        addProduct(productData)
        setName("");
        setRating("");
        setPrice("");
        setImage("");
        setDescription("");
        setOriginal("");
        setCategory("");
        setReview("");
    }
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>image</th>
                    <th>category</th>
                    <th>rating</th>
                    <th>price</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {
                    products?.map((product,index)=><tr key={index}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td><img src={product.image} alt={product.name} /></td>
                        <td>{product.category}</td>
                        <td>{product.rating}</td>
                        <td>{product.price}</td>
                        <td><button onClick={()=>removeProduct(product.id)}>remove</button></td>
                        <td><button onClick={()=>navigate(`/adminpanel/productaction/${product.id}`,{state:{product}})}>view</button></td>
                    </tr>)
                }
            </tbody>
        </table>
        <form onSubmit={formSubmit}>
        <input placeholder="name" required value={name} type="text" onChange={(e)=>setName(e.target.value)}/>
        <input placeholder="rating" required value={rating} type="number" onChange={(e)=>setRating(Number(e.target.value))}/>
        <input placeholder="price" required value={price} type="number" onChange={(e)=>setPrice(Number(e.target.value))}/>
        <input placeholder="image" required value={image} type="text" onChange={(e)=>setImage(e.target.value)}/>
        <input placeholder="description" required value={description} type="text" onChange={(e)=>setDescription(e.target.value)}/>
        <input placeholder="original" required value={original} type="text" onChange={(e)=>setOriginal(e.target.value)}/>
        <input placeholder="category" required value={category} type="text" onChange={(e)=>setCategory(e.target.value)}/>
        <input placeholder="review" required value={review} type="text" onChange={(e)=>setReview(e.target.value)}/>
        <button type="submit">add product</button>
        </form>
    </div>
  )
}

export default AdminProduct