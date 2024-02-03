import { Router } from 'express';
import { employeeController } from '../controllers/EmployeeController';
import { emailMiddleware } from '../middlewares/EmailMiddleware';
import { cpf_Middleware } from '../middlewares/CPF_Middleware';
import { licenseCategoryMiddleware } from '../middlewares/LicenseCategoryMiddleware';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { employeePositionMiddleware } from '../middlewares/EmployeePositionMiddleware';
import { authorizationByManagerMiddleware } from '../middlewares/AuthorizationByManagerMiddleware';
import { authorizationByAttendantMiddleware } from '../middlewares/AuthorizationByAttendantMiddleware';

const employeeRoutes = Router();

// Post
employeeRoutes.post('/employees',
    emailMiddleware.validateEmail,
    cpf_Middleware.validateCPF,
    licenseCategoryMiddleware.validateLicenseCategory,
    employeePositionMiddleware.validatePosition,
    employeeController.createEmployee
);

// Get
employeeRoutes.get('/employees',
    authMiddleware,
    authorizationByManagerMiddleware.authorization,
    employeeController.getAllEmployees
);

employeeRoutes.get('/employees/:id',
    authMiddleware,
    authorizationByAttendantMiddleware.authorization,
    employeeController.getEmployeeById
);

;

export { employeeRoutes };