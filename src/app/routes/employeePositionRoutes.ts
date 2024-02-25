import { Router } from 'express';
import { employeePositionController } from '../controllers/EmployeePositionController';
import { employeeAuthCookieMiddleware } from '../middlewares/employee/EmployeeAuthCookieMiddleware';
import { authorizationByManagerMiddleware } from '../middlewares/employee/AuthorizationForManagerMiddleware';



const employeePositionRoutes = Router();

//Post
employeePositionRoutes.post('/employeePosition',
employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    employeePositionController.create
);

//Get
employeePositionRoutes.get('/employeePosition',
employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    employeePositionController.findAll
);

employeePositionRoutes.get('/employeePosition/:id',
employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    employeePositionController.findById
);

export { employeePositionRoutes };