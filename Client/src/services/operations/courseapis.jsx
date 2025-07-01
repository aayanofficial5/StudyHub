import { toast } from "react-hot-toast";
import { apiConnector } from "./../apiConnector";
import { courseEndpoints } from "../apiCollection";

const {
  getCourseCategoriesApi,
  editCourseDetailsApi,
  createCourseApi,
  getCourseDetailsApi,
  getAllCoursesApi,
  createSectionApi,
  updateSectionApi,
  deleteSectionApi,
  createSubSectionApi,
  updateSubSectionApi,
  deleteSubSectionApi,
  getInstructorCoursesApi,
  deleteCourseApi,
  createCourseCategoriesApi,
  getStudentCoursesApi,
  getCoursesBySearchApi,
  getFullDetailsOfCourseApi,
  lectureCompletionApi,
  createRatingApi,
  getAllRatingApi,
} = courseEndpoints;

/********************************************************************
|                          category APIs                            |
*********************************************************************/

// getCourseCategories
export const getCourseCategories = async (home = true) => {
  let toastId = null;
  home && (toastId = toast.loading("Loading..."));
  try {
    const response = await apiConnector("GET", getCourseCategoriesApi);
    // console.log("Fetching Course Categories Response: ",response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    // console.log(response.data.data);
    return response?.data?.data;
  } catch (error) {
    console.log("Error during fetching Categories" + error.message);
    toast.error(error?.response?.data?.message || "Failed to load categories.");
    return [];
  } finally {
    home && toast.dismiss(toastId);
  }
};

