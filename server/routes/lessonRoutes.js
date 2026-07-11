const express = require("express");

const router = express.Router();

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const {
  createLesson,
  getLessonsByCourse,
    getLessonById,
    updateLesson,
    deleteLesson,
} = require("../controllers/lessonController");

// Create Lesson
router.post(
  "/",
  protect,
  authorize("instructor"),
  createLesson
);

router.get(
  "/course/:courseId",
  getLessonsByCourse
);

router.get("/:id", getLessonById);

router.put(
  "/:id",
  protect,
  authorize("instructor"),
  updateLesson
);

router.delete(
  "/:id",
  protect,
  authorize("instructor"),
  deleteLesson
);

module.exports = router;