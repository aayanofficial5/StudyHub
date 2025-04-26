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
      <div className="text-gray-400">
        <div className="box-content bg-gray-900/60 px-4">
          {/* Hero Section */}
          <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
            <p className="text-sm">
              {`Home / Catalog / `}
              <span className="text-yellow-300">
                {catalogPageData?.data?.selectedCategory?.name}
              </span>
            </p>
            <p className="text-3xl text-gray-200">
              {catalogPageData?.data?.selectedCategory?.name}
            </p>
            <p className="max-w-[870px]">
              {catalogPageData?.data?.selectedCategory?.description}
            </p>
          </div>
        </div>
        <div>
          {/* Section 1*/}
          <section className="mb-8">
            <div className="container mx-auto p-4">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold">Most Popular</h1>
                <h1 className="text-2xl font-bold">New</h1>
              </div>
              <CourseSlider courses={catalogPageData?.data?.mostSellingCourses}/>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold">Top Courses</h1>
              <div><CourseSlider courses={catalogPageData?.data?.mostSellingCourses} /></div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold">Frequently Bought Together</h1>
              <div className="py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 space-x-7 space-y-7">
                  {catalogPageData?.data?.mostSellingCourses
                    ?.slice(0, 4)
                    .map((course, index) => (
                      <CourseCard
                        course={course}
                        key={index}
                        width={600}
                        height={500}
                      />
                    ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Catalog;
