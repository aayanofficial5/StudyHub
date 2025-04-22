import React from "react";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";
import { useOutletContext } from "react-router-dom";

const Settings = () => {
  const { setDeletionModal } = useOutletContext();
  return (
    <div className="flex flex-col w-full gap-6 opacity-80">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      {/*Change Profile Picture*/}
      <ChangeProfilePicture />

      {/* Edit Profile Information */}
      <EditProfile />

      {/* Update Password */}
      <UpdatePassword />

      {/* Delete Account */}
      <DeleteAccount setDeletionModal={setDeletionModal} />
    </div>
  );
};

export default Settings;
