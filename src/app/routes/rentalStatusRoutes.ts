import { Router } from 'express';
import { rentalStatusController } from '../controllers/RentalStatusController';
import { employeeAuthCookieMiddleware } from '../middlewares/employee/EmployeeAuthCookieMiddleware';
import { authorizationByManagerMiddleware } from '../middlewares/employee/AuthorizationForManagerMiddleware';
import { authorizationByAttendantMiddleware } from '../middlewares/employee/AuthorizationForAttendantMiddleware';
import { validateRentalStatusParamsIdMiddleware } from '../middlewares/ExistingRentalStatusMiddleware';


const rentalStatusRoutes = Router();

//Post
rentalStatusRoutes.post('/rentalStatus',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    rentalStatusController.create
);

//Get
rentalStatusRoutes.get('/rentalStatus',
    employeeAuthCookieMiddleware.auth,
    authorizationByAttendantMiddleware.authorization,
    rentalStatusController.findAll
);

rentalStatusRoutes.get('/rentalStatus/:id',
    employeeAuthCookieMiddleware.auth,
    authorizationByAttendantMiddleware.authorization,
    validateRentalStatusParamsIdMiddleware.validate,
    rentalStatusController.findById
);

export { rentalStatusRoutes };