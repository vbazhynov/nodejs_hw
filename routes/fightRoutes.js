import { Router } from "express";
import { fightService } from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { createFightValid } from "../middlewares/fight.validation.middleware.js";

const router = Router();

// OPTIONAL TODO: Implement route controller for fights
router.post(
  "/",
  createFightValid,
  (req, res, next) => {
    try {
      const data = fightService.addFight(req, res);
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
      const users = fightService.getAllFights();
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
      const data = fightService.getFightById(req);
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
      const data = fightService.deleteFightById(req);
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
