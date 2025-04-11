import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/icon.png"; // adjust the path as needed
import CTAButton from "./CTAButton"; // reusable button

const NavBar = ({isLoggedIn, pathname}) => {

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Courses",
      path: "/courses",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    }
  ]

  return (
    <nav className="flex items-center justify-around px-6 py-4 shadow-md">
      {/* Logo and Brand */}
      <Link to="/" className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-11 h-11" />
        <h1 className="text-2xl font-bold text-gray-300">KnowGeek</h1>
      </div>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6 text-gray-500 font-medium">
        {navLinks.map((link,index) => (
          <NavLink to={link.path} className={({isActive}) => ` ${isActive ? "text-blue-600" : ""}`} key={index}>
            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-5 text-white">
        <Link to="/login" className="hover:text-black">
          <CTAButton text="Login" active={true}></CTAButton>
        </Link>
        <Link to="/signup" className="hover:text-blue-500">
          <CTAButton text="Signup" active={false}></CTAButton>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
