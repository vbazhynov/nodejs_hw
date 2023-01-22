import { userService } from "./userService.js";

class AuthService {
  login(userData) {
    const user = userService.search(userData);
    if (!user) {
      throw Error("User not found");
    }
    if (user.password === userData.password) {
      return user;
    } else {
      throw Error("Password Incorrect");
    }
  }
}

const authService = new AuthService();

export { authService };
