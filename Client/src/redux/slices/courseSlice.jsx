import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course: null,
  courses: [],
  editCourse: false,
  loading: false,
  paymentLoading: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setCourses: (state, action) => {
      state.course = action.payload;
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload;
    },
    resetCourseState: (state, action) => {
      (state.step = 1),
        (state.course = null),
        (state.editCourse = false),
        (state.paymentLoading = false);
    },
  },
});
export const {
  setStep,
  setCourse,
  setEditCourse,
  setLoading,
  setCourses,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions;
export default courseSlice.reducer;
