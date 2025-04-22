import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 2,
  course:null
  ||{
    courseName:"Web D",
    courseDescription: "d",
    price:"123",
    tag:["aa","bb"],
    whatYouWillLearn:"aa",
    category:"WebDevelopment",
    thumbnail:"m",
    courseContent:[{_id:"1",sectionName:"Section1",subSections:[{subSectionName:"Lec1"}]},{_id:"2",sectionName:"Section2",subSection:[{subSectionName:"Lec1"}]}]
  }
  ,
  editCourse: false,
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
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
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
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions;
export default courseSlice.reducer;
