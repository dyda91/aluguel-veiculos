import { Router } from 'express';
import { vehicleCategoryController } from '../controllers/VehicleCategoryController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { authorizationByManagerMiddleware } from '../middlewares/employee/AuthorizationForManagerMiddleware';

const vehicleCategoryRoutes = Router();

//Post
vehicleCategoryRoutes.post('/vehicleCategory',
    authMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    vehicleCategoryController.create
);

//Get
vehicleCategoryRoutes.get('/vehicleCategory',
    authMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    vehicleCategoryController.findAll
);

vehicleCategoryRoutes.get('/vehicleCategory/:id',
    authMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    vehicleCategoryController.findById
);

export { vehicleCategoryRoutes };