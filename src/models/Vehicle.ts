import { VehicleCategory } from "./enums/VehicleCategory";

class Vehicle {
  plate: string;
  manufacturer: string;
  model: string;
  year: number;
  kilometers: number;
  category: VehicleCategory;
  hourlyRate: number;
  isAvailable: boolean; 

  constructor(plate: string, manufacturer: string, model: string, year: number, kilometers: number, category: VehicleCategory, hourlyRate: number) {
    this.plate = plate;
    this.manufacturer = manufacturer;
    this.model = model;
    this.year = year;
    this.kilometers = kilometers;
    this.category = category;
    this.hourlyRate = hourlyRate;
    this.isAvailable = true;
  }
}

export { Vehicle, VehicleCategory };