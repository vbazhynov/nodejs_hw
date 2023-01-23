import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters

  addFighter(req, res) {
    if (this.search({ name: req.body.name })) {
      throw Error("Fighter with this name already exist!!");
    }
    if (!req.body.health) {
      req.body.health = 100;
    }
    return fighterRepository.create(req.body);
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAllFighters() {
    const users = fighterRepository.getAll();
    if (users.length === 0) {
      throw Error("Fighters list is empty!");
    } else {
      return users;
    }
  }

  getFighterById(req) {
    const user = fighterRepository.getOne({ id: req.params.id });
    if (!user) {
      throw Error("There is no such User in database");
    } else {
      return user;
    }
  }

  deleteFighterById(req) {
    const user = fighterRepository.delete(req.params.id);
    if (!user) {
      throw Error("There is no such User in database");
    } else {
      return user;
    }
  }

  changeFighterData(req) {
    const fighterExist = fighterRepository.getOne({ id: req.params.id });
    if (!fighterExist) {
      throw Error("There is no such User in database");
    } else {
      const fighter = fighterRepository.update(req.params.id, req.body);
      return fighter;
    }
  }
}

const fighterService = new FighterService();

export { fighterService };
