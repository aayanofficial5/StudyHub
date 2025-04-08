const Course = require("../models/Course");
const { instance } = require("../config/razorpay");

// capturePayment handler function
exports.capturePayment = async (req, res) => {
  try {
    // fetch userId,courseId from req
    const userId = req.user.id;
    const courseId = req.body.courseId;

    // validate the courseId
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Please Provide a valid course Id",
      });
    }

    // validate courseDeatils
    try {
      var course = await Course.findById(courseId);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Course not find the course",
      });
    }

    // check if user is already enrolled in the course
    if (course.studentsEnrolled.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    // create an order
    const options = {
      amount: course.price * 100,
      currency: "INR",
      receiptId: "order_rcpt_id" + Date.now(),
      notes: {
        userId,
        courseId,
      },
      partial_payment: false,
      payment_capture: 1,
    };

    const order = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// verifyPayment handler function
exports.verifyPayment = async (req, res) => {
  try {
    const webhookSecret = process.env.WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];
    const body = req.body;

    const isValid = await instance.webhooks.verify(
      body,
      signature,
      webhookSecret
    );

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

    console.log("Payment is Authorized");
    try {
      const { courseId, userId } = body.payload.payment.entity.notes;
      // update the course
      const courseUpdated = await Course.findByIdAndUpdate(
        courseId,
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      console.log(courseUpdated);

      // update the user
      const userUpdated = await User.findByIdAndUpdate(
        userId,
        { $push: { courses: courseId } },
        { new: true }
      );

      console.log(userUpdated);

      // send email to the user
      const mailResponse = await mailSender(
        userUpdated.email,
        "Course Purchased Successfully",
        coursePurchased(
          userUpdated.email,
          userUpdated.name,
          courseUpdated.courseName
        )
      );
      console.log(mailResponse);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.log("Error occured during payment verification : " + error.message);
    return res.status(500).json({
      success: false,
      message: "Error occured during payment verification",
    });
  }
};
