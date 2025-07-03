import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUpload } from "react-icons/fa";
import { profilePictureUpdate } from "../../../../services/operations/profileapis";

const ChangeProfilePicture = () => {
  const user = useSelector((state) => state.profile.user);
  const { token } = useSelector((state) => state.auth);
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
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-800/80 p-4 rounded-lg w-full text-white">
      {/* Profile Image */}
      <div className="flex sm:flex-row gap-4 items-center">
        <img
          src={previewUrl || user?.image}
          alt="Profile"
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
        />

        {/* Info and Buttons */}
        <div className="flex flex-col gap-3 items-center sm:items-start">
          <p className="text-base sm:text-lg font-semibold text-center sm:text-left">
            Change Profile Picture
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Select Button */}
            <label
              htmlFor="profilePictureUpload"
              className="cursor-pointer px-4 py-2 border border-blue-500 text-white rounded-lg active:scale-95 transition-all duration-200 hover:opacity-70"
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

            {/* Upload Button */}
            <button
              disabled={!profilePicture}
              onClick={() => dispatch(profilePictureUpdate(profilePicture, token))}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
              ${profilePicture ? "bg-blue-500 hover:opacity-80" : "bg-gray-500 !cursor-not-allowed"}`}
            >
              Upload <FaUpload />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
