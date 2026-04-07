const express = require("express");
const router = express.Router();
const theaterController = require("../controllers/theaterController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.get("/", protect, theaterController.getTheaters);
router.get("/:id", protect, theaterController.getTheaterById);

router.post("/", protect, authorize("admin"), theaterController.createTheater);
router.put("/:id", protect, authorize("admin"), theaterController.updateTheater);
router.delete("/:id", protect, authorize("admin"), theaterController.deleteTheater);

router.post("/:id/review", protect, authorize("user"), theaterController.addReview);

module.exports = router;