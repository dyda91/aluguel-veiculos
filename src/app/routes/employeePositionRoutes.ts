import { Router } from 'express';
import { employeePositionController } from '../controllers/EmployeePositionController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { authorizationByManagerMiddleware } from '../middlewares/employee/AuthorizationForManagerMiddleware';


const employeePositionRoutes = Router();

//Post
employeePositionRoutes.post('/employeePosition',
    authMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    employeePositionController.create
);

//Get
employeePositionRoutes.get('/employeePosition',
    authMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    employeePositionController.findAll
);

employeePositionRoutes.get('/employeePosition/:id',
    authMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    employeePositionController.findById
);

export { employeePositionRoutes };