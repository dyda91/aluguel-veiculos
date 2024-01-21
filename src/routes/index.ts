import { Router } from 'express';
import { customerController } from '../controllers/CustomerController';
import { vehicleController } from '../controllers/VehicleController';
import { rentalController } from '../controllers/RentalController';

import { existingVehicleMiddleware } from '../middleware/ExistingVehicleMiddleware';

const routes = Router();

//Customer
routes.post('/customers', customerController.createCustomer);
routes.get('/customers', customerController.getAllCustomers);
routes.get('/customers/:id', customerController.getCustomerById);


//Vehicles
routes.post('/vehicles', existingVehicleMiddleware.checkExistingVehicle, vehicleController.createVehicle);
routes.get('/vehicles', vehicleController.getAllVehicles);
routes.get('/vehicles/:plate', vehicleController.getVehicleByPlate);


//Rentals
routes.post('/rentals', rentalController.rentVehicle);

export { routes };