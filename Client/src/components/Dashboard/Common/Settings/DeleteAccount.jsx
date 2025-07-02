import React from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const DeleteAccount = ({ setDeletionModal }) => {
  const navigate = useNavigate();

  const handleAccountDeletion = () => {
    setDeletionModal(true);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-rose-950/70 p-3 rounded-lg w-full border border-rose-700/50">
      
      {/* Icon Section */}
      <div className="bg-rose-500/40 rounded-full p-3">
        <MdDelete className="text-rose-400" size={40} />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-3 text-white w-full">
        <h1 className="text-lg font-bold">Delete Account</h1>
        <div className="text-rose-300 text-sm leading-relaxed">
          <p>Would you like to permanently delete your account?</p>
          <p>
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all the content associated with it.
          </p>
        </div>
        <button
          className="bg-rose-600/70 hover:bg-rose-700 transition-all duration-300 text-white py-2 px-4 rounded w-full sm:w-[200px]"
          onClick={handleAccountDeletion}
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
