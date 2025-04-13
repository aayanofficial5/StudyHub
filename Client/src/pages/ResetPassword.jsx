import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { auth } from "../services/apiCollection";
import { toast } from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../slices/authSlice";
import Loading from "./Components/Loading";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const {token} = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPassword = async ({token,password,confirmPassword})=>{
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("POST",auth.resetPassword,{
        token,
        password,
        confirmPassword,
      })
      if(response?.data?.success){
        toast.success(response?.data?.message);
        return 1;
      }else{
        toast.error(response?.data?.message);
        return 0;
      }
    } catch (err) {
      console.log(err?.response?.data?.message||"Something went wrong");
      toast.error(err?.response?.data?.message||"Something went wrong");
      return 0;
    }
  }
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const response = await resetPassword({token,password,confirmPassword});
    if(response){
      navigate("/login");
    }
    dispatch(setLoading(false));
  };

  return (
    <div className="flex justify-center items-center text-white w-full h-[80vh] text-2xl">
      {loading ? (
        <div class="flex justify-center items-center h-[70vh]">
        <Loading/>
      </div>
      ) : (
      <div className="w-[50%] md:w-[30%] flex flex-col gap-4 justify-center items-center">
        <h2 className="text-yellow-400 font-semibold self-start text-4xl opacity-90">
          Choose Your New Password
        </h2>
        <p className="text-gray-400 text-lg self-start w-full">
          Almost done! Please enter your new password below and you're all set.
        </p>
        <form
          onSubmit={handleResetPassword}
          className="flex flex-col gap-4 w-full opacity-90"
        >
          <label htmlFor="password" className="relative text-sm">
            New Password<sup className="text-red-400">*</sup>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            className="bg-transparent text-xl border border-gray-300 rounded-lg p-1 text-white placeholder-gray-400/50 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="absolute top-7 right-3 text-2xl cursor-pointer text-white">
          {showPassword ? (
            <IoEyeOffOutline onClick={()=>setShowPassword(false)} />
          ) : (
            <IoEyeOutline onClick={()=>setShowPassword(true)} />
          )}
          </span>
          </label>
          <label htmlFor="confirmPassword" className="relative text-sm">
            Confirm New Password<sup className="text-red-400">*</sup>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            className="bg-transparent text-xl border border-gray-300 rounded-lg p-1 text-white placeholder-gray-400/50 w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="absolute top-7 right-3 text-2xl cursor-pointer text-white">
          {showConfirmPassword ? (
            <IoEyeOffOutline onClick={()=>setShowConfirmPassword(false)} />
          ) : (
            <IoEyeOutline onClick={()=>setShowConfirmPassword(true)} />
          )}
          </span>
          </label>
          <p className="text-gray-400 text-sm self-start w-full">1. Password must be at least 8 characters long
            <sup className="text-red-400">*</sup><br/>2. Password must contain at least one uppercase letter, one lowercase letter, one number and one special character
            <sup className="text-red-400">*</sup></p>
          <button
            type="submit"
            className="w-full transition-all duration-200 ease-in hover:scale-95 py-1 cursor-pointer rounded-lg border-blue-500 border-3 font-semibold bg-blue-500"
          >
            Reset Password
          </button>
        </form>
      </div>
      )}
    </div>
  );
};

export default ResetPassword;
