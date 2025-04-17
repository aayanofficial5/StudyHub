import { useState } from "react";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate, NavLink } from "react-router-dom";
import { login } from "../../services/operations/authapis";
import { useDispatch } from "react-redux";
export default function LogInForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "aayanofficial5@gmail.com",
    password: "Aadi@op5",
  });

  function handleLoginData(event) {
    const { name, value } = event.target;
    setLoginFormData((pState) => ({ ...pState, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(loginFormData);
    dispatch(login(loginFormData,navigate));
  }
  function handlePassword() {
    setShowPassword((prev) => !prev);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email Address
        <sup className="text-red-500 text-[16px] relative -top-1">*</sup>
        <input
          className="w-full h-12 p-3 rounded-lg mt-1 mb-3 text-[15px] border-2 border-gray-900"
          onChange={handleLoginData}
          required
          type="email"
          id="email"
          name="email"
          placeholder="Enter email address"
          value={loginFormData.email}
        />
      </label>
      <br />
      <label htmlFor="password" className="relative">
        Password
        <sup className="text-red-500 text-[16px] relative -top-1 -right-0.5">
          *
        </sup>
        <input
          className="w-full h-12 p-3 rounded-lg mt-1 text-[15px] border-2 border-gray-900"
          onChange={handleLoginData}
          required
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Enter Password"
          value={loginFormData.password}
        />
        <span className="absolute top-10 right-5 text-2xl cursor-pointer">
          {showPassword ? (
            <IoEyeOffOutline onClick={handlePassword} />
          ) : (
            <IoEyeOutline onClick={handlePassword} />
          )}
          <p
            onClick={() => navigate("/reset-password-link")}
            className="text-[12px] text-blue-400 absolute top-9 right-[-30px] w-25 cursor-pointer"
          >
            Forgot Password
          </p>
        </span>
      </label>
      <button
        className={`flex flex-row gap-2 items-center w-min-fit w-full justify-center transition-all duration-200 ease-in hover:scale-95 mt-8 px-4 py-2 cursor-pointer rounded-lg border-blue-500 border-3 font-semibold bg-blue-500 text-lg`}
        type="submit"
      >
        Sign in
      </button>
      <p className="mt-1 text-center text-gray-500 text-sm">
        Don't have an account?{" "}
        <NavLink to="/signup" className="text-blue-500">
          Sign Up
        </NavLink>
      </p>
    </form>
  );
}
