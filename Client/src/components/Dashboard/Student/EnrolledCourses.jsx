import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStudentCourses } from "../../../services/operations/courseapis";
import { useNavigate } from "react-router-dom";
import convertSecondsToDuration from "../../../utils/secToDuration";
import CTAButton from "../../Home/CTAButton";
import { FaArrowRightLong } from "react-icons/fa6";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);

  const [filter, setFilter] = useState("All");
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  async function fetchCourses() {
    const response = await getStudentCourses(token);
    if (response) {
      setCourses(response);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    if (filter === "Completed") return course.progress === 100;
    if (filter === "Pending") return course.progress < 100;
    return true;
  });

  return (
    <div className="flex flex-col mb-10 gap-6 w-full opacity-80 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold">Enrolled Courses</h1>
      {/* Filter Tabs */}
      <div className="flex gap-4">
        {["All", "Pending", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1 rounded-full border transition cursor-pointer text-sm md:text-base ${
              filter === tab
                ? "bg-white text-black font-semibold"
                : "bg-gray-700 text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Course Cards */}
      <div className="flex flex-col gap-4 min-h-[60vh] justify-start">
        <div className="hidden lg:flex bg-gray-600 p-4 rounded-t-lg gap-17">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="lg:w-1/3">Course Info</div>
            <div className="lg:w-[120px]">Duration</div>
            <div className="lg:w-1/3">Progress Bar</div>
          </div>
        </div>

        {/* {console.log("courses",filteredCourses)} */}
        {filteredCourses.length != 0 &&
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-row bg-gray-800/80 p-4 rounded-lg hover:bg-gray-800 transition cursor-pointer lg:gap-20"
              onClick={() =>
                navigate(
                  `/view-course/${course.id}/section/${course.sectionId}/sub-section/${course.subSectionId}`
                )
              }
            >
              <div className="flex flex-col lg:flex-row items-center justify-between flex-grow">
                {/* Course Info */}
                <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-1/3">
                  <img
                    src={course.thumbnail}
                    alt="thumbnail"
                    loading="lazy"
                    className="md:w-38 rounded-md object-contain"
                  />
                  <div>
                    <h3 className="font-semibold text-base md:text-lg">
                      {course.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400">
                      {course.description.substring(0, 50) + "..."}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="text-xs md:text-sm text-gray-300 w-full lg:w-[120px] mt-4 lg:mt-0">
                  {convertSecondsToDuration(course.duration)}
                </div>

                {/* Progress Bar */}
                <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
                  <div className="text-xs md:text-sm text-gray-300 mb-1">
                    {course.progress === 100
                      ? "Completed"
                      : `Progress ${course.progress}%`}
                  </div>
                  <div className="md:w-[90%] bg-gray-600 h-2 rounded-full">
                    <div
                      className={`h-2 rounded-full ${
                        course.progress === 100
                          ? "bg-green-400"
                          : "bg-yellow-400"
                      }`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {filteredCourses.length == 0 && (
          <div className="flex flex-col gap-5 justify-center items-center w-full rounded-b-xl bg-gray-800 h-[50vh] text-2xl text-center">
            {filter == "All" && <div>You are not Enrolled in any Courses!</div>}
            {filter == "Pending" && <div>You have no Pending Courses!</div>}
            {filter == "Completed" && (
              <div>You have not Completed any Courses Yet!</div>
            )}
            {filter == "All" && (
              <div className="text-lg">
                <button
                  onClick={() => navigate("/search/all-courses")}
                  className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-6 py-2 rounded-lg text-sm sm:text-base font-semibold flex items-center gap-2"
                >
                  <span>Buy Available Courses</span>
                  <FaArrowRightLong />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
