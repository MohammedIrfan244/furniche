import { useContext} from "react";
import { ShopContext } from "../Contexts/ShopContext";
import AdminProduct from "../Components/AdminProduct";

function AdminPanel() {
  const {loading} = useContext(ShopContext);
  
  return (
    <div
      className={`${
        loading ? "h-[100vh] flex justify-center items-center" : null
      }`}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <div className="pt-[30%] sm:pt-[10%]">
          <AdminProduct/>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
