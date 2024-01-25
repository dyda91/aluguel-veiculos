import { Router } from 'express';
import { customerController } from '../controllers/CustomerController';
import { vehicleController } from '../controllers/VehicleController';
import { rentalController } from '../controllers/RentalController';
import { loginController } from '../controllers/LoginController';

import { existingVehicleMiddleware } from '../middleware/ExistingVehicleMiddleware';
import { emailMiddleware } from '../middleware/EmailMiddleware';
import { cpf_Middleware } from '../middleware/CPF_Middleware';
import { licenseCategoryMiddleware } from '../middleware/LicenseCategoryMiddleware';
import { vehicleCategoryMiddleware } from '../middleware/VehicleCategoryMiddleware';
import { existingRentalMiddleware } from '../middleware/ExistingRentalMiddleware';
import { authMiddleware } from '../middleware/AuthMiddleware';

const routes = Router();



//Customer
routes.post('/customers',
    emailMiddleware.validateEmail,
    cpf_Middleware.validateCPF,
    licenseCategoryMiddleware.validateLicenseCategory,
    customerController.createCustomer
);

routes.post('/customers/login', loginController.signIn);

routes.get('/customers', authMiddleware, customerController.getAllCustomers);
routes.get('/customers/:id', authMiddleware, customerController.getCustomerById);

//Vehicles
routes.get('/vehicles', authMiddleware, vehicleController.getAllVehicles);
routes.get('/vehicles/:plate', authMiddleware, vehicleController.getVehicleByPlate);

routes.post('/vehicles',
    authMiddleware,
    existingVehicleMiddleware.check,
    vehicleCategoryMiddleware.validateCategory,
    vehicleController.createVehicle
);

//Rentals
routes.get('/rentals', authMiddleware, rentalController.getAllRentals);
routes.get('/rentals/:id', authMiddleware, existingRentalMiddleware.check, rentalController.getRentalById);

routes.post('/rentals',
    authMiddleware,
    rentalController.rentVehicle
);

routes.post('/rentals/start',
    authMiddleware,
    existingRentalMiddleware.check,
    rentalController.startRental
);

routes.post('/rentals/complete',
    authMiddleware,
    existingRentalMiddleware.check,
    rentalController.completeRental
);

export { routes };