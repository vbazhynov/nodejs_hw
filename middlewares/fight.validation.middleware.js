import { FIGHT } from "../models/fight";

const createFightValid = (req, res, next) => {
  const errorMessage = {
    error: true,
    message: "",
  };

  const fightKeys = Object.keys(FIGHT).filter((key) => key !== "id");

  for (let key of fightKeys) {
    if (!req.body[key]) {
      errorMessage.message = `Field "${key}" is empty, please fill it!`;
      res.status(400).send(errorMessage);
      return;
    }
  }
  next();
};

export { createFightValid };
