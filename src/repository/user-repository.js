const { User } = require("../models/index");

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
}

module.exports = UserRepository;
