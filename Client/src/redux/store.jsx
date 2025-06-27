import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.jsx";
import cartReducer from "./slices/cartSlice.jsx";
import profileReducer from "./slices/profileSlice.jsx";
import courseReducer from "./slices/courseSlice.jsx";
import viewCourseReducer from "./slices/viewCourseSlice.jsx";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    profile: profileReducer,
    course: courseReducer,
    viewCourse: viewCourseReducer,
  },
});

export default store;
