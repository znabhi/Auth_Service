const { where } = require("sequelize");
const { User } = require("../models/index");
const UserService = require("../services/user-serivce");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const checkUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!checkUser) {
      const user = await userService.create({
        email: req.body.email,
        password: req.body.password,
      });
      return res.status(201).json({
        data: user,
        success: true,
        message: "successfully created the user ",
        error: {},
      });
    } else {
      console.log("enter unique email address");
    }
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "sorry this user not created",
      error: { error },
    });
  }
};

const destroy = async (req, res) => {
  try {
    const user = await userService.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      data: user,
      success: true,
      message: "successfully deleted this user",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "some error while deleting",
      error: { error },
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    if (!response) {
      throw { error: "User not found" };
    }
    return res.status(200).json({
      data: response,
      message: "successfully sign in",
      success: true,
      error: {},
    });
  } catch (error) {
    return res.status(200).json({
      data: {},
      message: "not signin",
      success: false,
      error: { error },
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      success: true,
      err: {},
      data: response,
      message: "user is authenticated and token is valid",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    if (!response) {
      throw { error: "this user not admin role" };
    }
    return res.status(200).json({
      data: response,
      success: true,
      message: "this user is admin role",
      error: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "this is not admin",
      error: error,
    });
  }
};

module.exports = {
  create,
  destroy,
  signIn,
  isAdmin,
  isAuthenticated,
};
