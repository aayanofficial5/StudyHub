import React from "react";
import RenderSteps from "./RenderSteps";

const AddCourse = () => {
  return (
    <div className="flex flex-row w-full gap-20 opacity-80">
      <div className="w-full lg:w-6/9 flex flex-col">
        <h1 className="text-3xl font-bold mb-6">Add a New Course</h1>
        <div>
          <RenderSteps />
        </div>
      </div>
      <div className="hidden lg:flex flex-col bg-gray-900 text-white p-6 rounded-xl shadow-md mx-auto border border-gray-700 w-3/9 max-h-fit">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          {"\u26a1"}Course Upload
          Tips
        </h2>
        <ul className="list-disc list-inside space-y-3 text-gray-300 text-sm">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create and organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons, quizzes,
            and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on the course
            single page.
          </li>
          <li>Make Announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  );
};

export default AddCourse;
