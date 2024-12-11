import { createSlice } from "@reduxjs/toolkit";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axiosInstance from "../utilities/axiosInstance";

const userCookie = Cookies.get("user");
const currentUser = userCookie ? JSON.parse(userCookie) : null;

const INITIAL_STATE = {
  loading: false,
  error: null,
  currentUser: currentUser,
  isAdmin: false,
  userCart: [],
  userCartCount: 0,
  userWishlist: [],
};

// Fetch Cart
const getCart = createAsyncThunk(
  "user/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/cart");
      return response.data.data?.products || [];
    } catch (err) {
      const errMessage = axiosErrorManager(err);
      return rejectWithValue(errMessage);
    }
  }
);

// Fetch Cart Count
const getCartCount = createAsyncThunk(
  "user/getCartCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/cart/stats");
      return response.data.count || 0;
    } catch (err) {
      const errMessage = axiosErrorManager(err);
      return rejectWithValue(errMessage);
    }
  }
);

// Fetch Wishlist
const getWishlist = createAsyncThunk(
  "user/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/wishList");
      return response.data?.products || [];
    } catch (err) {
      const errMessage = axiosErrorManager(err);
      return rejectWithValue(errMessage);
    }
  }
);

// Add to Wishlist
const addToWishList = createAsyncThunk(
  "user/addToWishList",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/wishList", {
        productId,
      });
      return response.data.data;
    } catch (err) {
      const errMessage = axiosErrorManager(err);
      return rejectWithValue(errMessage);
    }
  }
);

// Remove from Wishlist
const removeFromWishList = createAsyncThunk(
  "user/removeFromWishList",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/users/wishList/${productId}`
      );
      return response.data.data;
    } catch (err) {
      const errMessage = axiosErrorManager(err);
      return rejectWithValue(errMessage);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    addToCart: (state, action) => {
      if (
        !state.userCart.find((item) => item.productId?._id === action.payload)
      ) {
        state.userCart.push({
          productId: { _id: action.payload },
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.userCart = state.userCart.filter(
        (item) => item.productId._id !== action.payload
      );
    },
    updateCartQuantity: (state, action) => {
      state.userCart = state.userCart.map((item) => {
        if (item.productId._id === action.payload.productId) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.userCart = action.payload;
      state.loading = false;
    });
    builder.addCase(getCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.error = action.payload;
    });
    builder.addCase(getWishlist.fulfilled, (state, action) => {
      state.userWishlist = action.payload;
      state.loading = false;
    });
    builder.addCase(getWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getWishlist.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.error = action.payload;
    });
    builder.addCase(addToWishList.fulfilled, (state, action) => {
      if (!state.userWishlist.find((item) => item._id === action.payload._id)) {
        state.userWishlist.push(action.payload);
      }
      state.loading = false;
    });
    builder.addCase(addToWishList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addToWishList.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.error = action.payload;
    });
    builder.addCase(removeFromWishList.fulfilled, (state, action) => {
      state.userWishlist = state.userWishlist.filter(
        (item) => item._id !== action.payload._id
      );
      state.loading = false;
    });
    builder.addCase(removeFromWishList.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeFromWishList.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.error = action.payload;
    });
    builder.addCase(getCartCount.fulfilled, (state, action) => {
      state.userCartCount = action.payload;
      state.loading = false;
    });
    builder.addCase(getCartCount.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCartCount.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export {
  getCart,
  getWishlist,
  addToWishList,
  removeFromWishList,
  getCartCount,
};
export const {
  setCurrentUser,
  addToCart,
  setIsAdmin,
  removeFromCart,
  updateCartQuantity,
} = userSlice.actions;
export default userSlice.reducer;
