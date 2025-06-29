import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Loading";
import Chart from "./Chart";
import { getInstructorReports } from "../../../../services/operations/profileapis";
import { getInstructorCourses } from "../../../../services/operations/courseapis";
import { Link, useNavigate } from "react-router-dom";
import CTAButton from "./../../../Home/CTAButton";
import { FaPlus } from "react-icons/fa6";
import { setEditCourse } from "../../../../redux/slices/courseSlice";

const Reports = () => {
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const instructorApiData = await getInstructorReports();
      const result = await getInstructorCourses();
      if (instructorApiData?.length) setInstructorData(instructorApiData);
      if (result) setCourses(result);
      setLoading(false);
    })();
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div className="flex flex-col w-full gap-6 opacity-80 min-h-[calc(100vh-4rem)]">
      {/* Greeting */}
      <div>
        <h1 className="text-3xl font-bold mb-0">Hi, {user.firstName} 👋</h1>
        <p className="text-gray-400">Let's start something new</p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="h-full grid place-items-center">
          <Loading />
        </div>
      ) : !instructorData || !courses.length ? (
        <div className="flex flex-col items-center gap-5 mt-20 bg-gray-800/80 px-6 py-20 rounded-xl">
          <p className="text-2xl font-bold text-gray-200">
            You have <span className="font-extrabold text-red-400">not</span>{" "}
            published any courses yet!
          </p>
          <div className="text-xl">
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
        </div>
      ) : (
        <div className="flex flex-col md:flex-row my-5 gap-10">
          {/* Charts */}
          <div className="w-full">
            {totalAmount > 0 || totalStudents > 0 ? (
              <div className="h-full">
                <Chart courses={instructorData} />
              </div>
            ) : (
              <div className="bg-gray-800/80 h-full rounded-xl p-6">
                <p className="text-lg text-gray-200 font-bold">Visualize</p>
                <p className="mt-4 text-xl text-gray-400 font-medium">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="min-h-fit min-w-[250px] rounded-xl bg-gray-800/80 p-6">
            <p className="text-lg font-bold text-gray-200">Statistics</p>
            <div className="flex flex-col gap-4 mt-4 mb-4">
              {[
                { label: "Total Courses", value: courses.length },
                { label: "Total Students", value: totalStudents },
                { label: "Total Income", value: `₹ ${totalAmount}` },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-lg text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-semibold text-gray-100">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Published Courses */}
      {!loading && instructorData && courses.length > 0 && (
        <div className="w-full rounded-xl bg-gray-800/80 p-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-200 text-lg font-bold">
              Your Published Courses
            </p>
            <Link to="/dashboard/my-courses">
              <div className="text-yellow-400 text-xs font-semibold">
                View All
              </div>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-x-5 gap-y-7 my-4">
            {courses.slice(0, 3).map((course, ind) => (
              <div key={ind} className="w-full md:w-1/3">
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="h-[200px] w-full rounded-xl object-cover"
                />
                <p className="mt-3 text-sm font-medium text-gray-100">
                  {course.courseName}
                </p>
                <p className="mt-1 text-xs font-medium text-gray-400">
                  {course.studentsEnrolled?.length} students | ₹ {course.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
