import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FLname from "./FLname";
import Password from "./Password";
export default function SignUpForm({ setIsLoggedIn }) {
  const [showP1, setShowP1] = useState(false);
  const [showP2, setShowP2] = useState(false);
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    accounttype: "student",
    firstname: "",
    lastname: "",
    email: "",
    createpassword: "",
    confirmpassword: "",
  });

  const sendOtp = async (email) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/sendOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Sending email to server by converting into string
      });
      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("OTP Sent Response:", data);
    } catch (err) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  function handleLoginData(event) {
    const { name, value } = event.target;
    setLoginFormData((pState) => ({ ...pState, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (loginFormData.createpassword == loginFormData.confirmpassword) {
      // navigate("/dashboard");
      // toast.success("Account Created");
      // setIsLoggedIn(true);
      navigate("/emailVerification");
      console.log(loginFormData);
      await sendOtp(loginFormData.email);
    } else {
      toast.error("Passwords do not match");
    }
  }

  function handleAccountType(event) {
    setLoginFormData((pState) => ({
      ...pState,
      accounttype: event.target.name,
    }));
  }

  return (
    <div className="container">
      <div className="flex gap-1 bg-gray-800 h-14 w-[225px] items-center justify-center rounded-4xl px-1 mb-5">
        <button
          name="student"
          onClick={handleAccountType}
          className={`py-[10px] px-5 rounded-3xl transition-all duration-500 ease-in-out cursor-pointer ${
            loginFormData.accounttype === "student"
              ? "bg-blue-500"
              : "bg-transparent text-gray-500"
          }`}
        >
          Student
        </button>
        <button
          name="instructor"
          onClick={handleAccountType}
          className={`py-[10px] px-5 rounded-3xl transition-all duration-500 ease-in-out cursor-pointer ${
            loginFormData.accounttype !== "student"
              ? "bg-blue-500"
              : "bg-transparent text-gray-500"
          }`}
        >
          Instructor
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <FLname
            nameType="firstname"
            name="First Name"
            handleLoginData={handleLoginData}
            loginFormData={loginFormData}
          ></FLname>
          <FLname
            nameType="lastname"
            name="Last Name"
            handleLoginData={handleLoginData}
            loginFormData={loginFormData}
          ></FLname>
        </div>
        <br />
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
        <div className="flex gap-3">
          <Password
            passwordType="createpassword"
            passwordName="Create Password"
            name="p1"
            handleLoginData={handleLoginData}
            showP={showP1}
            setShowP={setShowP1}
            loginFormData={loginFormData}
          ></Password>
          <Password
            passwordType="confirmpassword"
            passwordName="Confirm Password"
            name="p2"
            handleLoginData={handleLoginData}
            showP={showP2}
            setShowP={setShowP2}
            loginFormData={loginFormData}
          ></Password>
        </div>
        <button
      className={`flex flex-row gap-2 items-center w-min-fit w-full justify-center transition-all duration-200 ease-in hover:scale-95 mt-8 px-4 py-2 cursor-pointer rounded-lg border-blue-500 border-3 font-semibold bg-blue-500 text-lg`}
      type="submit"
      >Create Account
    </button>
      </form>
    </div>
  );
}
