import {createSlice} from '@reduxjs/toolkit'
import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


const INITIAL_STATE = {
    products: [],
    productsByCategory: [],
    originalProducts: [],
    newCollection: [],
    productById: {},
    loading: false,
    error: null
}

const fetchAllProducts = createAsyncThunk('public/fetchAllProducts', async () => {
    const response = await axios.get('http://localhost:3001/api/public/products')
    return response.data.data
})

const fetchProductById = createAsyncThunk('public/fetchProductById', async (id) => {
    const response = await axios.get(`http://localhost:3001/api/public/products/${id}`)
    return response.data.data
})

const fetchProductsByCategory = createAsyncThunk('public/fetchProductsByCategory', async (category) => {
    const response = await axios.get(`http://localhost:3001/api/public/products/category/${category}`)
    return response.data.data
})

const fetchNewCollection = createAsyncThunk('public/fetchNewCollection', async () => {
    const response = await axios.get('http://localhost:3001/api/public/products/collection/latest')
    return response.data.data
})

const fetchOriginalProducts = createAsyncThunk('public/fetchOriginalProducts', async () => {
    const response = await axios.get('http://localhost:3001/api/public/products/collection/original')
    return response.data.data
})

const publicSlice = createSlice({
    name: 'public',
    initialState: INITIAL_STATE,    
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.products = action.payload
            state.loading = false
        }),
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(fetchAllProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        }),
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.productById = action.payload
            state.loading = false
        }),
        builder.addCase(fetchProductById.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        }),
        builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
            state.productsByCategory = action.payload
            state.loading = false
        })
        builder.addCase(fetchProductsByCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchProductsByCategory.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(fetchNewCollection.fulfilled, (state, action) => {
            state.newCollection = action.payload
            state.loading = false
        })
        builder.addCase(fetchNewCollection.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchNewCollection.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        builder.addCase(fetchOriginalProducts.fulfilled, (state, action) => {
            state.originalProducts = action.payload
            state.loading = false
        })
        builder.addCase(fetchOriginalProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchOriginalProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export {fetchAllProducts, fetchProductById, fetchProductsByCategory, fetchNewCollection, fetchOriginalProducts}
export default publicSlice