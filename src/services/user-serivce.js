const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/serverConfig");
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

  async signIn(email, plainPassword) {
    try {
      // console.log(plainPassword);
      const user = await this.userRepository.getByEmail(email);
      if (!user) {
        console.log("this email not found");
        throw { error: "Not exist this email" };
      }
      const passwordMatch = this.checkPassword(plainPassword, user.password);

      if (!passwordMatch) {
        console.log(`password don't match`);
        throw { error: "Invalid Password" };
      }
      const newToken = await this.createToken({
        email: user.email,
        id: user.id,
      });
      return newToken;
    } catch (error) {
      console.log("something error while sign process ", error);
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid Token" };
      }
      const user = await this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with the corresponding token exists" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the auth process");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("some error while generating token", error);
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("error in verify token ", error);
      throw error;
    }
  }

  checkPassword(plainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {
      console.log("Password is not verify", error);
    }
  }
}

module.exports = UserService;
