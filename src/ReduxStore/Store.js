import { configureStore } from "@reduxjs/toolkit";
import Product from "./ProductSlice";
import cartReducer from "./CartSlice";
export default configureStore({
    reducer: {
        Product,
        cartReducer,
    }
});