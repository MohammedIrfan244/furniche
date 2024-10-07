import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./Pages/Home";
import Collection from "./Pages/Collection";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import PlaceOrder from "./Pages/PlaceOrder";
import NavBar from "./Components/NavBar";
import Search from "./Pages/Search";
import Login from "./Pages/Login";
import SignIn from "./Pages/SignIn";
import User from "./Pages/User";
import NotFound from "./Pages/NotFound";
import Layout from "./Components/Layout";
import { useContext } from "react";
import { UserContext } from "./Contexts/UserContext";
import AdminPanel from "./Pages/AdminPanel";



function RoutesPage() {
  const {currentUser,isAdmin}=useContext(UserContext)
  return (
    <div>
         <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar /> <Outlet />
              </>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:Id" element={<Product />} />
            <Route path="/cart" element={currentUser!=null?<Cart />:<NotFound/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/placeorder" element={currentUser!=null?<PlaceOrder />:<NotFound/>} />
            <Route path="/user" element={currentUser!=null?<User />:<Login/>} />
            <Route path="/search" element={<Search />} />
            <Route path="/adminpanel" element={isAdmin?<AdminPanel/>:<NotFound/>}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      </div>
  )
}

export default RoutesPage