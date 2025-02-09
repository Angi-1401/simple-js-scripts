/**
 * Generates a random number between 0 and upperLimit.
 * @param {number} upperLimit Upper limit for the random value generation (31 by default).
 * @returns Random number.
 */
function generateRandomValue(upperLimit = 31) {
  return Math.floor(Math.random() * (upperLimit + 1));
}

/**
 * Base class.
 * Represents every character in the game.
 */
class Character {
  constructor(name) {
    this.name = name;
    this.hp = 70; // All characters starts with 70 HP
    this.atk = generateRandomValue();
    this.def = generateRandomValue();
    this.spd = generateRandomValue();
  }

  /**
   * Determines if the character is alive.
   * @returns boolean value based ont he comparison of the character's HP with 0.
   */
  isAlive() {
    return this.hp > 0;
  }

  /**
   * Calculates and applies damage to a target based on the attacker's attack
   * power, the target's defense power, and a skill multiplier.
   * @param {object} target - The character who receives the attack.
   * @param {object} skill - The skill used by the attacker.
   * @returns The damage dealt to the target.
   * If the character using the `inflictDmg` method is not alive, the method will
   * return early and not execute the rest of the code block.
   */
  inflictDmg(target, skill) {
    if (!this.isAlive()) return;

    let baseAtkPower = generateRandomValue(this.atk);
    let atkPower = baseAtkPower * skill.multiplier;
    let defPower = generateRandomValue(target.def);
    let dmg = Math.max(1, Math.floor(atkPower - defPower)); // At least 1 damage is dealt
    target.takeDmg(dmg);

    console.log(`${this.name} used ${skill.name} on ${target.name}!`);
    console.log(`Deals ${dmg.toFixed(0)} damage!`);
    console.log(`${target.name} has ${target.hp.toFixed(0)} HP left!`);
    console.log(`----------------------`);

    if (!target.isAlive()) {
      console.log(`${target.name} has fainted! :(`);
      console.log(`----------------------`);
    }
  }

  /**
   * Reduces the `hp` property of an object by a specified amount and ensures it
   * does not go below 0.
   * @param {number} dmg - Amount of damage.
   */
  takeDmg(dmg) {
    this.hp -= dmg;
    if (this.hp < 0) this.hp = 0;
  }
}

/**
 * Archer class.
 * Extends the Character class.
 */
class Archer extends Character {
  constructor(name) {
    super(name);
    this.skills = [
      { name: "Power Shot", multiplier: 1.7 },
      { name: "Bullseye", multiplier: 2.3 },
      { name: "Arrow Rain", multiplier: 2.5 },
      { name: "Snipe", multiplier: 2.7 },
      { name: "Cross Fire", multiplier: 3.0 }, // Ultimate skill
    ];
  }

  /**
   * Randomly selects a skill from the character's list of skills and inflicts
   * damage on a target, with a special message if the ultimate skill is used.
   * @param {object} target - The character who receives the attack.
   * If the skill selected is the ultimate skill, the skill is removed from the
   * character's list of skills, preventing a new use.
   */
  attack(target) {
    let index = generateRandomValue(this.skills.length - 1);
    let skill = this.skills[index];
    if (index === 4) {
      console.log(`OMG! ${this.name} is using its ultimate skill!`);
      this.skills.splice(index, 1);
    }
    super.inflictDmg(target, skill);
  }
}

/**
 * Mage class.
 * Extends the Character class.
 */
class Mage extends Character {
  constructor(name) {
    super(name);
    this.skills = [
      { name: "Magic: Arrows", multiplier: 1.7 },
      { name: "Magic: Javeline", multiplier: 2.3 },
      { name: "Magic: Lances", multiplier: 2.5 },
      { name: "Magic: Impact", multiplier: 2.7 },
      { name: "Magic: Finale", multiplier: 3.0 }, // Ultimate skill
    ];
  }

  /**
   * Randomly selects a skill from the character's list of skills and inflicts
   * damage on a target, with a special message if the ultimate skill is used.
   * @param {object} target - The character who receives the attack.
   * If the skill selected is the ultimate skill, the skill is removed from the
   * character's list of skills, preventing a new use.
   */
  attack(target) {
    let index = generateRandomValue(this.skills.length - 1);
    let skill = this.skills[index];
    if (index === 4) {
      console.log(`OMG! ${this.name} is using its ultimate skill!`);
      this.skills.splice(index, 1);
    }
    super.inflictDmg(target, skill);
  }
}

/**
 * Warrior class.
 * Extends the Character class.
 */
class Warrior extends Character {
  constructor(name) {
    super(name);
    this.skills = [
      { name: "Hard Hit", multiplier: 1.7 },
      { name: "Astute", multiplier: 2.3 },
      { name: "Trigger Slash", multiplier: 2.5 },
      { name: "Rampage", multiplier: 2.7 },
      { name: "Meteor Breaker", multiplier: 3.0 }, // Ultimate skill
    ];
  }

  /**
   * Randomly selects a skill from the character's list of skills and inflicts
   * damage on a target, with a special message if the ultimate skill is used.
   * @param {object} target - The character who receives the attack.
   * If the skill selected is the ultimate skill, the skill is removed from the
   * character's list of skills, preventing a new use.
   */
  attack(target) {
    let skillIndex = generateRandomValue(this.skills.length - 1);
    let skill = this.skills[skillIndex];
    if (skillIndex === 4) {
      console.log(`OMG! ${this.name} is using its ultimate skill!`);
      this.skills.splice(skillIndex, 1);
    }
    super.inflictDmg(target, skill);
  }
}

// Create characters
const characters = [
  new Archer("Mashed Potatoes with Bacon"),
  new Mage("Popcorn"),
  new Mage("Germany Sausage"),
  new Warrior("Cheese & Mushroom Soup"),
  new Warrior("Chicharrón"),
];

// Initialize round counter
let round = 1;

// Main game loop
while (characters.filter((char) => char.isAlive()).length > 1) {
  console.log(`----------------------`);
  console.log(`Round ${round}:`);
  console.log(`----------------------`);

  // Define alive characters and sort them by speed
  let aliveCharacters = characters.filter((char) => char.isAlive());
  aliveCharacters.sort(
    (a, b) => generateRandomValue(b.spd) - generateRandomValue(a.spd)
  );

  for (let attacker of aliveCharacters) {
    // Find all alive characters except the attacker
    let targets = aliveCharacters.filter((char) => char !== attacker);

    // If all characters are dead, break the loop
    if (targets.length === 0) break;

    // Randomly select a target and attack
    let target = targets[generateRandomValue(targets.length - 1)];
    attacker.attack(target);
  }

  // Increment round
  round++;
  // Round separator for readability
  console.log("\n");
}

// Find the winner
let winner = characters.find((char) => char.isAlive());
if (winner) {
  console.log(
    `The winner is ${winner.name} with ${winner.hp.toFixed(0)} HP remaining!`
  );
} else {
  console.log(`It's a draw!`);
}
