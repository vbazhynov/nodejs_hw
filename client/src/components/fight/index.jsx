import React from "react";

import { getFighters } from "../../services/domainRequest/fightersRequest";
import { createFight } from "../../services/domainRequest/fightRequest";
import NewFighter from "../newFighter";
import Fighter from "../fighter";
import { Button } from "@material-ui/core";

import "./fight.css";

class Fight extends React.Component {
  state = {
    fighters: [],
    fighter1: null,
    fighter2: null,
  };

  async componentDidMount() {
    const fighters = await getFighters();
    if (fighters && !fighters.error) {
      this.setState({ fighters });
    }
  }

  getHitPower(fighter) {
    const { power } = fighter;
    const criticalHitChance = Math.random() * (2 - 1) + 1;
    const attack = power * criticalHitChance;
    return attack;
  }

  getBlockPower(fighter) {
    const { defense } = fighter;
    const criticalHitChance = Math.random() * (2 - 1) + 1;
    const power = defense * criticalHitChance;
    return power;
  }

  getDamage(attacker, defender) {
    const damage = this.getHitPower(attacker) - this.getBlockPower(defender);
    return damage >= 0 ? damage : 0;
  }

  onFightStart = async () => {
    const { fighter1, fighter2 } = this.state;
    const log = [];
    let health1 = fighter1.health;
    let health2 = fighter2.health;
    let hitPower1 = 0;
    let hitPower2 = 0;

    while (health1 > 0 || health2 > 0) {
      hitPower1 = this.getDamage(fighter1, fighter2).toFixed(1);
      health2 -= hitPower1;
      log.push(
        `Fighter1 hit ${hitPower1} health of fighter ${
          fighter2.name
        } is ${health2.toFixed(1)}`
      );
      if (health2 <= 0) {
        health2 = 0;
        alert(`Fighter ${fighter1.name} wins.`);
        break;
      }

      hitPower2 = this.getDamage(fighter2, fighter1).toFixed(1);
      health1 -= hitPower2;
      log.push(
        `Fighter2 hit ${hitPower1}, health of fighter ${
          fighter1.name
        } is ${health1.toFixed(1)}`
      );
      if (health1 <= 0) {
        health1 = 0;
        alert(`Fighter ${fighter2.name} wins.`);
        break;
      }
    }

    const data = await createFight({
      fighter1: fighter1.id,
      fighter2: fighter2.id,
      log,
    });
    if (data && !data.error) {
      console.log(data);
    }
  };

  onCreate = (fighter) => {
    this.setState({ fighters: [...this.state.fighters, fighter] });
  };

  onFighter1Select = (fighter1) => {
    this.setState({ fighter1 });
  };

  onFighter2Select = (fighter2) => {
    this.setState({ fighter2 });
  };

  getFighter1List = () => {
    const { fighter2, fighters } = this.state;
    if (!fighter2) {
      return fighters;
    }

    return fighters.filter((it) => it.id !== fighter2.id);
  };

  getFighter2List = () => {
    const { fighter1, fighters } = this.state;
    if (!fighter1) {
      return fighters;
    }

    return fighters.filter((it) => it.id !== fighter1.id);
  };

  render() {
    const { fighter1, fighter2 } = this.state;
    return (
      <div id="wrapper">
        <NewFighter onCreated={this.onCreate} />
        <div id="figh-wrapper">
          <Fighter
            selectedFighter={fighter1}
            onFighterSelect={this.onFighter1Select}
            fightersList={this.getFighter1List() || []}
          />
          <div className="btn-wrapper">
            <Button
              onClick={this.onFightStart}
              variant="contained"
              color="primary"
            >
              Start Fight
            </Button>
          </div>
          <Fighter
            selectedFighter={fighter2}
            onFighterSelect={this.onFighter2Select}
            fightersList={this.getFighter2List() || []}
          />
        </div>
      </div>
    );
  }
}

export default Fight;
