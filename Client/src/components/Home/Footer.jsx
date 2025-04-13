import React from "react";
import logo from "../../assets/icon.png";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 bg-gray-900/20 mt-20">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
          <NavLink to="/" className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <h1 className="text-[1.3rem] font-bold text-gray-300">KnowGeek</h1>
            </div>
          </NavLink>
          <p className="mt-6 text-sm">
            Learn smarter. Build faster. Grow continuously. KnowGeek helps you
            take charge of your learning journey.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-white">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
                  <div>Home</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">
                  <div>About us</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact">
                  <div>Contact us</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/privacy">
                  <div>Privacy policy</div>
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-white mb-5">
              Subscribe to our newsletter
            </h2>
            <div className="text-sm space-y-2">
              <p>
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <div className="flex items-center gap-2 pt-4">
                <input
                  className="border border-gray-500/30 placeholder-gray-500 outline-none w-full max-w-64 h-9 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-blue-600 w-24 h-9 text-white rounded cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2024 © KnowGeek. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
