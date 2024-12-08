import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userCookie = Cookies.get("user");
const currentUser = userCookie ? JSON.parse(userCookie) : null;


const INITIAL_STATE = {
  loading: false,
  error: null,
  currentUser: currentUser,
  userCart: [],
  userCartCount: 0,
  userWishlist: [],
};

const getCart = createAsyncThunk(
  "user/getCart",
  async (_, { rejectWithValue }) => {
    try {
        const token=Cookies.get('token')
      const response = await axios.get("http://localhost:3001/api/users/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data?.products;
    } catch (err) {
      const errMessage = axiosErrorManager(err);
      return rejectWithValue(errMessage);
    }
  }
);

const getCartCount = createAsyncThunk(
  "user/getCartCount",
  async (_, { rejectWithValue }) => {
    try {
        const token=Cookies.get('token')
      const response = await axios.get("http://localhost:3001/api/users/cart/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.count;
    } catch (err) {
      const errMessage = axiosErrorManager(err);
      return rejectWithValue(errMessage);
    }
  }
);

const getWishlist=createAsyncThunk('user/getWishlist',async(_, {rejectWithValue})=>{
    try{
        const token=Cookies.get('token')
        const response=await axios.get('http://localhost:3001/api/users/wishList',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data?.products
    }catch(err){
        const errMessage=axiosErrorManager(err)
        return rejectWithValue(errMessage)
    }
})

const addToWishList=createAsyncThunk('user/addToWishList',async(productId, {rejectWithValue})=>{
    try{
        const token=Cookies.get('token')
        const response=await axios.post('http://localhost:3001/api/users/wishList',{productId:productId},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data.data
    }catch(err){
        const errMessage=axiosErrorManager(err)
        return rejectWithValue(errMessage)
    }
})

const removeFromWishList=createAsyncThunk('user/removeFromWishList',async(productId, {rejectWithValue})=>{
    try{
        const token=Cookies.get('token')
        const response=await axios.delete(`http://localhost:3001/api/users/wishList/${productId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response.data.data
    }catch(err){
        const errMessage=axiosErrorManager(err)
        return rejectWithValue(errMessage)
    }
})

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addToCart: (state, action) => {
      if(!state.userCart.find(item=>item.productId?._id===action.payload)){
        state.userCart.push({productId:{_id:action.payload},quantity:1});
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
      }
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
      state.error = action.payload;
    });
    builder.addCase(getWishlist.fulfilled,(state,action)=>{
        state.userWishlist=action.payload
        state.loading=false
    })
    builder.addCase(getWishlist.pending,(state)=>{
        state.loading=true
        state.error=null
    })
    builder.addCase(getWishlist.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
    builder.addCase(addToWishList.fulfilled,(state,action)=>{
       if(!state.userWishlist.find(item=>item._id===action.payload._id)){
        state.userWishlist.push(action.payload)
       }
        state.loading=false
    })
    builder.addCase(addToWishList.pending,(state)=>{
        state.loading=true
        state.error=null
    })
    builder.addCase(addToWishList.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
    builder.addCase(removeFromWishList.fulfilled,(state,action)=>{
        state.userWishlist=state.userWishlist.filter(item=>item._id!==action.payload._id)
        state.loading=false
    })
    builder.addCase(removeFromWishList.pending,(state)=>{
        state.loading=true
        state.error=null
    })
    builder.addCase(removeFromWishList.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
    })
    builder.addCase(getCartCount.fulfilled,(state,action)=>{
        state.userCartCount=action.payload
        state.loading=false
    })
    builder.addCase(getCartCount.pending,(state)=>{
        state.loading=true
        state.error=null
    })
    builder.addCase(getCartCount.rejected,(state,action)=>{
      console.log(action.payload)
        state.loading=false
        state.error=action.payload
    })
  },
});

export { getCart,getWishlist , addToWishList, removeFromWishList, getCartCount };
export const { setCurrentUser,addToCart ,removeFromCart,updateCartQuantity} = userSlice.actions;
export default userSlice.reducer;
