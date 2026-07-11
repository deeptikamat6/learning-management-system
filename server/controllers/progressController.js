const Progress = require("../models/Progress");
const Lesson = require("../models/Lesson");

const markLessonCompleted = async (req, res) => {
  try {

    const { lessonId } = req.body;

    if (!lessonId) {
      return res.status(400).json({
        message: "Lesson ID is required",
      });
    }

    // Check if lesson exists
    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    // Find progress document
    let progress = await Progress.findOne({
      student: req.user.id,
      course: lesson.course,
    });

    // Create if not found
    if (!progress) {
      progress = await Progress.create({
        student: req.user.id,
        course: lesson.course,
        completedLessons: [lessonId],
      });

      return res.status(201).json({
        message: "Lesson marked as completed",
        progress,
      });
    }

    // Prevent duplicate completion
    if (progress.completedLessons.includes(lessonId)) {
      return res.status(400).json({
        message: "Lesson already completed",
      });
    }

    // Add lesson
    progress.completedLessons.push(lessonId);

    await progress.save();

    res.status(200).json({
      message: "Lesson marked as completed",
      progress,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getCourseProgress = async (req, res) => {
  try {

    // Find progress
    const progress = await Progress.findOne({
      student: req.user.id,
      course: req.params.courseId,
    });

    // Count total lessons
    const totalLessons = await Lesson.countDocuments({
      course: req.params.courseId,
    });

    // If student hasn't completed anything yet
    if (!progress) {
      return res.status(200).json({
        totalLessons,
        completedLessons: 0,
        progressPercentage: 0,
      });
    }

    const completedLessons = progress.completedLessons.length;

    const progressPercentage =
      totalLessons === 0
        ? 0
        : Math.round((completedLessons / totalLessons) * 100);

    res.status(200).json({
      totalLessons,
      completedLessons,
      progressPercentage,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  markLessonCompleted,
  getCourseProgress,
};