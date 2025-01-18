const express = require("express");
const { PORT } = require("./config/serverConfig");
const app = express();
const apiRoutes = require("./routers/index");
const bodyParser = require("body-parser");
const parpareServer = () => {
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log("Server is stated", PORT);
  });
};

parpareServer();
