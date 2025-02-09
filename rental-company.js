class RentalCompany {
  constructor() {
    this.vehicles = [];
  }

  /**
   * Returns a list of all vehicles.
   * @returns {string[]} A list of vehicle strings.
   */
  showVehicles() {
    return this.vehicles.map((vehicle) => vehicle.info());
  }

  /**
   * Returns a list of available vehicles.
   * @returns {string[]} A list of available vehicle strings.
   */
  showAvailableVehicles() {
    return this.vehicles
      .filter((vehicle) => vehicle.available)
      .map((vehicle) => vehicle.info());
  }

  /**
   * Adds a vehicle to the list of available vehicles.
   * @param {string} brand - The brand of the vehicle.
   * @param {string} model - The model of the vehicle.
   * @param {number} year - The year of the vehicle.
   * @param {boolean} [available=true] - Whether the vehicle is available for rental.
   */
  addVehicle(brand, model, year, available = true) {
    const newVehicle = new Vehicle(brand, model, year, available);
    this.vehicles.push(newVehicle);
  }

  /**
   * Finds a vehicle in the list of vehicles based on brand, model, and year.
   * @param {string} brand - The brand of the vehicle.
   * @param {string} model - The model of the vehicle.
   * @param {number} year - The year of the vehicle.
   * @returns {Vehicle|string} The vehicle if found, otherwise a message indicating the
   * vehicle is not found.
   */
  findVehicle(brand, model, year) {
    const vehicle = this.vehicles.find(
      (vehicle) =>
        vehicle.brand === brand &&
        vehicle.model === model &&
        vehicle.year === year
    );

    if (vehicle) {
      console.log(`Vehicle found: ${vehicle.info()}`);
      return vehicle;
    } else {
      return `Vehicle not found`;
    }
  }

  /**
   * Rents a vehicle if it is available.
   * @param {string} brand - The brand of the vehicle.
   * @param {string} model - The model of the vehicle.
   * @param {number} year - The year of the vehicle.
   * @returns {string} A message indicating the vehicle was rented or not available.
   */
  rentVehicle(brand, model, year) {
    const vehicle = this.findVehicle(brand, model, year);
    return vehicle.rent();
  }

  /**
   * Returns a rented vehicle if it exists in the list of vehicles.
   * @param {string} brand - The brand of the vehicle.
   * @param {string} model - The model of the vehicle.
   * @param {number} year - The year of the vehicle.
   * @returns {string} A message indicating the vehicle was returned or not found.
   */
  returnVehicle(brand, model, year) {
    const vehicle = this.findVehicle(brand, model, year);
    return vehicle.return();
  }
}

class Vehicle {
  constructor(brand, model, year, available = true) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.available = available;
  }

  /**
   * Rents a vehicle if it is available.
   * @returns {string} A message indicating the vehicle was rented or not available.
   */
  rent() {
    if (this.available) {
      this.available = false;
      return "Rented";
    } else {
      return "Not available";
    }
  }

  /**
   * Returns a rented vehicle.
   * @returns {string} A message indicating the vehicle was returned or not rented.
   */
  return() {
    if (!this.available) {
      this.available = true;
      return "Returned";
    } else {
      return "Available";
    }
  }

  /**
   * Returns a string representation of the vehicle.
   * @returns {string} A string showing the brand, model, and year of the vehicle.
   */
  info() {
    return `${this.brand} ${this.model} (${this.year})`;
  }
}

// Create an instance of the RentalCompany class
let company = new RentalCompany();

// Add vehicles
company.addVehicle("Toyota", "Camry", 2020);
company.addVehicle("Honda", "Civic", 2019);
company.addVehicle("Ford", "Mustang", 2021);
company.addVehicle("Nissan", "Altima", 2022, false);

// Show the list of vehicles
console.log(company.showVehicles());
console.log(company.showAvailableVehicles());

// Find a vehicle
console.log(company.findVehicle("Toyota", "Camry", 2021)); // Doesn't exist

// Rent and return a vehicle
console.log(company.rentVehicle("Toyota", "Camry", 2020));
console.log(company.returnVehicle("Toyota", "Camry", 2020));
