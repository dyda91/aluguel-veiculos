import { Router } from 'express';
import { vehicleRoutes } from './VehicleRoutes';
import { rentalRoutes } from './RentalRoutes';
import { customerRoutes } from './CustomerRoutes';
import { loginRoutes } from './LoginRoutes';
import { employeeRoutes } from './EmployeeRoutes';
import { passwordRoutes } from './PasswordRoutes';

const routes = Router();
routes.use(vehicleRoutes, rentalRoutes, customerRoutes, loginRoutes, employeeRoutes, passwordRoutes);

export { routes };