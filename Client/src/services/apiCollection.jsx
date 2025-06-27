import { getFullDetailsOfCourse } from "./operations/courseapis";

export const courseEndpoints = {
  // course
  createCourseApi: "/course",
  getAllCoursesApi: "/course",
  getCourseDetailsApi: "/course",
  editCourseDetailsApi: "/course",
  deleteCourseApi: "/course",
  getInstructorCoursesApi: "/course/instructor",
  getStudentCoursesApi: "/course/student",
  getCoursesBySearchApi: "/course/search/",
  getFullDetailsOfCourseApi: "/course/full/",
  // category
  getCourseCategoriesApi: "/course/categories",
  createCategoryApi: "/course/categories",

  // section
  createSectionApi: "/course/section",
  updateSectionApi: "/course/section",
  deleteSectionApi: "/course/section",
  //subSection
  createSubSectionApi: "/course/section/subsection",
  updateSubSectionApi: "/course/section/subsection",
  deleteSubSectionApi: "/course/section/subsection",
  // progress,
  lectureCompletionApi: "/course/progress",
  // rating and review
  createRatingApi: "/course/rating",
  getAllRatingApi: "/course/rating",
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
};

export const catalogPageDataEndpoints = {
  getCatalogPageDataApi: "/course/category-page",
};

export const paymentEndpoints = {
  coursePaymentApi: "/payment/capture",
  verifyPaymentApi: "/payment/verify",
  sendPaymentSuccessEmailApi: "/payment/success-email",
};
