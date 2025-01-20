const express = require("express");
const cors = require("cors");
require("dotenv").config();
const GamesController = require("./controller/gamesController");

const app = express();
const port = process.env.PORT || 2924;

//Using cors to prevent from the cors errors

const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.options("*", cors());

app.use(express.json());

app.use("/games", GamesController);

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the games API ");
});
//export the app and port
module.exports = {
  app,
  port,
};
