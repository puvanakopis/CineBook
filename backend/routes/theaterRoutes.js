const express = require("express");
const router = express.Router();
const theaterController = require("../controllers/theaterController");
const { protect, authorize } = require("../middlewares/authMiddleware");
const { uploadImage } = require("../middlewares/uploadMiddleware");

const uploadTheater = uploadImage("theaters");

router.get("/", theaterController.getTheaters);
router.get("/:id", theaterController.getTheaterById);

router.post("/", protect, authorize("admin"), uploadTheater.single("image"), theaterController.createTheater);
router.put("/:id", protect, authorize("admin"), uploadTheater.single("image"), theaterController.updateTheater);
router.delete("/:id", protect, authorize("admin"), theaterController.deleteTheater);

router.post("/:id/review", protect, authorize("user"), theaterController.addReview);

module.exports = router;