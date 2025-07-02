import React from "react";
import logo from "../../assets/icon.png";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src={logo} alt="logo" className="w-10 h-10" loading="lazy" />
      <h1 className="text-[1.3rem] font-bold bg-gradient-to-t from-slate-500 via-slate-400 to-slate-200 bg-clip-text text-transparent">
        StudyHub
      </h1>
    </Link>
  );
};

export default Logo;
