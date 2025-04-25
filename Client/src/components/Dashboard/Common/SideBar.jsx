import React from "react";
import { FiLogOut } from "react-icons/fi";
import sideBarLinks from "../../../data/sideBarLinks";
import { useSelector } from "react-redux";
import SideBarLink from "./SideBarLink";

const SideBar = ({ setLogoutModal }) => {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="hidden lg:flex flex-col bg-gray-900/80  min-h-[89vh] w-[270px] gap-3 border-r-1 border-gray-700">
      <div className="flex flex-col mt-10">
        {sideBarLinks.map((link) => {
          if (link.type && link.type !== user?.accountType) return null;
          return <SideBarLink key={link.id} link={link} icon={link.icon} />;
        })}
      </div>
      <div className="mx-auto w-5/6 mt-4 mb-4 h-[1px] bg-white"></div>
      <div className="flex flex-col">
        <SideBarLink
          link={{ name: "Settings", path: "/dashboard/settings" }}
          icon="VscSettingsGear"
        />
        <button
          className="flex items-center gap-2 px-8 py-2 cursor-pointer"
          onClick={() => setLogoutModal(true)}
        >
          <FiLogOut className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
