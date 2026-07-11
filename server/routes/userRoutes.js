const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");//bcz we are exporting an object

const { getProfile } = require("../controllers/userController");

// Protected Route
router.get("/profile", protect, getProfile);

module.exports = router;