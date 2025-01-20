//Importing the required packages
const express = require("express");
const { body, validationResult } = require("express-validator");

const Games = require("../models/gamesModels");

const router = express.Router();

// GET all games
router.get("/", async (req, res) => {
  try {
    const games = await Games.find().lean().exec();
    return res.status(200).send(games);
  } catch (err) {
    return res.status(500).send({ error: "Something went wrong" });
  }
});

// Define routes
router.post(
  "/",
  [
    // Wrap validators in array
    body("title").notEmpty().withMessage("Title should not be empty"),
    body("imageUrl")
      .notEmpty()
      .isLength({ min: 10, max: 200 })
      .withMessage(
        "imageUrl must be minimum of 10 characters and maximum of 200 characters"
      ),
    body("playListUrl")
      .notEmpty()
      .withMessage("The playListUrl must be updated"),
    body("streamStatus")
      .notEmpty()
      .withMessage("streamStatus should not be empty"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(401).send(errors.array());
      }

      const agenda = await Games.create(req.body);
      console.log("agenda", agenda);
      return res.status(201).send(agenda);
    } catch (err) {
      return res.status(500).send({ error: "Something went wrong" });
    }
  }
);

// UPDATE game by id
router.patch(
  "/:id",
  [
    body("title")
      .optional()
      .notEmpty()
      .withMessage("Title should not be empty"),
    body("imageUrl")
      .optional()
      .isLength({ min: 10, max: 200 })
      .withMessage(
        "imageUrl must be minimum of 10 characters and maximum of 200 characters"
      ),
    body("playListUrl")
      .optional()
      .notEmpty()
      .withMessage("The playListUrl must be updated"),
    body("streamStatus")
      .optional()
      .notEmpty()
      .withMessage("streamStatus should not be empty"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(errors.array());
      }

      const game = await Games.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();

      if (!game) {
        return res.status(404).send({ error: "Game not found" });
      }

      return res.status(200).send(game);
    } catch (err) {
      return res.status(500).send({ error: "Something went wrong" });
    }
  }
);

// DELETE game by id
router.delete("/:id", async (req, res) => {
  try {
    const game = await Games.findByIdAndDelete(req.params.id).lean().exec();

    if (!game) {
      return res.status(404).send({ error: "Game not found" });
    }

    return res.status(200).send(game);
  } catch (err) {
    return res.status(500).send({ error: "Something went wrong" });
  }
});

// Export router
module.exports = router;
