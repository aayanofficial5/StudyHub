import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  resetCourseState,
  setStep,
} from "../../../../../redux/slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constant";
import { editCourseDetails } from "../../../../../services/operations/courseapis";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong} from "react-icons/fa6";
import { FaSave } from 'react-icons/fa';

const PublishingCourseForm = () => {
  const { token } = useSelector((state) => state.auth);
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { course, editCourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, [course, setValue]);

  const goBack = () => {
    dispatch(setStep(2));
  };

  async function onSubmit(data) {
    const isAlreadySetPublic =
      (course?.status === COURSE_STATUS.PUBLISHED && getValues("public")) ||
      (course?.status === COURSE_STATUS.DRAFT && !getValues("public"));

    if (isAlreadySetPublic) {
      dispatch(resetCourseState());
      navigate("/dashboard/my-courses");
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    const result = await editCourseDetails(formData, token);
    if (result) {
      dispatch(resetCourseState());
      navigate("/dashboard/my-courses");
    }
  }

  return (
    <div className="space-y-6 text-white w-full">
      <h1 className="text-3xl font-semibold mb-6">Publish Settings</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="public" className="flex items-center gap-2">
            <input
              type="checkbox"
              id="public"
              className="h-4 w-4"
              {...register("public")}
            />
            <span className="text-lg">Make this Course Public</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 w-full">
          <button
            type="button"
            onClick={goBack}
            className="w-full sm:w-auto border bg-white/20 border-white/20 text-white hover:bg-white/10 transition-all duration-200 px-6 py-2 rounded-lg text-sm sm:text-base font-medium flex items-center justify-center gap-2"
          >
            <FaArrowLeftLong />
            <span>Back</span>
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-6 py-2 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-2"
          >
            <span>{editCourse ? "Save Changes" : "Save"}</span>
            <FaSave />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublishingCourseForm;
