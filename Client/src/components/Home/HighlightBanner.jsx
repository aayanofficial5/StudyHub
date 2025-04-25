import React from 'react'
import HighlightedText from './HighlightedText'
const HighlightBanner = ({title, highlightedText="", color="yellow-400", paragraph, textAlign="text-center"}) => {
  return (
    <>
    <div className={`font-bold text-3xl mt-5 ${textAlign}`}>
            {title}
            <HighlightedText
              text={highlightedText}
              color={color}
            ></HighlightedText>
          </div>
          <div className={`w-[70%] mt-5 text-lg opacity-70 ${textAlign}`}>
        {paragraph}
      </div>
    </>
  );
};

export default HighlightBanner
