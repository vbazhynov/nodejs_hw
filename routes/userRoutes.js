import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
  baseUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user

router.post(
  "/",
  baseUserValid,
  createUserValid,
  (req, res, next) => {
    try {
      const data = userService.addUser(req, res);
      res.data = data;
    } catch (err) {
      err.name = 400;
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/",
  (req, res, next) => {
    try {
      const users = userService.getAllUsers();
      res.data = users;
    } catch (err) {
      err.name = 404;
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const user = userService.getUserById(req);
      res.data = user;
    } catch (err) {
      err.name = 404;
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.put(
  "/:id",
  baseUserValid,
  updateUserValid,
  (req, res, next) => {
    try {
      const user = userService.changeUserData(req);
      res.data = user;
    } catch (err) {
      err.name = 400;
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const user = userService.deleteUserById(req);
      res.data = user;
    } catch (err) {
      err.name = 404;
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
