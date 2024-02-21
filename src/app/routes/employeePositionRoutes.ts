import { Router } from 'express';
import { employeePositionController } from '../controllers/EmployeePositionController';


const employeePositionRoutes = Router();

//Post
employeePositionRoutes.post('/employeePosition', employeePositionController.create);

//Get
employeePositionRoutes.get('/employeePosition', employeePositionController.findAll);
employeePositionRoutes.get('/employeePosition/:id', employeePositionController.findById);

export { employeePositionRoutes };