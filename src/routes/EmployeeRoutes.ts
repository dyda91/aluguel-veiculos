import { Router } from 'express';
import { employeeController } from '../controllers/EmployeeController';
import { emailMiddleware } from '../middleware/EmailMiddleware';
import { cpf_Middleware } from '../middleware/CPF_Middleware';
import { licenseCategoryMiddleware } from '../middleware/LicenseCategoryMiddleware';
import { authMiddleware } from '../middleware/AuthMiddleware';
import { employeePositionMiddleware } from '../middleware/EmployeePositionMiddleware';

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
    employeeController.getAllEmployees
);

employeeRoutes.get('/employees/:id',
    authMiddleware,
    employeeController.getEmployeeById
);

;

export { employeeRoutes };