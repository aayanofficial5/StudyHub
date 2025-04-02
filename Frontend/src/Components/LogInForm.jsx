import { useState } from "react";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function LogInForm({setIsLoggedIn}) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  function handleLoginData(event) {
    const { name, value } = event.target;
    setLoginFormData((pState) => ({ ...pState, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(loginFormData);
    toast.success("Logged In");
    navigate("/dashboard");
    setIsLoggedIn(true);
  }
  function handlePassword() {
    setShowPassword((prev) => !prev);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email Address<sup>*</sup>
      
      <input
        className="w-full h-12 p-3 rounded-lg mt-1 mb-3 text-[15px]"
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
        Password<sup>*</sup>
      <input
        className="w-full h-12 p-3 rounded-lg mt-1 text-[15px]"
        onChange={handleLoginData}
        required
        type={showPassword ? "text" : "password"}
        name="password"
        id="password"
        placeholder="Enter Password"
        value={loginFormData.password}
      />
      <span className="absolute top-10 right-5 text-2xl">
        {showPassword ? <IoEyeOffOutline onClick={handlePassword}/> : <IoEyeOutline onClick={handlePassword} />}
        <p className="text-[11px] text-blue-400 absolute top-9 right-[-30px] w-25">Forgot Password</p>
      </span>
      </label>
      <button className="login" type="Submit">Sign In</button>
    </form>
  );
}
