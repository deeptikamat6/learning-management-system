const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

const createLesson = async (req, res) => {
  try {

    const {
      title,
      description,
      course,
      videoUrl,
      duration,
      order,
    } = req.body;

    // Check required fields
    if (!title || !course || !order) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Check if course exists
    const existingCourse = await Course.findById(course);

    if (!existingCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Ownership check
    if (existingCourse.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can add lessons only to your own courses",
      });
    }

    // Create lesson
    const lesson = await Lesson.create({
      title,
      description,
      course,
      videoUrl,
      duration,
      order,
    });

    res.status(201).json({
      message: "Lesson created successfully",
      lesson,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getLessonsByCourse = async (req, res) => {
  try {

    const lessons = await Lesson.find({
      course: req.params.courseId,
    }).sort({ order: 1 });

    res.status(200).json(lessons);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getLessonById = async (req, res) => {
  try {

    const lesson = await Lesson.findById(req.params.id)
      .populate("course", "title");

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    res.status(200).json(lesson);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const updateLesson = async (req, res) => {
  try {

    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    // Find the course
    const course = await Course.findById(lesson.course);

    // Check ownership
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Lesson updated successfully",
      lesson: updatedLesson,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const deleteLesson = async (req, res) => {
  try {

    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    // Find course
    const course = await Course.findById(lesson.course);

    // Check ownership
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    await Lesson.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Lesson deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  deleteLesson,
  updateLesson,
};