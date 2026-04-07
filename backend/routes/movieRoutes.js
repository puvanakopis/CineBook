const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const { protect, authorize } = require("../middlewares/authMiddleware");
const { uploadImage } = require("../middlewares/uploadMiddleware");

const uploadMovie = uploadImage("movies");

router.get("/", protect, movieController.getMovies);
router.get("/:id", protect, movieController.getMovieById);

router.post("/", protect, authorize("admin"), uploadMovie.single("poster"), movieController.createMovie);
router.put("/:id", protect, authorize("admin"), uploadMovie.single("poster"), movieController.updateMovie);
router.delete("/:id", protect, authorize("admin"), movieController.deleteMovie);

module.exports = router;