import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ShopContextProvider from "./Contexts/ShopContext.jsx";
import UserContextProvider from "./Contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
);
