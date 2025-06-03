import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk("product/fetch", async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    return await response.json();

})

const ProductSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        status: 'idle',//idle , loading , success , failed
        error: null
    },
    // reducers: {
    //     loadProductss: (state, action) => {
    //         state.products = action.payload
    //     },
    // },
    extraReducers: function (builder) {
        builder
            .addCase(fetchData.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.products = action.payload;
                state.status = 'success';
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'network issue'
                state.error = action.error.message
            })
    }
});

export default ProductSlice.reducer;

export const { loadProductss } = ProductSlice.actions