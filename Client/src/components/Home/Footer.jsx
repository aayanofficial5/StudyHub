import React, { use, useState } from "react";
import logo from "../../assets/icon.png";
import { NavLink } from "react-router-dom";
import Logo from "./../Common/Logo";
import { contactUsData } from "../../services/operations/authapis";
import toast from "react-hot-toast";
const Footer = () => {
  const [email, setEmail] = useState("");
  async function handleSubscribe(e) {
    e.preventDefault();
    if (!email) {
      toast.error("Please Enter Email to Subscribe");
      return;
    }
    const result = await contactUsData({ email });
    if (result) {
      toast.success("Subscribed Successfully!");
      setEmail("");
    }
  }

  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-400 bg-gradient-to-bl from-gray-950 via-gray-900 to-gray-950 border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-around gap-10 border-b border-gray-700 pb-8">
        {/* Branding Section */}
        <div className="md:max-w-md">
          <div onClick={() => window.scrollTo(0, 0)} className="cursor-pointer">
            <Logo />
          </div>
          <p className="mt-6 text-sm leading-relaxed">
            Learn smarter. Build faster. Grow continuously.
            <br />
            <span className="text-white font-medium">StudyHub</span> empowers
            your learning journey with curated content, expert instructors, and
            hands-on projects.
          </p>
        </div>

        {/* Links and Newsletter */}
        <div className="flex-1 flex flex-col sm:flex-row justify-between gap-10">
          {/* Company Links */}
          <div>
            <h2 className="font-semibold text-white mb-4">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact Us</NavLink>
              </li>
              <li>
                <NavLink to="/privacy">Privacy Policy</NavLink>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h2 className="font-semibold text-white mb-4">Stay Updated</h2>
            <p className="text-sm mb-4">
              Get the latest courses, news, and updates delivered straight to
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                className="w-full px-3 py-2 border border-gray-600 rounded bg-transparent text-white placeholder-gray-400 outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={(e) => handleSubscribe(e)}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="pt-6 pb-4 text-center text-xs md:text-sm text-gray-500">
        © {new Date().getFullYear()} StudyHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
