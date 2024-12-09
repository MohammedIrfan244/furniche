import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./Pages/Home";
import Collection from "./Pages/Collection";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import NavBar from "./Components/NavBar";
import Search from "./Pages/Search";
import Login from "./Pages/Login";
import SignIn from "./Pages/SignIn";
import User from "./Pages/User";
import NotFound from "./Pages/NotFound";
import { useContext } from "react";
import { UserContext } from "./Contexts/UserContext";
import AdminPanel from "./Admin/AdminPanel";
import UserManipulate from "./Admin/UserManipulate";
import ProductManipulation from "./Admin/ProductManipulation";
import Layout from "./Layout/Layout";
import { useSelector } from "react-redux";
import Wishlist from "./Pages/Wishlist";
import CheckoutSingle from "./Pages/CheckoutSingle";
import CheckoutCart from "./Pages/CheckoutCart";
import StripeSuccess from "./Pages/StripeSuccess";
import StripeCancel from "./Pages/StripeCancel";
import Order from "./Pages/Order";
function RoutesPage() {
  const {  isAdmin } = useContext(UserContext);
  const {currentUser}=useSelector((state)=>state.user)
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
            <Route path="/wishlist" element={currentUser?<Wishlist />:<NotFound/>} />
            <Route path="/product/:Id" element={<Product />} />
            <Route
              path="/cart"
              element={currentUser != null ? <Cart /> : <NotFound />}
            />
            <Route
            path="/orders/:id"
            element={currentUser?<Order/>:<NotFound/>}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/checkout/product/:id"
              element={currentUser?<CheckoutSingle/>:<NotFound/>}
            />
            <Route
            path="/checkout/products/cart"
            element={currentUser?<CheckoutCart/>:<NotFound/>}
            />
            <Route 
            path="/success/:sessionId"
            element={currentUser? <StripeSuccess/> : <NotFound />}
            />
            <Route
            path=""
            element={currentUser?<StripeCancel/> : <NotFound />}
            />
            <Route
              path="/user"
              element={currentUser != null ? <User /> : <NotFound />}
            />
            <Route path="/search" element={<Search />} />
          </Route>
          <Route
            path="/adminpanel"
            element={isAdmin ? <AdminPanel /> : <NotFound />}
          />
          <Route
            path="/adminpanel/useraction/:userId"
            element={isAdmin ? <UserManipulate /> : <NotFound />}
          />
          <Route
            path="/adminpanel/productaction/:productId"
            element={isAdmin ? <ProductManipulation /> : <NotFound />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default RoutesPage;
