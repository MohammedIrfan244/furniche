import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorManager from "../utilities/axiosErrorManager";

const INITIAL_STATE = {
  products: [],
  productsByCategory: [],
  loading: false,
  error: null,
};

const fetchAllProducts = createAsyncThunk(
  "public/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/public/products"
      );
      return response.data.data;
    } catch (err) {
      const errMessage = axiosErrorManager(err);
      return rejectWithValue(errMessage);
    }
  }
);

const fetchProductsByCategory = createAsyncThunk(
  "public/fetchProductsByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/public/products/category/${category}`
      );
      return response.data.data;
    } catch (err) {
      const errMessage = axiosErrorManager(err);
      return rejectWithValue(errMessage);
    }
  }
);

const publicSlice = createSlice({
  name: "public",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    }),
      builder.addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
      builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.productsByCategory = action.payload;
        state.loading = false;
      });
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export { fetchAllProducts, fetchProductsByCategory };
export default publicSlice;
