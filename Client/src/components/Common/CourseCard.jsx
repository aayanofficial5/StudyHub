import React, { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import getAvgRating from "../../utils/getAvgRating";

const CourseCard = ({ course, height = 380, width = 350 }) => {
  const { courseName, instructor, price, studentsEnrolled, thumbnail } = course;

  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = getAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <div
      className={`flex flex-col rounded-xl overflow-hidden border border-gray-500/40 shadow-lg bg-gray-800 text-white transition-transform duration-300  hover:scale-105 cursor-pointer`}
      style={{ height, width }}
    >
      {/* Image takes 50% height */}
      <div className="h-[55%] w-full">
        <img
          src={thumbnail}
          alt="course"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* Content takes 45% height */}
      <div className="flex flex-col justify-between flex-1 p-4 bg-gray-900 h-[45%]">
        <div className="text-left">
          <h3 className="text-lg font-semibold mb-1 truncate">{courseName}</h3>
          <p className="text-sm text-gray-400 mb-2">
            {instructor.firstName} {instructor.lastName}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-yellow-5">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-richblack-400">
              {course?.ratingAndReviews?.length} Ratings
            </span>
          </div>
        </div>

        <p className="text-right text-md font-bold text-green-400 mt-3">
          ₹{price}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
