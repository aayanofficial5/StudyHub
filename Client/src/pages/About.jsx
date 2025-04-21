import React from "react";
import aboutus1 from "../assets/aboutus1.jpg";
import aboutus2 from "../assets/aboutus2.jpg";
import aboutus3 from "../assets/aboutus3.jpg";
import aboutBanner from "../assets/aboutBanner.jpg";
import HighlightedText from "../components/Home/HighlightedText";
import HighlightBanner from "../components/Home/HighlightBanner";
import BannerBlocks from "../components/Home/BannerBlocks";
import CTAButton from "../components/Home/CTAButton";
import { NavLink } from "react-router-dom";
import { aboutCardData, aboutUs } from "../data/aboutPage";
import ContactUsForm from "../components/Common/ContactUsForm";
import Testimonials from "../components/Common/Testimonials";
const About = () => {
  return (
    <div>
      {/*Section 1 */}
      <section>
        <div className="flex flex-col gap-4 w-full items-center my-5">
          <div className="flex flex-col items-center">
            <HighlightBanner
              title="Crafting Tomorrow’s Success Through"
              highlightedText="fit your choice"
              color="yellow-300"
              paragraph="KnowGeek is on a mission to transform online education through innovation and excellence. We believe in creating limitless learning opportunities by offering industry-relevant courses, integrating the latest technologies, and building a dynamic, supportive learning ecosystem."
            />
          </div>
          <div className="flex flex-row gap-4 w-full justify-center items-center my-5">
            <img src={aboutus1} alt="" className="w-[25%] h-[25%]" />
            <img src={aboutus2} alt="" className="w-[25%] h-[25%]" />
            <img src={aboutus3} alt="" className="w-[25%] h-[25%]" />
          </div>
          <div className="font-bold text-2xl mt-5 text-center w-[75%]">
            We’re on a mission to{" "}
            <HighlightedText
              text="reshape the future of learning."
              color="yellow-400"
            ></HighlightedText>{" "}
            Our platform blends{" "}
            <HighlightedText
              text="cutting-edge technology real-world expertise,"
              color="blue-400"
            ></HighlightedText>
            and{" "}
            <HighlightedText
              text="a thriving learner community"
              color="blue-400"
            ></HighlightedText>{" "}
            to deliver a{" "}
            <HighlightedText
              text="transformative educational experience"
              color="yellow-300"
            ></HighlightedText>{" "}
            that empowers every individual.
          </div>
        </div>
      </section>
      {/*Section 2 */}
      <section>
        <div className="flex flex-col gap-4 w-full items-center my-5">
          <div className="flex flex-col items-center w-[90%] my-10">
            <BannerBlocks
              h1="Our Mission"
              h2="Transforming Education"
              h3="for a Better Future"
              description={`At KnowGeek, we're on a mission to reshape the future of learning. Our platform blends cutting-edge technology, real-world expertise, and a thriving learner community to deliver a transformative educational experience that empowers every individual.

Through innovative tools, industry-relevant content, and a strong community of learners and mentors, we aim to bridge the gap between education and opportunity. We’re not just preparing learners for exams we’re preparing them for life, careers, and leadership in a digital world.`}
              image={aboutBanner}
            ></BannerBlocks>
          </div>
          <div className="flex flex-row ml-25 gap-15 w-[90%] justify-center items-center my-20">
            <div className="flex flex-col w-[60%]">
              <HighlightBanner
                highlightedText="Our Vision"
                color="yellow-300"
                paragraph="Driven by a passion for innovation, we envision a world where learning is limitless, accessible, and empowering for all. Our passionate team of creators, educators, and developers came together to design a platform that blends advanced technology, personalized learning paths, and engaging content — all to nurture a more interactive, intuitive, and impactful learning experience."
                textAlign="text-left"
              ></HighlightBanner>
            </div>
            <div className="w-[60%] flex flex-col">
              <HighlightBanner
                highlightedText="Our Mission"
                color="blue-400"
                paragraph="At KnowGeek, our mission goes beyond delivering online courses — we aim to create a vibrant, connected learning environment. By blending community, collaboration, and communication, we empower learners to grow together. Through live sessions, forums, and peer support, we foster meaningful engagement and inspire a shared journey of discovery, connection, and continuous growth."
                textAlign="text-left"
              ></HighlightBanner>
            </div>
          </div>
          <div className="w-full flex flex-row justify-evenly bg-gray-700 p-8">
            {aboutUs.map(({ num, desc }, index) => {
              return (
                <div className="flex flex-col gap-2 items-center" key={index}>
                  <p className="text-2xl font-bold">{num}</p>
                  <p className="text-white/30">{desc}</p>
                </div>
              );
            })}{" "}
          </div>
        </div>
      </section>
      {/*Section 3 */}
      <section>
        <div className="flex flex-col m-30">
          <div className="grid grid-cols-1 lg:grid-rows-2 lg:grid-cols-4 lg:h-[75vh] min-h-fit">
            {/*div*/}
            <div
              className="flex flex-col gap-3 mx-auto my-auto text-white p-2 lg:col-span-2

            "
            >
              <div className="font-bold text-3xl text-left">
                World-Class Learning for <br />
                <HighlightedText text="Anyone, Anywhere" color="yellow-300" />
              </div>
              <div className="text-lg opacity-70 text-left w-11/12">
                <p>
                  KnowGeek partners with top educators and companies to bring
                  flexible, affordable, and job-relevant learning to individuals
                  and organizations worldwide.
                </p>
              </div>
              <div className="">
                <NavLink to="/signup">
                  <CTAButton arrow={true} active={true} text="Learn More" />
                </NavLink>
              </div>
            </div>
            {/*other divs*/}
            {aboutCardData.map((card, index) => (
              <div
                key={index}
                className={`flex flex-col flex-wrap gap-4 text-sm opacity-90 ${
                  index === 2 && "lg:col-start-2"
                }`}
              >
                <div className={`${card.bgColor} p-5 h-full text-xl`}>
                  <h3 className=" font-medium text-white mb-2">{card.title}</h3>
                  <p className="text-gray-400 text-lg">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*Section 4*/}
      <section>
        <div className="flex flex-col items-center">
          <Testimonials />
          <div className="flex flex-col items-center border-2 border-gray-700 rounded-lg px-20 py-10 min-w-fit">
            <HighlightBanner
              title="Get in Touch"
              paragraph="We'd love to hear from you, Please fill out this form."
            />
            <ContactUsForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
