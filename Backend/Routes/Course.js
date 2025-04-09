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
const { createTag, getAllTags } = require("../Controllers/Tag");
const { createCourse, getAllCourses , getCourseDetails , editCourseDetails , deleteCourse } = require("../Controllers/Course");
const { createSection, updateSection, deleteSection } = require("../Controllers/Section");
const { createSubSection, updateSubSection, deleteSubSection } = require("../Controllers/SubSection");
// routes

// categories routes
router.post("/categories", auth, isAdmin, createCategory);
router.get("/categories", getAllCategories);
// router.get("/categories/:id", getCategoryPageDetails);

// tags routes
router.post("/tags", auth, isAdmin, createTag);
router.get("/tags", getAllTags);

// courses routes
router.post("/", auth, isInstructor, createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseDetails);
router.put("/:id", auth, isInstructor, editCourseDetails);
router.delete("/:id", auth, isInstructor, deleteCourse);

// sections routes
router.post("/:id/sections", auth, isInstructor, createSection);
router.put("/:id/sections/:sectionId", auth, isInstructor, updateSection);
router.delete("/:id/sections/:sectionId", auth, isInstructor, deleteSection);

// subSections routes
router.post("/:id/sections/:sectionId/subsections", auth, isInstructor, createSubSection);
router.put("/:id/sections/:sectionId/subsections/:subSectionId", auth, isInstructor, updateSubSection);
router.delete("/:id/sections/:sectionId/subsections/:subSectionId", auth, isInstructor, deleteSubSection);

module.exports = router;
