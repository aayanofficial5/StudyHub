import React, { useEffect, useState } from "react";
import Footer from "../components/Home/Footer";
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
import { buyCourse, enrollFreeCourse } from "../services/operations/studentFeaturesApi";
import { ACCOUNT_TYPE } from "../utils/constant";
import CTAButton from "../components/Home/CTAButton";
import { setTotalItems } from "../redux/slices/cartSlice";
import profilePlaceholder from "../assets/profilePlaceholder.jpg";
import { toast } from "react-hot-toast";

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [response, setResponse] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [isActive, setIsActive] = useState(Array(0));

  useEffect(() => {
    (async () => {
      const res = await getCourseDetails(courseId);
      if (res) setResponse(res);
    })();
  }, [courseId]);

  useEffect(() => {
    const count = getAvgRating(response?.ratingAndReviews);
    setAvgReviewCount(count);
    let lectures = 0;
    response?.courseContent?.forEach((sec) => {
      lectures += sec.subSection?.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    );
  };

  const handleBuyCourse = async () => {
    if (token) {
      if(price>=1)
      await buyCourse([courseId], user, navigate, dispatch,token);
      else
      await enrollFreeCourse([courseId], navigate, dispatch,token)
    }
  };

  if (loading || !response) {
    return (
      <div className="grid h-[90vh] place-items-center">
        <Loading />
      </div>
    );
  }

  const {
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    studentsEnrolled,
    createdAt,
  } = response;
  const instructor=response.instructor||{firstName:"Anonymous",lastName:""};
  const sectionId = response.courseContent[0]._id;
  const subSectionId = response.courseContent[0].subSection[0]._id;

  const isUserEnrolled = studentsEnrolled.some((e) => e._id === user?._id);
  // console.log(user?._id, studentsEnrolled, isUserEnrolled);
  if (paymentLoading) {
    return (
      <div className="grid h-[90vh] place-items-center">
        <Loading />
      </div>
    );
  }

  const handleAddToCart = (course) => {
    if (token) {
      const existingItems =
        JSON.parse(localStorage.getItem("totalItems")) || [];
      const updatedItems = [...existingItems, course];
      localStorage.setItem("totalItems", JSON.stringify(updatedItems));
      dispatch(setTotalItems(updatedItems));
      toast.success("Added to Cart");
    }
  };

  return (
    <>
      <div className="relative w-full bg-gradient-to-br from-slate-950 via-gray-800 to-slate-950">
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
                loading="lazy"
              />
            </div>

            {/* Course Title & Details */}
            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-white">
              <p className="text-center text-4xl font-bold tracking-wider sm:text-[42px] lg:text-left">
                {courseName}
              </p>
              <div className="text-gray-300">
                <p>{courseDescription}</p>
              </div>
              <div className="text-md flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <span className="text-yellow-400">{avgReviewCount}</span>
                <RatingStars Review_Count={parseFloat(avgReviewCount)} Star_Size={24} />
                <span>({ratingAndReviews.length} reviews)</span>
                <span>{studentsEnrolled.length} students enrolled</span>
              </div>
              <p>
                Created By {`${instructor?.firstName} ${instructor?.lastName}`}
              </p>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  <BsInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>

            {/* Mobile Buy Buttons */}
            <div className="w-[100%] md:hidden border-y-1 border-gray-600 py-3">
              {!isUserEnrolled && (
                <div className="text-3xl text-center font-semibold text-white pb-2">
                  ₹ {price}
                </div>
              )}
              {user ? (
                user.accountType === ACCOUNT_TYPE.STUDENT && (
                  <div className="flex flex-col gap-4">
                    <CTAButton
                      active={true}
                      text={isUserEnrolled ? "Go To Course" : "Buy Now"}
                      action={
                        isUserEnrolled
                          ? () =>
                              navigate(
                                `/view-course/${courseId}/section/${sectionId}/sub-section/${subSectionId}`
                              )
                          : ()=>handleBuyCourse(price)
                      }
                    />

                    {!isUserEnrolled &&
                    !totalItems.some((item) => item._id === response._id) ? (
                      <CTAButton
                        active={false}
                        text="Add to Cart"
                        action={() => handleAddToCart(response)}
                      />
                    ) : (
                      !isUserEnrolled && (
                        <CTAButton
                          active={false}
                          text="Go to Cart"
                          action={() => navigate("/dashboard/cart")}
                        />
                      )
                    )}
                  </div>
                )
              ) : (
                <CTAButton
                  active={true}
                  text={<p>LOGIN TO BUY COURSE</p>}
                  action={() => navigate("/login")}
                />
              )}
            </div>
          </div>

          {/* Desktop Course Card */}
          <div className="top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:-translate-y-8 md:translate-x-220 lg:absolute lg:block">
            <CourseDetailsCard
              course={response}
              handleBuyCourse={handleBuyCourse}
              isUserEnrolled={isUserEnrolled}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>

      {/* Course Body */}
      <div className="mx-auto box-content px-4 text-start text-white lg:w-[1260px] bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          <div className="my-8 border border-gray-700 p-8 bg-gradient-to-br from-slate-950 via-gray-800 to-slate-950">
            <p className="text-3xl font-semibold uppercase tracking-wider">
              What you'll Learn?
            </p>
            <div className="mt-5">
              <ul className="list-none p-0 leading-relaxed flex flex-col gap-1">
                {whatYouWillLearn.split("\n").map((line, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">{index + 1}.</span>
                    <span>{line.trim().trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

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
            
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor?.image
                      ? instructor?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor?.firstName} ${instructor?.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">
                  {`${instructor?.firstName} ${instructor?.lastName}`}
                </p>
              </div>
              <p className="text-gray-400">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
            {/* Reviews */}
            <div className="mb-12 py-4 border-1 border-gray-700 p-5 bg-gradient-to-br from-slate-950 via-gray-800 to-slate-950">
              <p className="text-[30px] font-semibold">Reviews</p>
              <div className="flex items-center gap-4 py-4">
                <span className="text-2xl">{`${avgReviewCount}/5.0`}</span>
                <span className="text-lg text-gray-400">{`(${ratingAndReviews.length} ratings) | ${studentsEnrolled.length} students`}</span>
              </div>
              {ratingAndReviews.length > 0 ? (
                ratingAndReviews.map((review, index) => (
                  <div
                    key={index}
                    className="w-full  border-b border-gray-500 space-y-4 p-3 text-gray-200 text-sm mb-5"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <img
                          className="h-10 w-10 mr-2 rounded-full"
                          src={review?.user?.image || profilePlaceholder}
                          alt="userImage1"
                        />
                        <div>
                          <p className="text-gray-100 text-lg font-medium">
                            {review?.user?.firstName || "Anonymous"} {review?.user?.lastName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                    <RatingStars Review_Count={review?.rating} Star_Size={20} />
                    <p>{review?.rating}</p>
                    </div>
                    <p>“{review?.review}”</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseDetails;
