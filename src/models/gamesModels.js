//Importing the required packages
const mongoose = require("mongoose");

//Creating schemas
const GamesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    playListUrl: { type: String, required: true },
    streamStatus: { type: String, required: true },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

//Creating a new model
const Games = mongoose.model("games", GamesSchema);

//exporting the model
module.exports = Games;
