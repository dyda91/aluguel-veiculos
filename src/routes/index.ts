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
routes.get('/customers', customerController.getAllCustomers);
routes.get('/customers/:id', customerController.getCustomerById);

routes.post('/customers',
    emailMiddleware.validateEmail,
    cpf_Middleware.validateCPF,
    licenseCategoryMiddleware.validateLicenseCategory,
    customerController.createCustomer
);

//Vehicles
routes.get('/vehicles', vehicleController.getAllVehicles);
routes.get('/vehicles/:plate', vehicleController.getVehicleByPlate);

routes.post('/vehicles',
    existingVehicleMiddleware.checkExistingVehicle,
    vehicleCategoryMiddleware.validateCategory,
    vehicleController.createVehicle
);

//Rentals
routes.get('/rentals', rentalController.getAllRentals);
routes.get('/rentals/:id', rentalController.getRentalById);

routes.post('/rentals', rentalController.rentVehicle);
<<<<<<< HEAD
routes.get('/rentals', rentalController.getAllRentals);
routes.post('/rentals/start/:id', rentalController.startRental);
routes.post('/rentals/complete/:id', rentalController.completeRental);

=======
routes.post('/rentals/start/:id', rentalController.startRental);
routes.post('/rentals/complete/:id', rentalController.completeRental);
>>>>>>> 8cc19a7540bc72c524778beafa96486df285d31d

export { routes };