
export const courseEndpoints = {
  // course
  createCourseApi: "/course",
  getAllCoursesApi: "/course",
  getCourseDetailsApi: "/course",
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


export const authEndpoints = {
  loginApi: "/auth/login",
  signupApi: "/auth/signup",
  sendOTPApi: "/auth/otp",
  resetTokenApi: "/auth/reset-token",
  resetPasswordApi: "/auth/reset-password",
  };

export const settingsEndpoints = {
  getUserDetailsApi: "/profile/me",
  updateProfileApi: "/profile",
  deleteAccountApi: "/profile",
  updateProfilePictureApi: "/profile/picture",
  updatePasswordApi: "/profile/password",
};

export const contactUsEndpoints = {
  contactUsDataApi: "/auth/contact-us",
  getAllContactUsDataApi: "/auth/contact-us",
}

export const catalogPageDataEndpoints = {
  getCatalogPageDataApi:"/course/getCategoryPageDetails",
}