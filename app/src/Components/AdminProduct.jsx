import { useContext } from "react"
import { ShopContext } from "../Contexts/ShopContext"


function AdminProduct() {
    const {products,addProduct,removeProduct,editProduct}=useContext(ShopContext)
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
                </tr>
            </thead>
            <tbody>
                {
                    products?.map((items,index)=><tr key={index}>
                        <td>{items.id}</td>
                        <td>{items.name}</td>
                        <td><img src={items.image} alt="image" /></td>
                        <td>{items.category}</td>
                        <td>{items.rating}</td>
                        <td>{items.price}</td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}

export default AdminProduct