// createCategory
export const createCategory = async (data,token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      createCourseCategoriesApi,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("CREATE CATEGORY API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log(
      "CREATE CATEGORY API ERROR............",
      error?.response?.data?.message
    );
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

/********************************************************************
|                            course APIs                            |
*********************************************************************/
// create Course
export const createCourse = async (data,token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", createCourseApi, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log(
      "CREATE COURSE API ERROR............",
      error?.response?.data?.message
    );
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

// delete Course
export const deleteCourse = async (courseId,token) => {
  const toastId = toast.loading("Deleting Course...");
  let result = null;
  try {
    const response = await apiConnector(
      "DELETE",
      deleteCourseApi+courseId,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log(
      "DELETE COURSE API ERROR............",
      error?.response?.data?.message
    );
    toast.error(error?.response?.data?.message || "Failed to delete course.");
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// edit the Course details
export const editCourseDetails = async (data,token) => {
  let result = null;
  const toastId = toast.loading("Updating Course...");
  try {
    const response = await apiConnector("PUT", editCourseDetailsApi, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("EDIT COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error.message);
    toast.error(error?.response?.data?.message);
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// get all courses
export const getAllCourses = async () => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("GET", getAllCoursesApi);
    // console.log("Fetching All Course Response: ",response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    // console.log(response.data.data);
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during fetching all Courses" + error);
    toast.error(error?.response?.data?.message || "Failed to load courses.");
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// get course details
export const getCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading Course Details...");
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      `${getCourseDetailsApi}/${courseId}`
    );
    // console.log("Fetching Course Details Response: ",response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during fetching course details: ", error);
    toast.error(
      error?.response?.data?.message || "Failed to load course details."
    );
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// get Instructor courses
export const getInstructorCourses = async (token) => {
  const toastId = toast.loading("Loading Courses...");
  let result = null;
  try {
    const response = await apiConnector("GET", getInstructorCoursesApi, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("Instructor Courses Response: ", response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log(
      "Error during fetching instructor courses: ",
      error.response?.data?.message
    );
    toast.error(error?.response?.data?.message || "Failed to load courses.");
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// get Student courses
export const getStudentCourses = async (token) => {
  const toastId = toast.loading("Loading Courses...");
  let result = null;
  try {
    const response = await apiConnector("GET", getStudentCoursesApi, null, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("Student Courses Response: ",response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log(
      "Error during fetching student courses: ",
      error.response?.data?.message
    );
    toast.error(error?.response?.data?.message || "Failed to load courses.");
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// getCourseBySearch courses
export const getCoursesBySearch = async (searchTerm) => {
  try {
    // console.log(getCoursesBySearchApi + searchTerm);
    const response = await apiConnector(
      "GET",
      getCoursesBySearchApi + searchTerm
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    return response.data.data;
  } catch (err) {
    console.log("Error in fetching courses by search:", err);
    return null;
  }
};

// get full details of a course
export const getFullDetailsOfCourse = async (courseId,token) => {
  const toastId = toast.loading("Loading...");
  //   dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      getFullDetailsOfCourseApi + courseId,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("Full Course Details Api error:", error);
    result = error.response.data;
    toast.error(
      error.response.data.message || "Failed to load course details."
    );
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

/********************************************************************
|                           section APIs                            |
*********************************************************************/
// create section
export const createSection = async ({ sectionName, courseId },token) => {
  const toastId = toast.loading("Creating section...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      createSectionApi,
      {
        sectionName,
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during section creation: ", error);
    toast.error(error?.response?.data?.message || "Failed to create section.");
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// update Section
export const updateSection = async ({ sectionId, sectionName },token) => {
  const toastId = toast.loading("Updating section...");
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      updateSectionApi,
      {
        sectionId,
        sectionName,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during section updating: ", error);
    toast.error(error?.response?.data?.message || "Failed to update section.");
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// delete Section
export const deleteSection = async ({ sectionId, courseId },token) => {
  const toastId = toast.loading("Deleting section...");
  let result = null;
  try {
    const response = await apiConnector(
      "DELETE",
      deleteSectionApi,
      {
        sectionId,
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("section deleted successfully response :", response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during section deletion: ", error);
    toast.error(error?.response?.data?.message || "Failed to delete section.");
  } finally {
    toast.dismiss(toastId);
    // console.log(result);
    return result;
  }
};

/********************************************************************
|                        subSection APIs                            |
*********************************************************************/

// create subSection
export const createSubSection = async (formData,token) => {
  const toastId = toast.loading("Creating Lecture...");
  let result = null;
  try {
    const response = await apiConnector("POST", createSubSectionApi, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during subSection creation: ", error);
    toast.error(
      error?.response?.data?.message || "Failed to create subSection."
    );
  } finally {
    toast.dismiss(toastId);
    // console.log(result);
    return result;
  }
};

// update subSection
export const updateSubSection = async (formData,token) => {
  const toastId = toast.loading("Updating Lecture...");
  let result = null;
  try {
    const response = await apiConnector("PUT", updateSubSectionApi, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during subSection editing: ", error);
    toast.error(error?.response?.data?.message || "Failed to edit subSection.");
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// delete subSection
export const deleteSubSection = async (subSectionId,token) => {
  const toastId = toast.loading("Deleting Lecture...");
  let result = null;
  try {
    const response = await apiConnector(
      "DELETE",
      deleteSubSectionApi,
      {
        subSectionId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during subSection deletion: ", error);
    toast.error(
      error?.response?.data?.message || "Failed to delete subSection."
    );
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// mark a lecture as complete
export const markLectureAsComplete = async (data,token) => {
  let result = null;
  // console.log("mark complete data", data);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", lectureCompletionApi, data, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("lecture completion Response : ",response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success(response.data.message || "Lecture Completed");
    result = true;
  } catch (error) {
    console.log("lecture completion error : ", error);
    toast.error(
      error.response.data.message || "Failed to mark lecture as complete."
    );
    result = false;
  }
  toast.dismiss(toastId);
  return result;
};

/********************************************************************
|                        Rating APIs                            |
*********************************************************************/

// create a rating for course
export const createRating = async (data,token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const response = await apiConnector("POST", createRatingApi, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("create rating api resposnse : ", response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message || "Rating created successfully");
    success = true;
  } catch (error) {
    success = false;
    console.log("error in creating a rating : ", error);
    toast.error(error?.response?.data?.message || "Failed to create rating.");
  }
  toast.dismiss(toastId);
  return success;
};

export const getAllRating = async () => {
  let result = null;
  try {
    const response = await apiConnector("GET", getAllRatingApi);
    console.log("get all rating api resposnse : ", response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("error in fetching rating : ", error);
    toast.error(
      error?.response?.data?.message || "Failed to fetch Testimonials."
    );
  }
  return result;
};
