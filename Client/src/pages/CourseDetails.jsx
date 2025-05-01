import React, { useEffect, useState } from "react";
import Footer from "../components/Home/Footer";
import Modal from "../components/Dashboard/Common/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseDetails } from "../services/operations/courseapis";
import { useDispatch, useSelector } from "react-redux";
import RatingStars from "../components/Common/RatingStars";
import { BsInfoCircle } from "react-icons/bs";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import Loading from "../components/Loading";
import getAvgRating from "../utils/getAvgRating";
import formatDate from "../services/formatDate";
import CourseContentBar from "../components/Core/Course/CourseContentBar";
import CourseDetailsCard from "../components/Core/Course/CourseDetailsCard";

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseId } = useParams();

  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await getCourseDetails(courseId);
      console.log(res);
      if (res) setResponse(res);
    })();
  }, [courseId]);

  useEffect(() => {
    // set average rating
    const count = getAvgRating(response?.ratingAndReviews);
    setAvgReviewCount(count);

    // set no. of lectures
    let lectures = 0;
    response?.courseContent?.forEach((sec) => {
      lectures += sec.subSection?.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  const [isActive, setIsActive] = useState(Array(0));
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    );
  };

  if (loading || !response) {
    return <Loading />;
  }
  // if (!response.success) {
  //   return <Error />
  // }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response;

  const handleBuyCourse = () => {
    // if (token) {
    //   BuyCourse(token, [courseId], user, navigate, dispatch)
    //   return
    // }
    // setConfirmationModal({
    //   text1: "You are not logged in!",
    //   text2: "Please login to Purchase Course.",
    //   btn1Text: "Login",
    //   btn2Text: "Cancel",
    //   btn1Handler: () => navigate("/login"),
    //   btn2Handler: () => setConfirmationModal(null),
    // })
  };

  // if (paymentLoading) {

  //   return (
  //     <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
  //       <div className="spinner"></div>
  //     </div>
  //   )
  // }

  return (
    <>
      <div className="relative w-full bg-gray-900">
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            {/* Mobile Thumbnail */}
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[inset_0px_-64px_36px_-28px_#161D29]" />
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
  
            {/* Course Title & Details */}
            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-white">
              <p className="text-center text-4xl font-bold tracking-wider sm:text-[42px] lg:text-left">
                {courseName}
              </p>
  
              <div className="text-gray-300">
                <p>
                  {courseDescription}
                </p>
              </div>
  
              <div className="text-md flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <span className="text-yellow-400">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>({ratingAndReviews.length} reviews)</span>
                <span>{studentsEnrolled.length} students enrolled</span>
              </div>
  
              <p>Created By {`${instructor.firstName} ${instructor.lastName}`}</p>
  
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  <BsInfoCircle/> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
  
            {/* Mobile Buy Buttons */}
            <div className="flex w-full flex-col gap-4 border-y border-gray-600 py-4 lg:hidden">
              <p className="pb-4 text-center text-3xl font-semibold text-white">
                Rs. {price}
              </p>
              <button
                className="bg-yellow-400 text-black py-2 px-4 rounded uppercase tracking-wider"
                onClick={handleBuyCourse}
              >
                Buy Now
              </button>
              <button className="bg-black text-white py-2 px-4 rounded uppercase tracking-wider">
                Add to Cart
              </button>
            </div>
          </div>
  
          {/* Desktop Course Card */}
          
          <div className="top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:-translate-y-8 md:translate-x-220 lg:absolute lg:block">
            <CourseDetailsCard
              course={response}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div> 
         
        </div>
      </div>
  
      {/* Course Body */}
      <div className="mx-auto box-content px-4 text-start text-white lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What You'll Learn */}
          <div className="my-8 border border-gray-700 p-8">
            <p className="text-3xl font-semibold uppercase tracking-wider">
              What you'll Learn?
            </p>
            <div className="mt-5">
              <ul className="list-none p-0 leading-relaxed flex flex-col gap-1">
                {whatYouWillLearn.split("\n").map((line, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">{index + 1}.</span>
                    <span>
                      {line.trim().trim()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
  
          {/* Course Content Header */}
          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold uppercase tracking-wider">
                Course Content
              </p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2 tracking-wide">
                  <span>{courseContent.length} section(s)</span>
                  <span>{totalNoOfLectures} lecture(s)</span>
                  <span>{response.data?.totalDuration}</span>
                </div>
                <button
                  className="text-yellow-400"
                  onClick={() => setIsActive([])}
                >
                  Collapse all sections
                </button>
              </div>
            </div>
  
            {/* Course Details Accordion */}
            
            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseContentBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div> 
           
  
            {/* Author Section */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">
                  {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
              <p className="text-gray-400">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>
  
      <Footer />
  
      {/* 
      {confirmationModal && <Modal />} 
      */}
    </>
  );  
};

export default CourseDetails;
