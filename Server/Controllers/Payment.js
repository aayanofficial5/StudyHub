const Course = require("../models/Course");
const User = require("../models/User");
const { instance } = require("../Configurations/razorpay");
const { coursePurchased } = require("../Templates/Mails/coursePurchased");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");

const {
  paymentSuccessEmail,
} = require("../Templates/Mails/paymentSuccessEmail");
const CourseProgress = require("../Models/CourseProgress");
require("dotenv").config();

// capturePayment handler function
exports.capturePayment = async (req, res) => {
  try {
    // fetch userId,courseId from req
    const userId = req.user.id;
    const { courses } = req.body;

    // check if courses are provided
    if (courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No courses provided",
      });
    }

    let totalAmount = 0;
    for (const course_id of courses) {
      const course = await Course.findById(course_id);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: `Course with id ${course_id} not found`,
        });
      }

      if (
        course.studentsEnrolled.some(
          (id) => id.toString() === userId.toString()
        )
      ) {
        return res.status(400).json({
          success: false,
          message: `Already enrolled in course with id ${course_id}`,
        });
      }

      totalAmount += course.price;
    }

    // create an order
    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: "order_rcpt_id_" + Date.now(),
      // notes: {
      //   userId,
      //   courses,
      // },
      // partial_payment: false,
      // payment_capture: 1,
    };

    const paymentResponse = await instance.orders.create(options);

    // console.log("Razorpay order created:", paymentResponse);

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: paymentResponse,
    });
  } catch (error) {
    console.log("Error creating order: " + error.message);
    return res.status(500).json({
      success: false,
      message: "Error creating order",
    });
  }
};

// verifyPayment handler function
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courses,
    } = req.body;

    const userId = req.user?.id;

    // Basic validations
    if (!userId || !courses || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing user or course details.",
      });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Incomplete payment information.",
      });
    }

    // Signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed due to signature mismatch.",
      });
    }

    // Proceed to enroll user in courses
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const errors = [];
    const enrolledCourses = [];

    await Promise.all(
      courses.map(async (courseId) => {
        try {
          const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $addToSet: { studentsEnrolled: userId } },
            { new: true }
          );

          if (!updatedCourse) {
            errors.push(`Course with ID ${courseId} not found.`);
            return;
          }
          const courseProgress = await CourseProgress.create({
            courseId: courseId,
            userId: userId,
            completedVideos: [],
          });
          // console.log("Course Progress Created:", courseProgress);

          const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            {
              $addToSet: {
                courses: courseId,
                courseProgress: courseProgress._id,
              },
            },
            { new: true }
          );

          await mailSender(
            enrolledStudent.email,
            "Course Purchased Successfully",
            coursePurchased(
              enrolledStudent.email,
              enrolledStudent.firstName,
              enrolledStudent.courseName
            )
          );

          enrolledCourses.push(updatedCourse.courseName);
        } catch (err) {
          errors.push(`Failed to enroll in course ${courseId}: ${err.message}`);
        }
      })
    );

    return res.status(200).json({
      success: errors.length === 0,
      message:
        errors.length === 0
          ? "Payment verified and courses enrolled successfully."
          : "Payment verified, but some courses failed to enroll.",
      data: {
        razorpay_order_id,
        razorpay_payment_id,
        enrolledCourses,
        errors,
      },
    });
  } catch (error) {
    console.error("Error during payment verification:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error during payment verification.",
    });
  }
};

// sendPaymentSuccessEmail function
exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;
    if (!orderId || !paymentId || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Required details are missing",
      });
    }

    const enrolledStudent = await User.findById(userId);

    const mailResponse = await mailSender(
      enrolledStudent.email,
      "Payment Successful",
      paymentSuccessEmail(enrolledStudent.firstName, amount, orderId, paymentId)
    );

    // console.log("Payment Success Email Sent Successfully:", mailResponse);
  } catch (error) {
    console.error("Error sending payment success email:", error);
  }
};
