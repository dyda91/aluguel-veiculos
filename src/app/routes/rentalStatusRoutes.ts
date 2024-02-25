import { Router } from 'express';
import { rentalStatusController } from '../controllers/RentalStatusController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { authorizationByManagerMiddleware } from '../middlewares/employee/AuthorizationForManagerMiddleware';
import { authorizationByAttendantMiddleware } from '../middlewares/employee/AuthorizationForAttendantMiddleware';
import { validateRentalStatusParamsIdMiddleware } from '../middlewares/ExistingRentalStatusMiddleware';

const rentalStatusRoutes = Router();

//Post
rentalStatusRoutes.post('/rentalStatus',
    authMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    rentalStatusController.create
);

//Get
rentalStatusRoutes.get('/rentalStatus',
    authMiddleware.auth,
    authorizationByAttendantMiddleware.authorization,
    rentalStatusController.findAll
);

rentalStatusRoutes.get('/rentalStatus/:id',
    authMiddleware.auth,
    authorizationByAttendantMiddleware.authorization,
    validateRentalStatusParamsIdMiddleware.validate,
    rentalStatusController.findById
);

export { rentalStatusRoutes };