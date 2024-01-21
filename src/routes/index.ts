import { Router } from 'express';
import { customerController } from '../controllers/CustomerController';
import { vehicleController } from '../controllers/VehicleController';
import { rentalController } from '../controllers/RentalController';

import { existingVehicleMiddleware } from '../middleware/ExistingVehicleMiddleware';
import { validateCategoryMiddleware } from '../middleware/ValidateCategoryMiddleware';
import { validateEmailMiddleware } from '../middleware/ValidateEmailMiddleware';
import { validateCPFMiddleware } from '../middleware/ValidateCPFMiddleware';

const routes = Router();

//Customer
routes.post('/customers',
    validateEmailMiddleware.validateEmail,
    validateCPFMiddleware.validateCPF, 
    customerController.createCustomer
);

routes.get('/customers', customerController.getAllCustomers);
routes.get('/customers/:id', customerController.getCustomerById);


//Vehicles
routes.post('/vehicles', 
    existingVehicleMiddleware.checkExistingVehicle,
    validateCategoryMiddleware.validateCategory, 
    vehicleController.createVehicle
);

routes.get('/vehicles', vehicleController.getAllVehicles);
routes.get('/vehicles/:plate', vehicleController.getVehicleByPlate);


//Rentals
routes.post('/rentals', rentalController.rentVehicle);

export { routes };