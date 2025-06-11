import React, { useEffect } from "react";
import RenderSteps from "./RenderSteps";
import { useDispatch, useSelector } from "react-redux";
import { setEditCourse } from "../../../../redux/slices/courseSlice";

const AddCourse = () => {
  const dispatch = useDispatch();
  const editCourse = useSelector((state) => state.course.editCourse);
  return (
    <div className="flex flex-row w-full gap-20 opacity-80 min-h-[78vh]">
      <div className={`flex flex-col w-full mt-50" ${editCourse?"lg:w-11/12":"lg:w-6/9"}`}>
        <h1 className="text-3xl font-bold mb-6">Add a New Course</h1>
        <div className="w-full">
          <RenderSteps />
        </div>
      </div>

      {!editCourse && (
        <div className="hidden lg:flex flex-col bg-gray-900 text-white p-6 rounded-xl shadow-md mx-auto border border-gray-700 w-3/9 max-h-fit">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            {"\u26a1"}Course Upload Tips
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-300 text-sm">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create and organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
