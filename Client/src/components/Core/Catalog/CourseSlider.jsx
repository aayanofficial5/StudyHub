import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import CourseCard from "../../Common/CourseCard";

const CourseSlider = ({ courses }) => {
  return (
    <>
  {courses.length > 0 ? (
    <div className="swiper-container">
      <Swiper
        modules={[FreeMode, Navigation, Pagination, Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        spaceBetween={0}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full my-10 custom-swiper"
      >
        {courses.map((course, index) => (
          <SwiperSlide key={index}>
            <div className="py-15 px-2">
              <CourseCard course={course} height={400} width={400} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : (
    <div className="no-courses-found">No Course Found</div>
  )}
</>
  );
};

export default CourseSlider;
