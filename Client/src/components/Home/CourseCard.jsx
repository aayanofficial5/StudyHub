import React from "react";

const CourseCard = ({course}) => {
  const { courseName, instructor, price, studentsEnrolled,thumbnail} = course;
  const rating = 4.5;
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="w-85 rounded-lg overflow-hidden border border-gray-500/40 shadow-md text-white scale-95">
      {/* Top Image */}
      <img
        src={thumbnail}
        alt="course"
        className="w-full h-44 opacity-80 object-cover"
      />

      {/* Bottom Content */}
      <div className="p-4 text-left bg-gray-900/20">
        <h3 className="text-md font-semibold text-white">
          {courseName}
        </h3>

        <p className="text-sm text-gray-400 mt-1">{instructor.firstName+" "+instructor.lastName}</p>

        <div className="flex items-center text-sm mt-1">
          <span className="text-yellow-300 font-semibold mr-1">{rating}</span>
          
          {/* Star rating */}
          <div className="flex">
            {[...Array(fullStars)].map((_, i) => (
              <span key={i}>★</span>
            ))}
            {hasHalfStar && <span>☆</span>}
            {[...Array(maxStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
              <span key={i}>☆</span>
            ))}
          </div>

          <span className="text-gray-400 ml-1">({studentsEnrolled.length})</span>
        </div>

        <p className="text-md font-bold mt-2">${price}</p>
      </div>
    </div>
  );
};

export default CourseCard;
