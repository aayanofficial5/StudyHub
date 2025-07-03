import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaEdit } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import CTAButton from "../../Home/CTAButton";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Sidebar that lists course sections and lectures for the video‑player page.
 * - On ≤ md screens it slides in/out of view instead of shrinking, so it never overlaps content.
 * - Auto‑closes on mobile after a lecture tap.
 * - Highlights the current lecture and shows overall progress.
 */
const VideoDetailsSidebar = ({ setReviewModal }) => {
  // ──────────────────────────────── state ────────────────────────────────
  const [activeSectionId, setActiveSectionId] = useState("");
  const [activeSubSectionId, setActiveSubSectionId] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  // ──────────────────────────────── store / routing ──────────────────────
  const { courseId, sectionId, subSectionId } = useParams();
  const {
    courseSectionData = [],
    courseEntireData,
    completedLectures = [],
    totalNoOfLectures = 0,
  } = useSelector((state) => state.viewCourse);

  const navigate = useNavigate();

  // ──────────────────────────────── effects ──────────────────────────────
  // Keep local "active" state in sync with the URL
  useEffect(() => {
    if (!courseSectionData.length) return;

    const currentSection = courseSectionData.find((s) => s._id === sectionId);
    const currentSubSection = currentSection?.subSection.find(
      (sub) => sub._id === subSectionId
    );

    if (!currentSection || !currentSubSection) return; // invalid URL

    setActiveSectionId(currentSection._id);
    setActiveSubSectionId(currentSubSection._id);
  }, [courseSectionData, sectionId, subSectionId]);

  // ──────────────────────────────── handlers ─────────────────────────────
  const handleSubSectionClick = (secId, subId) => {
    if (window.innerWidth < 1024) setShowSidebar(false); // auto‑close on small screens

    navigate(`/view-course/${courseId}/section/${secId}/sub-section/${subId}`);
  };

  const progressLabel = `${completedLectures.length} of ${totalNoOfLectures} Lectures Completed`;

  // ──────────────────────────────── render ───────────────────────────────
  return (
    <>
      {/* ───────────── mobile toggle handle ───────────── */}
      {!showSidebar && (
        <button
          type="button"
          aria-label="Open sidebar"
          className="absolute left-5 top-7 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-900 md:hidden"
          onClick={() => setShowSidebar(true)}
        >
          <FaChevronRight />
        </button>
      )}

      {/* ───────────── sidebar container ───────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-99 top-[70px] md:top-0 flex w-[300px] flex-col border-r border-gray-700 bg-gradient-to-tr from-slate-900 via-gray-700 to-slate-900 transition-transform duration-700 md:relative md:translate-x-0 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ───────────── header ───────────── */}
        <div className="flex flex-col gap-4 border-b border-gray-600 p-5 text-lg font-bold text-gray-300">
          <div className="flex items-center justify-between">
            {/* back / close */}
            <button
              type="button"
              aria-label="Back"
              onClick={() =>
                showSidebar
                  ? setShowSidebar(false)
                  : navigate("/dashboard/enrolled-courses")
              }
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-transform hover:scale-90"
            >
              <FaChevronLeft />
            </button>

            <div>
              <CTAButton text="Review" action={() => setReviewModal(true)} active="true" ><FaEdit/></CTAButton>
            </div>
          </div>

          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-gray-400">
              {progressLabel}
            </p>
          </div>
        </div>

        {/* ───────────── sections & lectures ───────────── */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 text-gray-100">
          {courseSectionData.map((section) => (
            <details
              key={section._id}
              open={section._id === activeSectionId}
              className="group [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between bg-gray-600 px-5 py-4 text-sm font-semibold">
                <span className="w-4/5 truncate">{section.sectionName}</span>
                <MdOutlineKeyboardArrowRight className="transition-transform duration-200 group-open:rotate-90" />
              </summary>

              {section.subSection.map((sub) => (
                <button
                  key={sub._id}
                  type="button"
                  onClick={() => handleSubSectionClick(section._id, sub._id)}
                  className={`relative flex w-full items-center gap-3 border-b border-gray-600 px-5 py-2 text-left text-sm font-semibold ${
                    sub._id === activeSubSectionId
                      ? "bg-blue-300 text-gray-900"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {/* completion checkbox */}
                  <input
                    type="checkbox"
                    readOnly
                    checked={completedLectures.includes(sub._id)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 accent-green-700"
                  />
                  <span className="ml-6 truncate">{sub.description}</span>
                </button>
              ))}
            </details>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default VideoDetailsSidebar;
