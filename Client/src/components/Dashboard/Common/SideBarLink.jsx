import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Icons1 from 'react-icons/ai'
import * as Icons2 from 'react-icons/vsc'
import { setEditCourse} from "../../../redux/slices/courseSlice";

const SideBarLink = ({link,icon}) => {
  const Icon = Icons1[icon] || Icons2[icon];
  const dispatch = useDispatch();
  return (
    <NavLink
      key={link.id}
      to={link.path}
      className={({ isActive }) =>
        isActive ? "border-b-4 md:border-b-0 md:border-l-4 border-blue-500 text-blue-500 bg-gray-900" : "border-b-4 md:border-b-0 md:border-l-4 border-transparent"
      }
    >
      <div className="flex items-center gap-2 px-4 md:px-8 pt-3 pb-2" onClick={()=>{
        link.name=="Add Course"&&dispatch(setEditCourse(null));
      }}>
        <Icon className="text-2xl md:text-xl"/>
        <span className="hidden lg:block">{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SideBarLink;
