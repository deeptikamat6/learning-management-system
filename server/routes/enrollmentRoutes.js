const express = require("express");

const router = express.Router();

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const {
  enrollCourse,
  getMyCourses,
} = require("../controllers/enrollmentController");



// Student Enroll
router.post(
  "/",
  protect,
  authorize("student"),
  enrollCourse
);

// Get My Courses

router.get(
  "/my-courses",
  protect,
  authorize("student"),
  getMyCourses
);

module.exports = router;