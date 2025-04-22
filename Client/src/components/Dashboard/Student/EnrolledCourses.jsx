import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaBookOpen, FaTrash } from "react-icons/fa";

const dummyCourses = [
  {
    id: 1,
    title: "The Complete Python",
    description: "Short Description",
    duration: "2hr 30 mins",
    progress: 65,
  },
  {
    id: 2,
    title: "The Complete Python",
    description: "Short Description",
    duration: "2hr 30 mins",
    progress: 21,
  },
  {
    id: 3,
    title: "The Complete Python",
    description: "Short Description",
    duration: "2hr 30 mins",
    progress: 80,
  },
  {
    id: 4,
    title: "The Complete Python",
    description: "Short Description",
    duration: "2hr 30 mins",
    progress: 100,
  },
  {
    id: 5,
    title: "The Complete Python",
    description: "Short Description",
    duration: "2hr 30 mins",
    progress: 100,
  },{
    id: 6,
    title: "The Complete Python",
    description: "Short Description",
    duration: "2hr 30 mins",
    progress: 100,
  },{
    id: 7,
    title: "The Complete Python",
    description: "Short Description",
    duration: "2hr 30 mins",
    progress: 100,
  },
];

export default function EnrolledCourses() {
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCourses = dummyCourses.filter((course) => {
    if (filter === "Completed") return course.progress === 100;
    if (filter === "Pending") return course.progress < 100;
    return true;
  });

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
        <div>Menu</div>
        </div>

        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="flex flex-row bg-gray-800/80 p-4 rounded-lg hover:bg-gray-800 transition cursor-pointer lg:gap-20"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between flex-grow">
              {/* Course Info */}
              <div className="flex items-center gap-4 w-full lg:w-1/3">
                <img
                  src="https://via.placeholder.com/50x50"
                  alt="thumbnail"
                  className="w-14 h-14 rounded-md object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-sm text-gray-400">{course.description}</p>
                </div>
              </div>

              {/* Duration */}
              <div className="text-sm text-gray-300 w-full lg:w-[120px] mt-4 lg:mt-0">
                {course.duration}
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
                      course.progress === 100 ? "bg-green-400" : "bg-blue-400"
                    }`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen(course.id)}>
                <BsThreeDotsVertical className="w-5 h-5 text-gray-300 cursor-pointer" />
              </button>
              {menuOpen === course.id && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-600 rounded-md shadow-lg z-10">
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2 cursor-pointer"
                    onClick={() => setMenuOpen(null)}
                  >
                    <FaBookOpen className="text-blue-400" /> Mark as Completed
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2 cursor-pointer"
                    onClick={() => setMenuOpen(null)}
                  >
                    <FaTrash className="text-red-400" /> Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
