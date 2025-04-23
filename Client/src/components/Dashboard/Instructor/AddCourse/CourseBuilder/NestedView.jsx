import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdAdd, MdDelete, MdOndemandVideo } from "react-icons/md";
import Modal from "./../../../Common/Modal";
import SubSectionModal from "./SubSectionModal";
import { setCourse } from "../../../../../redux/slices/courseSlice";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseapis";
const NestedView = ({ handleChangeByEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const [sectionOpen, setSectionOpen] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async(sectionId) => {
    const result = await deleteSection({sectionId,courseId:course._id});
    // console.log(result);
    if(result){
      dispatch(setCourse(result))
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async(subSectionId) => {
    const result = await deleteSubSection(subSectionId);
    console.log(result);
    if(result){
      const updatedCourseContent = course.courseContent.map((section)=>section._id==result._id?result:section);
      const updatedCourse = {...course,courseContent:updatedCourseContent};
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };

  return (
    <>
      <div className="text-[18px]">
        {/*Display Section*/}
        {course?.courseContent?.map((section, index) => (
          <details key={section?._id || index}>
            <summary className="flex">
              <div
                className="flex justify-between items-center mb-4 w-full cursor-pointer
            border-b border-gray-700 py-4"
                onClick={() =>
                  setSectionOpen(sectionOpen ? null : section?._id)
                }
              >
                <div className="flex items-center gap-2 text-white">
                  {sectionOpen == section?._id ? (
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowForward />
                  )}
                  <span className="font-semibold">{section?.sectionName}</span>
                </div>
                <div className="flex items-center gap-2 justify-center" onClick={(e)=>e.stopPropagation()}>
                  <button
                    onClick={() => handleChangeByEditSectionName(section._id,section.sectionName)}
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setConfirmationModal({
                        title: "Delete this Section?",
                        paragraph:
                          "All the lectures in this section will be deleted",
                        button1: "Delete",
                        button2: "Cancel",
                        action1: () => handleDeleteSection(section._id),
                        action2: () => setConfirmationModal(null),
                      });
                    }}
                    className="text-gray-400 hover:text-white cursor-pointer"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </summary>
            <div className="mx-7">
              {/* Add SubSections */}
              {section?.subSection?.map((subSection, subIndex) => (
                <div
                  key={subSection?._id || subIndex}
                  onClick={() => setViewSubSection(subSection)}
                  className="flex justify-between items-center mb-4 cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-white">
                    <MdOndemandVideo />
                    <span className="font-semibold">
                      {subSection?.subSectionName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 justify-center" onClick={(e)=>e.stopPropagation()}>
                    <button
                      onClick={() => setEditSubSection(subSection)}
                      className="text-gray-400 hover:text-white cursor-pointer"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        setConfirmationModal({
                          title: "Delete this Lecture?",
                          paragraph: "Selected lecture will be deleted",
                          button1: "Delete",
                          button2: "Cancel",
                          action1: () => handleDeleteSubSection(subSection._id),
                          action2: () => setConfirmationModal(null),
                        });
                      }}
                      className="text-gray-400 hover:text-white cursor-pointer"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
              {/* Add Lecture Link */}
              <button
                type="button"
                className="text-blue-400 font-semibold hover:underline cursor-pointer flex items-center"
                onClick={() => setAddSubSection(section?._id)}
              >
                <MdAdd />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>
        
      {addSubSection ? (
        <SubSectionModal 
        modalData={addSubSection}
        setModalData={setAddSubSection}
        add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal 
        modalData={viewSubSection} setModalData={setViewSubSection}
        view={true}/>
      ) : editSubSection ? (
        <SubSectionModal 
        modalData={editSubSection} setModalData={setEditSubSection}
        edit={true}/>
      ) : (
        <div></div>
      )}
      {confirmationModal && (
        <Modal
          title={confirmationModal.title}
          paragraph={confirmationModal.paragraph}
          button1={confirmationModal.button1}
          action1={confirmationModal.action1}
          button2={confirmationModal.button2}
          action2={confirmationModal.action2}
        />
      )}
    </>
  );
};

export default NestedView;
