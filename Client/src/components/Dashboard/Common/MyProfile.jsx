import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const EditButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="bg-blue-500 text-white px-4 rounded-lg py-2 flex flex-row gap-2 items-center cursor-pointer active:scale-95 transition-all duration-500 hover:bg-blue-600"
      onClick={() => navigate("/dashboard/settings")}
    >
      Edit
      <FaEdit />
    </button>
  );
};

const MyProfile = () => {
  const user = useSelector((state) => state.profile.user);
  
  return (
    <div className="flex flex-col w-full gap-6 opacity-80">
      <h1 className="text-3xl font-bold mb-0">My Profile</h1>
      <div className="flex flex-row justify-between items-center w-full bg-gray-800/80 p-4 rounded-lg">
        <div className="flex flex-row gap-2 justify-center items-center">
          <img
            src={user?.image}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
        <EditButton />
      </div>
      <div className="flex flex-col gap-2 bg-gray-800/80 p-4 rounded-lg">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-semibold">About</h2>
          <EditButton />
        </div>
        <input
          type="text"
          placeholder="Write something about yourself"
          value={user?.about || "N/A"}
          className="focus:outline-none w-full text-gray-400"
          readOnly
        />
      </div>
      <div className="flex flex-col gap-2 bg-gray-800/80 p-4 rounded-lg">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-semibold">Personal Details</h2>
          <EditButton />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-100">
            <div className="flex flex-col">
              <h3 className="text-sm text-gray-500">First Name</h3>
              <p className="text-base">{user?.firstName || "N/A"}</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm text-gray-500">Last Name</h3>
              <p className="text-base">{user?.lastName || "N/A"}</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-70">
            <div className="flex flex-col lg:w-47">
              <h3 className="text-sm text-gray-500">Email</h3>
              <p className="text-base">{user?.email || "N/A"}</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm text-gray-500">Phone</h3>
              <p className="text-base">{user?.contactNumber || "N/A"}</p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-105">
            <div className="flex flex-col">
              <h3 className="text-sm text-gray-500">Gender</h3>
              <p className="text-base">{user?.gender || "N/A"}</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm text-gray-500">Date of Birth</h3>
              <p className="text-base">{user?.dateOfBirth || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
