import { Router } from 'express';
import { vehicleRoutes } from './vehicleRoutes';
import { rentalRoutes } from './rentalRoutes';
import { customerRoutes } from './customerRoutes';
import { loginRoutes } from './loginRoutes';
import { employeeRoutes } from './employeeRoutes';
import { passwordRoutes } from './passwordRoutes';

const routes = Router();
routes.use(vehicleRoutes, rentalRoutes, customerRoutes, loginRoutes, employeeRoutes, passwordRoutes);

export { routes };