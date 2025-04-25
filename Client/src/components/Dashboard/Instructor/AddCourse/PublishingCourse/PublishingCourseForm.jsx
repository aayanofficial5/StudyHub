import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CTAButton from "../../../../Home/CTAButton";
import {
  resetCourseState,
  setStep,
} from "../../../../../redux/slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constant";
import { editCourseDetails } from "../../../../../services/operations/courseapis";
import { useNavigate } from "react-router-dom";

const PublishingCourseForm = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { course, editCourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  });

  const goBack = () => {
    dispatch(setStep(2));
  };

  async function onSubmit(data) {
    // if form is not updated or course status is published
    if (
      (course?.status === COURSE_STATUS.PUBLISHED && getValues("public")) ||
      (course?.status === COURSE_STATUS.DRAFT && !getValues("public"))
    ) {
      dispatch(resetCourseState());
      navigate("/dashboard/my-courses");
      return;
    }

    // if form is updated
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);
    // console.log(courseStatus);
    // call api
    const result = await editCourseDetails(formData);
    if(result){
      console.log(result);
      dispatch(resetCourseState());
      navigate("/dashboard/my-courses");
    }
  }

  return (
    <div className="space-y-6 text-white w-full">
      {/* Publish Course Settings */}
      <h1 className="text-3xl font-semibold mb-6">Publish Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="public">
            <input
              type="checkbox"
              id="public"
              className="h-4 w-4"
              {...register("public")}
            />
            <span className="ml-2 text-xl">Make this Course Public</span>
          </label>
        </div>
        <div className="flex justify-end gap-x-3">
          {/* Navigation Button */}
          <CTAButton active={false} text="Back" action={goBack} />
          {/* Submit Button */}
          <CTAButton
            active={true}
            text={editCourse ? "Save Changes" : "Save"}
          />
        </div>
      </form>
    </div>
  );
};

export default PublishingCourseForm;
