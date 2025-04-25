import React from "react";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { getAllCourses } from "../services/operations/courseapis";
import CourseCard from './../components/Common/CourseCard';

const Courses = () => {
  const { loading } = useSelector((state) => state.auth);
  const [courseData, setCourseData] = useState([]);
  const fetchTopCourses = async () => {
      const data = await getAllCourses();
      if(data.length>0)
        setCourseData(data);
    };
    useEffect(() => {
      fetchTopCourses();
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
