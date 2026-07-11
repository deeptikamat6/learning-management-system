const express = require("express");

const router = express.Router();

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const {
  markLessonCompleted,
  getCourseProgress,
} = require("../controllers/progressController");

// Mark Lesson Completed
router.post(
  "/complete",
  protect,
  authorize("student"),
  markLessonCompleted
);

router.get(
  "/:courseId",
  protect,
  authorize("student"),
  getCourseProgress
);

module.exports = router;