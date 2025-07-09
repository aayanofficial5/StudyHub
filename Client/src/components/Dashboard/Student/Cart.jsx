import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { buyCourse, enrollFreeCourse } from "../../../services/operations/studentFeaturesApi";
import Loading from './../../Loading';
import CTAButton from './../../Home/CTAButton';

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.totalItems);
  const [totalAmount, setTotalAmount] = useState(0);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    const total = cart.reduce((sum, curr) => sum + curr.price, 0);
    setTotalAmount(total);
    localStorage.setItem("totalItems", JSON.stringify(cart));
  }, [cart]);

  const handleBuyCourses = async (cart) => {
    const courses = cart.map((course) => course._id);
    if (token) {
      if(totalAmount>=1)
      buyCourse(courses, user, navigate, dispatch, token);
      else
      enrollFreeCourse(courses, navigate, dispatch, token);
    }
  };

  if (paymentLoading) {
    return (
      <div className="grid h-[90vh] w-full place-items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-6 min-h-screen opacity-80 mb-10">
      <h1 className="text-2xl md:text-3xl font-bold">Your Cart</h1>
      

      <div className="w-full bg-gray-800/80 rounded-lg p-6 sm:p-10">
        {!cart.length ? (
          <div className="flex flex-col justify-center items-center gap-8">
            <p className="text-xl sm:text-2xl font-semibold">Your cart is empty!</p>
            <div>
            <CTAButton
              text="Browse Courses"
              active="true"
              arrow="true"
              action={() => navigate("/search/all-courses")}
            />
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            {/* Cart Items Section */}
            <div className="flex flex-col gap-6 w-full lg:w-[60%]">
              {cart.map((course) => (
                <CartItem
                  key={course._id}
                  id={course._id}
                  title={course.courseName}
                  desc={course.courseDescription}
                  price={course.price}
                  img={course.thumbnail}
                />
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-slate-950/90 p-6 rounded-2xl shadow-lg w-full lg:w-[40%] flex flex-col gap-4 h-fit">
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-400">
                Order Summary
              </h3>
              <div className="flex justify-between text-sm sm:text-base text-gray-300">
                <span>Total Courses:</span>
                <span className="font-medium">{cart.length}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base text-gray-300">
                <span>Total Amount:</span>
                <span className="font-bold text-green-500">
                  ₹ {Math.round(totalAmount * 100) / 100}
                </span>
              </div>
              <button
                className="mt-4 bg-yellow-500 text-black py-2 px-4 sm:px-6 rounded-lg font-semibold hover:opacity-70 transition-all duration-300"
                onClick={() => handleBuyCourses(cart)}
              >
                Checkout Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
