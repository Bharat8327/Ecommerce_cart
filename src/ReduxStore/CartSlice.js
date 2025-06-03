import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        tax:5,
        code:"patel",
    },
    reducers: {
        addToCart: (state, action) => {
            const tempitem = state.cart.find(it => it.id == action.payload.id)
            if (tempitem) {
                tempitem.quantity += 1;
                return;
            }
            state.cart.push({
                quantity: 1,
                id: action.payload.id,
                itemList: action.payload.item
            })
        },
        removeFromcart: (state, action) => {
            const cartItem = state.cart.find(item => item.id == action.payload)
            if (cartItem) {
                cartItem.quantity -= 1
                if (cartItem.quantity == 0) {
                    state.cart = state.cart.filter(item => item.id != action.payload)
                }
            }
        },
        Discard: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload)
        }
    }
})

export default cartSlice.reducer
export const { addToCart, removeFromcart, Discard } = cartSlice.actions

/*.
mvc=> model view controller*/