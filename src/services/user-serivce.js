const UserRepository = require("../repository/user-repository");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("error in service layer", error);
    }
  }
  async destroy(userId) {
    try {
      const user = await this.userRepository.delete(userId);
      return user;
    } catch (error) {
      console.log("some error in deleting user service layer", error);
    }
  }
}

module.exports = UserService;
