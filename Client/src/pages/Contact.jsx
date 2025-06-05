import React from "react";
import ContactUsForm from "../components/Common/ContactUsForm";
import Testimonials from "../components/Common/Testimonials";
import HighlightBanner from "../components/Home/HighlightBanner";
import { AiFillMessage } from "react-icons/ai";
import { HiOfficeBuilding } from "react-icons/hi";
import { MdCall } from "react-icons/md";
const Contact = () => {
  return (
    <div className="flex flex-col items-center mt-15 w-screen gap">
      <div className="flex flex-col lg:flex-row gap-25 p-10 lg:px-25 w-full">
        <div className="flex flex-col bg-gray-900/90 rounded-lg px-15 py-10 max-w-fit lg:w-[40%] max-h-fit lg:scale-110">
          <h1 className="text-2xl font-bold flex flex-row items-center gap-2">
            Chat on us <AiFillMessage className="text-2xl" />
          </h1>
          <p>Our friendly team is here to help.</p>
          <p>studyhub5@gmail.com</p>
          <h1 className="text-2xl font-bold mt-10 flex flex-row items-center gap-2">
            Visit us <HiOfficeBuilding className="text-2xl" />
          </h1>
          <p>
            Come and say hello at our office HQ.
            <p>
              TechNest Innovations Pvt. Ltd. 4th Floor, Vertex Towers Plot No.
              27, Sector 5, HSR Layout Bangalore, Karnataka - 560102 India
            </p>
          </p>
          <h1 className="text-2xl font-bold mt-10 flex flex-row items-center gap-2">
            Call us <MdCall className="text-2xl" />
          </h1>
          <p>
            Mon - Fri From 8am to 5pm
            <p>+91 9876543210</p>
          </p>
        </div>
        <div className="flex flex-col items-center lg:scale-110 lg:w-[60%] lg:mt-5">
          <div className="flex flex-col items-center border-2 border-gray-700 rounded-lg">
            <div className="w-[80%]">
              <HighlightBanner
                title="Got a Idea? We've got the skills. Let's team up"
                paragraph="Tell us more about yourself and what you got in mind."
                textAlign="text-left"
              />
            </div>
            <ContactUsForm />
          </div>
        </div>
      </div>
      <div className="mt-15">
        <Testimonials />
      </div>
    </div>
  );
};

export default Contact;
