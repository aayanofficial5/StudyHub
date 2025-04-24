import React from "react";
import HighlightBanner from "../../Home/HighlightBanner";
import CTAButton from "../../Home/CTAButton";

const Modal = ({
  title,
  color,
  paragraph,
  button1,
  button2,
  active1 = true,
  active2 = false,
  arrow1 = false,
  arrow2 = false,
  action1,
  action2,
}) => {
  return (
    <div className="fixed inset-0 z-[1000] mt-0 overflow-auto bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col justify-center flex-wrap gap-3 items-center text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 rounded-lg p-4">
        <div className="flex flex-col items-center">
          <HighlightBanner highlightedText={title} paragraph={paragraph} color={color}/>
        </div>
        <div className="flex flex-row gap-4 text-white mt-5">
          <CTAButton
            active={active1}
            arrow={arrow1}
            text={button1}
            action={action1}
          />
          <CTAButton
            active={active2}
            arrow={arrow2}
            text={button2}
            action={action2}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
