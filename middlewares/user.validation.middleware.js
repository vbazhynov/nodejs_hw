import { USER } from "../models/user.js";

const baseUserValid = (req, res, next) => {
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
    if (!USER.hasOwnProperty(fKey)) {
      errorMessage.message = `Field "${fKey}" is not required in request, please delete it`;
      res.status(400).send(errorMessage);
      return;
    }
  }

  if (req.body.hasOwnProperty("id")) {
    errorMessage.message = `Field "id" is not required in request, please delete it`;
    res.status(400).send(errorMessage);
  } else if (req.body.password.length < 3) {
    errorMessage.message = "Password should be longer than 3 symbols";
    res.status(400).send(errorMessage);
  } else if (req.body.email && !req.body.email.endsWith("@gmail.com")) {
    errorMessage.message = "Email must be registered only on @gmail.com ";
    res.status(400).send(errorMessage);
  } else if (
    req.body.phoneNumber &&
    (!req.body.phoneNumber.startsWith("+380") ||
      req.body.phoneNumber.length !== 13)
  ) {
    errorMessage.message = 'Phone number format should be "+380ххххххххх" ';
    res.status(400).send(errorMessage);
  } else {
    next();
  }
};

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation
  const errorMessage = {
    error: true,
    message: "",
  };

  let userKeys = Object.keys(USER).filter((key) => key !== "id");
  for (let key of userKeys) {
    if (!req.body.hasOwnProperty(key)) {
      errorMessage.message = `Field "${key}" is required`;
      res.status(400).send(errorMessage);
      return;
    }

    if (!req.body[key]) {
      {
        errorMessage.message = `Field "${key}" is empty, please fill it!`;
        res.status(400).send(errorMessage);
        return;
      }
    }
  }

  next();
};

const updateUserValid = (req, res, next) => {
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

export { baseUserValid, createUserValid, updateUserValid };
