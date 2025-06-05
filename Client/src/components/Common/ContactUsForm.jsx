import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countrycode.json";
import { AiOutlineSend } from "react-icons/ai";
import { contactUsData } from "../../services/operations/authapis";
import { toast } from "react-hot-toast";
const ContactUsForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        phoneNumber: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitContactForm = async (data) => {
    console.log(data);
    const response = await contactUsData(data);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-4 w-full max-w-3xl mx-auto p-5 bg-gray-800/80 rounded-b-lg mt-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <label htmlFor="firstName" className="flex flex-col flex-1">
          <p>
            First Name<sup className="text-red-500">*</sup>
          </p>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            className="border-1 border-gray-100 rounded-md p-2"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <p className="text-red-500">Please enter your first name</p>
          )}
        </label>
        <label htmlFor="lastName" className="flex flex-col flex-1">
          <p>Last Name</p>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter last name"
            className="border-1 border-gray-100 rounded-md p-2"
            {...register("lastName")}
          />
        </label>
      </div>
      <label htmlFor="email" className="flex flex-col mt-3">
        <p>
          Email Address<sup className="text-red-500">*</sup>
        </p>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="border-1 border-gray-100 rounded-md p-2"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-red-500">Please enter your email address</p>
        )}
      </label>
      <div>
        {/*DropDown*/}
        <p className="mt-3">
          Phone Number<sup className="text-red-500">*</sup>
        </p>
        <div className="flex flex-row gap-4">
          <select
            name="dropdown"
            id="dropdown"
            className="border-1 border-gray-100 rounded-md p-2 cursor-pointer text-white/50 w-25"
            {...register("countryCode", { required: true })}
          >
            {CountryCode.map((element, index) => {
              return (
                <option
                  key={index}
                  value={element.code}
                  className="text-white bg-gray-900/90 cursor-pointer"
                >
                  {element.code + " " + element.country}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="123 456 7890"
            className="border-1 border-gray-100 rounded-md p-2 w-full"
            {...register("phoneNumber", {
              required: {
                value: true,
                message: "Please enter your phone number",
              },
              maxLength: {
                value: 10,
                message: "Phone number must be 10 digits",
              },
              minLength: {
                value: 10,
                message: "Phone number must be 10 digits",
              },
            })}
          />
        </div>
        <div className="flex flex-col mt-1">
          {errors.countryCode && (
            <p className="text-red-500 ">Please select your country code</p>
          )}
          {errors.phoneNumber && (
            <p className="text-red-500 ">{errors.phoneNumber.message}</p>
          )}
        </div>
      </div>
      <label htmlFor="message" className="flex flex-col mt-3">
        <p>
          Message<sup className="text-red-500">*</sup>
        </p>
        <textarea
          name="message"
          id="message"
          placeholder="Enter your message here"
          className="border-1 border-gray-100 rounded-md p-2 h-30 lg:h-50"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <p className="text-red-500">Please enter your message</p>
        )}
      </label>
      <button
        type="submit"
        className="w-full flex justify-center py-2 bg-blue-500 rounded-md hover:scale-95 hover:text-black transition-all duration-400 ease-in-out mt-5 cursor-pointer font-semibold text-base border-3 border-blue-500 gap-4"
      >
        Message Us <AiOutlineSend className="text-2xl" />
      </button>
    </form>
  );
};

export default ContactUsForm;
