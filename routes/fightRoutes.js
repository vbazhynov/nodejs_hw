import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import {} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// OPTIONAL TODO: Implement route controller for fights
router.post(
  "/",
  (req, res, next) => {
    try {
      const data = fightersService.addFight(req, res);
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
      const users = fightersService.getAllFights();
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
      const data = fightersService.getFightById(req);
      res.data = data;
    } catch (err) {
      err.name = 404;
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
      const data = fightersService.deleteFightById(req);
      res.data = data;
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
