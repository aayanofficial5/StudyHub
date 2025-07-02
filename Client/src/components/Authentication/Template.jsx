import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import logo from "../../assets/googleLogo.svg";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import GoogleLoginButton from "./GoogleLoginButton";
import { useState } from "react";

export default function Template({ title, desc1, desc2, formType, image }) {
  const loading = useSelector((state) => state.auth.loading);
  const [accountType, setAccountType] = useState("Student");

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-tr from-slate-black via-slate-850 to-slate-950 text-white flex justify-center items-start  py-5 px-2 md:p-0 overflow-hidden">
      
      {/* ⬅️ Background Image with Blur */}
      <img
        src={image}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover blur-sm opacity-15 z-10"
      />

      {loading ? (
        <div className="flex justify-center items-center h-[75vh] w-full">
          <Loading />
        </div>
      ) : (
        <div className="z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-[500px] gap-12 rounded-2xl p-6 md:p-10">
          
          {/* Form Section */}
          <div className="w-full max-w-md">
            <h1 className="font-semibold text-2xl md:text-3xl mb-4">{title}</h1>
            <p className="mb-4">
              <span className="text-gray-300 text-base md:text-lg">{desc1}</span>
              <br />
              <i className="text-blue-400 text-base md:text-lg">{desc2}</i>
            </p>

            {formType === "login" ? (
              <LogInForm />
            ) : (
              <SignUpForm setAccountType={setAccountType} />
            )}

            <div className="flex items-center mt-2">
              <div className="bg-gray-700 h-[1px] w-full"></div>
              <span className="mx-2 text-gray-500">OR</span>
              <div className="bg-gray-700 h-[1px] w-full"></div>
            </div>

            <GoogleLoginButton accountType={accountType} />
          </div>
        </div>
      )}
    </div>
  );
}
