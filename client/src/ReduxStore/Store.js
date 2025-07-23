import { configureStore } from '@reduxjs/toolkit';
import productReducer from './ProductSlice';
import cartReducer from './CartSlice';
import wishlistReducer from './wishListSlice';

export default configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
