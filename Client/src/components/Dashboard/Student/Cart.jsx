import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { buyCourse } from "../../../services/operations/studentFeaturesApi";
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
    console.log(courses);
    if (token) {
      buyCourse(courses, user, navigate, dispatch);
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
    <div className="flex flex-col w-full min-h-screen gap-6 opacity-80 py-10">
      <h1 className="text-3xl font-bold mb-0">Your Cart</h1>
      <div className=" py-10 px-13 text-white bg-gray-900 rounded-lg">
        {!cart.length ? (
          <div className="flex flex-col justify-center items-center gap-8">
            <p className="text-2xl font-semibold">Your cart is empty!</p>
            <div className="text-xl hover:text-black transition-all duration-100">
            <CTAButton text="Browse Courses" active="true" arrow="true"
            action={() => navigate("/search/all-courses")}/>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-20 justify-between max-w-6xl mx-auto">
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
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full h-fit lg:w-[45%] flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-yellow-400">
                Order Summary
              </h3>
              <div className="flex justify-between text-gray-300">
                <span>Total Courses:</span>
                <span className="font-medium">{cart.length}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Total Amount:</span>
                <span className="font-bold text-green-500">
                  ₹ {Math.round(totalAmount * 100) / 100}
                </span>
              </div>
              <button
                className="mt-4 bg-yellow-500 text-black py-2 px-6 rounded-lg font-semibold hover:opacity-70 transition-all duration-400"
                onClick={() => {
                  handleBuyCourses(cart);
                }}
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
