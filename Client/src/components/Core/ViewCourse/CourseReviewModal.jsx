import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";

import CTAButton from "./../../Home/CTAButton";
import { createRating } from "../../../services/operations/courseapis";

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 2.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ratingChanged = (newRating) => {
    // console.log(newRating)
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white/10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-gray-500 bg-gray-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-gray-700 p-5">
          <p className="text-xl font-semibold text-gray-100 uppercase">
            Add Review
          </p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-gray-100 hover:text-blue-200" />
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt={user?.firstName + "profile"}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div className="">
              <p className="font-semibold text-gray-100">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-400">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <Rating
              name="course-rating"
              defaultValue={2.5}
              onChange={(event, newValue) => ratingChanged(newValue)}
              precision={0.5}
              sx={{
                "& .MuiRating-iconEmpty": {
                  color: "gray",
                },
              }}
            />
            

            <div className="flex w-11/12 flex-col space-y-2">
              <label
                className="text-base text-gray-100"
                htmlFor="courseExperience"
              >
                Add Your Experience
                <sup className="text-red-500">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Write Your Experience"
                {...register("courseExperience", { required: true })}
                className="border-1 p-3 border-gray-600 text-sm min-h-[130px] w-full rounded-lg bg-gray-700"
              />
              {errors.courseExperience && (
                <span className="text-sm text-red-500">
                  <sup className="text-red-500">*</sup>
                  Please Add Your Experience
                </span>
              )}
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2 items-baseline">
              <button onClick={() => setReviewModal(false)}>
                <CTAButton text="CANCEL" />
              </button>
              <button>
                <CTAButton text="SAVE" active={true} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
