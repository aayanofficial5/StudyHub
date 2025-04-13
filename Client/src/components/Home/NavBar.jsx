import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/icon.png"; // adjust the path as needed
import CTAButton from "./CTAButton"; // reusable button
import { useSelector } from "react-redux";
import { FaShoppingCart, FaPlusCircle } from "react-icons/fa";
import ProfileDropDown from "./ProfileDropDown";
import { GiHamburgerMenu } from "react-icons/gi";
const NavBar = () => {
  const token = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Courses",
      path: "/course-list",
    },
    {
      name: "About",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (
    <nav className="flex items-center justify-around px-6 py-4 shadow-md">
      {/* Hamburger Menu */}
      <GiHamburgerMenu className="text-2xl text-gray-300 md:hidden cursor-pointer" />
      {/* Logo and Brand */}
      <Link to="/" className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-[1.3rem] font-bold text-gray-300">StudyHub</h1>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-6 text-gray-500 font-medium">
        {navLinks.map((link, index) => (
          <NavLink
            to={link.path}
            className={({ isActive }) => ` ${isActive ? "text-blue-600" : ""}`}
            key={index}
          >
            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>

      {/* CTA Buttons , Profile & Cart Icon */}
      <div className="flex flex-row justify-between items-center gap-5 text-white">
        {/* Login */}
        {!token && (
          <Link to="/login" className="hover:text-black">
            <CTAButton text="Login" active={true}></CTAButton>
          </Link>
        )}
        {/* Signup */}
        {!token && (
          <Link to="/signup" className="hover:text-blue-500">
            <CTAButton text="Signup" active={false}></CTAButton>
          </Link>
        )}
        {/* Cart */}
        {user && user?.accountType != "Instructor" && (
          <Link to="/dashboard/cart" className="relative">
            <FaShoppingCart className="text-2xl text-blue-500" />
            {totalItems > 0 && (
              <span className="text-sm absolute bottom-6 -right-0.5 bg-white text-black rounded-full px-2">
                {totalItems}
              </span>
            )}
          </Link>
        )}
        {/* Create Course */}
        {user && user?.accountType == "Instructor" && (
          <Link to="/dashboard/create-course" className="hover:text-blue-500">
            <FaPlusCircle className="text-2xl text-blue-500" />
          </Link>
        )}
        {/* ProfileDropdown */}
        {token && <ProfileDropDown />}
      </div>
    </nav>
  );
};

export default NavBar;
