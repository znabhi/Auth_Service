const { User, Role } = require("../models/index");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong in repository", error);
    }
  }

  async destroy(userId) {
    try {
      const user = await User.delete({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      console.log("error while deleting user error message:", error);
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId);
      return user;
    } catch (error) {
      console.log("this user not exist ", error);
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({ where: { email: userEmail } });
      return user;
    } catch (error) {
      console.log("error while finding user email", error);
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const checkRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });

      const response = await user.hasRole(checkRole);
      return response;
    } catch (error) {
      console.log("error in user repository layer");
      throw error;
    }
  }
}

module.exports = UserRepository;
