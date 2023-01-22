import { fightRepository } from "../repositories/fightRepository.js";

class FightersService {
  // OPTIONAL TODO: Implement methods to work with fights

  addFight(req, res) {
    return fightRepository.create(req.body);
  }

  getAllFights() {
    const fights = fightRepository.getAll();
    if (fights.length === 0) {
      throw Error("Database is empty!");
    } else {
      return fights;
    }
  }

  getFightById(req) {
    const fight = fightRepository.getOne({ id: req.params.id });
    if (!fight) {
      throw Error("There is no such Fight in database");
    } else {
      return fight;
    }
  }

  deleteFightById(req) {
    const fight = fightRepository.delete(req.params.id);
    if (!fight) {
      throw Error("There is no such fight in database");
    } else {
      return fight;
    }
  }
}

const fightersService = new FightersService();

export { fightersService };
