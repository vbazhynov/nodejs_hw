import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user
  addUser(req, res) {
    if (this.search({ email: req.body.email })) {
      throw Error("User with this email already exist!!");
    }
    if (this.search({ phoneNumber: req.body.phoneNumber })) {
      throw Error("User with this Phone number already exist!!");
    }
    return userRepository.create(req.body);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAllUsers() {
    const users = userRepository.getAll();
    if (users.length === 0) {
      throw Error("Database is empty!");
    } else {
      return users;
    }
  }

  getUserById(req) {
    const user = userRepository.getOne({ id: req.params.id });
    if (!user) {
      throw Error("There is no such User in database");
    } else {
      return user;
    }
  }

  deleteUserById(req) {
    const user = userRepository.delete(req.params.id);
    if (!user) {
      throw Error("There is no such User in database");
    } else {
      return user;
    }
  }

  changeUserData(req) {
    const user = userRepository.update(req.params.id, req.body);
    if (!user) {
      throw Error("There is no such User in database");
    } else {
      return user;
    }
  }
}

const userService = new UserService();

export { userService };
