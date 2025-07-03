import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProfile } from "../../../../services/operations/profileapis";

const EditProfile = () => {
  const user = useSelector((state) => state.profile.user);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(updateProfile(data, token));
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-800/80 p-4 sm:p-6 rounded-lg w-full text-white">
      <div className="flex justify-between">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Personal Details</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Row 1 - First and Last Name */}
        <div className="flex flex-col lg:flex-row gap-5">
          <label className="flex flex-col lg:w-1/2 text-sm gap-1">
            <span className="text-gray-400">First Name</span>
            <input
              type="text"
              placeholder="Enter First Name"
              defaultValue={user?.firstName}
              {...register("firstName", { required: true })}
              className="p-2 rounded-md bg-gray-700 border border-gray-500 text-base"
            />
            {errors.firstName && <span className="text-red-500">Please Enter First Name</span>}
          </label>

          <label className="flex flex-col lg:w-1/2 text-sm gap-1">
            <span className="text-gray-400">Last Name</span>
            <input
              type="text"
              placeholder="Enter Last Name"
              defaultValue={user?.lastName}
              {...register("lastName", { required: true })}
              className="p-2 rounded-md bg-gray-700 border border-gray-500 text-base"
            />
            {errors.lastName && <span className="text-red-500">Please Enter Last Name</span>}
          </label>
        </div>

        {/* Row 2 - Date of Birth and Gender */}
        <div className="flex flex-col lg:flex-row gap-5">
          <label className="flex flex-col lg:w-1/2 text-sm gap-1">
            <span className="text-gray-400">Date of Birth</span>
            <input
              type="date"
              defaultValue={user?.dateOfBirth}
              max={new Date().toISOString().split("T")[0]}
              {...register("dateOfBirth")}
              className="p-2 rounded-md bg-gray-700 border border-gray-500 text-base"
            />
          </label>

          <label className="flex flex-col lg:w-1/2 text-sm gap-1">
            <span className="text-gray-400">Gender</span>
            <select
              defaultValue={user?.gender || ""}
              {...register("gender")}
              className="p-2 rounded-md bg-gray-700 border border-gray-500 text-base"
            >
              <option value="" disabled>Select Gender</option>
              {genders.map((g, i) => (
                <option key={i} value={g}>{g}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Row 3 - Phone and About */}
        <div className="flex flex-col lg:flex-row gap-5">
          <label className="flex flex-col lg:w-1/2 text-sm gap-1">
            <span className="text-gray-400">Phone Number</span>
            <input
              type="tel"
              placeholder="Enter your contact number"
              defaultValue={user?.contactNumber}
              {...register("contactNumber", {
                minLength: { value: 10, message: "Must be at least 10 digits" },
                maxLength: { value: 13, message: "Can't exceed 13 digits" },
              })}
              className="p-2 rounded-md bg-gray-700 border border-gray-500 text-base"
            />
            {errors.contactNumber && (
              <span className="text-red-500">{errors.contactNumber.message}</span>
            )}
          </label>

          <label className="flex flex-col lg:w-1/2 text-sm gap-1">
            <span className="text-gray-400">About</span>
            <textarea
              rows={3}
              placeholder="Write something about yourself"
              defaultValue={user?.about}
              {...register("about")}
              className="p-2 rounded-md bg-gray-700 border border-gray-500 text-base resize-none"
            />
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-6 py-2 rounded-lg text-sm sm:text-base font-semibold"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
