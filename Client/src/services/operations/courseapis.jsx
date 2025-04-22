import { toast } from "react-hot-toast";
import { apiConnector } from "./../apiConnector";
import { courses } from "../apiCollection";

const {
  getCourseCategoriesApi,
  editCourseDetailsApi,
  createCourseApi,
  getAllCoursesApi,
  createSectionApi,
  updateSectionApi,
  deleteSectionApi,
} = courses;

// category APIs

// getCourseCategories
export const getCourseCategories = async () => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("GET", getCourseCategoriesApi);
    // console.log("Fetching Course Categories Response: ",response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.dismiss(toastId);
    // console.log(response.data.data);
    return response?.data?.data;
  } catch (error) {
    console.log("Error during fetching Categories" + error.message);
    toast.error(error.message || "Failed to load categories.");
    return [];
  }
};

// course APIs

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

// edit the Course details
export const editCourseDetails = async (data) => {
  let result = null;
  const toastId = toast.loading("Loading...");
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
  try {
    const response = await apiConnector("GET", getAllCoursesApi);
    // console.log("Fetching All Course Response: ",response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.dismiss(toastId);
    // console.log(response.data.data);
    return response?.data?.data;
  } catch (error) {
    console.log("Error during fetching all Courses" + error.message);
    toast.error(error.message || "Failed to load courses.");
    return [];
  }
};

// create section
export const createSection = async (sectionName,courseId) => {
  const toastId = toast.loading("Creating section...");
  let result=null;
  try {
    const response = await apiConnector("POST",createSectionApi,{sectionName,courseId});
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data
  } catch (error) {
    console.log("Error during section creation: ", error.message);
    toast.error(error?.response?.data?.message || "Failed to create section.");
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// edit Section
export const updateSection = async ({sectionId, sectionName}) => {
  const toastId = toast.loading("Editing section...");
  let result=null;
  try {
    const response = await apiConnector("PUT", editSectionApi, sectionName);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }
    toast.success(response?.data?.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Error during section editing: ", error.message);
    toast.error(error?.response?.data?.message || "Failed to edit section.");
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// delete Section
