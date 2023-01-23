import { FIGHTER } from "../models/fighter.js";

const baseFighterValid = (req, res, next) => {
  const errorMessage = {
    error: true,
    message: "",
  };

  if (!req.body) {
    errorMessage.message = "Request data is empty";
    res.status(400).send(errorMessage);
    return;
  }

  const bodyKeys = Object.keys(req.body);
  for (let fKey of bodyKeys) {
    if (!FIGHTER.hasOwnProperty(fKey)) {
      errorMessage.message = `Field "${fKey}" is not required in request, please delete it`;
      res.status(400).send(errorMessage);
      return;
    }
  }

  if (req.body.hasOwnProperty("id")) {
    errorMessage.message = `Field "id" is not required in request, please delete it`;
    res.status(400).send(errorMessage);
    return;
  }
  if (req.body.power && typeof req.body.power !== "number") {
    errorMessage.message = "Power parameter should be a number type";
    res.status(400).send(errorMessage);
  } else if (req.body.health && typeof req.body.health !== "number") {
    errorMessage.message = "Health parameter should be a number type";
    res.status(400).send(errorMessage);
  } else if (req.body.defense && typeof req.body.defense !== "number") {
    errorMessage.message = "Defense parameter should be a number type";
    res.status(400).send(errorMessage);
  } else if (req.body.power < 1 || req.body.power > 100) {
    errorMessage.message = "Power parameter should be between 1 and 100";
    res.status(400).send(errorMessage);
  } else if (req.body.defense < 1 || req.body.defense > 10) {
    errorMessage.message = "Defense parameter should be between 1 and 10";
    res.status(400).send(errorMessage);
  } else if (req.body.health < 80 || req.body.health > 120) {
    errorMessage.message = "Health parameter should be between 80 and 120";
    res.status(400).send(errorMessage);
  } else {
    next();
  }
};

const createFighterValid = (req, res, next) => {
  const errorMessage = {
    error: true,
    message: "",
  };

  const fighterKeys = Object.keys(FIGHTER)
    .filter((key) => key !== "id")
    .filter((key) => key !== "health");

  for (let key of fighterKeys) {
    if (!req.body[key]) {
      errorMessage.message = `Field "${key}" is empty, please fill it!`;
      res.status(400).send(errorMessage);
      return;
    }
  }
  next();
};

const updateFighterValid = (req, res, next) => {
  const errorMessage = {
    error: true,
    message: "",
  };

  if (Object.keys(req.body).length == 0) {
    errorMessage.message = "Nothing to change";
    res.status(400).send(errorMessage);
  } else {
    next();
  }
};

export { baseFighterValid, createFighterValid, updateFighterValid };
