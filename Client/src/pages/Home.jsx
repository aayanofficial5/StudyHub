import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import HighlightedText from "../components/Home/HighlightedText";
import CTAButton from "../components/Home/CTAButton";
import { useState } from "react";
import Banner from "../assets/banner.png";
import Coding from "../assets/coding.png";
import BannerBlocks from "../components/Home/BannerBlocks";
import microsoft_logo from "../assets/microsoft_logo.svg";
import walmart_logo from "../assets/walmart_logo.svg";
import adobe_logo from "../assets/adobe_logo.svg";
import paypal_logo from "../assets/paypal_logo.svg";
import CourseCard from "../components/Home/CourseCard";
import Coding2 from "../assets/coding2.png";
import TestimonialCard from "../components/Home/TestimonialCard";
import { testimonials } from "../assets/api_data/Testimonials";
const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      {/* Section1 */}
      <section>
        <div className="relative mx-auto flex flex-col w-11/12 items-center text-white top-10 justify-between">
          <form className="flex items-center gap-4 max-w-md w-full mt-5">
            <div className="flex items-center w-full border pl-3 gap-4 bg-white border-gray-500/30 h-[54px] rounded-md overflow-hidden px-1">
              <IoMdSearch className="text-gray-500 text-2xl" />
              <input
                type="text"
                placeholder="Search for courses"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="w-full h-full outline-none text-gray-500 placeholder-gray-500 text-base"
              />
              <CTAButton active={true} text="Submit" />
            </div>
          </form>
          <NavLink to="/signup">
            <div className="group mx-auto rounded-full bg-gray-700 font-bold text-gray-200 transition-all duration-200 hover:scale-97 border-3 border-black hover:border-blue-400 mt-5">
              <button className="flex flex-row items-center gap-2 rounded-full px-10 py-2 group-hover:bg-black cursor-pointer">
                <p>Become an Instructor</p>
                <FaArrowRightLong />
              </button>
            </div>
          </NavLink>

          <div className="font-bold text-3xl mt-5 text-center">
            Empower your future with the courses designed to
            <HighlightedText
              text="fit your choice"
              color="yellow-300"
            ></HighlightedText>
          </div>
          <div className="w-[70%] mt-5 text-lg opacity-70 text-center">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </div>
          <div className="flex flex-row gap-4 mt-5">
            <NavLink to="/signup">
              <CTAButton
                active={true}
                arrow={false}
                text="Learn More"
              ></CTAButton>
            </NavLink>
            <NavLink to="/demo">
              <CTAButton
                active={false}
                arrow={false}
                text="Book a Demo"
              ></CTAButton>
            </NavLink>
          </div>
          <div className="relative my-20 mx-5">
            <img src={Banner} className="rounded-xl opacity-30" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent "></div>
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent "></div>
            <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-black to-transparent "></div>

            <div className="absolute bottom-0 right-0 w-24 h-full bg-gradient-to-l from-black to-transparent "></div>
          </div>
        </div>
      </section>

      {/* Section2 */}
      <section>
        <BannerBlocks
          h1="Unlock your"
          h2="coding potential"
          h3="with our online courses"
          description="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          button1="Get Started"
          button2="Learn More"
          image={Coding}
          flexDirection="flex-row"
        />
        <BannerBlocks
          h1="Start"
          h2="coding in seconds"
          h3="with our hands-on learning environment"
          description="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          button1="Continue Lesson"
          button2="Learn More"
          image={Coding2}
          flexDirection="flex-row-reverse"
        />
      </section>
      {/* Section3 */}
      <section className="py-10 bg-black text-center flex flex-col items-center text-white">
        <p className="text-gray-400 text-base mb-6">Trusted by learners from</p>

        <div className="flex justify-center flex-wrap gap-10 items-center mb-10">
          <img src={microsoft_logo} alt="Microsoft" className="h-8" />
          <img src={walmart_logo} alt="Walmart" className="h-6" />
          <img src={adobe_logo} alt="Adobe" className="h-6" />
          <img src={paypal_logo} alt="PayPal" className="h-8" />
        </div>

        <h2 className="text-3xl font-bold text-white mb-3">Learn from the best</h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg opacity-70">
          Discover our top-rated courses across various categories. From coding
          and design to business and wellness, our courses are crafted to
          deliver results.
        </p>
        <div className="flex flex-row gap-2 my-7 px-30">
          {[...Array(4)].map((_, i) => (
            <CourseCard
              key={i}
              course_image={Coding}
              course_title="Coding for Beginners"
              course_instructor="John Doe"
              course_rating="4.5"
              enrolled_students="5"
              course_price="100"
            />
          ))}
        </div>
        <NavLink to="/course-list">
          <CTAButton active={true} arrow={true} text="View All Courses" />
        </NavLink>
      </section>
      {/* Section4 */}
      <section>
        <div className="py-10 text-center bg-black">
          <h2 className="text-3xl font-bold text-white mb-2">Testimonials</h2>
          <p className="text-gray-400 mb-10 max-w-3xl mx-auto">
            Hear from our learners as they share their journeys of
            transformation, success, and how our platform has made a difference
            in their lives.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {testimonials.map(({name, title, rating, text, img}, idx) => (
              <TestimonialCard name={name} title={title} rating={rating} text={text} img={img} key={idx} />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center flex-wrap gap-3 items-center text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Learn anything, anytime, anywhere</h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg opacity-70">
        "This section is dedicated to delivering meaningful insights with integrity, purpose, and attention to user satisfaction."
        </p>
        <div className="flex flex-row gap-4 text-white mt-5">
        <NavLink to="/course-list">
          <CTAButton active={true} arrow={false} text="Get Started" />
        </NavLink>
        <NavLink to="/course-list">
          <CTAButton active={false} arrow={true} text="Learn More" />
        </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
