enum VehicleCategory {
    BASIC = 'BASIC',
    INTERMEDIATE = 'INTERMEDIATE',
    PREMIUM = 'PREMIUM',
    SUV = 'SUV',
  }
  
  class Vehicle {
    plate: string;
    manufacturer: string;
    model: string;
    year: number;
    kilometers: number;
    category: VehicleCategory;
  
    constructor(plate: string, manufacturer: string, model: string, year: number, kilometers: number, category: VehicleCategory) {
      this.plate = plate;
      this.manufacturer = manufacturer;
      this.model = model;
      this.year = year;
      this.kilometers = kilometers;
      this.category = category;
    }
  }
  
  export { Vehicle, VehicleCategory };
  