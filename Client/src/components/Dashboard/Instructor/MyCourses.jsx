import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCourse, setEditCourse, setStep } from "../../../redux/slices/courseSlice";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaPlus } from "react-icons/fa";
import CTAButton from "./../../Home/CTAButton";
import { deleteCourse, getInstructorCourses } from "./../../../services/operations/courseapis";
import Modal from './../Common/Modal';
import { COURSE_STATUS } from "../../../utils/constant";

const MyCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [deleteModal,setDeleteModal] = useState(null);

  const fetchCourses = async () => {
    const result = await getInstructorCourses();
    if (result) {
      setCourses(result);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEdit = (course)=>{
    dispatch(setEditCourse(true));
    dispatch(setCourse(course));
    dispatch(setStep(1));
    navigate("/dashboard/add-course");
  }

  const handleCourseDelete = async (courseId)=>{
    const result = await deleteCourse(courseId);
    console.log(result);
    if (result) {
      setDeleteModal(null);
      fetchCourses();
    }
  }


  return (
    <>
    <div className="min-h-screen px-6 py-10 bg-black opacity-80 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <CTAButton
          active={true}
          text="Add Course"
          action={() => navigate("/dashboard/add-course")}
        >
          <FaPlus />
        </CTAButton>
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
                {course.courseDescription.length>100?course.courseDescription.substring(0,100)+"...":course.courseDescription}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                Created: {course.createdAt}
              </p>
              {course.status==COURSE_STATUS.DRAFT&&
              <span className={`bg-red-900 text-white text-xs font-semibold tracking-wider py-1 px-3 rounded-full`}>
                Drafted
              </span>
              }
              {course.status==COURSE_STATUS.PUBLISHED&&
              <span className={`bg-green-500 text-black text-xs font-semibold tracking-wider py-1 px-3 rounded-full`}>
                Published
              </span>
              }
            </div>
            <div className="flex flex-col justify-between items-end text-right">
              <p className="text-lg font-semibold text-yellow-400">
                ₹{course.price}
              </p>
              <div className="flex gap-3 mt-4">
                <button title="Edit Course" onClick={()=>handleEdit(course)}>
                  <FaEdit className="w-5 h-5 cursor-pointer hover:text-blue-400" />
                </button>
                <button title="Delete Course" onClick={()=>setDeleteModal(course._id)}>
                  <MdDelete className="w-5 h-5 cursor-pointer hover:text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {deleteModal&&<Modal
    title="Do you want to delete this course?"
    paragraph="All the data related to this course will be deleted"
    button1="Delete"
    button2="Cancel"
    active1 = {true}
    active2 = {false}
    action1={() => handleCourseDelete(deleteModal)}
    action2={()=>setDeleteModal(null)}
    />}
    </>
  );
};

export default MyCourses;
