import React from "react";
import { apiConnector } from "../services/apiConnector";
import { courses } from "../services/apiCollection";
import { useEffect, useState } from "react";
import CourseCard from "../components/Home/CourseCard";
import Loading from "../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../redux/slices/authSlice";
const Courses = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState([]);
  const fetchCourses = async () => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("GET", courses.getAllCourses);
      // console.log(response);
      setCourseData(response.data.allCourses);
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[75vh]">
          <Loading />
        </div>
      ) : (
        <>
          <h1>Course List</h1>
          <div className="flex flex-wrap gap-4">
            {courseData.length > 0 &&
              courseData.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Courses;
