import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStudentCourses } from "../../../services/operations/courseapis";
import { useNavigate } from "react-router-dom";

export default function EnrolledCourses() {
  const { user } = useSelector((state) => state.profile);
  const [filter, setFilter] = useState("All");
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  async function fetchCourses() {
    const response = await getStudentCourses();
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

  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="flex flex-col gap-6 w-full opacity-80 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Enrolled Courses</h1>
        <button className="text-3xl font-bold">+</button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4">
        {["All", "Pending", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1 rounded-full border transition cursor-pointer ${
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

        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="flex flex-row bg-gray-800/80 p-4 rounded-lg hover:bg-gray-800 transition cursor-pointer lg:gap-20"
            onClick={() => navigate(`/course/${course.id}`)}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between flex-grow">
              {/* Course Info */}
              <div className="flex items-center gap-4 w-full lg:w-1/3">
                <img
                  src={course.thumbnail}
                  alt="thumbnail"
                  loading="lazy"
                  className="w-25 rounded-md object-contain"
                />
                <div>
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-gray-400">
                    {course.description.substring(0, 50) + "..."}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="text-sm text-gray-300 w-full lg:w-[120px] mt-4 lg:mt-0">
                {formatDuration(course.duration)}
              </div>

              {/* Progress Bar */}
              <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
                <div className="text-xs text-gray-300 mb-1">
                  {course.progress === 100
                    ? "Completed"
                    : `Progress ${course.progress}%`}
                </div>
                <div className="w-full bg-gray-600 h-2 rounded-full">
                  <div
                    className={`h-2 rounded-full ${
                      course.progress === 100 ? "bg-green-400" : "bg-yellow-400"
                    }`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
