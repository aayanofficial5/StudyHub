import React, { useEffect, useState } from "react";
import CourseReviewModal from "../components/Core/ViewCourse/CourseReviewModal";
import Loading from "./../components/Loading";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from "../redux/slices/viewCourseSlice";
import VideoDetailsSidebar from './../components/Core/ViewCourse/VideoDetailsSideBar';
import { getFullDetailsOfCourse } from './../services/operations/courseapis';

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const setCourseSpecificDetails = async () => {
    setLoading(true);
    try {
      // Simulate fetching course details
      const courseData = await getFullDetailsOfCourse(courseId,token);
      // console.log("Course Data:", courseData);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      });
      dispatch(setTotalNoOfLectures(lectures));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setCourseSpecificDetails();
  }, []);

  return (
    <>
      <div className="relative">
        <div className="flex flex-row w-full">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
          <div className="flex justify-center items-center w-full min-h-[79vh] px-10 lg:px-20 py-10 bg-gradient-to-bl from-slate-950 via-gray-800 to-slate-950">
            {loading ? <Loading /> : <Outlet />}
          </div>
        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      </div>
    </>
  );
};

export default ViewCourse;
