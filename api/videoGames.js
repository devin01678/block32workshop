const express = require("express");
const router = express.Router();

const REPLACE_ME = "HELP REPLACE ME!!!!";

const {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
} = require("../db/videoGames");
const { updateBoardGame } = require("../db/boardGames");

// GET - /api/video-games - get all video games
router.get("/", async (req, res, next) => {
  try {
    const videoGames = await getAllVideoGames();
    res.send(videoGames);
  } catch (error) {
    next(error);
  }
});

// GET - /api/video-games/:id - get a single video game by id
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const videoGame = await getVideoGameById(id);
    res.send(videoGame);
  } catch (error) {
    next(error);
  }
});

// POST - /api/video-games - create a new video game

// Below, we are waiting for the createVideoGame function to provide the characteristics that are passed to it in the createVideoGame function.

router.post("/", async (req, res, next) => {
  const { name, description, price, inStock, isPopular, imgUrl } = req.body;
  if (!name || !description || !price) {
    res.status(404).json({ msg: "Please provide the required data." });
  }
  try {
    const videoGame = await createVideoGame(req.body);
    res.send(videoGame);
  } catch (error) {
    next(error);
  }
});

// PUT - /api/video-games/:id - update a single video game by id

// Below, we are passing the parameters and characteristics/values from user input into the updateVideoGame function, allowing us to update the database.

router.put("/:id", async (req, res, next) => {
  try {
    const videoGame = await updateVideoGame(req.params.id, req.body);
    res.send(videoGame);
  } catch (error) {
    next(error);
  }
  // LOGIC GOES HERE
});

// DELETE - /api/video-games/:id - delete a single video game by id

// Below, we are waiting for the deleteBoardGame function to run, which passes in the user inputted id, using that id to identify which object of data to delete and then deletes it.

router.delete("/:id", async (req, res, next) => {
  try {
    const videoGame = await deleteVideoGame(req.params.id);
    res.send(videoGame);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
