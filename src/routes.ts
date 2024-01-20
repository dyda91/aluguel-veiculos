import { Router } from 'express';
import { customerController } from './controllers/customerController';
import { vehicleController } from './controllers/vehicleController'; 
import { rentalController } from './controllers/rentalController';

const routes = Router();


routes.get('/customers', customerController.getAllCustomers);
routes.get('/customers/:id', customerController.getCustomerById);
routes.post('/customers', customerController.createCustomer);

routes.get('/vehicles', vehicleController.getAllVehicles);
routes.get('/vehicles/:plate', vehicleController.getVehicleByPlate);
routes.post('/vehicles', vehicleController.createVehicle);

routes.post('/rentals', rentalController.rentVehicle);

export { routes };
