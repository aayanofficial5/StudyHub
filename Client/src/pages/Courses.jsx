import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CourseCard from "../components/Common/CourseCard";
import { getAllCourses, getCoursesBySearch } from "../services/operations/courseapis";

const Courses = () => {
  const { searchTerm } = useParams();
  const { loading } = useSelector((state) => state.profile);
  const [courseData, setCourseData] = useState([]);

  const isAllCourses = searchTerm === "all-courses";

  !isAllCourses&&useEffect(() => {
    const fetchCourses = async () => {
      const result = await getCoursesBySearch(searchTerm);
      if (result) setCourseData(result);
    };
    fetchCourses();
  }, [searchTerm]);

  isAllCourses&&useEffect(() => {
    fetchTopCourses();
  }, []);

  const fetchTopCourses = async () => {
    const data = await getAllCourses();
    if (data.length > 0) setCourseData(data);
  };

  

  return (
    <div className="text-gray-400 w-full m-0 p-0 overflow-x-hidden">
      {/* Header Section */}
      <div className="bg-gray-900/60 mb-8">
        <div className="flex flex-col justify-center gap-4 pl-5 md:pl-20 min-h-[260px] max-w-screen-xl mx-auto">
          <p className="text-sm">
            Home {isAllCourses ? "/ " : "/ Search / "}
            <span className="text-yellow-300">
              {isAllCourses ? "All Courses" : searchTerm}
            </span>
          </p>

          <p className="text-3xl text-gray-200 font-semibold">
            {isAllCourses
              ? "All Available Courses on the Website"
              : `Search Results for: ${searchTerm}`}
          </p>

          <p className="max-w-3xl text-sm md:text-base text-gray-300">
            {courseData.length} {courseData.length === 1 ? "course found." : "courses found."}
          </p>
        </div>
      </div>

      {/* Courses Grid Section */}
      <div className="w-full flex flex-col items-center min-h-[375px] pb-10">
        <section className="w-full flex justify-center">
          <div className="flex w-full flex-wrap justify-center px-4">
            {!loading && courseData.length > 0 ? (
              courseData.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))
            ) : (
              <div className="flex justify-center items-center w-full h-[320px] text-2xl text-gray-300 font-semibold">
                No courses found.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Courses;
