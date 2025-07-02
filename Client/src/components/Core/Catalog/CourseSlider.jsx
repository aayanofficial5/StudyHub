import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CourseCard from "../../Common/CourseCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const CourseSlider = ({ courses,slider}) => {
  return (
    <>
      {courses?.length > 0 ? (
        <div className="w-full max-w-screen-xl mx-auto sm:px-4">
          {/* Custom Arrows */}
          <div className="relative hidden md:flex justify-center w-full gap-5 pt-5 z-10">
            <div className="absolute -left-15 top-52">
              <div className={`${slider=="1"?"custom-prev1":"custom-prev2"} bg-gray-800 text-white p-4 rounded-full shadow hover:bg-blue-600 cursor-pointer transition-colors duration-300`}>
                <FaArrowLeft className="text-xl md:text-3xl" />
              </div>
            </div>
            <div className="absolute -right-15 top-52">
              <div className={`${slider=="1"?"custom-next1":"custom-next2"} bg-gray-800 text-white p-4 rounded-full shadow hover:bg-blue-600 cursor-pointer transition-colors duration-300`}>
                <FaArrowRight className="text-xl md:text-3xl" />
              </div>
            </div>
          </div>
          <Swiper
            modules={[FreeMode, Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            navigation={{
              nextEl: ".custom-next"+slider,
              prevEl: ".custom-prev"+slider,
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="w-full custom-swiper"
          >
            {courses.map((course, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center pb-8 px-2">
                  <CourseCard course={course} height={400} width={350} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[200px] text-gray-500">
          No Courses Found
        </div>
      )}
    </>
  );
};

export default CourseSlider;
