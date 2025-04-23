import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course: null
  ||{
    _id: "67f697227ad30f3cdb94be96",
    courseName: "Web Development",
    courseDescription: "Learn from basic to advance level",
    instructor: {
        _id: "67f6927ae6e9d65692cd8ef2",
        firstName: "Pradeep",
        lastName: "Patel",
        email: "patelpradeep5971@gmail.com",
        password: "$2b$10$bqY.qIhoP/.NayZByx/4VuL66pWh8hgcB23WrfAdUB6109sX12DbC",
        accountType: "Instructor",
        active: true,
        approved: true,
        image: "https://ui-avatars.com/api/?name=Pradeep+Patel",
        additionalDetails: {
            _id: "67f6927ae6e9d65692cd8ef0",
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
            __v: 0
        },
        course: [
            "67f697227ad30f3cdb94be96",
            "6806b79a31043d8f531bc806",
            "6807f48c017dee4f7b01f7db",
            "6807f6780107de650b3e7674",
            "68081744c952c3d58f0969dc",
            "680828dc38ec7dcd7ab2bdc5",
            "68083455d3ae7d3031f19f24"
        ],
        courseProgress: [],
        __v: 0
    },
    whatYouWillLearn: "HTML,CSS,JavaScript,React,Node.js,MongoDb,Express",
    courseContent: [
        {
            _id: "67f6bc69898368e2dd70c691",
            sectionName: "Basic HTML",
            subSection: [
                {
                    _id: "67f6bf70d128a442236e7d08",
                    subSectionName: "Why HTML?",
                    description: "learn basic of html",
                    timeDuration: "19.20",
                    videoUrl: "https://res.cloudinary.com/djpjyg8my/video/upload/v1744224111/knowgeek/nlz5ii5wghkxvfids7tk.mp4",
                    sectionId: "67f6bc69898368e2dd70c691",
                    __v: 0
                },
                {
                    _id: "680825b738ec7dcd7ab2bda8",
                    subSectionName: "Why HTML ebab?",
                    description: "learn basic of html",
                    sectionId: "67f6bc69898368e2dd70c691",
                    __v: 0
                }
            ],
            courseId: "67f697227ad30f3cdb94be96",
            __v: 0
        }
    ],
    ratingAndReviews: [],
    price: 2999,
    thumbnail: "https://res.cloudinary.com/djpjyg8my/image/upload/v1744211663/knowgeek/b3letzajswfnq1paibqi.jpg",
    category: {
        _id: "67f6969d7ad30f3cdb94be8b",
        name: "WebDevelopment",
        description: "This category covers all essential skills and technologies required to build modern web applications...",
        course: [
            "67f697227ad30f3cdb94be96",
            "6806b79a31043d8f531bc806",
            "6807f48c017dee4f7b01f7db",
            "6807f6780107de650b3e7674",
            "68081744c952c3d58f0969dc",
            "680828dc38ec7dcd7ab2bdc5",
            "68083455d3ae7d3031f19f24"
        ],
        __v: 0
    },
    tag: [
        {
            _id: "67f697227ad30f3cdb94be93",
            name: "javascript",
            course: ["67f697227ad30f3cdb94be96"],
            __v: 0
        },
        {
            _id: "67f697227ad30f3cdb94be94",
            name: "newcourse",
            course: ["67f697227ad30f3cdb94be96", "6807f48c017dee4f7b01f7db"],
            __v: 0
        }
    ],
    studentsEnrolled: [],
    __v: 0
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
