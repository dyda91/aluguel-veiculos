import { Router } from 'express';
import { licenseCategoryController } from '../controllers/LicenseCategoryController';

const licenseCategoryRoutes = Router();

//Post
licenseCategoryRoutes.post('/licenseCategory', licenseCategoryController.create);

//Get
licenseCategoryRoutes.get('/licenseCategory', licenseCategoryController.findAll);
licenseCategoryRoutes.get('/licenseCategory/:id', licenseCategoryController.findById);

export { licenseCategoryRoutes };