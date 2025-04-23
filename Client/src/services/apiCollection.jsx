
export const course = {
  // course
  createCourseApi: "/course",
  getAllCoursesApi: "/course",
  getCourseDetailsApi: "/course/details",
  editCourseDetailsApi: "/course",
  deleteCourseApi: "/course",
  getInstructorCoursesApi:"/course/instructor",
  // category
  getCourseCategoriesApi: "/course/categories",
  // section
  createSectionApi:"/course/section",
  updateSectionApi:"/course/section",
  deleteSectionApi: "/course/section",
  //subSection
  createSubSectionApi: "/course/section/subsection",
  updateSubSectionApi: "/course/section/subsection",
  deleteSubSectionApi: "/course/section/subsection",
};


export const auth = {
  login: "/auth/login",
  signup: "/auth/signup",
  logout: "/auth/logout",
  sendOTP: "/auth/otp",
  resetToken: "/auth/reset-token",
  resetPassword: "/auth/reset-password",
  contactUsData: "/auth/contact-us",
  getAllContactUsData: "/auth/contact-us",
};

export const profile = {
  getUserDetails: "/profile/me",
  updateProfile: "/profile",
  deleteAccount: "/profile",
  updateProfilePicture: "/profile/picture",
  updatePassword: "/profile/password",
};
