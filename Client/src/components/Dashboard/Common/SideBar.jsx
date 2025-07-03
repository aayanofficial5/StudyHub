import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { VscSettingsGear } from "react-icons/vsc";
import sideBarLinks from "../../../data/sideBarLinks";
import SideBarLink from "./SideBarLink";

const SideBar = ({ setLogoutModal }) => {
  const { user } = useSelector((state) => state.profile);

  // helper: filter links the same way we do in the desktop sidebar
  const permittedLinks = sideBarLinks.filter(
    (link) => !(link.type && link.type !== user?.accountType)
  );

  return (
    <>
      {/* ---------- desktop / tablet (left) ---------- */}
      <div className="hidden lg:flex flex-col bg-gradient-to-bl from-slate-900 via-gray-700 to-slate-950 min-h-[89vh] w-[270px] gap-3">
        <div className="flex flex-col mt-10">
          {permittedLinks.map((link) => (
            <SideBarLink key={link.id} link={link} icon={link.icon} />
          ))}
        </div>

        <div className="mx-auto w-5/6 mt-4 mb-4 h-[1px] bg-white" />

        <div className="flex flex-col">
          <SideBarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            icon="VscSettingsGear"
          />
          <button
            className="flex items-center gap-2 px-8 ml-1 py-2 cursor-pointer"
            onClick={() => setLogoutModal(true)}
          >
            <FiLogOut className="text-xl" />
            Logout
          </button>
        </div>
      </div>

      {/* ---------- mobile (bottom) ---------- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around bg-gradient-to-br from-slate-900 via-gray-700 to-slate-950 border-gray-700 border-t-2">
        {permittedLinks.map((link) => (
            <SideBarLink key={link.id} link={link} icon={link.icon} />
          ))}

      
          <SideBarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            icon="VscSettingsGear"
          />
          <button
            className="flex gap-2 px-4 md:px-8 py-3 cursor-pointer"
            onClick={() => setLogoutModal(true)}
          >
            <FiLogOut className="text-2xl md:text-xl" />
            <span className="hidden lg:block">Logout</span>
          </button>
      </div>
    </>
  );
};

export default SideBar;
