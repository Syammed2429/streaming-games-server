//Importing the app and port from the index.js
const { app, port } = require("./index");

const connect = require("./config/db");

app.listen(port, async () => {
  await connect();
  console.log("server listening on:", port);
});
