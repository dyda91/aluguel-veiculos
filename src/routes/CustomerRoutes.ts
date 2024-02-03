import { Router } from 'express';
import { customerController } from '../controllers/CustomerController';
import { emailMiddleware } from '../middlewares/EmailMiddleware';
import { cpf_Middleware } from '../middlewares/CPF_Middleware';
import { licenseCategoryMiddleware } from '../middlewares/LicenseCategoryMiddleware';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { authorizationByAttendantMiddleware } from '../middlewares/AuthorizationByAttendantMiddleware';

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