import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.jsx";
import cartReducer from "../slices/cartSlice.jsx"
import profileReducer from "../slices/profileSlice.jsx"
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    profile : profileReducer,
  },
});

export default store;
