import React from "react";
import { useSelector , useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import { updateProfile } from "../../../../services/operations/profileapis";
const EditProfile = () => {
  const user = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const genders = [
    "Male",
    "Female",
    "Non-Binary",
    "Prefer not to say",
    "Other",
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission logic here
    dispatch(updateProfile(data,token));
  };
  return (
    <div className="flex flex-col gap-2 bg-gray-800/80 p-4 rounded-lg w-full">
      <div className="flex flex-row justify-between">
        <h2 className="text-lg font-semibold">Personal Details</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full"
      >
        <div className="flex flex-col lg:flex-row gap-5 w-full">
          {/*First Name*/}
          <label className="flex flex-col lg:w-1/2">
            <h3 className="text-sm text-gray-500 mb-2">First Name</h3>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              aria-invalid={errors.firstName ? "true" : "false"}
              defaultValue={user?.firstName}
              className="text-base p-2 border-1 rounded-md border-gray-500/80 bg-gray-700/80 "
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
            <span className="text-red-500">Please Enter First Name</span>
          )}
          </label>
          {/*Last Name*/}
          <label className="flex flex-col lg:w-1/2">
            <h3 className="text-sm text-gray-500 mb-2">Last Name</h3>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              aria-invalid={errors.lastName ? "true" : "false"}
              defaultValue={user?.lastName}
              className="text-base p-2 border-1 rounded-md border-gray-500/80 bg-gray-700/80"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
            <span className="text-red-500">Please Enter Last Name</span>
          )}
          </label>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 w-full">
          {/*Date of Birth*/}
          <label className="flex flex-col lg:w-1/2">
            <h3 className="text-sm text-gray-500 mb-2">Date of Birth</h3>
            <input
              type="date"
              name="dateOfBirth"
              defaultValue={user?.dateOfBirth}
              max={new Date().toISOString().split("T")[0]}
              className="text-base p-2 border-1 rounded-md border-gray-500/80 bg-gray-700/80"
              {...register("dateOfBirth")}
            />
          </label>
          {/*Gender*/}
          <label className="flex flex-col lg:w-1/2">
            <h3 className="text-sm text-gray-500 mb-2">Gender</h3>
            <select
              name="Gender"
              className="text-base p-2 border-1 rounded-md border-gray-500/80 bg-gray-700/80"
              defaultValue={user?.gender}
              {...register("gender")}
            >
              <option value="" selected disabled>
                Select Gender
              </option>
              {genders.map((val, index) => (
                <option value={val} key={index}>
                  {val}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 w-full">
          {/*Phone Number*/}
          <label className="flex flex-col lg:w-1/2">
            <h3 className="text-sm text-gray-500 mb-2">Phone Number</h3>
            <input
              type="tel"
              placeholder="Enter your Contact number"
              defaultValue={user?.contactNumber}
              {...register("contactNumber", {
                minLength: {
                  value: 10,
                  message: "Phone number must be at least 10 digits",
                },
                maxLength: {
                  value: 13,
                  message: "Phone number can't exceed 13 digits",
                },
              })}
              className="text-base p-2 border-1 rounded-md border-gray-500/80 bg-gray-700/80"
            />
            {errors.contactNumber && (
              <span className="text-red-500">
                {errors.contactNumber.message}
              </span>
            )}
          </label>
          {/*About*/}
          <label className="flex flex-col lg:w-1/2">
            <h3 className="text-sm text-gray-500 mb-2">About</h3>
            <textarea
              type="text"
              name="about"
              placeholder="Write Something about yourself"
              rows={3}
              defaultValue={user?.about}
              className="text-base p-2 border-1 rounded-md border-gray-500/80 bg-gray-700/80"
              {...register("about")}
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-lg w-[80px] lg:w-[150px] cursor-pointer self-end-safe"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
