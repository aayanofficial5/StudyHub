import React from "react";
import HighlightedText from "./HighlightedText";
import CTAButton from "./CTAButton";
import { NavLink } from "react-router-dom";
const BannerBlocks = ({
  h1,
  h2,
  h3,
  description,
  button1,
  button2,
  image,
  flexDirection,
}) => {
  return (
    <div
      className={`flex ${flexDirection} w-full justify-center items-center px-20 mt-20 md:mt-10 gap-15 md:py-10`}
    >
      {/* Left Section - Text */}
      <div className="md:w-1/2 flex flex-col justify-between text-white scale-105">
        <div className="font-bold text-3xl text-left w-[90%]">
          <div>
            {h1}
            <HighlightedText text={h2} color="yellow-300" />
            <br />
            {h3}
          </div>
        </div>

        <div className="w-[90%] mt-5 text-lg opacity-70 text-left">
          <pre className="whitespace-pre-wrap">{description}</pre>
        </div>
        <div className="flex flex-row mt-5 gap-4 justify-start w-[90%]">
          {button1 && (
            <NavLink to="/signup">
              <CTAButton arrow={true} active={true} text={button1} />
            </NavLink>
          )}
          {button2 && (
            <NavLink to="/signup">
              <CTAButton arrow={false} active={false} text={button2} />
            </NavLink>
          )}
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="md:w-1/2 flex justify-center items-center">
        <img src={image} className="w-full h-full object-cover rounded-lg" />
      </div>
    </div>
  );
};

export default BannerBlocks;
