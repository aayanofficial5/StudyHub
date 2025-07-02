import React from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import profile from "../../../assets/profilePlaceholder.jpg";

const EditButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer active:scale-95 transition-all duration-300 hover:bg-blue-600 text-sm md:text-base"
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
    <div className="flex flex-col w-full gap-6 opacity-80 mb-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-0">My Profile</h1>

      {/* Top section */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full bg-gray-800/80 p-4 rounded-lg gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user?.image || profile}
            alt="Profile"
            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <p className="text-sm md:text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs md:text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
        <EditButton />
      </div>

      {/* About section */}
      <div className="flex flex-col gap-2 bg-gray-800/80 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-sm md:text-lg font-semibold">About</h2>
          <EditButton />
        </div>
        <input
          type="text"
          placeholder="Write something about yourself"
          value={user?.about || "N/A"}
          className="focus:outline-none w-full text-gray-400 bg-transparent"
          readOnly
        />
      </div>

      {/* Personal Details */}
      <div className="flex flex-col gap-4 bg-gray-800/80 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-sm md:text-lg font-semibold">Personal Details</h2>
          <EditButton />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <h3 className="text-sm text-gray-500">First Name</h3>
              <p className="text-base">{user?.firstName || "N/A"}</p>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-sm text-gray-500">Last Name</h3>
              <p className="text-base">{user?.lastName || "N/A"}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <h3 className="text-sm text-gray-500">Email</h3>
              <p className="text-base">{user?.email || "N/A"}</p>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-sm text-gray-500">Phone</h3>
              <p className="text-base">{user?.contactNumber || "N/A"}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <h3 className="text-sm text-gray-500">Gender</h3>
              <p className="text-base">{user?.gender || "N/A"}</p>
            </div>
            <div className="w-full md:w-1/2">
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
