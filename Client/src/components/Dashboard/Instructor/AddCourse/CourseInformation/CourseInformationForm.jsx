import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRupeeSign } from "react-icons/fa";
import CTAButton from "./../../../../Home/CTAButton";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourse,
  editCourseDetails,
  getCourseCategories,
} from "./../../../../../services/operations/courseapis";
import { setCourse, setStep } from "../../../../../redux/slices/courseSlice";
import ChipInput from "./ChipInput";
import Upload from "../Upload";
import { COURSE_STATUS } from "../../../../../utils/constant";
import toast from "react-hot-toast";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);

  const [courseCategories, setCourseCategories] = useState([]);

  async function fetchCategories() {
    const categories = await getCourseCategories();
    if (categories.length > 0) {
      setCourseCategories(categories);
    }
  }

  useEffect(() => {
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseImage", course.thumbnail);
    }
    fetchCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tags", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnail", data.courseImage);
        }

        const result = await editCourseDetails(formData);

        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
    } else {
      const formData = new FormData();
      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseShortDesc);
      formData.append("price", data.coursePrice);
      formData.append("tags", JSON.stringify(data.courseTags));
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("category", data.courseCategory);
      formData.append("status", COURSE_STATUS.DRAFT);
      formData.append("thumbnail", data.courseImage);
      const result = await createCourse(formData);
      if (result) {
        dispatch(setStep(2));
        dispatch(setCourse(result));
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 text-white w-full"
    >
      {/* Course Title */}
      <div>
        <label htmlFor="courseTitle" className="block mb-1 font-medium">
          Course Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none"
        />
        {errors.courseTitle && (
          <p className="text-red-500 text-sm mt-1">
            Course Title is Required**
          </p>
        )}
      </div>

      {/* Course Description */}
      <div>
        <label htmlFor="courseShortDesc" className="block mb-1 font-medium">
          Course Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none h-28 resize-none"
        />
        {errors.courseShortDesc && (
          <p className="text-red-500 text-sm mt-1">
            Course Description is required**
          </p>
        )}
      </div>

      {/* Course Price */}
      <div>
        <label htmlFor="coursePrice" className="block mb-1 font-medium">
          Course Price <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <FaRupeeSign />
          </span>
          <input
            type="number"
            id="coursePrice"
            placeholder="Enter Course Price"
            className="w-full pl-10 bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none"
            {...register("coursePrice", { required: true })}
          />
        </div>
        {errors.coursePrice && (
          <p className="text-red-500 text-sm mt-1">
            Course Price is Required**
          </p>
        )}
      </div>

      {/* Course Category */}
      <div>
        <label htmlFor="courseCategory" className="block mb-1 font-medium">
          Course Category <span className="text-red-500">*</span>
        </label>
        <select
          id="courseCategory"
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none cursor-pointer"
          defaultValue=""
          {...register("courseCategory", { required: true })}
        >
          <option value="" disabled className="bg-gray-800/20">
            Choose a Category
          </option>
          {courseCategories?.map((category) => (
            <option
              key={category._id}
              value={category.name}
              className="bg-gray-600"
            >
              {category.name}
            </option>
          ))}
        </select>

        {errors.courseCategory && (
          <p className="text-red-500 text-sm mt-1">
            Course Category is Required
          </p>
        )}
      </div>

      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Press Enter or , to add tags"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      {/* Benefits of the course */}
      <div>
        <label htmlFor="courseBenefits" className="block mb-1 font-medium">
          Course Benefits <span className="text-red-500">*</span>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter Benefits of Course"
          {...register("courseBenefits", { required: true })}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600 focus:outline-none h-28 resize-none"
        />
        {errors.courseBenefits && (
          <p className="text-red-500 text-sm mt-1">
            Benefits of the course is required
          </p>
        )}
      </div>
      {/* Next Button */}
      <div className="flex justify-end gap-x-3">
        {editCourse && (
          <CTAButton
            active={false}
            text="Continue Without Saving"
            arrow={false}
            action={() => dispatch(setStep(2))}
          />
        )}
        <CTAButton
          active={true}
          text={!editCourse ? "Next" : "Save Changes"}
          arrow={!editCourse && true}
        />
      </div>
    </form>
  );
};

export default CourseInformationForm;
