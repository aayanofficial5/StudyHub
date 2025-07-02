import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import CTAButton from "../components/Home/CTAButton";
import { useState } from "react";
import Banner from "../assets/banner.png";
import Coding from "../assets/coding.png";
import BannerBlocks from "../components/Home/BannerBlocks";
import microsoft_logo from "../assets/microsoft_logo.svg";
import walmart_logo from "../assets/walmart_logo.svg";
import adobe_logo from "../assets/adobe_logo.svg";
import paypal_logo from "../assets/paypal_logo.svg";
import Coding2 from "../assets/coding2.png";
import HighlightBanner from "../components/Home/HighlightBanner";
import { useEffect } from "react";
import { getAllCourses } from "../services/operations/courseapis";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "./../components/Common/CourseCard";
import Footer from "../components/Home/Footer";
import ReviewSlider from "../components/Common/ReviewSlider";
import InstallPrompt from "./../components/Common/InstallPrompt";
const Home = () => {
  const [search, setSearch] = useState("");
  const [courseData, setCourseData] = useState([]);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchTopCourses = async () => {
    const data = await getAllCourses();
    if (data.length > 0) setCourseData(data);
  };

  function getTokenFromCookie(tokenName) {
    const cookies = document.cookie.split(";");
    // console.log("Cookies:", cookies);
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === tokenName) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }
  const token = getTokenFromCookie("token");

  useEffect(() => {
    // console.log("Token:", token);
    // if (!token) {
    //   dispatch(logout());
    // }
    fetchTopCourses();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      // setSearch("");
      navigate(`/search/${search}`);
    }
  };

  return (
    <div className="w-[100w]">
      {/* Section1 */}
      <InstallPrompt />
      <section
        style={{
          backgroundImage: `url(${Banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full min-h-fit"
      >
        <div className="bg-gradient-to-b from-black/90 via-gray-900/80 to-black/95 h-full">
          <div className="relative mx-auto flex flex-col w-11/12 items-center text-white pt-10 pb-20 justify-between h-full">
            <form
              className="flex items-center gap-4 max-w-md w-full mt-5"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="flex items-center w-full  h-[50px] rounded-md overflow-hidden  bg-gray-300 text-gray-900">
                <div className="mx-3">
                  <IoMdSearch size={25} />
                </div>
                <input
                  type="text"
                  placeholder="Search for courses"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  className="w-full h-full outline-none  placeholder-gray-500 border-l-1 border-gray-400 text-base px-3"
                />

                <button className="bg-blue-600 hover:bg-blue-700 h-full px-7 font-semibold text-white">
                  Submit
                </button>
              </div>
            </form>
            {!user && (
              <NavLink to="/signup">
                <div className="group mx-auto rounded-full bg-gradient-to-r from-slate-900 via-gray-800 to-gray-950 font-bold text-gray-200 transition-all duration-200 hover:scale-97 border-2 border-gray-600 hover:border-blue-400 mt-5">
                  <button className="flex flex-row items-center gap-2 rounded-full px-10 py-2 group-hover:bg-black cursor-pointer">
                    <p>Become an Instructor</p>
                    <FaArrowRightLong className="animate-pulse" />
                  </button>
                </div>
              </NavLink>
            )}
            <div className="md:w-320">
            <HighlightBanner
              title="Empower your future with the courses designed to"
              highlightedText="fit your choice"
              color="yellow-300"
              paragraph="With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors."
            />
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
          </div>
        </div>
      </section>

      {/* Section2 */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-black w-full flex flex-col gap-10">
        <BannerBlocks
          h1="Unlock your"
          h2="coding potential"
          h3="with our online courses"
          description="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          button1="Get Started"
          button2="Learn More"
          image={Coding}
          flexDirection="flex-col-reverse md:flex-row"
        />
        <BannerBlocks
          h1="Start"
          h2="coding in seconds"
          h3="with our hands-on learning environment"
          description="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          button1="Continue Lesson"
          button2="Learn More"
          image={Coding2}
          flexDirection="flex-col-reverse md:flex-row-reverse"
        />
      </section>
      {/* Section3 */}
      <section className="py-15 bg-gradient-to-b from-black via-gray-900 to-black text-center flex flex-col items-center text-white">
        <p className="text-gray-400 text-sm md:text-lg mb-6">Trusted by learners from</p>

        <div className="grid grid-cols-2 md:grid-cols-4 mb-10 gap-10">
          <img src={microsoft_logo} alt="Microsoft" className="h-6 md:h-8" />
          <img src={walmart_logo} alt="Walmart" className="h-6 md:h-8" />
          <img src={adobe_logo} alt="Adobe" className="h-6 md:h-8" />
          <img src={paypal_logo} alt="PayPal" className="h-6 md:h-8" />
        </div>
        <div className="flex flex-col items-center">
          <HighlightBanner
            title="Learn from the best"
            paragraph="Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results."
          />
        </div>
        <div className="flex flex-row justify-center flex-wrap gap-2 my-7 md:px-10">
          {courseData.length > 0 &&
            courseData
              .slice(0, 4)
              .map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
        </div>
        <NavLink to="/search/all-courses" className="text-sm md:text-base">
          <CTAButton active={true} arrow={true} text="View All Courses" />
        </NavLink>
      </section>
      {/* Section4 */}
      <section className="bg-gradient-to-b from-black via-gray-900 to-gray-950 pb-10 w-full">
        <ReviewSlider />
        <div className="flex flex-col justify-center flex-wrap gap-3 items-center text-center">
          <div className="flex flex-col items-center">
            <HighlightBanner
              title="Learn anything, anytime, anywhere"
              paragraph='"This section is dedicated to delivering meaningful insights with
            integrity, purpose, and attention to user satisfaction."'
            />
          </div>
          <div className="flex flex-row gap-4 text-sm md:text-base text-white mt-5">
            <NavLink to="/course-list">
              <CTAButton active={true} arrow={false} text="Get Started" />
            </NavLink>
            <NavLink to="/course-list">
              <CTAButton active={false} arrow={true} text="Learn More" />
            </NavLink>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
