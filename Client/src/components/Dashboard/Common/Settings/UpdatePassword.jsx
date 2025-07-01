import React from "react";
import Password from "../../../Authentication/Password";
import { useState } from "react";
import { updatePassword } from "../../../../services/operations/profileapis";
import { useSelector } from 'react-redux';

const UpdatePassword = () => {
  const [showP1, setShowP1] = useState(false);
  const [showP2, setShowP2] = useState(false);
  const [showP3, setShowP3] = useState(false);
  const [FormData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const { token } = useSelector((state) => state.auth);
  const handleLoginData = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(FormData);
    await updatePassword(FormData,token);
  }
  return (
    <form
      className="flex flex-col gap-3 bg-gray-800/80 p-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      <Password
        passwordType="oldPassword"
        passwordName="Old Password"
        name="p1"
        handleLoginData={handleLoginData}
        showP={showP1}
        setShowP={setShowP1}
        loginFormData={FormData}
      ></Password>
      <Password
        passwordType="newPassword"
        passwordName="New Password"
        name="p2"
        handleLoginData={handleLoginData}
        showP={showP2}
        setShowP={setShowP2}
        loginFormData={FormData}
      ></Password>
      <Password
        passwordType="confirmNewPassword"
        passwordName="Confirm New Password"
        name="p3"
        handleLoginData={handleLoginData}
        showP={showP3}
        setShowP={setShowP3}
        loginFormData={FormData}
      ></Password>
      <button
        type="submit"
        className="bg-blue-500 text-white p-3 rounded-lg w-[80px] lg:w-[150px] cursor-pointer self-end-safe"
      >
        Save
      </button>
    </form>
  );
};

export default UpdatePassword;
