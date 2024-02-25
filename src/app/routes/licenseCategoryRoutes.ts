import { Router } from 'express';
import { licenseCategoryController } from '../controllers/LicenseCategoryController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { authorizationByManagerMiddleware } from '../middlewares/employee/AuthorizationForManagerMiddleware';
import { validateLicenseCategoryParamsIdMiddleware } from '../middlewares/ValidateLicenseCategoryParamsIdMiddleware';

const licenseCategoryRoutes = Router();

//Post
licenseCategoryRoutes.post('/licenseCategory',
    authMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    licenseCategoryController.create
);

//Get
licenseCategoryRoutes.get('/licenseCategory',
    authMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    licenseCategoryController.findAll
);

licenseCategoryRoutes.get('/licenseCategory/:id',
    authMiddleware.auth,
    authorizationByManagerMiddleware.authorization,
    validateLicenseCategoryParamsIdMiddleware.validate,
    licenseCategoryController.findById
);

export { licenseCategoryRoutes };