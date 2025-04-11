import React from 'react'

const HighlightedText = ({text,color}) => {
  return (
    <span className={`text-${color}`}>
      {" "+text+" "}
    </span>
  )
}

export default HighlightedText
