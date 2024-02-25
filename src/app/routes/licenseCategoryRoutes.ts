import { Router } from 'express';
import { licenseCategoryController } from '../controllers/LicenseCategoryController';
import { employeeAuthCookieMiddleware } from '../middlewares/employee/EmployeeAuthCookieMiddleware';
import { authorizationByManagerMiddleware } from '../middlewares/employee/AuthorizationForManagerMiddleware';
import { validateLicenseCategoryParamsIdMiddleware } from '../middlewares/ValidateLicenseCategoryParamsIdMiddleware';


const licenseCategoryRoutes = Router();

//Post
licenseCategoryRoutes.post('/licenseCategory',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    licenseCategoryController.create
);

//Get
licenseCategoryRoutes.get('/licenseCategory',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    licenseCategoryController.findAll
);

licenseCategoryRoutes.get('/licenseCategory/:id',
    employeeAuthCookieMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    validateLicenseCategoryParamsIdMiddleware.validate,
    licenseCategoryController.findById
);

export { licenseCategoryRoutes };