const validateAuthUser = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      data: {},
      success: false,
      message: "something wrong",
      error: "Email and password missing in the request",
    });
  }
  next();
};

const validateIsAdminRequest = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({
      data: {},
      success: false,
      message: "Please enter id",
      error: "User id not provided",
    });
  }
  next();
};

module.exports = {
  validateAuthUser,
  validateIsAdminRequest,
};
