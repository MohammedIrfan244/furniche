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

function App() {
  return (
    <div className="px-[5%]">
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
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/user" element={<User />} />
            <Route path="/search" element={<Search />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
