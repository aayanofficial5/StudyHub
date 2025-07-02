import React from "react";
import ContactUsForm from "../components/Common/ContactUsForm";
import HighlightBanner from "../components/Home/HighlightBanner";
import { AiFillMessage } from "react-icons/ai";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import ReviewSlider from "../components/Common/ReviewSlider";
import Footer from "./../components/Home/Footer";
const Contact = () => {
  return (
    <div className="flex flex-col items-center w-screen gap ">
      <div className="flex flex-col lg:flex-row justify-center gap-25 p-10 md:pt-25 md:px-25 w-full bg-gradient-to-br from-black via-gray-800 to-black">
        <div className="flex flex-col bg-gradient-to-b from-gray-900 via-gray-700 to-gray-900 rounded-lg px-5 md:px-15 py-10 max-w-fit lg:w-[50%] max-h-fit">
          <h1 className="text-xl md:text-2xl font-bold flex flex-row items-center gap-2">
            Chat on us <AiFillMessage />
          </h1>
          <div className="text-sm md:text-base text-gray-400">
            <p>Our friendly team is here to help.</p>
            <p>studyhub5@gmail.com</p>
          </div>
          <h1 className="text-xl md:text-2xl font-bold mt-10 flex flex-row items-center gap-2">
            Visit us <HiOfficeBuilding />
          </h1>
          <div className="text-sm md:text-base text-gray-400">
            <p>Come and say hello at our office HQ.</p>
            <p>
              TechNest Innovations Pvt. Ltd. 4th Floor, Vertex Towers Plot No.
              27, Sector 5, HSR Layout Bangalore, Karnataka - 560102 India
            </p>
          </div>

          <h1 className="text-xl md:text-2xl font-bold mt-10 flex flex-row items-center gap-2">
            Call us <MdCall />
          </h1>
          <div className="text-sm  md:text-base text-gray-400">
            <p>Mon - Fri From 8am to 5pm</p>
            <p>+91 9876543210</p>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <ContactUsForm
            title="Got a Idea? We've got the skills. Let's team up"
            paragraph="Tell us more about yourself and what you got in mind."
          />
        </div>
      </div>
      <div className="py-15 bg-gradient-to-bl from-black via-gray-800 to-black w-full">
        <ReviewSlider />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
