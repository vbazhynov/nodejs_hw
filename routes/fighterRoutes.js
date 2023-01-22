import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
  baseFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.post(
  "/",
  baseFighterValid,
  createFighterValid,
  (req, res, next) => {
    try {
      const data = fighterService.addFighter(req, res);
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
      const data = fighterService.getAllFighters();
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

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const data = fighterService.getFighterById(req);
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

router.put(
  "/:id",
  baseFighterValid,
  updateFighterValid,
  (req, res, next) => {
    try {
      const data = fighterService.changeFighterData(req);
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
      const data = fighterService.deleteFighterById(req);
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
