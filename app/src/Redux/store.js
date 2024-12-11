import { configureStore } from "@reduxjs/toolkit";
import publicSlice from "./PublicSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    public: publicSlice,
    user: userSlice,
  },
});

export default store;
