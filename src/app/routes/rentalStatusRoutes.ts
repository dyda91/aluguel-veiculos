import { Router } from 'express';
import { rentalStatusController } from '../controllers/RentalStatusController';

const rentalStatusRoutes = Router();

//Post
rentalStatusRoutes.post('/rentalStatus', rentalStatusController.create);

//Get
rentalStatusRoutes.get('/rentalStatus', rentalStatusController.findAll);
rentalStatusRoutes.get('/rentalStatus/:id', rentalStatusController.findById);

export { rentalStatusRoutes };