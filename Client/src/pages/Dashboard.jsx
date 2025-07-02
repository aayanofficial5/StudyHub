import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { Outlet } from "react-router-dom";
import SideBar from "../components/Dashboard/Common/SideBar";
import Modal from "../components/Dashboard/Common/Modal";
import { logout } from "../services/operations/authapis";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../services/operations/profileapis";
const Dashboard = () => {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: courseLoading } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const loading = courseLoading||profileLoading || authLoading;
  const [logoutModal, setLogoutModal] = useState(false);
  const [deletionModal, setDeletionModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="relative">
      <div className="flex flex-row min-h-fit w-full">
        <SideBar setLogoutModal={setLogoutModal} />
        <div className="flex justify-center items-center w-full px-10 lg:px-20 py-10 bg-gradient-to-br from-black via-gray-900 to-slate-950">
          {loading ? <Loading /> : <Outlet context={{ setDeletionModal }} />}
        </div>
      </div>
      {logoutModal && (
        <Modal
          title="Logout"
          paragraph="Are you sure you want to logout?"
          button1="Yes"
          button2="No"
          action1={() => dispatch(logout(navigate))}
          action2={() => {
            setLogoutModal(false);
          }}
        />
      )}
      {deletionModal && (
        <Modal
          title="Delete"
          paragraph="Are you sure you want to Delete your account?"
          button1="Yes"
          button2="No"
          action1={() => dispatch(deleteAccount(navigate,token))}
          action2={() => {
            setDeletionModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
