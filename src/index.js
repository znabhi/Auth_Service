const express = require("express");
const { PORT } = require("./config/serverConfig");
const app = express();

const parpareServer = () => {
  app.listen(PORT, () => {
    console.log("Server is stated", PORT);
  });
};

parpareServer();
