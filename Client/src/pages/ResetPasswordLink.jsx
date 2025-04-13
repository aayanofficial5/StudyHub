import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { auth } from "../services/apiCollection";
import { toast } from "react-hot-toast";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../slices/authSlice";
import Loading from "./Components/Loading";
const ResetPasswordLink = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [email, setEmail] = useState("");
  const resetPasswordLink = async () => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("POST", auth.resetToken, {
        email,
      });
      console.log("Reset Password Link Response:", response.data);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        return 1;
      } else {
        toast.error(response?.data?.message);
        return 0;
      }
    } catch (error) {
      console.error("Reset Password Link Error:", error);
      const errMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errMsg);
      return 0;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(email);
    const res = await resetPasswordLink({
      email,
    });
    dispatch(setLoading(false));
  };

  return (
    <div className="flex justify-center items-center text-white w-full h-[80vh] text-3xl">
      {loading ? (
        <div class="flex justify-center items-center h-[70vh]">
        <Loading/>
      </div>
      ) : (
      <div className="w-[50%] md:w-[30%] flex flex-col gap-4 justify-center">
        <h1 className="font-semibold opacity-85 text-yellow-400">
          Forgot Password ?
        </h1>
        <p className="text-lg opacity-60">
          Don't worry — we'll send you instructions to reset it.
          <br></br>
          If you no longer have access to your account, we can help you recover
          your account.
        </p>
        <p className="relative text-base opacity-70 -mb-4">
          Email Address{" "}
          <sup className="text-red-500 absolute top-2 text-[17px]">*</sup>
        </p>
        <form>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="rounded-lg border-1 border-gray-300 h-10 w-full text-center text-xl text-white"
          />
          <button
            className="text-xl h-10 w-full bg-blue-500 rounded-lg my-6 cursor-pointer font-semibold"
            onClick={handleFormSubmit}
          >
            Submit
          </button>
        </form>
        <div className="text-base flex justify-between w-full">
          <div className="flex items-center" onClick={() => navigate("/login")}>
            <IoIosArrowRoundBack className="text-gray-100 text-3xl cursor-pointer" />
            <span className="cursor-pointer text-gray-100">Back To Login</span>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ResetPasswordLink;
