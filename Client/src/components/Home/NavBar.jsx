import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from "../../assets/icon.png"; // adjust the path as needed
import CTAButton from "./CTAButton"; // reusable button
import { useSelector } from "react-redux";
import { FaShoppingCart, FaPlusCircle } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import ProfileDropDown from "./ProfileDropDown";
import { GiHamburgerMenu } from "react-icons/gi";
import { Outlet } from "react-router-dom";
import { NavbarLinks } from "../../data/Navbar-Link";
import { getCourseCategories } from "../../services/operations/courseapis";

const NavBar = () => {
  const token = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const {pathname} = useLocation();
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getCourseCategories(false);
        setSubLinks(res);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className={`flex items-center justify-around px-6 py-4 shadow-md border-b-1 border-gray-700 h-[70px] ${pathname!="/"&&'bg-gray-900/60'}`}>
        {/* Hamburger Menu */}
        <GiHamburgerMenu className="text-2xl text-gray-300 md:hidden cursor-pointer" />
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <img src={logo} alt="logo" className="w-10 h-10" loading="lazy"/>
            <h1 className="text-[1.3rem] font-bold text-gray-300">StudyHub</h1>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 font-semibold tracking-wider">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.name === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1`}
                    >
                      <p>{link.name}</p>
                      <IoIosArrowDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-gray-800 p-4 text-white opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-gray-800"></div>
                        {loading || !subLinks ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter((subLink) => subLink?.course?.length > 0)
                              ?.map((subLink, i) => (
                                <Link
                                  to={`${link.path}/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-gray-700"
                                  key={i}
                                >
                                  <p className="uppercase tracking-wider">
                                    {subLink.name}
                                  </p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      ` ${isActive ? "text-blue-400" : ""}`
                    }
                    key={index}
                  >
                    <span>{link.name}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

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
              <div className="relative"><FaShoppingCart className=" hover:text-blue-400 text-2xl" />
        {totalItems.length>0&&(<span className="bg-blue-500 rounded-full absolute -top-2 -right-2 h-5 w-5 text-xs flex justify-center items-center animate-bounce">{totalItems.length}</span>)}
      </div>
            </Link>
          )}
          {/* Add Course */}
          {user && user?.accountType == "Instructor" && (
            <Link to="/dashboard/add-course" className="hover:text-blue-500">
              <button title="Add Course" className="text-2xl text-blue-500 mt-2"><FaPlusCircle/></button>
            </Link>
          )}
          {/* ProfileDropdown */}
          {token && <ProfileDropDown />}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
