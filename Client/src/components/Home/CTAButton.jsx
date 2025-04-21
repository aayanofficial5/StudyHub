import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
const CTAButton = ({ active, text, arrow, logout, action }) => {
  return (
    <button
      className={`flex flex-row gap-2 items-center w-max transition-all duration-200 ease-in hover:scale-95 px-4 py-2 cursor-pointer rounded-lg border-blue-500 border-3 font-semibold ${
        active && "bg-blue-500"
      }`}
      onClick={action}
    >
      {text}
      {arrow && <FaArrowRightLong />}
      {logout && <FaSignOutAlt />}
    </button>
  );
};

export default CTAButton;
