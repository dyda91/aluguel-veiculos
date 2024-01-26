import { Router } from 'express';
import { customerController } from '../controllers/CustomerController';
import { emailMiddleware } from '../middleware/EmailMiddleware';
import { cpf_Middleware } from '../middleware/CPF_Middleware';
import { licenseCategoryMiddleware } from '../middleware/LicenseCategoryMiddleware';

import { authMiddleware } from '../middleware/AuthMiddleware';


const customerRoutes = Router();

customerRoutes.post('/customers',
    emailMiddleware.validateEmail,
    cpf_Middleware.validateCPF,
    licenseCategoryMiddleware.validateLicenseCategory,
    customerController.createCustomer
);

customerRoutes.get('/customers', authMiddleware, customerController.getAllCustomers);
customerRoutes.get('/customers/:id', authMiddleware, customerController.getCustomerById);

export { customerRoutes };