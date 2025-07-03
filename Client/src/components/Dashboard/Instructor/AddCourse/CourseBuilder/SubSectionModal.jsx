import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseapis";
import { setCourse } from "../../../../../redux/slices/courseSlice";
import { MdCancel } from "react-icons/md";
import Upload from "./../Upload";
import CTAButton from "../../../../Home/CTAButton";
import { FaSave } from "react-icons/fa";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.subSectionName);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  });

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData.subSectionName ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    );
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated) {
        toast.error("No changes made to the form");
        return;
      }

      const currentValues = getValues();
      const formData = new FormData();

      formData.append("subSectionId", modalData._id);

      if (currentValues.lectureTitle !== modalData.subSectionName) {
        formData.append("subSectionName", currentValues.lectureTitle);
      }
      if (currentValues.lectureDesc !== modalData.description) {
        formData.append("description", currentValues.lectureDesc);
      }
      if (currentValues.lectureVideo !== modalData.videoUrl) {
        formData.append("video", currentValues.lectureVideo);
      }

      const result = await updateSubSection(formData,token);
      if (result) {
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id == result._id ? result : section
        );
        const updatedCourse = {
          ...course,
          courseContent: updatedCourseContent,
        };
        dispatch(setCourse(updatedCourse));
      }
      setModalData(null);
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("subSectionName", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);

    const result = await createSubSection(formData,token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id == result._id ? result : section
      );
      const updatedCourse = {
        ...course,
        courseContent: updatedCourseContent,
      };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
  };

  return (
    <div className="fixed inset-0 z-[1000] overflow-auto bg-black/60 backdrop-blur-sm  pb-15 py-10 md:py-10 flex justify-center">
      <div className=" flex flex-col w-[85%] lg:w-[45%] bg-gray-800/80 border border-gray-500/70 rounded-lg min-h-fit gap-6 overflow-hidden shadow-2xl shadow-black ">
        <div className="flex flex-row justify-between items-center px-3 py-4 border-b bg-gray-700 border-gray-500/70 opacity-80">
          <h1 className="text-2xl font-semibold">
            {view && "Viewing"}
            {add && "Adding"}
            {edit && "Editing"} Lecture
          </h1>
          <button
            onClick={() => setModalData(null)}
            className="text-red-400 text-2xl hover:scale-110 transition-transform"
            title="Close modal"
          >
            <MdCancel />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-6 pb-6">
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view && modalData.videoUrl}
            editData={edit && modalData.videoUrl}
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="lectureTitle" className="text-sm">
              Lecture Title<span className="text-red-500">*</span>
            </label>
            <input
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              type="text"
              disabled={view}
              className="w-full border border-gray-500/70 rounded-md px-3 py-2 text-white placeholder:text-gray-400
              bg-gray-800"
              {...register("lectureTitle", { required: true })}
            />
            {errors.lectureTitle && (
              <span className="text-red-500 text-xs">
                Lecture Title is required
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lectureDesc" className="text-sm">
              Lecture Description<span className="text-red-500">*</span>
            </label>
            <textarea
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              className="w-full min-h-[130px] border border-gray-500/70 bg-gray-800 rounded-md px-3 py-2 text-white placeholder:text-gray-400"
              disabled={view}
              {...register("lectureDesc", {
                required: true,
              })}
            />
            {errors.lectureDesc && (
              <span className="text-red-500 text-xs">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-6 py-2 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-2">
                        <span>{edit ? "Save Changes" : "Save"}</span>
                        {<FaSave />}
                      </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;