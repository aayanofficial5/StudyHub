import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../redux/slices/courseSlice";
import CTAButton from "../../../../Home/CTAButton";
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import NestedView from "./NestedView";
import {
  createSection,
  updateSection,
} from "./../../../../../services/operations/courseapis";
import toast from "react-hot-toast";
const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { course } = useSelector((state) => state.course);

  const [editSectionName, setEditSectionName] = useState(null);

  const handleCancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
  };
  const goNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section");
      return;
    }
    if (
      course.courseContent.some((section) => section?.subSection?.length === 0)
    ) {
      toast.error("Please add at least one lecture in each section");
      return;
    }
    dispatch(setStep(3));
  };
  const onSubmit = async (data) => {
    let result = null;
    if (!editSectionName) {
      console.log(data);
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course?._id,
      });
      if (result) {
        dispatch(setCourse(result));
        handleCancelEdit();
      }
    } else {
      result = await updateSection({
        sectionId: editSectionName,
        sectionName: data.sectionName,
      });
      if (result) {
        const updatedCourseContent = course?.courseContent.map((section) =>
          section?._id == result?._id ? result : section
        );
        const updatedCourse = {
          ...course,
          courseContent: updatedCourseContent,
        };
        dispatch(setCourse(updatedCourse));
        handleCancelEdit();
      }
    }
  };

  const handleChangeByEditSectionName = (sectionId, sectionName) => {
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="space-y-6 text-white w-full">
      {/* Section Name Input */}
      <h1 className="text-3xl font-semibold mb-6">Course Builder</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 text-white w-full"
      >
        <div>
          <label htmlFor="sectionName" className="block mb-1 font-medium">
            Section Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="sectionName"
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none"
          />
          {errors.sectionName && (
            <p className="text-red-500 text-sm mt-1">
              Section Name is required
            </p>
          )}
        </div>

        {/* Create Section Button */}
        <div className="flex flex-row items-end gap-5">
          <div>
            <CTAButton
              active={true}
              text={editSectionName ? "Edit Section Name" : "Create Section"}
            >
              {editSectionName ? <FaEdit /> : <IoMdAddCircle size={25} />}
            </CTAButton>
          </div>
          {editSectionName && (
            <button
              className="underline text-sm cursor-pointer"
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Created Sections */}
      {course?.courseContent?.length > 0 && (
        <NestedView
          handleChangeByEditSectionName={handleChangeByEditSectionName}
        />
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-x-3">
        <div>
          <CTAButton active={false} text="Back" action={goBack} />
        </div>
        <div>
          <CTAButton active={true} text="Next" arrow={true} action={goNext} />
        </div>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
