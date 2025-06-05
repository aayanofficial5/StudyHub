import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: JSON.parse(localStorage.getItem("totalItems")) || [],
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
      state.totalItems.push(action.payload);
    },
    removeFromCart(state, action) {
      state.totalItems = state.totalItems.filter(
        (item) => item._id != action.payload
      );
    },
    resetCart(state, action) {
      state.totalItems = [];
    },
  },
});

export const { setTotalItems, addToCart, removeFromCart, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
