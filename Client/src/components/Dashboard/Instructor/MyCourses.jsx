import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../redux/slices/courseSlice";
import { useNavigate } from "react-router-dom";
import { MdCheckCircle, MdDelete, MdDrafts } from "react-icons/md";
import { FaEdit, FaPlus } from "react-icons/fa";
import CTAButton from "./../../Home/CTAButton";
import {
  deleteCourse,
  getInstructorCourses,
} from "./../../../services/operations/courseapis";
import Modal from "./../Common/Modal";
import { COURSE_STATUS } from "../../../utils/constant";

const MyCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(null);
  const { courses } = useSelector((state) => state.course);

  const fetchCourses = () => {
    dispatch(getInstructorCourses());
  };

  useEffect(() => {
    // fetchCourses();
    console.log("1");
  }, []);

  const handleEdit = (course) => {
    dispatch(setEditCourse(true));
    dispatch(setCourse(course));
    dispatch(setStep(1));
    navigate("/dashboard/add-course");
  };

  const handleCourseDelete = async (courseId) => {
    const result = await deleteCourse(courseId);
    console.log(result);
    if (result) {
      setDeleteModal(null);
      fetchCourses();
    }
  };

  return (
    <>
      <div className="min-h-screen px-6 py-10 bg-black opacity-80 text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Courses</h1>
          <CTAButton
            active={true}
            text="Add Course"
            action={() => {
              dispatch(setEditCourse(null));
              navigate("/dashboard/add-course");
            }}
          >
            <FaPlus />
          </CTAButton>
        </div>
        <div className="bg-gray-900/80 p-4 text-xl font-semibold text-gray-400/80 rounded-2xl shadow-md hidden md:flex lg:flex flex-row mb-5 justify-between px-5">
          <div>Courses</div>
          <div className="flex gap-15">
            <div>Price</div>
            <div>Actions</div>
          </div>
        </div>
        <div className="grid gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-gray-900/80 p-4 rounded-2xl shadow-md flex flex-col md:flex-row gap-6"
            >
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="w-full md:w-64 h-40 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">
                  {course.courseName}
                </h2>
                <p className="text-sm text-gray-400 mb-3">
                  {course.courseDescription.length > 100
                    ? course.courseDescription.substring(0, 100) + "..."
                    : course.courseDescription}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Created: {course.createdAt}
                </p>
                {course.status == COURSE_STATUS.DRAFT && (
                  <span className="bg-red-900 text-white text-[14px] font-semibold tracking-wider py-0.5 px-2 rounded-full flex w-fit gap-2 items-center">
                    <MdDrafts />
                    Drafted
                  </span>
                )}
                {course.status == COURSE_STATUS.PUBLISHED && (
                  <span className="bg-green-500 text-black text-[14px] font-semibold tracking-wider py-0.5 px-2 rounded-full flex w-fit gap-2 items-center">
                    <MdCheckCircle />
                    Published
                  </span>
                )}
              </div>
              <div className="flex flex-row justify-between items-end md:items-start lg:items-start text-right gap-20">
                <p className="text-lg font-semibold text-yellow-400">
                  ₹{course.price}
                </p>
                <div className="flex gap-3 mt-1">
                  <button
                    title="Edit Course"
                    onClick={() => handleEdit(course)}
                  >
                    <FaEdit className="w-5 h-5 cursor-pointer hover:text-blue-400" />
                  </button>
                  <button
                    title="Delete Course"
                    onClick={() => setDeleteModal(course._id)}
                  >
                    <MdDelete className="w-5 h-5 cursor-pointer hover:text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {deleteModal && (
        <Modal
          title="Delete"
          paragraph={
            <p>
              Are you sure?
              <br />
              All the data related to this course will be deleted
            </p>
          }
          button1="Delete"
          button2="Cancel"
          active1={true}
          active2={false}
          action1={() => handleCourseDelete(deleteModal)}
          action2={() => setDeleteModal(null)}
        />
      )}
    </>
  );
};

export default MyCourses;
