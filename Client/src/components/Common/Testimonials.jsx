import TestimonialCard from "../Home/TestimonialCard";
import { testimonials } from "../../data/Testimonials";
export default function Testimonials() {
  return (
    <div className="flex flex-col justify-center items-center p-5 text-center bg-black">
      <h2 className="text-3xl font-bold text-white mb-2">Testimonials</h2>
      <p className="text-gray-400 mb-10">
        Hear from our learners as they share their journeys of transformation,
        success, and how our platform has made a difference in their lives.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {testimonials.map(({ name, title, rating, text, img }, idx) => (
          <TestimonialCard
            name={name}
            title={title}
            rating={rating}
            text={text}
            img={img}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
}
