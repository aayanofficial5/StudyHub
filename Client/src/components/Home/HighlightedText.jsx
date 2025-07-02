import React from "react";

const HighlightedText = ({ text="", color="" }) => {
  return <span className={`bg-gradient-to-tr from-yellow-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent`}>{" " + text + " "}</span>;
};

export default HighlightedText;
