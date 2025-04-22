
export const courses = {
  createCourseApi: "/course",
  getAllCoursesApi: "/course",
  getCourseDetailsApi: "/course/details",
  editCourseDetailsApi: "/course",
  deleteCourseApi: "/course",
  // category
  getCourseCategoriesApi: "/course/categories",
  // section
  createSectionApi:"/course/section",
  updateSectionApi:"/course/section",
  deleteSectionApi: "/course/section",
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
