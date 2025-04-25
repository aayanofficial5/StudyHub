const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryPageDetails,
} = require("../Controllers/Category");
const { auth } = require("../Middlewares/Authentication/auth");
const { isAdmin } = require("../Middlewares/Authorization/isAdmin");
const { isInstructor } = require("../Middlewares/Authorization/isInstructor");
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  editCourseDetails,
  deleteCourse,
  getInstructorCourses,
} = require("../Controllers/Course");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../Controllers/Section");
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../Controllers/SubSection");

// routes

// categories routes
router.post("/categories", auth, isAdmin, createCategory);
router.get("/categories", getAllCategories);
// router.get("/categories/:id", getCategoryPageDetails);


// courses routes
router.post("/", auth, isInstructor, createCourse);
router.get("/", getAllCourses);
router.get("/details", getCourseDetails);
router.put("/", auth, isInstructor, editCourseDetails);
router.delete("/", auth, isInstructor, deleteCourse);
router.get("/instructor", auth, isInstructor, getInstructorCourses);

// sections routes
router.post("/section", auth, isInstructor, createSection);
router.put("/section", auth, isInstructor, updateSection);
router.delete("/section", auth, isInstructor, deleteSection);

// subSections routes
router.post("/section/subsection/", auth, isInstructor, createSubSection);
router.put("/section/subsection", auth, isInstructor, updateSubSection);
router.delete("/section/subsection", auth, isInstructor, deleteSubSection);

module.exports = router;
