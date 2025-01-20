const express = require("express");
const UserController = require("../../controllers/user-controller");
const { AuthRequestValidators } = require("../../middlewares/index");
const router = express.Router();

router.post(
  "/signup",
  AuthRequestValidators.validateAuthUser,
  UserController.create
);
router.get("/isAuthenticated", UserController.isAuthenticated);
router.post(
  "/signin",
  AuthRequestValidators.validateAuthUser,
  UserController.signIn
);

router.get(
  "/isAdmin",
  AuthRequestValidators.validateIsAdminRequest,
  UserController.isAdmin
);

module.exports = router;
