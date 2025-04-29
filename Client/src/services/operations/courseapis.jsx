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
} = courseEndpoints;

/********************************************************************
|                          category APIs                            |
*********************************************************************/

// getCourseCategories
export const getCourseCategories = async (home=true) => {
  let toastId = null;
  home&&(toastId = toast.loading("Loading..."));
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
    toast.error(error.message || "Failed to load categories.");
    return [];
  } finally{
    home&&toast.dismiss(toastId);
  }
};

/********************************************************************
|                            course APIs                            |
*********************************************************************/
// create Course
export const createCourse = async (data) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", createCourseApi, data, {
      "Content-Type": "multipart/form-data",
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
export const deleteCourse = async (courseId) => {
  const toastId = toast.loading("Deleting Course...");
  let result=null;
  try{
  const response = await apiConnector("DELETE", deleteCourseApi, {courseId});
  if (!response?.data?.success) {
    throw new Error(response?.data?.message);
  }
  toast.success(response?.data?.message);
  result =  response?.data?.data;
}catch(error){
  console.log("DELETE COURSE API ERROR............", error?.response?.data?.message);
  toast.error(error?.response?.data?.message || "Failed to delete course.");
}
finally{
  toast.dismiss(toastId);
  return result;
}
};

// edit the Course details
export const editCourseDetails = async (data) => {
  let result = null;
  const toastId = toast.loading("Updating Course...");
  try {
    const response = await apiConnector("PUT", editCourseDetailsApi, data, {
      "Content-Type": "multipart/form-data",
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
    result =  response?.data?.data;
  } catch (error) {
    console.log("Error during fetching all Courses" + error.message);
    toast.error(error.message || "Failed to load courses.");
  }finally{
    toast.dismiss(toastId);
    return result;
  }
};

// get course details
export const getCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading Course Details...");
  let result = null;
  try {
    const response = await apiConnector("GET", `${getCourseDetailsApi}/${courseId}`);
    // console.log("Fetching Course Details Response: ",response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during fetching course details: ", error.message);
    toast.error(error?.response?.data?.message || "Failed to load course details.");
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// get Instructor courses
export const getInstructorCourses = async () => {
  const toastId = toast.loading("Loading Courses...");
  let result = null;
  try {
    const response = await apiConnector(
      "GET",
      getInstructorCoursesApi
    );
    // console.log("Instructor Courses Response: ",response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during fetching instructor courses: ", error.message);
    toast.error(error?.response?.data?.message || "Failed to load courses.");
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

/********************************************************************
|                           section APIs                            |
*********************************************************************/
// create section
export const createSection = async ({ sectionName, courseId }) => {
  const toastId = toast.loading("Creating section...");
  let result = null;
  try {
    const response = await apiConnector("POST", createSectionApi, {
      sectionName,
      courseId,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during section creation: ", error.message);
    toast.error(error?.response?.data?.message || "Failed to create section.");
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// update Section
export const updateSection = async ({ sectionId, sectionName }) => {
  const toastId = toast.loading("Updating section...");
  let result = null;
  try {
    const response = await apiConnector("PUT", updateSectionApi, {
      sectionId,
      sectionName,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during section updating: ", error.message);
    toast.error(error?.response?.data?.message || "Failed to update section.");
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// delete Section
export const deleteSection = async ({ sectionId, courseId }) => {
  const toastId = toast.loading("Deleting section...");
  let result = null;
  try {
    const response = await apiConnector("DELETE", deleteSectionApi, {
      sectionId,
      courseId,
    });
    // console.log("section deleted successfully response :", response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during section deletion: ", error.message);
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
export const createSubSection = async (formData) => {
  const toastId = toast.loading("Creating Lecture...");
  let result = null;
  try {
    const response = await apiConnector("POST", createSubSectionApi, formData, {
      "Content-Type": "multipart/form-data",
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during subSection creation: ", error.message);
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
export const updateSubSection = async (formData) => {
  const toastId = toast.loading("Updating Lecture...");
  let result = null;
  try {
    const response = await apiConnector("PUT", updateSubSectionApi, formData, {
      "Content-Type": "multipart/form-data",
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during subSection editing: ", error.message);
    toast.error(error?.response?.data?.message || "Failed to edit subSection.");
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// delete subSection
export const deleteSubSection = async (subSectionId) => {
  const toastId = toast.loading("Deleting Lecture...");
  let result = null;
  try {
    const response = await apiConnector("DELETE", deleteSubSectionApi, {
      subSectionId,
    });
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during subSection deletion: ", error.message);
    toast.error(
      error?.response?.data?.message || "Failed to delete subSection."
    );
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};
