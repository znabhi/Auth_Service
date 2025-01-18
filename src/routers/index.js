const express = require("express");
const v1ApiRouter = require("./v1/index");

const router = express.Router();

router.use("/v1", v1ApiRouter);

module.exports = router;
