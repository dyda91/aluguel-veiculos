import { Router } from 'express';
import { vehicleCategoryController } from '../controllers/VehicleCategoryController';

const vehicleCategoryRoutes = Router();

//Post
vehicleCategoryRoutes.post('/vehicleCategory', vehicleCategoryController.create);

//Get
vehicleCategoryRoutes.get('/vehicleCategory', vehicleCategoryController.findAll);
vehicleCategoryRoutes.get('/vehicleCategory/:id', vehicleCategoryController.findById);

export { vehicleCategoryRoutes };