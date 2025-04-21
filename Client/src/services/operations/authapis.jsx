import { toast } from "react-hot-toast";

import { setLoading, setToken } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { auth } from "../apiCollection";
import { setUser } from "../../redux/slices/profileSlice";
import { resetCart } from "../../redux/slices/cartSlice";

// sendOtp
export const sendOtp = (email, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", auth.sendOTP, {
        email,
      });
      console.log("OTP Sent Response:", response.data);
      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }
      toast.success(response?.data?.message);
      navigate("/email-verification");
    } catch (error) {
      console.error("Send OTP error:", error);
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

// signup
export const signup = (
  { firstName, lastName, email, password, confirmPassword, accountType, otp },
  navigate
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", auth.signup, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp,
      });
      // console.log("Account Creation Response:", response.data);
      if (!response.data?.success) {
        throw new Error(response.data?.message);
      }
      toast.success(response?.data?.message);
      navigate("/login");
      console.log("navigate to login");
    } catch (error) {
      console.error("Account Creation Error:", error);
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

//login
export const login = ({ email, password }, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", auth.login, {
        email,
        password,
      });
      console.log("Login Response:", response.data);
      if (!response.data?.success) {
        throw new Error(response.data?.message);
      }
      toast.success(response.data?.message);
      dispatch(setToken(response.data?.user?.token));
      const user = response.data?.user;
      user.gender = response.data?.user?.additionalDetails?.gender;
      user.dateOfBirth = response.data?.user?.additionalDetails?.dateOfBirth;
      user.contactNumber =
        response.data?.user?.additionalDetails?.contactNumber;
      user.about = response.data?.user?.additionalDetails?.about;
      user.additionalDetails = undefined;
      dispatch(setUser(user));
      localStorage.setItem("token", response.data?.user?.token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.error("Login Error:", error);
      const errMsg = error.response.data?.message || "Something went wrong";
      toast.error(errMsg);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

// resetPasswordLink
export const resetPasswordLink = (email, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", auth.resetToken, {
        email,
      });
      // console.log("Reset Password Link Response:", response.data);
      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }
      toast.success(response?.data?.message);
      navigate("/reset-password");
    } catch (error) {
      console.error("Reset Password Link Error:", error);
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

// resetPassword
export const resetPassword = (
  { token, password, confirmPassword },
  navigate
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", auth.resetPassword, {
        token,
        password,
        confirmPassword,
      });
      // console.log("Reset Password Response:", response.data);
      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }
      toast.success(response?.data?.message);
      navigate("/login");
    } catch (err) {
      console.log(err?.response?.data?.message || "Something went wrong");
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

// logout
export const logout = (navigate) => {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out Sucessfully");
    navigate("/login");
  };
};

// Contact Us Data
export const contactUsData = async (data) => {
  try {
    const response = await apiConnector("POST", auth.contactUsData, data);
    // console.log("Contact Us Data Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Contact Us Data Error:", error);
    const errMsg = error.response?.data?.message || "Something went wrong";
    toast.error(errMsg);
  }
};

// Get All Contact Us Data : Admin
export const getAllContactUsData = async () => {
  try {
    const response = await apiConnector("GET", auth.getAllContactUsData);
    // console.log("Get All Contact Us Data Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get All Contact Us Data Error:", error);
    const errMsg = error.response?.data?.message || "Something went wrong";
    toast.error(errMsg);
  }
};
