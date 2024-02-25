import { Router } from 'express';
import { vehicleCategoryController } from '../controllers/VehicleCategoryController';
import { employeeAuthCookieMiddleware } from '../middlewares/employee/EmployeeAuthCookieMiddleware';
import { authorizationByManagerMiddleware } from '../middlewares/employee/AuthorizationForManagerMiddleware';


const vehicleCategoryRoutes = Router();

//Post
vehicleCategoryRoutes.post('/vehicleCategory',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    vehicleCategoryController.create
);

//Get
vehicleCategoryRoutes.get('/vehicleCategory',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    vehicleCategoryController.findAll
);

vehicleCategoryRoutes.get('/vehicleCategory/:id',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    vehicleCategoryController.findById
);

export { vehicleCategoryRoutes };