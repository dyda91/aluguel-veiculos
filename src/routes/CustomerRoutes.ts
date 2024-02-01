import { Router } from 'express';
import { customerController } from '../controllers/CustomerController';
import { emailMiddleware } from '../middleware/EmailMiddleware';
import { cpf_Middleware } from '../middleware/CPF_Middleware';
import { licenseCategoryMiddleware } from '../middleware/LicenseCategoryMiddleware';
import { authMiddleware } from '../middleware/AuthMiddleware';
import { authorizationByAttendantMiddleware } from '../middleware/AuthorizationByAttendantMiddleware';

const customerRoutes = Router();

// Post
customerRoutes.post('/customers',
    emailMiddleware.validateEmail,
    cpf_Middleware.validateCPF,
    licenseCategoryMiddleware.validateLicenseCategory,
    customerController.createCustomer
);

// Get
customerRoutes.get('/customers',
    authMiddleware,
    authorizationByAttendantMiddleware.authorization,
    customerController.getAllCustomers
);

customerRoutes.get('/customers/:id',
    authMiddleware,
    customerController.getCustomerById
);

export { customerRoutes };