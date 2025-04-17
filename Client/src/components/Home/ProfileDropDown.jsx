import React from "react";
import { Link } from "react-router-dom";
import CTAButton from "./CTAButton";
import { logout } from "../../services/operations/authapis";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const ProfileDropDown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="flex flex-row justify-center items-center gap-4">
      <Link to="/dashboard/my-profile" className="hover:text-blue-500">
        <div className="bg-white h-7 w-7 rounded-full"></div>
      </Link>
      <div className="hover:text-blue-500">
        <CTAButton
          text="Logout"
          active={false}
          logout={true}
          action={()=>dispatch(logout(navigate))}
        ></CTAButton>
      </div>
    </div>
  );
};

export default ProfileDropDown;
