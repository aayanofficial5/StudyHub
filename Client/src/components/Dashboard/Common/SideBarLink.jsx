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
        isActive ? "border-l-2 border-blue-500 text-blue-500 bg-gray-800" : "border-l-2 border-transparent"
      }
    >
      <div className="flex items-center gap-2 px-8 py-2" onClick={()=>{
        link.name=="Add Course"&&dispatch(setEditCourse(null));
      }}>
        <Icon className="text-xl"/>
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SideBarLink;
