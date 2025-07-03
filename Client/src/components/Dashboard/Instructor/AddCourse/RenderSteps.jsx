import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishingCourseForm from "./PublishingCourse/PublishingCourseForm";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publishing Course",
    },
  ];

  return (
    <>
    <div className="flex items-center justify-between w-full max-w-xl mx-auto px-5 md:px-15 py-6">
      {steps.map((item, index) => (
        <React.Fragment key={index}>
          {/* Step */}
          <div className="relative flex flex-col items-center flex-0.5">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-bold border-2 z-10
                ${
                  step === item.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-gray-600 text-gray-400'
                }
                ${step>item.id?'bg-blue-600 border-none':'bg-gray-800'}`}
            >
              {step>item.id?(<FaCheck className="text-black"/>):item.id}
            </div>
            <div className="absolute top-10 text-xs text-center text-gray-300 whitespace-nowrap">
              {item.title}
            </div>
          </div>

          {/* Dashed line */}
          {index !== steps.length - 1 && (
            <div className={`flex-2 h-0.5 border-t-2 border-dashed ${step>item.id?'border-blue-400':'border-gray-600'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
    <div className="mt-10 flex flex-row justify-between items-center w-full bg-gray-800/80 p-4 rounded-lg min-h-fit">
    {step==1&&<CourseInformationForm/>}
    {step==2&&<CourseBuilderForm/>}
    {step===3&&<PublishingCourseForm/>}
    </div>
    </>
  );
};

export default RenderSteps;
