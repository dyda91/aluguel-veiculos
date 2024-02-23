import { Router, Request, Response } from 'express';
import { employeeController } from '../controllers/EmployeeController';
import { validateEmployeeCpfMiddleware } from '../middlewares/employee/ValidateEmployeeCpfMiddleware';
import { validateEmployeeEmailMiddleware } from '../middlewares/employee/ValidateEmployeeEmailMiddleware';
import { validateEmployeePositionMiddleware } from '../middlewares/employee/ValidateEmployeePositionMiddleware';
import { validateLicenseCategoryMiddleware } from '../middlewares/ValidateLicenseCategoryMiddleware';
import path from 'path';

const employeeRoutes = Router();

// Post
employeeRoutes.get('/employee', (req: Request, res: Response) => {
    const caminho = path.resolve(__dirname, '..', 'views', 'employee.ejs');
    res.render(caminho);
});

employeeRoutes.post('/employees',
    validateEmployeeCpfMiddleware.validate,
    validateEmployeeEmailMiddleware.validate,
    validateLicenseCategoryMiddleware.validate,
    validateEmployeePositionMiddleware.validate,
    employeeController.create
);

// Get
employeeRoutes.get('/employees/all',
    // authMiddleware,
    // authorizationByManagerMiddleware.authorization,
    employeeController.findAll
);

employeeRoutes.get('/employees/:id',
    // authMiddleware,
    // authorizationByAttendantMiddleware.authorization,
    employeeController.findById
);

export { employeeRoutes };