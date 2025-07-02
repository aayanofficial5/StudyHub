import React from 'react'
import HighlightedText from './HighlightedText'
const HighlightBanner = ({title, highlightedText="", color="yellow-400", paragraph, textAlign="text-center"}) => {
  return (
    <div className='flex flex-col items-center'>
    <div className={`w-[90%] md:w-[55%] font-bold text-xl md:text-3xl mt-5 ${textAlign}`}>
            {title}
            <HighlightedText
              text={highlightedText}
              color={color}
            ></HighlightedText>
          </div>
          <div className={`w-[90%] md:w-[55%] text-sm md:text-lg text-gray-400/70 ${textAlign}`}>
        {paragraph}
      </div>
    </div>
  );
};

export default HighlightBanner
