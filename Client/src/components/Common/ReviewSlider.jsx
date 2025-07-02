import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import RatingAndReviewCard from "./RatingAndReviewCard";
import { getAllRating } from "../../services/operations/courseapis";
import placeHolder from "../../assets/profilePlaceholder.jpg";
import HighlightBanner from "../Home/HighlightBanner";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function ReviewSlider() {
  const [rating, setRating] = useState([]);

  async function fetchRatings() {
    const data = await getAllRating();
    if (data?.length > 0) {
      setRating(data);
    }
  }

  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <HighlightBanner
        title="Review From Other Learners"
        paragraph="Hear from our learners as they share their journeys of transformation,
        success, and how our platform has made a difference in their lives."
      />
      <div className="relative w-full max-w-6xl px-4">
        {/* Custom Arrows */}
        <div className="relative flex justify-center w-full gap-5 pt-5 z-10">
                    <div className="md:absolute -left-20 top-40">
                      <div className={`custom-prev  bg-blue-800 text-white p-4 rounded-full shadow hover:bg-blue-400 cursor-pointer transition-colors duration-300`}>
                        <FaArrowLeft className="text-xl md:text-3xl" />
                      </div>
                    </div>
                    <div className="md:absolute -right-20 top-40">
                      <div className={`custom-next bg-blue-800 text-white p-4 rounded-full shadow hover:bg-blue-400 cursor-pointer transition-colors duration-300`}>
                        <FaArrowRight className="text-xl md:text-3xl" />
                      </div>
                    </div>
                  </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            740: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="custom-swiper"
        >
          {rating.map((rating, idx) => {
            if (rating?.rating > -1) {
              return (
                <SwiperSlide key={idx} className="pl-8 md:pl-12 py-15">
                  <RatingAndReviewCard
                    name={`${rating?.user?.firstName || "Anonymous"} ${
                      rating?.user?.lastName || ""
                    }`}
                    rating={rating?.rating}
                    text={rating?.review}
                    img={rating?.user?.image || placeHolder}
                  />
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
    </div>
  );
}
