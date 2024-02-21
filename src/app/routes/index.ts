import { Router } from 'express';
import { vehicleRoutes } from './vehicleRoutes';
import { rentalRoutes } from './rentalRoutes';
import { customerRoutes } from './customerRoutes';
import { loginRoutes } from './loginRoutes';
import { employeeRoutes } from './employeeRoutes';
import { passwordRoutes } from './passwordRoutes';
import { licenseCategoryRoutes } from './licenseCategoryRoutes';
import { vehicleCategoryRoutes } from './vehicleCategoryRoutes';
import { employeePositionRoutes } from './employeePositionRoutes';

const routes = Router();

routes.use(
    vehicleRoutes, 
    rentalRoutes, 
    customerRoutes, 
    loginRoutes, 
    employeeRoutes, 
    passwordRoutes, 
    licenseCategoryRoutes,
    vehicleCategoryRoutes,
    employeePositionRoutes
);

export { routes };