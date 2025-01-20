const express = require("express");
const { PORT } = require("./config/serverConfig");
const app = express();
const apiRoutes = require("./routers/index");
const bodyParser = require("body-parser");
const { User, Role } = require("./models/index");
const parpareServer = () => {
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    const u1 = await User.findByPk(3);
    const r1 = await Role.findByPk(1);
    // u1.addRole(r1);
    const response = await u1.hasRole(r1);
    console.log(response);

    console.log("Server is stated", PORT);
  });
};

parpareServer();
