import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ShopContextProvider from "./Contexts/ShopContext.jsx";
import UserContextProvider from "./Contexts/UserContext.jsx";
import {Provider} from 'react-redux'
import store from "./Redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <UserContextProvider>
        <ShopContextProvider>
          <App />
        </ShopContextProvider>
      </UserContextProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
