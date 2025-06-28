import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import RatingAndReviewCard from "./RatingAndReviewCard";
import { getAllRating } from "../../services/operations/courseapis";
import placeHolder from "../../assets/profilePlaceholder.jpg";

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
    <div className="flex flex-col items-center justify-center p-5 text-center bg-black">
      <h2 className="text-3xl font-bold text-white mb-2">
        Review From Other Learners
      </h2>
      <p className="text-gray-400 mb-10 max-w-2xl">
        Hear from our learners as they share their journeys of transformation,
        success, and how our platform has made a difference in their lives.
      </p>

      <div className="w-full max-w-6xl px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
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
          className="custom-swiper"
        >
          {rating.map((rating, idx) => {
            if (rating?.rating > -1) {
              return (
                <SwiperSlide key={idx} className="pl-12 py-15">
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
