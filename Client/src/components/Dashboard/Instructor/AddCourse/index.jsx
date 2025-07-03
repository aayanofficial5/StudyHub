import React, { useEffect, useState } from "react";
import RenderSteps from "./RenderSteps";
import { useDispatch, useSelector } from "react-redux";
import { setEditCourse } from "../../../../redux/slices/courseSlice";
import { IoMdInformationCircleOutline } from "react-icons/io";

const AddCourse = () => {
  const dispatch = useDispatch();
  const editCourse = useSelector((state) => state.course.editCourse);
  const [showTips, setShowTips] = useState(false);

  return (
    <div className="relative flex flex-col lg:flex-row w-full gap-4 lg:gap-20 opacity-80 min-h-[78vh] md:px-8">

      {/* Top-right Tips Button for small screens */}
      {!editCourse && (
        <button
          className="lg:hidden absolute top-2 right-4 text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md text-sm flex items-center gap-1 z-10"
          onClick={() => setShowTips(!showTips)}
        >
          <IoMdInformationCircleOutline className="text-lg" />
          Tips
        </button>
      )}

      {/* Main Form */}
      <div className={`flex flex-col  w-full mt-14 lg:mt-0 ${editCourse ? "lg:w-11/12" : "lg:w-6/9"}`}>
        <h1 className="text-3xl font-bold mb-6">Add a New Course</h1>
        <div className="w-full mb-10 md:mb-5">
          <RenderSteps />
        </div>
      </div>

      {/* Sidebar Tips - visible on large screens */}
      {!editCourse && (
        <div className="hidden lg:flex flex-col bg-gray-900 text-white p-6 rounded-xl shadow-md border border-gray-700 w-3/9 max-h-fit">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            {"\u26a1"} Course Upload Tips
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-300 text-sm">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create and organize a course.</li>
            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
            <li>Information from the Additional Data section shows up on the course single page.</li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      )}

      {/* Tips Drawer for small screens */}
      {showTips && !editCourse && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-5 m-1 pb-15 border-t border-gray-700 rounded-t-xl z-20 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">⚡ Course Upload Tips</h2>
            <button
              onClick={() => setShowTips(false)}
              className="text-sm bg-gray-700 px-2 py-1 rounded-md"
            >
              Close
            </button>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create and organize a course.</li>
            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
            <li>Information from the Additional Data section shows up on the course single page.</li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
