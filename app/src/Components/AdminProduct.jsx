import { useContext, useState } from "react"
import { ShopContext } from "../Contexts/ShopContext"
import { useNavigate } from "react-router-dom"


// eslint-disable-next-line react/prop-types
function AdminProduct({products=[]}) {
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
    const {addProduct,removeProduct}=useContext(ShopContext)
    const navigate=useNavigate()
    const handleInputChange=(e)=>{
        const{name,value}=e.target
        const newValue=name=="rating"||name=="price"?Number(value):value
        setProductData((prevData)=>({...prevData,[name]:newValue}))
    }
    const formSubmit=(e)=>{
        e.preventDefault();
        addProduct(productData)
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
    }
  return (
    <div className="flex">
        <div className="overflow-y-auto max-h-96 scrollbar-thin w-[70%]">
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
        </div>
        <div className="w-[30%]">
        <form onSubmit={formSubmit}>
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
        <button type="submit">add product</button>
        </form>
        </div>
    </div>
  )
}

export default AdminProduct