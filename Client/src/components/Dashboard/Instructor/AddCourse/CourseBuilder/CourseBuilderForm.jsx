import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../redux/slices/courseSlice";
import { IoMdAddCircle } from "react-icons/io";
import {  FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import NestedView from "./NestedView";
import {
  createSection,
  updateSection,
} from "./../../../../../services/operations/courseapis";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
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
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course?._id,
        },
        token
      );
      if (result) {
        dispatch(setCourse(result));
        handleCancelEdit();
      }
    } else {
      result = await updateSection(
        {
          sectionId: editSectionName,
          sectionName: data.sectionName,
        },
        token
      );
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
      <h1 className="text-3xl font-semibold mb-6">Course Builder</h1>

      {/* Form to create/edit section */}
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

        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-6 py-2 rounded-lg text-sm sm:text-base font-semibold flex items-center gap-2"
          >
            <span>{editSectionName ? "Edit Section Name" : "Create Section"}</span>
            {editSectionName ? <FaEdit /> : <IoMdAddCircle className="text-2xl md:text-3xl" />}
          </button>

          {editSectionName && (
            <button
              type="button"
              className="underline text-sm sm:text-base cursor-pointer"
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Show existing sections if available */}
      {course?.courseContent?.length > 0 && (
        <NestedView
          handleChangeByEditSectionName={handleChangeByEditSectionName}
        />
      )}

      {/* Navigation buttons */}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3 w-full mt-4">
        <button
          type="button"
          onClick={goBack}
          className="w-full sm:w-auto border bg-white/20 border-white/20 text-white hover:bg-white/10 transition-all duration-200 px-6 py-2 rounded-lg text-sm sm:text-base font-medium flex items-center justify-center gap-2"
        >
          <FaArrowLeftLong />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={goNext}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-6 py-2 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-2"
        >
          <span>Next</span>
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
