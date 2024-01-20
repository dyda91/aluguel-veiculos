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
    hourlyRate: number;
  
    constructor(plate: string, manufacturer: string, model: string, year: number, kilometers: number, category: VehicleCategory, hourlyRate: number) {
      this.plate = plate;
      this.manufacturer = manufacturer;
      this.model = model;
      this.year = year;
      this.kilometers = kilometers;
      this.category = category;
      this.hourlyRate = hourlyRate;
    }
  }
  
  export { Vehicle, VehicleCategory };
  