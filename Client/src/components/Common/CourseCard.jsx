import React, { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import getAvgRating from "../../utils/getAvgRating";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CourseCard = ({ course, height = 380, width = 350 }) => {
  const { courseName,price, studentsEnrolled, thumbnail } = course;
  // console.log(course);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = getAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.profile.user);
  return (
    <div
      className={`flex flex-col rounded-xl overflow-hidden border border-gray-500/40 shadow-lg bg-gray-800 text-white transition-transform duration-300  scale-90 hover:scale-100 cursor-pointer`}
      style={{ height, width }}
      onClick={() => {
        navigate(`/course/${course._id}`);
      }}
    >
      {/* Image takes 50% height */}
      <div className="h-[55%] w-full">
        <img
          src={thumbnail}
          alt="course"
          className="w-full h-full object-cover opacity-90"
          loading="lazy"
        />
      </div>

      {/* Content takes 45% height */}
      <div className="flex flex-col justify-between flex-1 p-4 bg-gray-900 h-[45%]">
        <div className="text-left">
          <h3 className="text-lg font-semibold mb-1 truncate">{courseName}</h3>
          <p className="text-sm text-gray-400 mb-2">
            {studentsEnrolled.length} {studentsEnrolled.length==1?" Student Enrolled":"Students Enrolled"}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-yellow-5">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-richblack-400">
              {course?.ratingAndReviews?.length} Ratings
            </span>
          </div>
        </div>
        <p className="text-left text-md font-bold text-green-400 mt-3">
          {!studentsEnrolled?.includes(user?._id) ? "₹" + price : "Enrolled"}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
