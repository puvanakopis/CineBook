const express = require("express");
const router = express.Router();
const theaterController = require("../controllers/theaterController");
const { protect, authorize } = require("../middlewares/authMiddleware");


router.post("/", protect, authorize("admin"), theaterController.createTheater);
router.put("/:id", protect, authorize("admin"), theaterController.updateTheater);

module.exports = router;