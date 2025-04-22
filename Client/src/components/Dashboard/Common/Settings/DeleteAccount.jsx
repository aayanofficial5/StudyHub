import React from "react";
import { MdDelete } from "react-icons/md";
import { deleteAccount } from "../../../../services/operations/profileapis";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
const DeleteAccount = ({setDeletionModal}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAccountDeletion = () => {
    setDeletionModal(true);
  };
  return (
    <div className="flex flex-row items-center gap-5 bg-rose-950/70 p-5 rounded-lg w-full border-1 border-rose-700/50">
      <div className="bg-rose-500/40 rounded-full p-2">
        <MdDelete className="text-rose-400" size={50} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold">Delete Account</h1>
        <div className="text-rose-300">
          <p>Would you like to permanently delete your account?</p>
          <p>
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all the contain associated with it.
          </p>
        </div>
        <button
          className="bg-rose-600/50 text-white py-2 px-4 rounded w-[200px] cursor-pointer"
          onClick={handleAccountDeletion}
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
