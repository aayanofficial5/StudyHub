import React, { useEffect, useState } from "react";
import { getCatalogPageData } from "./../services/operations/pageAndComponentDataApi";
import Footer from "../components/Home/Footer";
import { useParams } from "react-router-dom";
import { catalogData } from "./../data/dummyData";
import CourseCard from "../components/Common/CourseCard";
import { useSelector } from "react-redux";
import CourseSlider from "../components/Core/Catalog/CourseSlider";

const Catalog = () => {
  const { catalogName } = useParams();
  const { loading } = useSelector((state) => state.profile);
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(catalogData);
  
  // // fetch all categories
  // useEffect(() => {
  //   const getCategoryDetails = async () => {
  //     const result = await getCatalogPageData(catalogName);
  //     if (result) setCatalogPageData(result);
  //   };
  //   getCategoryDetails();
  // }, [catalogName]);

  return (
    <>
  <div className="text-gray-400 w-full m-0 p-0 overflow-x-hidden">
    {/* Hero Section */}
    <div className="bg-gray-900/60 mb-8">
      <div className="flex flex-col justify-center gap-4 pl-5 md:pl-20 min-h-[260px] max-w-screen-xl mx-auto">
        <p className="text-sm">
          Home / Catalog / 
          <span className="text-yellow-300">
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>
        <p className="text-3xl text-gray-200 font-semibold">
          {catalogPageData?.data?.selectedCategory?.name}
        </p>
        <p className="max-w-3xl text-sm md:text-base">
          {catalogPageData?.data?.selectedCategory?.description.substring(0, 200) + "..."}
        </p>
      </div>
    </div>

    {/* Content Sections */}
    <div className="w-full flex flex-col items-center px-4 md:px-10">
      
      {/* Section 1 */}
      <section className="mb-12 w-full max-w-screen-xl">
        <div className="flex mb-4">
          <h1 onClick={()=>setActive(1)} className={`px-4 py-2 text-xl font-bold cursor-pointer border-b-1 ${active==1?"text-yellow-300 border-yellow-300":""}`}>Most Popular</h1>
          {/* <span className="text-2xl font-bold">|</span> */}
          <h1 onClick={()=>setActive(2)} className={`px-4 py-2 text-xl font-bold cursor-pointer border-b-1 ${active==2?"text-yellow-300 border-yellow-300":""}`}>New</h1>
          <div className="border-b-1 flex-1"></div>
        </div>
        <CourseSlider courses={catalogPageData?.data?.mostSellingCourses} />
      </section>

      {/* Section 2 */}
      <section className="mb-12 w-full max-w-screen-xl text-white">
        <h1 className="text-2xl font-bold mb-4">Top Courses</h1>
        <CourseSlider courses={catalogPageData?.data?.mostSellingCourses} />
      </section>

      {/* Section 3 */}
      <section className="mb-12 w-full max-w-screen-xl text-white">
        <h1 className="text-2xl font-bold mb-6">Frequently Bought Together</h1>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => (
            <div key={index} className="flex justify-center items-center">
            <CourseCard
              course={course}
              width={700}
              height={500}
            />
            </div>
          ))}
        </div>
      </section>

    </div>

    {/* Footer */}
    <Footer />
  </div>
</>

  );
};

export default Catalog;
