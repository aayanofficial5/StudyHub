import React from "react";
import { Link } from "react-router-dom";
import CTAButton from "./CTAButton";
const ProfileDropDown = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-4">
      <Link to="/dashboard/profile" className="hover:text-blue-500">
        <div className="bg-white h-7 w-7 rounded-full"></div>
      </Link>
      <Link to="/login" className="hover:text-blue-500">
        <CTAButton text="Logout" active={false} logout={true}></CTAButton>
      </Link>
    </div>
  );
};

export default ProfileDropDown;
