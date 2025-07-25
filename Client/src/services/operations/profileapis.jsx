import toast from "react-hot-toast";
import { profileEndpoints } from "../apiCollection";
import { apiConnector } from "./../apiConnector";
import { setUser } from "../../redux/slices/profileSlice";
import { logout } from "./authapis";

const {
  updateProfilePictureApi,
  updatePasswordApi,
  deleteAccountApi,
  updateProfileApi,
  getUserDetailsApi,
  getInstructorReportsApi,
} = profileEndpoints;

// profilePictureUpdate
export const profilePictureUpdate = (profilePicture,token) => {
  const formData = new FormData();
  formData.append("profilePicture", profilePicture);
  return async (dispatch, getState) => {
    const toastId = toast.loading("Updating Profile Picture...");
    try {
      const response = await apiConnector(
        "PUT",
        updateProfilePictureApi,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const user = getState().profile.user;

      const updatedUser = {
        ...user,
        image: response.data.profilePicture,
      };

      dispatch(setUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success(response.data.message);
    } catch (error) {
      console.error("Profile Picture Update Error:", error);
      const errMsg = error?.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
    } finally {
      toast.dismiss(toastId);
    }
  };
};

// updatePassword
export const updatePassword = async  (password,token) => {
    const toastId = toast.loading("Updating Password...");
    try {
      const response = await apiConnector("PATCH", updatePasswordApi, password, {
        Authorization: `Bearer ${token}`,
      });
      console.log(response);
      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }
      toast.success(response?.data?.message);
    } catch (error) {
      console.error("Update Password Error:", error);
      const errMsg = error?.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
    } finally {
      toast.dismiss(toastId);
    }
};

// deleteAccount
export const deleteAccount = (navigate,token) => {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting Account...");
    try {
      const response = await apiConnector("DELETE", deleteAccountApi,null, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Delete Account Error:", error);
      const errMsg = error?.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
    } finally {
      toast.dismiss(toastId);
    }
  };
};

// updateProfile
export const updateProfile = (updatedUser,token) => {
  return async (dispatch, getState) => {
    const toastId = toast.loading("Updating Profile...");
    try {
      const response = await apiConnector(
        "PUT",
        updateProfileApi,
        updatedUser,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const user = getState().profile.user;
      const newUser = {
        ...user,
        ...updatedUser,
      };

      dispatch(setUser(newUser));
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success(response.data.message);
    } catch (error) {
      console.error("Update Profile Error:", error);
      const errMsg = error?.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
    } finally {
      toast.dismiss(toastId);
    }
  };
};

// getUserDetails
export const getUserDetails = async (token) => {
  let result = null;
  const toastId = toast.loading("Fetching User Details...");
  try {
    const response = await apiConnector("GET", getUserDetailsApi, null,{
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    const user = response.data.user;
    const userDetails = {
      ...user,
      ...user.additionalDetails,
    };
    result = userDetails;
  } catch (error) {
    console.error("Get User Details Error:", error);
    const errMsg = error?.response?.data?.message || "Something went wrong";
    toast.error(errMsg);
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};

// getInstructorReposts
export const getInstructorReports = async (token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("GET", getInstructorReportsApi,null, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.error("Error in fetching Instructor Reports:", error);
    const errMsg = error?.response?.data?.message || "Error Fetching Reports!";
    toast.error(errMsg);
  } finally {
    toast.dismiss(toastId);
    return result;
  }
};
