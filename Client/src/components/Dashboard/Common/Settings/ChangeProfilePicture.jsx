import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUpload } from "react-icons/fa";
import { useState } from "react";
import { profilePictureUpdate } from "../../../../services/operations/profileapis";

const ChangeProfilePicture = () => {
  const user = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (profilePicture) {
      const objectUrl = URL.createObjectURL(profilePicture);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [profilePicture]);
  return (
    <div className="flex flex-row justify-between items-center w-full bg-gray-800/80 p-4 rounded-lg">
      <div className="flex flex-row gap-2 justify-center items-center">
        <img
          src={previewUrl || user?.image}
          alt="Profile"
          className="w-16 h-16 rounded-full"
        />
        <div className="flex flex-col gap-2 items-center">
          <p className="text-lg font-semibold">Change Profile Picture</p>
          <div className="flex flex-row gap-2 font-semibold">
            <label
              htmlFor="profilePictureUpload"
              className="cursor-pointer px-4 py-2 bg-black border-3 border-blue-500 text-white rounded-lg active:scale-95 transition-all duration-200 hover:opacity-70 box-border"
            >
              Select
              <input
                type="file"
                id="profilePictureUpload"
                name="profilePicture"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => setProfilePicture(e.target.files[0])}
                className="hidden"
              />
            </label>

            <button
              className="bg-blue-500 text-white px-4 rounded-lg py-2 flex flex-row gap-2 items-center cursor-pointer border-3 border-blue-500 active:scale-95 transition-all duration-200 hover:opacity-70 box-border"
              onClick={() => dispatch(profilePictureUpdate(profilePicture))}
            >
              Upload
              <FaUpload />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
