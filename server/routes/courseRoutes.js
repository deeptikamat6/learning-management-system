const express = require("express");

const router = express.Router();

const {
    protect,
    authorize,
} = require("../middleware/authMiddleware");

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const upload = require("../middleware/uploadMiddleware");

// Create Course (Protected)
router.post(
  "/",
  protect,
  authorize("instructor"),
  upload.single("thumbnail"),
  createCourse
);

router.put(
  "/:id",
  protect,
  authorize("instructor"),
  updateCourse
);

router.delete(
  "/:id",
  protect,
  authorize("instructor"),
  deleteCourse
);


// Get All Courses (Public)
router.get("/", getAllCourses);

// Get Course by ID (Public)
router.get("/:id", getCourseById);

module.exports = router;