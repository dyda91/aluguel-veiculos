import { Router, Request, Response } from 'express';
import { customerController } from '../controllers/CustomerController';
import { validateCustomerCpfMiddleware } from '../middlewares/customer/ValidateCustomerCpfMiddleware';
import { validateCustomerEmailMiddleware } from '../middlewares/customer/ValidateCustomerEmailMiddleware';
import { validateLicenseCategoryMiddleware } from '../middlewares/ValidateLicenseCategoryMiddleware';
import path from 'path';

const customerRoutes = Router();

//Post
customerRoutes.get('/customer', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'customer.ejs');
    res.render(caminho);
});

customerRoutes.post('/customers',
    validateCustomerCpfMiddleware.validate,
    validateCustomerEmailMiddleware.validate,
    validateLicenseCategoryMiddleware.validate,
    customerController.create
);

// Get
customerRoutes.get('/customers/all',
    // authMiddleware,
    // authorizationByAttendantMiddleware.authorization,
    customerController.findAll
);

customerRoutes.get('/customers/:id',
    // authMiddleware,
    customerController.findById
);

export { customerRoutes };