import React, { useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, setTotalItems } from "../../../redux/slices/cartSlice";
import { ACCOUNT_TYPE } from "../../../utils/constant";
import CTAButton from "./../../Home/CTAButton";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course;

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to Clipboard");
  };


  const handleAddToCart = () => {
    if (token) {
      // Get existing cart items from localStorage
      const existingItems =
        JSON.parse(localStorage.getItem("totalItems")) || [];
      // Add the new course
      const updatedItems = [...existingItems, course];
      // Save the updated list back to localStorage
      localStorage.setItem("totalItems", JSON.stringify(updatedItems));
      dispatch(setTotalItems(updatedItems));
      toast.success("Added to Cart");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-md bg-gray-800/80 p-4 text-white shadow-md">
      {/* Course Thumbnail */}
      <img
        src={ThumbnailImage}
        alt={course?.courseName}
        className="w-full max-w-[400px] min-h-[180px] max-h-[300px] mx-auto rounded-2xl object-cover"
      />

      <div className="px-4 opacity-80">
        {/* Price */}
        <div className="text-3xl font-semibold text-white pb-4">
          ₹ {CurrentPrice}
        </div>

        {/* Action Buttons */}
        {user ? (
          user.accountType == ACCOUNT_TYPE.STUDENT && (
            <div className="flex flex-col gap-4">
              <CTAButton
                active={true}
                text={
                  user && course?.studentsEnrolled.includes(user?._id)
                    ? "Go To Course"
                    : "Buy Now"
                }
                action={
                  user && course?.studentsEnrolled.includes(user?._id)
                    ? () => navigate("/dashboard/enrolled-courses")
                    : handleBuyCourse
                }
              />

              {!course?.studentsEnrolled.includes(user?._id) &&
              !totalItems.some((item) => item._id === course._id)? (
                <CTAButton
                  active={false}
                  text="Add to Cart"
                  action={handleAddToCart}
                />
              ) : (
                <CTAButton
                  active={false}
                  text="Go to Cart"
                  action={() => navigate("/dashboard/cart")}
                />
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

        {/* Refund Policy */}
        <p className="pt-6 pb-3 text-center text-sm text-gray-400">
          30-Day Money-Back Guarantee
        </p>

        {/* Pre-requisite */}
        <div>
          <p className="my-2 text-xl font-semibold">Tags :</p>
          <div className="flex flex-row flex-wrap gap-3 text-sm text-blue-200 underline">
            {course?.tag?.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>

        {/* Share Button */}
        <div className="text-center">
          <button
            className="mx-auto flex items-center gap-2 py-6 text-yellow-300 hover:text-yellow-400 transition-all"
            onClick={handleShare}
          >
            <FaShareSquare size={15} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsCard;
