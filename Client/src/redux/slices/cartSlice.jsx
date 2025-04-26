import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: localStorage.getItem("totalItems") || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //set total items
    setTotalItems(state, action) {
      state.totalItems = action.payload;
    },
    addToCart(state, action) {
      state.totalItems += 1;
    },
    removeFromCart(state, action) {
      state.totalItems -= 1;
    },
    resetCart(state, action) {
      state.totalItems = 0;
    },
  },
});

export const { setTotalItems, addToCart, removeFromCart, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
