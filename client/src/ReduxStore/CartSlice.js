import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    tax: 5,
    code: 'patel',
    discount: 0, // Starts with 0, changes only when valid coupon applied
  },
  reducers: {
    addToCart: (state, action) => {
      const tempitem = state.cart.find((it) => it.id === action.payload.id);
      if (tempitem) {
        tempitem.quantity += 1;
        return;
      }
      state.cart.push({
        quantity: 1,
        id: action.payload.id,
        itemList: action.payload.item,
      });
    },

    removeFromcart: (state, action) => {
      const cartItem = state.cart.find((item) => item.id === action.payload);
      if (cartItem) {
        cartItem.quantity -= 1;
        if (cartItem.quantity === 0) {
          state.cart = state.cart.filter((item) => item.id !== action.payload);
        }
      }
    },

    Discard: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    applyCoupon: (state, action) => {
      if (action.payload === state.code) {
        state.discount = 20; // Apply ₹20 discount
      } else {
        state.discount = 0; // Invalid coupon, no discount
      }
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromcart, Discard, applyCoupon } =
  cartSlice.actions;
