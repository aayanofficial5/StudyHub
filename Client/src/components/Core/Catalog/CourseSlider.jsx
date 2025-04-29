import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CourseCard from "../../Common/CourseCard";

const CourseSlider = ({ courses }) => {
  return (
    <>
      {courses?.length > 0 ? (
        <div className="w-full max-w-screen-xl mx-auto sm:px-4">
          <Swiper
            modules={[FreeMode, Navigation, Pagination, Autoplay]}
            spaceBetween={-70}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full custom-swiper"
          >
            {courses.map((course, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center py-6 px-2">
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
