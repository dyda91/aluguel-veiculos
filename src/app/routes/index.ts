import { Router } from 'express';
import { vehicleRoutes } from './vehicleRoutes';
import { rentalRoutes } from './rentalRoutes';
import { customerRoutes } from './customerRoutes';
import { loginRoutes } from './loginRoutes';
import { logoutRoutes } from './logoutRoutes';
import { employeeRoutes } from './employeeRoutes';
import { passwordRoutes } from './passwordRoutes';
import { licenseCategoryRoutes } from './licenseCategoryRoutes';
import { vehicleCategoryRoutes } from './vehicleCategoryRoutes';
import { employeePositionRoutes } from './employeePositionRoutes';
import { rentalStatusRoutes } from './rentalStatusRoutes';

const routes = Router();

routes.use(
    vehicleRoutes, 
    rentalRoutes, 
    customerRoutes, 
    loginRoutes,
    logoutRoutes, 
    employeeRoutes, 
    passwordRoutes, 
    licenseCategoryRoutes,
    vehicleCategoryRoutes,
    employeePositionRoutes,
    rentalStatusRoutes
);

export { routes };