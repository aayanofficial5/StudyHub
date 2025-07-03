import React, { useState } from "react";
import { useSelector } from "react-redux";
import Password from "../../../Authentication/Password";
import { updatePassword } from "../../../../services/operations/profileapis";

const UpdatePassword = () => {
  const [showP1, setShowP1] = useState(false);
  const [showP2, setShowP2] = useState(false);
  const [showP3, setShowP3] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const [FormData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleLoginData = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await updatePassword(FormData, token);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 bg-gray-800/80 p-4 sm:p-6 rounded-lg w-full"
    >
      {/* Password Inputs */}
      <Password
        passwordType="oldPassword"
        passwordName="Old Password"
        name="p1"
        handleLoginData={handleLoginData}
        showP={showP1}
        setShowP={setShowP1}
        loginFormData={FormData}
      />

      <Password
        passwordType="newPassword"
        passwordName="New Password"
        name="p2"
        handleLoginData={handleLoginData}
        showP={showP2}
        setShowP={setShowP2}
        loginFormData={FormData}
      />

      <Password
        passwordType="confirmNewPassword"
        passwordName="Confirm New Password"
        name="p3"
        handleLoginData={handleLoginData}
        showP={showP3}
        setShowP={setShowP3}
        loginFormData={FormData}
      />

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-6 py-2 rounded-lg text-sm sm:text-base font-semibold"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default UpdatePassword;
