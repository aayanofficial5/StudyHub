import { useEffect, useRef, useState } from "react"
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai"
import CourseSubSectionBar from "./CourseSubSectionBar"

export default function CourseContentBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null)

  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])

  const [sectionHeight, setSectionHeight] = useState(0)

  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  return (
    <div className="overflow-hidden border border-solid border-gray-700  text-white last:mb-0 rounded-md">
      {/* Section Header */}
      <div
        className="flex cursor-pointer items-start justify-between px-6 py-5 bg-opacity-20 bg-gradient-to-b from-slate-800 via-gray-900 to-slate-800 hover:bg-gray-700 transition-colors duration-200"
        onClick={() => handleActive(course._id)}
      >
        <div className="flex items-center gap-2">
          <i className={`transition-transform duration-300 ${isActive.includes(course._id) ? "rotate-90" : "rotate-0"}`}>
            <AiOutlineRight/>
          </i>
          <p className="text-base font-medium">{course?.sectionName}</p>
        </div>
        <div className="space-x-2">
          <span className="text-yellow-400 text-sm font-medium">
            {`${course.subSection.length || 0} lecture(s)`}
          </span>
        </div>
      </div>

      {/* Section Content */}
      <div
        ref={contentEl}
        className="relative h-0 overflow-hidden transition-[height] duration-300 ease-in-out bg-gradient-to-bl from-slate-800 via-gray-700 to-slate-800"
        style={{ height: sectionHeight }}
      >
        <div className="flex flex-col gap-2 px-6 py-5 text-gray-200 font-semibold text-sm">
          {course?.subSection?.map((subSec, i) => (
            <CourseSubSectionBar subSec={subSec} key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
