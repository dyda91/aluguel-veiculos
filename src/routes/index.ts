import { Router } from 'express';
import { customerController } from '../controllers/CustomerController';
import { vehicleController } from '../controllers/VehicleController';
import { rentalController } from '../controllers/RentalController';

import { existingVehicleMiddleware } from '../middleware/ExistingVehicleMiddleware';
import { emailMiddleware } from '../middleware/EmailMiddleware';
import { cpf_Middleware } from '../middleware/CPF_Middleware';
import { licenseCategoryMiddleware } from '../middleware/LicenseCategoryMiddleware';
import { vehicleCategoryMiddleware } from '../middleware/VehicleCategoryMiddleware';



const routes = Router();

//Customer
routes.post('/customers',
    emailMiddleware.validateEmail,
    cpf_Middleware.validateCPF,
    licenseCategoryMiddleware.validateLicenseCategory, 
    customerController.createCustomer
);

routes.get('/customers', customerController.getAllCustomers);
routes.get('/customers/:id', customerController.getCustomerById);


//Vehicles
routes.post('/vehicles', 
    existingVehicleMiddleware.checkExistingVehicle,
    vehicleCategoryMiddleware.validateCategory, 
    vehicleController.createVehicle
);

routes.get('/vehicles', vehicleController.getAllVehicles);
routes.get('/vehicles/:plate', vehicleController.getVehicleByPlate);


//Rentals
routes.post('/rentals', rentalController.rentVehicle);

export { routes };