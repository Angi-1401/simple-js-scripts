class Employee {
  /**
   * Employee constructor.
   *
   * @param {string} firstName - The employee's first name.
   * @param {string} lastName - The employee's last name.
   * @param {number} salary - The employee's base salary.
   */
  constructor(firstName, lastName, salary) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.salary = salary;
  }

  /**
   * Prints the employee's name and salary to the console.
   */
  present() {
    console.log(`Name: ${this.firstName} ${this.lastName}`);
    console.log(`Salary: ${this.salary}`);
  }

  /**
   * Calculates the extra salary earned by working extra hours.
   *
   * @param {number} hours - The number of extra hours worked.
   * @returns {number} The extra salary earned.
   */
  calculateExtraHours(hours) {
    let extraSalary = 0;
    if (this instanceof Manager) {
      extraSalary = hours * 200;
    } else if (this instanceof Developer) {
      extraSalary = hours * 150;
    } else if (this instanceof Designer) {
      extraSalary = hours * 100;
    }
    return extraSalary;
  }
}

class Manager extends Employee {
  /**
   * Manager constructor.
   *
   * @param {string} firstName - The manager's first name.
   * @param {string} lastName - The manager's last name.
   * @param {string[]} team - The manager's team. Defaults to an empty array.
   */
  constructor(firstName, lastName, team = []) {
    super(firstName, lastName, 2000);
    this.team = team;
  }

  /**
   * Showcases the manager's team.
   */
  showcase() {
    console.log(`I'm a manager. I'm in charge of ${this.team.length} teams.`);
    console.log(`The team is: ${this.team.join(", ")}`);
  }

  /**
   * Prints the manager's total salary after working extra hours to the console.
   *
   * @param {number} hours - The number of extra hours worked.
   */
  workExtraHours(hours) {
    console.log(
      `I'm a manager. I've worked ${hours} extra hours! So my total salary is ${
        this.salary + this.calculateExtraHours(hours)
      } USD.`
    );
    console.log(`(${this.calculateExtraHours(hours)} USD extra).`);
  }
}

class Developer extends Employee {
  /**
   * Developer constructor.
   *
   * @param {string} firstName - The developer's first name.
   * @param {string} lastName - The developer's last name.
   * @param {string[]} languages - The developer's languages. Defaults to an empty array.
   */
  constructor(firstName, lastName, languages = []) {
    super(firstName, lastName, 1500);
    this.languages = languages;
  }

  /**
   * Showcases the developer's languages.
   */
  showcase() {
    console.log(
      `I'm a developer. I have expertise in ${this.languages.length} languages.`
    );
    console.log(`They are: ${this.languages.join(", ")}`);
  }

  /**
   * Prints the developer's total salary after working extra hours to the console.
   *
   * @param {number} hours - The number of extra hours worked.
   */
  workExtraHours(hours) {
    console.log(
      `I'm a developer. I've worked ${hours} extra hours! So my total salary is ${
        this.salary + this.calculateExtraHours(hours)
      } USD.`
    );
    console.log(`(${this.calculateExtraHours(hours)} USD extra).`);
  }
}

class Designer extends Employee {
  /**
   * Designer constructor.
   *
   * @param {string} firstName - The designer's first name.
   * @param {string} lastName - The designer's last name.
   * @param {string[]} tools - The designer's tools. Defaults to an empty array.
   */

  constructor(firstName, lastName, tools = []) {
    super(firstName, lastName, 1000);
    this.tools = tools;
  }

/**
 * Showcases the designer's tools.
 */
  showcase() {
    console.log(
      `I'm a designer. I have expertise in ${this.tools.length} tools.`
    );
    console.log(`They are: ${this.tools.join(", ")}`);
  }

  /**
   * Prints the designer's total salary after working extra hours to the console.
   *
   * @param {number} hours - The number of extra hours worked.
   */
  workExtraHours(hours) {
    console.log(
      `I'm a designer. I've worked ${hours} extra hours! So my total salary is ${
        this.salary + this.calculateExtraHours(hours)
      } USD.`
    );
    console.log(`(${this.calculateExtraHours(hours)} USD extra).`);
  }
}

const manager = new Manager("Chicharrón", "Con patas", ["Team A", "Team B"]);
manager.present();
manager.showcase();
manager.workExtraHours(5);

const developer = new Developer("Jane", "Smith", ["JavaScript", "Python"]);
developer.present();
developer.showcase();
developer.workExtraHours(3);

const designer = new Designer("Bob", "Johnson", ["Figma", "Photoshop"]);
designer.present();
designer.showcase();
designer.workExtraHours(2);
